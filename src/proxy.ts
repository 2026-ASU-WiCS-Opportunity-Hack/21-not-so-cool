import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const deploymentMode =
  process.env.NEXT_PUBLIC_DEPLOYMENT_MODE?.trim().toLowerCase() ?? "global";
const chapterSlug =
  process.env.NEXT_PUBLIC_CHAPTER_SLUG?.trim().toLowerCase() ?? "";
const globalSiteUrl =
  process.env.NEXT_PUBLIC_GLOBAL_SITE_URL?.trim().replace(/\/$/, "") ?? "";

function isChapterDeployment() {
  return deploymentMode === "chapter" && chapterSlug.length > 0;
}

function isChapterPublicPath(pathname: string) {
  return pathname === "/" || pathname === "/about" || pathname === "/contact";
}

function buildGlobalRedirect(request: NextRequest) {
  if (!globalSiteUrl) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.redirect(new URL(request.nextUrl.pathname, globalSiteUrl));
}

export async function proxy(request: NextRequest) {
  if (isChapterDeployment()) {
    if (request.nextUrl.pathname === `/${chapterSlug}`) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (request.nextUrl.pathname === `/${chapterSlug}/about`) {
      return NextResponse.redirect(new URL("/about", request.url));
    }

    if (request.nextUrl.pathname === `/${chapterSlug}/contact`) {
      return NextResponse.redirect(new URL("/contact", request.url));
    }

    if (isChapterPublicPath(request.nextUrl.pathname)) {
      const rewritePath =
        request.nextUrl.pathname === "/"
          ? `/${chapterSlug}`
          : `/${chapterSlug}${request.nextUrl.pathname}`;

      return NextResponse.rewrite(new URL(rewritePath, request.url));
    }

    const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
    const isApiRoute = request.nextUrl.pathname.startsWith("/api");
    const isStudioRoute = request.nextUrl.pathname.startsWith("/studio");

    if (!isAdminRoute && !isApiRoute && !isStudioRoute) {
      return buildGlobalRedirect(request);
    }
  }

  const response = NextResponse.next();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publicKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publicKey) {
    return response;
  }

  const supabase = createServerClient(url, publicKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoginRoute = request.nextUrl.pathname === "/admin/login";

  if (!user && !isLoginRoute) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (user && isLoginRoute) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|sw.js|images/).*)",
  ],
};
