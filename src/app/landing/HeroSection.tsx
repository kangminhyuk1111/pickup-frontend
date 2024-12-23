import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-16">
            <div className="absolute inset-0 z-0">
                <img
                    src="/api/placeholder/1920/1080"
                    alt="배경"
                    className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4">
                <div className="max-w-3xl">
                    <div className="inline-block bg-white/10 backdrop-blur px-4 py-2 rounded-full text-white/80 text-sm mb-6">
                        🏀 스트릿 농구의 새로운 문화
                    </div>
                    <h2 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
                        FIND YOUR<br />
                        NEXT GAME
                    </h2>
                    <p className="text-xl text-white/80 mb-8">
                        농구를 사랑하는 모든 플레이어들을 위한 매칭 플랫폼.<br />
                        지금 바로 새로운 팀메이트를 만나보세요.
                    </p>
                    <div className="flex gap-4">
                        <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white/90 flex items-center">
                            GET STARTED
                            <ArrowRight className="ml-2" />
                        </button>
                        <button className="bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20">
                            WATCH VIDEO
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;