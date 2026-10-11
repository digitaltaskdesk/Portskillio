-- Phase 2: accounts, roles, RLS. Run in Supabase > SQL Editor.
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('student','recruiter','admin')),
  full_name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table public.student_profiles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  username text unique,
  headline text,
  created_at timestamptz not null default now()
);
create table public.recruiter_profiles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  organization text not null,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);
create index on public.recruiter_profiles (status);

create function public.my_role() returns text language sql security definer stable set search_path = ''
  as $$ select role from public.profiles where id = auth.uid() $$;

-- Roles come from signup metadata, but 'admin' can never be self-assigned.
create function public.handle_new_user() returns trigger language plpgsql security definer set search_path = '' as $$
declare r text := case when new.raw_user_meta_data->>'role' = 'recruiter' then 'recruiter' else 'student' end;
begin
  insert into public.profiles (id, role, full_name)
    values (new.id, r, coalesce(nullif(trim(new.raw_user_meta_data->>'full_name'), ''), 'New user'));
  if r = 'student' then insert into public.student_profiles (user_id) values (new.id);
  else insert into public.recruiter_profiles (user_id, organization)
    values (new.id, coalesce(nullif(trim(new.raw_user_meta_data->>'organization'), ''), 'Not provided'));
  end if;
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.student_profiles enable row level security;
alter table public.recruiter_profiles enable row level security;

create policy "read own or admin" on public.profiles for select using (id = auth.uid() or public.my_role() = 'admin');
create policy "update own, role locked" on public.profiles for update
  using (id = auth.uid()) with check (id = auth.uid() and role = public.my_role());

create policy "student read own or admin" on public.student_profiles for select using (user_id = auth.uid() or public.my_role() = 'admin');
create policy "student update own" on public.student_profiles for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "recruiter read own or admin" on public.recruiter_profiles for select using (user_id = auth.uid() or public.my_role() = 'admin');
create policy "admin reviews recruiters" on public.recruiter_profiles for update using (public.my_role() = 'admin') with check (public.my_role() = 'admin');
