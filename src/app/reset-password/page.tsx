import AuthForm from "@/components/AuthForm";
export const metadata = { title: "Choose a new password | Portskillio" };
export default async function Page({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <section className="mx-auto max-w-md px-5 py-20 text-center">
      <h1 className="font-display text-3xl font-extrabold">Choose a new password</h1>
      <p className="mt-2 text-muted">Use at least 8 characters.</p>
      <AuthForm mode="reset" notice={error === "link" ? "That link is invalid or has expired. Request a new one." : undefined} />
    </section>
  );
}
