import AuthForm from "@/components/AuthForm";
export const metadata = { title: "Reset your password | Portskillio" };
export default async function Page({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <section className="mx-auto max-w-md px-5 py-20 text-center">
      <h1 className="font-display text-3xl font-extrabold">Reset your password</h1>
      <p className="mt-2 text-muted">We will email you a link.</p>
      <AuthForm mode="forgot" notice={error === "link" ? "That link is invalid or has expired. Request a new one." : undefined} />
    </section>
  );
}
