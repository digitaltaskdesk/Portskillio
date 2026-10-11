import { redirect } from "next/navigation";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";

export const metadata = { title: "Dashboard | Portskillio" };
export const dynamic = "force-dynamic";

export default async function Dashboard() {
  if (!supabaseConfigured()) redirect("/login");
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await supabase.from("profiles").select("role, full_name").eq("id", user.id).single();
  const { data: rec } = profile?.role === "recruiter"
    ? await supabase.from("recruiter_profiles").select("organization, status").eq("user_id", user.id).single()
    : { data: null };

  let body = "Your account is ready.";
  if (profile?.role === "student") body = "Your account is ready. The portfolio builder opens in Phase 3.";
  if (profile?.role === "recruiter") body = rec?.status === "approved"
    ? "Your organization is approved. Candidate discovery opens in Phase 5."
    : `Your request for ${rec?.organization ?? "your organization"} is ${rec?.status ?? "pending"}. You will get access to discovery once an admin approves it.`;
  if (profile?.role === "admin") body = "Recruiter approvals arrive in Phase 6.";

  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-3xl font-extrabold">Hi, {profile?.full_name ?? "there"}</h1>
      <p className="mt-1 text-sm capitalize text-muted">{profile?.role} account</p>
      <p className="glass mt-8 rounded-2xl p-6">{body}</p>
      <form action={signOut} className="mt-6"><button className="rounded-full border border-line px-5 py-2 text-sm font-medium">Log out</button></form>
    </section>
  );
}
