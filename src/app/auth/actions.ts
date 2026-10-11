"use server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";

export type FormState = { error?: string; message?: string } | undefined;
const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const field = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const NOT_READY = "Supabase is not configured yet. Add your keys to .env.local and restart the server.";
async function origin() { const h = await headers(); return h.get("origin") ?? `https://${h.get("host")}`; }

export async function signUp(_: FormState, fd: FormData): Promise<FormState> {
  const name = field(fd, "name"), email = field(fd, "email").toLowerCase(), role = field(fd, "role"), org = field(fd, "organization");
  const password = String(fd.get("password") ?? "");
  if (name.length < 2) return { error: "Enter your full name." };
  if (!emailOk(email)) return { error: "Enter a valid email address." };
  if (password.length < 8) return { error: "Use a password with at least 8 characters." };
  if (role !== "student" && role !== "recruiter") return { error: "Choose whether you are a student or a recruiter." };
  if (role === "recruiter" && org.length < 2) return { error: "Enter your organization name." };
  if (!supabaseConfigured()) return { error: NOT_READY };
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email, password,
    options: { emailRedirectTo: `${await origin()}/auth/callback`, data: { full_name: name, role, organization: org } },
  });
  if (error) return { error: error.message };
  return { message: "Account created. Check your email and confirm your address, then log in." };
}

export async function signIn(_: FormState, fd: FormData): Promise<FormState> {
  const email = field(fd, "email").toLowerCase(), password = String(fd.get("password") ?? "");
  if (!emailOk(email) || !password) return { error: "Enter your email and password." };
  if (!supabaseConfigured()) return { error: NOT_READY };
  const { error } = await (await createClient()).auth.signInWithPassword({ email, password });
  if (error) return { error: "Email or password is incorrect, or your email is not confirmed yet." };
  redirect("/dashboard");
}

export async function requestReset(_: FormState, fd: FormData): Promise<FormState> {
  const email = field(fd, "email").toLowerCase();
  if (!emailOk(email)) return { error: "Enter a valid email address." };
  if (!supabaseConfigured()) return { error: NOT_READY };
  await (await createClient()).auth.resetPasswordForEmail(email, { redirectTo: `${await origin()}/auth/callback?next=/reset-password` });
  return { message: "If an account exists for that email, a reset link is on its way." };
}

export async function updatePassword(_: FormState, fd: FormData): Promise<FormState> {
  const password = String(fd.get("password") ?? "");
  if (password.length < 8) return { error: "Use a password with at least 8 characters." };
  if (!supabaseConfigured()) return { error: NOT_READY };
  const { error } = await (await createClient()).auth.updateUser({ password });
  if (error) return { error: error.message };
  redirect("/dashboard");
}

export async function signOut() {
  if (supabaseConfigured()) await (await createClient()).auth.signOut();
  redirect("/");
}
