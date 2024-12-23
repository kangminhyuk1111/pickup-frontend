import { Menu } from 'lucide-react';
import React, { useState } from 'react';
import {usePathname} from "next/navigation";
import Link from "next/link";

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className="md:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white p-2"
            >
                <Menu />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md p-4">
                    <div className="flex flex-col space-y-4">
                        <Link
                            href="/guide"
                            className={`text-sm ${
                                pathname === '/guide'
                                    ? 'text-white'
                                    : 'text-white/70 hover:text-white'
                            }`}
                            onClick={() => setIsOpen(false)}
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
                            onClick={() => setIsOpen(false)}
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
                            onClick={() => setIsOpen(false)}
                        >
                            코트
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};