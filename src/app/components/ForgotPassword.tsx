'use client';

import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, KeyRound, X } from 'lucide-react';

const ForgotPassword = () => {
    const [step, setStep] = useState('email');
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmitEmail = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // 이메일 전송 API 호출 시뮬레이션
        setTimeout(() => {
            setLoading(false);
            setStep('verify');
        }, 1000);
    };

    const handleSubmitVerification = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // 인증 코드 확인 API 호출 시뮬레이션
        setTimeout(() => {
            setLoading(false);
            setStep('reset');
        }, 1000);
    };

    const handleSubmitReset = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다');
            return;
        }
        setLoading(true);
        // 비밀번호 재설정 API 호출 시뮬레이션
        setTimeout(() => {
            setLoading(false);
            setError('');
            alert('비밀번호가 성공적으로 변경되었습니다');
        }, 1000);
    };

    return (
        <div className="w-full min-h-screen bg-black flex justify-center items-center p-4">
            <div className="max-w-lg w-full bg-zinc-900 rounded-2xl p-8">
                {/* 헤더 */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <button onClick={() => step !== 'email' ? setStep('email') : null}
                                className="p-2 hover:bg-zinc-800 rounded-xl">
                            <ArrowLeft className="w-5 h-5 text-white" />
                        </button>
                        <div>
                            <h2 className="text-2xl font-bold text-white">비밀번호 찾기</h2>
                            <p className="text-zinc-400 text-sm">
                                {step === 'email' && '이메일을 입력하여 인증 코드를 받으세요'}
                                {step === 'verify' && '이메일로 전송된 인증 코드를 입력하세요'}
                                {step === 'reset' && '새로운 비밀번호를 설정하세요'}
                            </p>
                        </div>
                    </div>
                    <button className="p-2 hover:bg-zinc-800 rounded-xl">
                        <X className="w-5 h-5 text-zinc-500" />
                    </button>
                </div>

                {/* 진행 단계 표시 */}
                <div className="flex items-center mb-8">
                    {['email', 'verify', 'reset'].map((s, i) => (
                        <React.Fragment key={s}>
                            <div className="flex items-center">
                                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm
                  ${step === s ? 'bg-orange-500 text-white' :
                                    ['email', 'verify', 'reset'].indexOf(step) > i
                                        ? 'bg-green-500 text-white'
                                        : 'bg-zinc-800 text-zinc-500'}
                `}>
                                    {i + 1}
                                </div>
                                <div className="text-xs text-zinc-500 absolute mt-12 -ml-4">
                                    {s === 'email' && '이메일'}
                                    {s === 'verify' && '인증'}
                                    {s === 'reset' && '재설정'}
                                </div>
                            </div>
                            {i < 2 && (
                                <div className={`flex-1 h-1 mx-2 rounded ${
                                    ['email', 'verify', 'reset'].indexOf(step) > i
                                        ? 'bg-green-500'
                                        : 'bg-zinc-800'
                                }`} />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* 이메일 입력 폼 */}
                {step === 'email' && (
                    <form onSubmit={handleSubmitEmail} className="space-y-4">
                        <div>
                            <label className="block text-zinc-400 text-sm mb-2">이메일</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-xl px-4 py-3 pl-10
                           focus:outline-none focus:border-orange-500"
                                    placeholder="name@example.com"
                                    required
                                />
                                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-zinc-500" />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-500 text-white py-3 rounded-xl font-medium
                       hover:bg-orange-600 disabled:opacity-50 transition-colors"
                        >
                            {loading ? '전송 중...' : '인증 코드 받기'}
                        </button>
                    </form>
                )}

                {/* 인증 코드 확인 폼 */}
                {step === 'verify' && (
                    <form onSubmit={handleSubmitVerification} className="space-y-4">
                        <div>
                            <label className="block text-zinc-400 text-sm mb-2">인증 코드</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-xl px-4 py-3 pl-10
                           focus:outline-none focus:border-orange-500"
                                    placeholder="6자리 인증 코드"
                                    required
                                />
                                <KeyRound className="absolute left-3 top-3.5 w-5 h-5 text-zinc-500" />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-500 text-white py-3 rounded-xl font-medium
                       hover:bg-orange-600 disabled:opacity-50 transition-colors"
                        >
                            {loading ? '확인 중...' : '인증 코드 확인'}
                        </button>
                    </form>
                )}

                {/* 새 비밀번호 설정 폼 */}
                {step === 'reset' && (
                    <form onSubmit={handleSubmitReset} className="space-y-4">
                        <div>
                            <label className="block text-zinc-400 text-sm mb-2">새 비밀번호</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-xl px-4 py-3 pl-10
                           focus:outline-none focus:border-orange-500"
                                    placeholder="새 비밀번호 입력"
                                    required
                                />
                                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-zinc-500" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-zinc-400 text-sm mb-2">비밀번호 확인</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-xl px-4 py-3 pl-10
                           focus:outline-none focus:border-orange-500"
                                    placeholder="비밀번호 다시 입력"
                                    required
                                />
                                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-zinc-500" />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-500 text-white py-3 rounded-xl font-medium
                       hover:bg-orange-600 disabled:opacity-50 transition-colors"
                        >
                            {loading ? '변경 중...' : '비밀번호 변경'}
                        </button>
                    </form>
                )}

                {/* 에러 메시지 */}
                {error && (
                    <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <p className="text-red-500 text-sm">{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;