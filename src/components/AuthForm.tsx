"use client";
import Link from "next/link";
import { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import { requestReset, signIn, signUp, updatePassword, type FormState } from "@/app/auth/actions";

type Mode = "login" | "signup" | "forgot" | "reset";
const cfg = {
  login: { action: signIn, cta: "Log in" },
  signup: { action: signUp, cta: "Create account" },
  forgot: { action: requestReset, cta: "Send reset link" },
  reset: { action: updatePassword, cta: "Save new password" },
};
const input = "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm outline-none focus:border-pink";

export default function AuthForm({ mode, notice }: { mode: Mode; notice?: string }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(cfg[mode].action, undefined);
  const [role, setRole] = useState("student");
  const done = Boolean(state?.message);
  return (
    <form action={formAction} className="glass mt-8 space-y-4 rounded-3xl p-6 text-left" noValidate>
      {notice && <p role="alert" className="rounded-xl bg-pink/10 px-4 py-3 text-sm text-pink">{notice}</p>}
      {mode === "signup" && (
        <fieldset className="grid grid-cols-2 gap-2">
          <legend className="mb-2 text-sm font-medium">I am a</legend>
          {["student", "recruiter"].map((r) => (
            <label key={r} className={`cursor-pointer rounded-xl border px-4 py-3 text-center text-sm font-medium capitalize ${role === r ? "border-pink bg-pink/10" : "border-line"}`}>
              <input type="radio" name="role" value={r} checked={role === r} onChange={() => setRole(r)} className="sr-only" />{r}
            </label>
          ))}
        </fieldset>
      )}
      {mode === "signup" && <input name="name" placeholder="Full name" autoComplete="name" className={input} aria-label="Full name" />}
      {mode === "signup" && role === "recruiter" && <input name="organization" placeholder="Organization" className={input} aria-label="Organization" />}
      {mode !== "reset" && <input name="email" type="email" placeholder="Email" autoComplete="email" className={input} aria-label="Email" />}
      {mode !== "forgot" && <input name="password" type="password" placeholder={mode === "reset" ? "New password (8+ characters)" : "Password"} autoComplete={mode === "login" ? "current-password" : "new-password"} className={input} aria-label="Password" />}
      {state?.error && <p role="alert" className="text-sm text-pink">{state.error}</p>}
      {state?.message && <p role="status" className="rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">{state.message}</p>}
      <button disabled={pending || done} className="brand-bg flex w-full items-center justify-center gap-2 rounded-full py-3 font-semibold text-white disabled:opacity-60">
        {pending && <Loader2 size={16} className="animate-spin" />}{cfg[mode].cta}
      </button>
      <p className="text-center text-sm text-muted">
        {mode === "login" && <><Link href="/forgot-password" className="text-pink">Forgot password?</Link> · <Link href="/signup" className="text-pink">Create account</Link></>}
        {mode === "signup" && <>Have an account? <Link href="/login" className="text-pink">Log in</Link></>}
        {mode === "forgot" && <Link href="/login" className="text-pink">Back to log in</Link>}
      </p>
    </form>
  );
}
