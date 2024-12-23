'use client';

import React, {useState} from 'react';
import {
    X,
    MapPin,
    Clock,
    Users,
    Star,
    ChevronLeft,
    ChevronRight,
    ParkingCircle,
    Sun,
    Moon,
    Share2,
    BookmarkPlus,
    ThumbsUp
} from 'lucide-react';

interface CourtDetailModalProps {
    court: any;
    isOpen: boolean;
    onClose: () => void;
}

const CourtDetailModal = ({court, isOpen, onClose}: CourtDetailModalProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!isOpen) return null;

    const renderStars = (rating: number) => {
        return [...Array(5)].map((_, index) => (
            <Star
                key={index}
                className={`w-4 h-4 ${
                    index < rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-400'
                }`}
            />
        ));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-zinc-900 rounded-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
                {/* 헤더 이미지 섹션 */}
                <div className="relative h-80">
                    <img
                        src={court.images[currentImageIndex]}
                        alt={court.name}
                        className="w-full h-full object-cover"
                    />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm p-2 rounded-full text-white hover:bg-black/70"
                    >
                        <X className="w-5 h-5"/>
                    </button>

                    {/* 이미지 네비게이션 */}
                    {court.images.length > 1 && (
                        <>
                            <button
                                onClick={() => setCurrentImageIndex(prev => Math.max(0, prev - 1))}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm p-2 rounded-full text-white hover:bg-black/70"
                                disabled={currentImageIndex === 0}
                            >
                                <ChevronLeft className="w-5 h-5"/>
                            </button>
                            <button
                                onClick={() => setCurrentImageIndex(prev => Math.min(court.images.length - 1, prev + 1))}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm p-2 rounded-full text-white hover:bg-black/70"
                                disabled={currentImageIndex === court.images.length - 1}
                            >
                                <ChevronRight className="w-5 h-5"/>
                            </button>
                        </>
                    )}
                </div>

                {/* 메인 콘텐츠 */}
                <div className="p-8">
                    {/* 제목 및 기본 정보 */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">{court.name}</h2>
                            <div className="flex items-center gap-2 text-gray-400">
                                <MapPin className="w-4 h-4"/>
                                {court.address}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 bg-zinc-800 rounded-full text-gray-400 hover:text-white">
                                <Share2 className="w-5 h-5"/>
                            </button>
                            <button className="p-2 bg-zinc-800 rounded-full text-gray-400 hover:text-white">
                                <BookmarkPlus className="w-5 h-5"/>
                            </button>
                        </div>
                    </div>

                    {/* 평점 및 리뷰 */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-1">
                            {renderStars(court.rating)}
                            <span className="text-white ml-2">{court.rating}</span>
                        </div>
                        <span className="text-gray-400">(23 리뷰)</span>
                    </div>

                    {/* 주요 정보 그리드 */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-zinc-800/50 p-4 rounded-lg">
                            <div className="text-gray-400 text-sm mb-1">코트 수</div>
                            <div className="text-white font-semibold">{court.hoops}개</div>
                        </div>
                        <div className="bg-zinc-800/50 p-4 rounded-lg">
                            <div className="text-gray-400 text-sm mb-1">바닥 재질</div>
                            <div className="text-white font-semibold">{court.surface}</div>
                        </div>
                        <div className="bg-zinc-800/50 p-4 rounded-lg">
                            <div className="text-gray-400 text-sm mb-1">이용 시간</div>
                            <div className="text-white font-semibold">24시간</div>
                        </div>
                    </div>

                    {/* 특징 및 시설 */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-white mb-4">시설 정보</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {court.facilities.map((facility: any, index: number) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 text-gray-400"
                                >
                                    <ThumbsUp className="w-4 h-4"/>
                                    {facility}
                                </div>
                            ))}
                            {court.lighting && (
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Moon className="w-4 h-4"/>
                                    야간 조명
                                </div>
                            )}
                            {court.parking && (
                                <div className="flex items-center gap-2 text-gray-400">
                                    <ParkingCircle className="w-4 h-4"/>
                                    주차 가능
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 추천 시간대 */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-white mb-4">추천 시간대</h3>
                        <div className="bg-zinc-800/50 p-4 rounded-lg">
                            <div className="space-y-3">
                                {court.popularTimes.map((timeSlot: any, index: number) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className="text-gray-400 w-20">{timeSlot.day}</div>
                                        <div className="text-white">{timeSlot.times.join(', ')}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 리뷰 섹션 */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-white">리뷰</h3>
                            <button className="text-orange-500 hover:text-orange-400">
                                리뷰 작성하기
                            </button>
                        </div>
                        <div className="space-y-4">
                            {/* 리뷰 샘플 */}
                            <div className="border-b border-zinc-800 pb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 bg-zinc-800 rounded-full"/>
                                    <div>
                                        <div className="text-white font-medium">사용자</div>
                                        <div className="text-gray-400 text-sm">2024.03.24</div>
                                    </div>
                                </div>
                                <div className="flex mb-2">
                                    {renderStars(4)}
                                </div>
                                <p className="text-gray-300">
                                    코트 상태가 좋고 저녁에도 조명이 밝아서 좋습니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourtDetailModal;