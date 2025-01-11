
import React from 'react';
import { Users, MapPin, Shield } from 'lucide-react';

const FeaturesSection = () => {
    const features = [
        {
            icon: Users,
            title: '빠른 매칭',
            description: '실시간으로 근처의 게임을 찾고 당신의 스타일에 맞는 팀원을 만나보세요.'
        },
        {
            icon: MapPin,
            title: '코트 찾기',
            description: '가까운 농구장을 찾고 실시간 코트 상황을 확인하세요.'
        },
        {
            icon: Shield,
            title: '레벨 시스템',
            description: '실력과 매너를 인증하고 신뢰할 수 있는 매칭을 경험하세요.'
        }
    ];

    return (
        <section className="py-20 bg-zinc-900">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div key={index} className="bg-zinc-800/50 p-8 rounded-2xl border border-zinc-700/50">
                                <Icon className="w-12 h-12 text-orange-500 mb-4" />
                                <h4 className="text-xl font-bold text-white mb-4">{feature.title}</h4>
                                <p className="text-gray-400">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;