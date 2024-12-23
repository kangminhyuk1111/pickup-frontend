import React from 'react';

const CtaSection = () => {
    return (
        <section className="relative py-20">
            <div className="absolute inset-0 z-0">
                <img
                    src="/api/placeholder/1920/600"
                    alt="농구장"
                    className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black to-black/90" />
            </div>
            <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
                <h3 className="text-4xl font-black text-white mb-6">
                    READY TO PLAY?
                </h3>
                <p className="text-xl text-gray-400 mb-8">
                    새로운 농구 문화를 함께 만들어갈<br />
                    플레이어들을 기다리고 있습니다.
                </p>
                <button className="bg-orange-500 text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-orange-600">
                    JOIN NOW
                </button>
            </div>
        </section>
    );
};

export default CtaSection;
