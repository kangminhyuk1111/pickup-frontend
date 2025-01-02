import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 토큰 검증 함수
function verifyToken(token: string) {
    try {
        const tokenParts = token.split('.');
        if (tokenParts.length !== 3) return null;

        const payload = JSON.parse(atob(tokenParts[1]));

        // 토큰 만료 검사
        if (payload.exp && payload.exp * 1000 < Date.now()) {
            return null;
        }

        return payload;
    } catch (error) {
        return null;
    }
}

// 보호된 라우트 목록
const PROTECTED_ROUTES = ['/matches','/courts'];
const ADMIN_ROUTES = ['/admin'];

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken');
    const requestedPath = request.nextUrl.pathname;

    // 로그인 페이지는 이미 로그인된 사용자를 홈으로 리다이렉트
    if (requestedPath === '/login' && accessToken) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // 보호된 라우트 체크
    const isProtectedRoute = PROTECTED_ROUTES.some(route =>
        requestedPath.startsWith(route)
    );

    // 관리자 라우트 체크
    const isAdminRoute = ADMIN_ROUTES.some(route =>
        requestedPath.startsWith(route)
    );

    if (isProtectedRoute || isAdminRoute) {
        // 토큰이 없거나 유효하지 않은 경우
        if (!accessToken || !verifyToken(accessToken.value)) {
            const response = NextResponse.next();
            response.headers.set('x-auth-required', 'true');
            response.headers.set('x-redirect-url', `/login?from=${requestedPath}`);
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/matches/:path*',
        '/courts/:path*',
    ]
};