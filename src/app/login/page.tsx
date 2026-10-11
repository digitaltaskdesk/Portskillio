import AuthForm from "@/components/AuthForm";
export const metadata = { title: "Log in | Portskillio" };
export default async function Page({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <section className="mx-auto max-w-md px-5 py-20 text-center">
      <h1 className="font-display text-3xl font-extrabold">Log in</h1>
      <p className="mt-2 text-muted">Welcome back.</p>
      <AuthForm mode="login" notice={error === "link" ? "That link is invalid or has expired. Request a new one." : undefined} />
    </section>
  );
}
