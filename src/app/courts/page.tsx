// src/app/courts/page.tsx
'use client';

import React, {useMemo, useState} from 'react';
import {ParkingCircle, MapPin, Users, Clock, Star, Grid, Map as MapIcon} from 'lucide-react';
import CourtDetailModal from "@/app/components/CourtDetailModal";
import {Court, courts} from "@/app/courts/type/court";

const CourtsPage = () => {
    const [viewMode, setViewMode] = useState<'card' | 'map'>('card');
    const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
    const [locationFilter, setLocationFilter] = useState('전체'); // 지역 필터 상태 추가

    // 지역 목록 (courts 배열에서 고유한 지역 추출)
    const locations = ['전체', ...new Set(courts.map(court => court.location))];

    // 필터링된 코트 목록
    const filteredCourts = useMemo(() => {
        if (locationFilter === '전체') return courts;
        return courts.filter(court => court.location === locationFilter);
    }, [locationFilter]);

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

    const CourtCard = ({court}: { court: Court }) => (
        <div
            className="bg-zinc-900/50 backdrop-blur rounded-xl border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all">
            {/* 이미지 */}
            <div
                className="relative h-48 cursor-pointer"
                onClick={() => setSelectedCourt(court)}>
                <img
                    src={court.images[0]}
                    alt={court.name}
                    className="w-full h-full object-cover"
                />
                <div
                    className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
                    {court.hoops}개 링
                </div>
            </div>

            {/* 정보 */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">{court.name}</h3>
                        <div className="flex items-center text-gray-400 text-sm">
                            <MapPin className="w-4 h-4 mr-1"/>
                            {court.address}
                        </div>
                    </div>
                    <div className="flex">
                        {renderStars(court.rating)}
                    </div>
                </div>

                {/* 특징 */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-gray-400">
                        <Clock className="w-4 h-4 mr-2"/>
                        <span>추천시간: {court.bestTime}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                        <ParkingCircle className="w-4 h-4 mr-2"/>
                        <span>{court.parking ? "주차가능" : "주차불가"}</span>
                    </div>
                </div>

                {/* 태그 */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {court.facilities.map((facility, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-zinc-800 text-gray-300 rounded-full text-sm"
                        >
              {facility}
            </span>
                    ))}
                </div>
                <button
                    onClick={() => setSelectedCourt(court)}
                    className="mt-4 w-full bg-zinc-800 text-white py-2 rounded-lg hover:bg-zinc-700 transition-colors"
                >
                    상세보기
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black pt-20 pb-20">
            <div className="max-w-6xl mx-auto px-4">
                {/* 헤더 */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">추천 농구장</h1>
                        <p className="text-gray-400 mt-2">
                            서울시 야외 농구장을 찾아보세요
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setViewMode('card')}
                            className={`p-2 rounded-lg ${
                                viewMode === 'card'
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-zinc-800 text-gray-400'
                            }`}
                        >
                            <Grid className="w-5 h-5"/>
                        </button>
                        <button
                            onClick={() => setViewMode('map')}
                            className={`p-2 rounded-lg ${
                                viewMode === 'map'
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-zinc-800 text-gray-400'
                            }`}
                        >
                            <MapIcon className="w-5 h-5"/>
                        </button>
                    </div>
                </div>

                {/* 필터 */}
                <div className="bg-zinc-900/50 backdrop-blur p-6 rounded-xl mb-8 border border-zinc-800">
                    <div className="flex flex-wrap gap-4">
                        <select
                            className="bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 focus:border-orange-500 outline-none"
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                        >
                            {locations.map(location => (
                                <option key={location} value={location}>
                                    {location === '전체' ? '전체 지역' : location}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* 코트 목록 */}
                {viewMode === 'card' ? (
                    <div className="grid md:grid-cols-3 gap-4">
                        {filteredCourts.map(court => (
                            <CourtCard key={court.id} court={court}/>
                        ))}
                    </div>

                ) : (
                    <div className="bg-zinc-900 rounded-xl h-[600px] flex items-center justify-center">
                        {/* 지도 구현 필요 - Kakao Maps or Google Maps */}
                        <p className="text-gray-400">지도 뷰 구현 예정</p>
                    </div>
                )}
            </div>
            {/* 상세 정보 모달 */}
            {selectedCourt && (
                <CourtDetailModal
                    court={selectedCourt}
                    isOpen={!!selectedCourt}
                    onClose={() => setSelectedCourt(null)}
                />
            )}
        </div>
    );
};

export default CourtsPage;