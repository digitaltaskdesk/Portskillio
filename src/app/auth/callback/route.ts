import { NextResponse } from "next/server";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";
  const safe = next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
  if (code && supabaseConfigured()) {
    const { error } = await (await createClient()).auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${safe}`);
  }
  return NextResponse.redirect(`${origin}/login?error=link`);
}
