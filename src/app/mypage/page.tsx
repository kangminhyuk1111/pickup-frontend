'use client';

import React, { useState, useEffect } from 'react';
import { User, Settings, Star, Clock, Edit2 } from 'lucide-react';
import { AuthCheck } from "@/app/components/AuthCheck";
import axiosInstance from "@/app/api/axios-intercepter";

interface UserProfile {
    id: number;
    email: string;
    nickname: string;
    profileImage: string | null;
    height: number | null;
    weight: number | null;
    position: string | null;
    level: string | null;
    mannerScore: number;
    socialProvider: string | null;
    lastLoginAt: string;
}

const MyPage = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isLoading, setIsLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                setIsLoading(true);
                const response = await axiosInstance.get("/member/mypage");
                setUserProfile(response.data);
            } catch (err) {
                console.error("Error fetching user profile:", err);
            } finally {
                setIsLoading(false);
            }
        };

        getUserProfile();
    }, []);

    const getPositionText = (position: string | null) => {
        const positions: { [key: string]: string } = {
            'PG': '포인트 가드',
            'SG': '슈팅 가드',
            'SF': '스몰 포워드',
            'PF': '파워 포워드',
            'C': '센터'
        };
        return position ? positions[position] : '미설정';
    };

    const getLevelText = (level: string | null) => {
        return level ? `${level}수` : '미설정';
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    return (
        <>
            <AuthCheck/>
            <div className="min-h-screen bg-black pt-20 pb-20">
                <div className="max-w-6xl mx-auto px-4">
                    {/* 헤더 */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-white">마이페이지</h1>
                            <p className="text-gray-400 mt-2">
                                내 정보와 활동 내역을 관리하세요
                            </p>
                        </div>
                    </div>

                    {/* 탭 네비게이션 */}
                    <div className="bg-zinc-900/50 backdrop-blur p-6 rounded-xl mb-8 border border-zinc-800">
                        <div className="flex gap-4">
                            {/* 기존 탭 버튼들 */}
                        </div>
                    </div>

                    {/* 프로필 탭 */}
                    {activeTab === 'profile' && userProfile && (
                        <div className="bg-zinc-900/50 backdrop-blur rounded-xl border border-zinc-800 p-6">
                            {/* 기본 정보 */}
                            <div className="flex gap-6 mb-8">
                                <div className="relative">
                                    <div className="w-32 h-32 bg-zinc-800 rounded-full overflow-hidden">
                                        {userProfile.profileImage ? (
                                            <img
                                                src={userProfile.profileImage}
                                                alt="프로필"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <User className="w-full h-full p-6 text-gray-400" />
                                        )}
                                    </div>
                                    <button className="absolute bottom-0 right-0 p-2 bg-orange-500 rounded-full text-white hover:bg-orange-600">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-2">{userProfile.nickname}</h2>
                                    <p className="text-gray-400">{userProfile.email}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="text-sm px-2 py-1 bg-zinc-800 rounded-full text-gray-300">
                                            매너 점수: {userProfile.mannerScore.toFixed(1)}
                                        </div>
                                        {userProfile.socialProvider && (
                                            <div className="text-sm px-2 py-1 bg-zinc-800 rounded-full text-gray-300">
                                                {userProfile.socialProvider} 로그인
                                            </div>
                                        )}
                                    </div>
                                    <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                                        프로필 수정
                                    </button>
                                </div>
                            </div>

                            {/* 상세 정보 */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-zinc-800/50 p-4 rounded-lg">
                                    <div className="text-gray-400 text-sm">포지션</div>
                                    <div className="text-white font-semibold">
                                        {getPositionText(userProfile.position)}
                                    </div>
                                </div>
                                <div className="bg-zinc-800/50 p-4 rounded-lg">
                                    <div className="text-gray-400 text-sm">실력</div>
                                    <div className="text-white font-semibold">
                                        {getLevelText(userProfile.level)}
                                    </div>
                                </div>
                                <div className="bg-zinc-800/50 p-4 rounded-lg">
                                    <div className="text-gray-400 text-sm">신장</div>
                                    <div className="text-white font-semibold">
                                        {userProfile.height ? `${userProfile.height}cm` : '미설정'}
                                    </div>
                                </div>
                                <div className="bg-zinc-800/50 p-4 rounded-lg">
                                    <div className="text-gray-400 text-sm">체중</div>
                                    <div className="text-white font-semibold">
                                        {userProfile.weight ? `${userProfile.weight}kg` : '미설정'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 나머지 탭 내용들... */}
                </div>
            </div>
        </>
    );
};

export default MyPage;