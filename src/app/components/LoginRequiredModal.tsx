'use client';

import React from 'react';
import {X, LogIn} from 'lucide-react';
import Link from 'next/link';

interface LoginRequiredModalProps {
    isOpen: boolean;
    onClose: () => void;
    message?: string;
}

const LoginRequiredModal = ({isOpen, onClose, message = "이 기능을 사용하기 위해서는 로그인이 필요합니다."}: LoginRequiredModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-zinc-900 rounded-xl w-full max-w-md mx-4 overflow-hidden">
                <div className="p-6">
                    {/* 헤더 */}
                    <div className="flex justify-between items-start mb-6">
                        <h3 className="text-xl font-bold text-white">로그인 필요</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white"
                        >
                            <X className="w-5 h-5"/>
                        </button>
                    </div>

                    {/* 메시지 */}
                    <div className="mb-8">
                        <p className="text-gray-300">{message}</p>
                    </div>

                    {/* 버튼 */}
                    <div className="flex gap-3">
                        <Link
                            href="/login"
                            className="flex-1 bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                        >
                            <LogIn className="w-5 h-5"/>
                            로그인하기
                        </Link>
                        <Link
                            href="/signup"
                            className="flex-1 bg-zinc-800 text-white py-3 px-4 rounded-lg font-semibold hover:bg-zinc-700 transition-colors"
                        >
                            회원가입
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginRequiredModal;