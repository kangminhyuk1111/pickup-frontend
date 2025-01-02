"use client";

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useState, useEffect} from 'react';
import {getCookie, deleteCookie} from 'cookies-next'; // 쿠키 관리를 위해 추가

export const NavBar = () => {
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkLoginStatus = () => {
            const token = getCookie('accessToken');
            if (token) {
                setIsLoggedIn(true);
                // TODO: 토큰이 있다면 서버에서 유저 정보를 가져오는 API 호출
                fetchUserProfile(token);
            }
        };

        checkLoginStatus();
    }, []);

    const fetchUserProfile = async (token: any) => {
        // try {
        //     const response = await fetch('/api/user/profile', {
        //         headers: {
        //             'Authorization': `Bearer ${token}`
        //         }
        //     });
        //     if (response.ok) {
        //         const userData = await response.json();
        //         setUser(userData);
        //     }
        // } catch (error) {
        //     console.error('Failed to fetch user profile:', error);
        // }
    };

    const handleLogout = () => {
        deleteCookie('accessToken');
        setIsLoggedIn(false);
        setUser(null);
        window.location.href = '/';
    };

    return (
        <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-8">
                    <Link href="/" className="text-3xl font-black text-white">
                        PICKUP
                    </Link>
                    <div className="hidden md:flex space-x-6">
                        <Link
                            href="/guide"
                            className={`text-sm ${
                                pathname === '/guide'
                                    ? 'text-white'
                                    : 'text-white/70 hover:text-white'
                            }`}
                        >
                            이용가이드
                        </Link>
                        <Link
                            href="/matches"
                            className={`text-sm ${
                                pathname === '/matches'
                                    ? 'text-white'
                                    : 'text-white/70 hover:text-white'
                            }`}
                        >
                            매칭
                        </Link>
                        <Link
                            href="/courts"
                            className={`text-sm ${
                                pathname === '/courts'
                                    ? 'text-white'
                                    : 'text-white/70 hover:text-white'
                            }`}
                        >
                            코트
                        </Link>
                    </div>
                </div>
                <div className="flex items-center space-x-6">
                    {isLoggedIn ? (
                        <>
                            <Link
                                href="/profile"
                                className="flex items-center space-x-2 text-white/80 hover:text-white"
                            >
                                <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                                    {user ? (
                                        <img
                                            alt="프로필"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-400"/>
                                    )}
                                </div>
                                <span className="text-sm">{user ? '사용자' : '사용자'}</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-white/80 hover:text-white text-sm"
                            >
                                로그아웃
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-white/80 hover:text-white"
                            >
                                LOG IN
                            </Link>
                            <Link
                                href="/signup"
                                className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-white/90"
                            >
                                SIGN UP
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};