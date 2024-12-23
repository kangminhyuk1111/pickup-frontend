"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavBar = () => {
    const pathname = usePathname();

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
                <div className="space-x-6">
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
                </div>
            </div>
        </nav>
    );
};