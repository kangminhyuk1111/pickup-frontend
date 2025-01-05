'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, Play, Users, MapPin } from 'lucide-react';

const HeroSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = [
        '/img/background/background-2.jpg',
        '/img/background/peakpx.jpg',
    ];

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleGetStarted = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
    };

    return (
        <section className="relative min-h-screen flex items-center pt-16 overflow-x-hidden overflow-y-hidden">
            {/* Background Images with Parallax */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                            currentImageIndex === index ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <img
                            src={img}
                            alt={`배경 ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
                {/* 단순한 그라데이션 오버레이만 유지 */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />

                {/* Animated Overlay Pattern */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0"
                         style={{
                             backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)',
                             backgroundSize: '20px 20px',
                             backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                             animation: 'patternMove 20s linear infinite'
                         }}
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4">
                <div className="max-w-3xl">
                    {/* Moving Badge */}
                    <div
                        className={`inline-flex items-center bg-gradient-to-r from-orange-500/20 to-pink-500/20 backdrop-blur px-6 py-3 rounded-full text-white mb-8 transition-all duration-700 ${
                            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}
                    >
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 animate-pulse" />
                        <span className="text-sm font-medium">STREET BASKETBALL CULTURE</span>
                    </div>

                    {/* Heading with Gradient */}
                    <h1
                        className={`text-7xl md:text-8xl font-black mb-8 transition-all duration-700 delay-300 ${
                            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}
                    >
                        <span className="block bg-gradient-to-r from-white via-orange-200 to-orange-500 bg-clip-text text-transparent">
                            FIND YOUR
                        </span>
                        <span className="block bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                            NEXT GAME
                        </span>
                    </h1>

                    {/* Stats Section */}
                    <div className={`flex gap-8 mb-8 transition-all duration-700 delay-500 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}>
                        <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-orange-500" />
                            <div>
                                <div className="text-2xl font-bold text-white">1,200+</div>
                                <div className="text-zinc-400 text-sm">Active Players</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-orange-500" />
                            <div>
                                <div className="text-2xl font-bold text-white">50+</div>
                                <div className="text-zinc-400 text-sm">Court Locations</div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <p
                        className={`text-xl text-zinc-400 mb-8 transition-all duration-700 delay-700 ${
                            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}
                    >
                        당신의 열정을 공유할 팀메이트를 찾아보세요.<br />
                        새로운 농구 문화가 시작됩니다.
                    </p>

                    {/* CTA Buttons */}
                    <div
                        className={`flex flex-wrap gap-4 transition-all duration-700 delay-900 ${
                            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}
                    >
                        <button
                            onClick={handleGetStarted}
                            disabled={isLoading}
                            className="group bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-xl font-bold text-lg
                                     hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300
                                     hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100
                                     relative overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                GET STARTED
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>

                        <button
                            className="group bg-white/10 backdrop-blur text-white px-8 py-4 rounded-xl font-bold text-lg
                                     border border-white/20 hover:border-white/40
                                     hover:bg-white/20 transition-all duration-300
                                     hover:scale-105 active:scale-95"
                        >
                            <span className="flex items-center gap-2">
                                <Play className="w-5 h-5" />
                                WATCH VIDEO
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Animated Mesh Gradient Background */}
            <div className="absolute inset-0 z-0 opacity-30">
                <div
                    className="absolute inset-0 bg-gradient-conic from-orange-500 via-pink-500 to-orange-500"
                    style={{
                        animation: 'gradient-rotate 5s linear infinite',
                        backgroundSize: '400% 400%',
                    }}
                />
            </div>
        </section>
    );
};

export default HeroSection;