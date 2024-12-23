'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface LoginForm {
    email: string;
    password: string;
    rememberMe: boolean;
}

const LoginPage = () => {
    const [form, setForm] = useState<LoginForm>({
        email: '',
        password: '',
        rememberMe: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // TODO: API 호출
            console.log('Login attempt:', form);
            await new Promise(resolve => setTimeout(resolve, 1000)); // 임시 딜레이
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black pt-20 pb-20">
            <div className="max-w-md mx-auto px-4">
                {/* 헤더 */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="text-gray-400 hover:text-white inline-flex items-center gap-2 mb-6"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        메인으로
                    </Link>
                    <h1 className="text-3xl font-bold text-white">로그인</h1>
                    <p className="text-gray-400 mt-2">
                        PICKUP과 함께 새로운 농구 친구를 만나보세요.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 이메일 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            이메일
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                            placeholder="example@email.com"
                            required
                        />
                    </div>

                    {/* 비밀번호 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            비밀번호
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                                placeholder="비밀번호를 입력해주세요"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* 추가 옵션 */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={form.rememberMe}
                                onChange={handleChange}
                                className="w-4 h-4 bg-zinc-800 border-zinc-700 rounded text-orange-500 focus:ring-orange-500"
                            />
                            <span className="text-sm text-gray-400">로그인 상태 유지</span>
                        </label>
                        <Link
                            href="/forgot-password"
                            className="text-sm text-orange-500 hover:text-orange-400"
                        >
                            비밀번호 찾기
                        </Link>
                    </div>

                    {/* 로그인 버튼 */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold 
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'} 
              transition-colors`}
                    >
                        {isLoading ? '로그인 중...' : '로그인'}
                    </button>

                    {/* 소셜 로그인 */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-zinc-800"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-black text-gray-400">또는</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button
                            type="button"
                            className="w-full bg-zinc-800 text-white py-3 px-4 rounded-lg font-semibold hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
                        >
                            Google로 계속하기
                        </button>
                        <button
                            type="button"
                            className="w-full bg-[#FEE500] text-black py-3 px-4 rounded-lg font-semibold hover:bg-[#FDD900] transition-colors flex items-center justify-center gap-2"
                        >
                            카카오로 계속하기
                        </button>
                    </div>
                </form>

                {/* 회원가입 링크 */}
                <p className="text-center text-gray-400 mt-8">
                    아직 계정이 없으신가요?{" "}
                    <Link href="/signup" className="text-orange-500 hover:text-orange-400">
                        회원가입하기
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;