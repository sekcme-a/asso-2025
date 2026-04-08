// middleware.ts
import { NextResponse } from "next/server";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // 지원하는 언어 목록
  const languages = ["en"];
  const pathnameIsMissingLanguage = languages.every(
    (lang) => !pathname.startsWith(`/${lang}/`) && pathname !== `/${lang}`,
  );

  // 만약 URL에 /en 이 없다면, 서버 내부적으로 'ko' 상태라고 간주하고 그대로 진행 (리다이렉트 X)
  if (pathnameIsMissingLanguage) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
