import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE === "true") {
    const { pathname } = request.nextUrl;
    if (pathname === "/maintenance") return NextResponse.next();
    if (pathname === "/admin") {
      const adminUrl = request.nextUrl.clone();
      adminUrl.pathname = "/admin12345";
      return NextResponse.redirect(adminUrl);
    }
    if (pathname === "/admin12345") {
      const adminUrl = request.nextUrl.clone();
      adminUrl.pathname = "/admin";
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
        return NextResponse.rewrite(adminUrl);
      }
      const sessionResponse = await updateSession(request);
      const response = NextResponse.rewrite(adminUrl);
      for (const cookie of sessionResponse.cookies.getAll()) response.cookies.set(cookie);
      return response;
    }
    if (pathname === "/login" || pathname.startsWith("/login/") || pathname === "/auth/callback") {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) return;
      return updateSession(request);
    }
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Situs sedang dalam maintenance." }, { status: 503 });
    }
    return NextResponse.rewrite(new URL("/maintenance", request.url));
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) return;
  return updateSession(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
