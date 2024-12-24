// src/app/signup/page.tsx
'use client';

import React, {useState} from 'react';
import {Eye, EyeOff, ArrowLeft} from 'lucide-react';
import Link from 'next/link';

interface SignupForm {
    email: string;
    password: string;
    nickname: string;
    height: string;
    weight: string;
    position: string;
    level: string;
}

interface Position {
    position: string;
    value: string;
}

interface Level {
    level: string;
    value: string;
}

const SignupPage = () => {
    const [form, setForm] = useState<SignupForm>({
        email: '',
        password: '',
        nickname: '',
        height: '',
        weight: '',
        position: '',
        level: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState(1); // 1: 기본 정보, 2: 농구 정보

    const positions: Position[] = [
        {position: 'Point Guard (PG)', value: 'PG'},
        {position: 'Shooting Guard (SG)', value: 'SG'},
        {position: 'Small Forward (SF)', value: 'SF'},
        {position: 'Power Forward (PF)', value: 'PF'},
        {position: 'Center (C)', value: 'C'},
    ];

    const levels: Level[] = [
        {level: '초급', value: "BEGINNER"},
        {level: '중급', value: "INTERMEDIATE"},
        {level: '상급', value: "ADVANCED"}
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: API 호출 및 유효성 검사
        console.log('Form submitted:', form);
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
                        <ArrowLeft className="w-5 h-5"/>
                        메인으로
                    </Link>
                    <h1 className="text-3xl font-bold text-white">회원가입</h1>
                    <p className="text-gray-400 mt-2">
                        {step === 1 ? '기본 정보를 입력해주세요.' : '농구 관련 정보를 입력해주세요.'}
                    </p>
                </div>

                {/* 진행 상태 표시 */}
                <div className="flex gap-2 mb-8">
                    <div className={`h-1 flex-1 rounded ${step === 1 ? 'bg-orange-500' : 'bg-orange-500/30'}`}/>
                    <div className={`h-1 flex-1 rounded ${step === 2 ? 'bg-orange-500' : 'bg-orange-500/30'}`}/>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {step === 1 ? (
                        // 기본 정보 입력
                        <>
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
                                        placeholder="8자 이상 입력해주세요"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                                    </button>
                                </div>
                            </div>

                            {/* 비밀번호 확인 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    비밀번호 확인
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                                    placeholder="비밀번호를 다시 입력해주세요"
                                    required
                                />
                            </div>

                            {/* 닉네임 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    닉네임
                                </label>
                                <input
                                    type="text"
                                    name="nickname"
                                    value={form.nickname}
                                    onChange={handleChange}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                                    placeholder="사용하실 닉네임을 입력해주세요"
                                    required
                                />
                            </div>
                        </>
                    ) : (
                        // 농구 정보 입력
                        <>
                            {/* 키 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    키
                                </label>
                                <input
                                    type="number"
                                    name="height"
                                    value={form.height}
                                    onChange={handleChange}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                                    placeholder="cm"
                                    required
                                />
                            </div>

                            {/* 몸무게 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    몸무게
                                </label>
                                <input
                                    type="number"
                                    name="weight"
                                    value={form.weight}
                                    onChange={handleChange}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                                    placeholder="kg"
                                    required
                                />
                            </div>

                            {/* 포지션 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    선호 포지션
                                </label>
                                <select
                                    name="position"
                                    value={form.position}
                                    onChange={handleChange}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                                    required
                                >
                                    <option value="">포지션을 선택해주세요</option>
                                    {positions.map((position: Position) => (
                                        <option key={position.value} value={position.value}>{position.position}</option>
                                    ))}
                                </select>
                            </div>

                            {/* 실력 수준 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    실력 수준
                                </label>
                                <select
                                    name="level"
                                    value={form.level}
                                    onChange={handleChange}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                                    required
                                >
                                    <option value="">실력 수준을 선택해주세요</option>
                                    {levels.map(level => (
                                        <option key={level.value} value={level.value}>{level.level}</option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}

                    {/* 버튼 */}
                    <div className="flex gap-3">
                        {step === 2 && (
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="flex-1 bg-zinc-800 text-white py-3 px-4 rounded-lg font-semibold hover:bg-zinc-700 transition-colors"
                            >
                                이전
                            </button>
                        )}
                        <button
                            type={step === 2 ? "submit" : "button"}
                            onClick={() => step === 1 && setStep(2)}
                            className="flex-1 bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                        >
                            {step === 1 ? "다음" : "가입하기"}
                        </button>
                    </div>
                </form>

                {/* 로그인 링크 */}
                <p className="text-center text-gray-400 mt-8">
                    이미 계정이 있으신가요?{" "}
                    <Link href="/login" className="text-orange-500 hover:text-orange-400">
                        로그인하기
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;