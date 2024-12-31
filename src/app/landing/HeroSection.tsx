"use client";

import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import LoadingScreen from "@/app/components/LoadingScreen";

const HeroSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleGetStarted = async () => {
        setIsLoading(true);
        // 실제로는 여기서 필요한 데이터를 불러오거나 초기화 작업을 수행할 수 있습니다
        await new Promise(resolve => setTimeout(resolve, 1500)); // 예시를 위한 지연
    };

    const handleWatchVideo = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
    };

    return (
        <>
            <LoadingScreen isLoading={isLoading} />
            <section className="relative min-h-screen flex items-center pt-16">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/api/placeholder/1920/1080"
                        alt="배경"
                        className={`w-full h-full object-cover transition-opacity duration-1000 ${
                            isVisible ? 'opacity-50' : 'opacity-0'
                        }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-4">
                    <div className="max-w-3xl">
                        <div
                            className={`inline-block bg-white/10 backdrop-blur px-4 py-2 rounded-full text-white/80 text-sm mb-6 transition-all duration-700 ${
                                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                            }`}
                        >
                            🏀 스트릿 농구의 새로운 문화
                        </div>
                        <h2
                            className={`text-6xl md:text-7xl font-black text-white mb-6 leading-tight transition-all duration-700 delay-300 ${
                                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                            }`}
                        >
                            FIND YOUR<br />
                            NEXT GAME
                        </h2>
                        <p
                            className={`text-xl text-white/80 mb-8 transition-all duration-700 delay-500 ${
                                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                            }`}
                        >
                            농구를 사랑하는 모든 플레이어들을 위한 매칭 플랫폼.<br />
                            지금 바로 새로운 팀메이트를 만나보세요.
                        </p>
                        <div
                            className={`flex gap-4 transition-all duration-700 delay-700 ${
                                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                            }`}
                        >
                            <button
                                onClick={handleGetStarted}
                                disabled={isLoading}
                                className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white/90 flex items-center transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                            >
                                GET STARTED
                                <ArrowRight className="ml-2" />
                            </button>
                            <button
                                onClick={handleWatchVideo}
                                disabled={isLoading}
                                className="bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                            >
                                WATCH VIDEO
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HeroSection;