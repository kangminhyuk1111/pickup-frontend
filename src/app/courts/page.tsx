// src/app/courts/page.tsx
'use client';

import React, {useEffect, useMemo, useState} from 'react';
import {ParkingCircle, MapPin, Clock, Star, Grid, Map as MapIcon} from 'lucide-react';
import CourtDetailModal from "@/app/courts/component/CourtDetailModal";
import {Court} from "@/app/courts/type/court";
import {AuthCheck} from "@/app/components/AuthCheck";

// 더미 데이터
const DUMMY_COURTS: Court[] = [
    {
        id: 1,
        name: "올림픽공원 농구장",
        address: "서울특별시 송파구 올림픽로 424",
        location: "송파구",
        description: "올림픽공원 내에 위치한 야외 농구장입니다. 총 4개의 코트가 있으며, 바닥 상태가 매우 좋습니다.",
        images: ["/images/courts/olympic-park.jpg"],
        hoops: 8,
        rating: 4.5,
        bestTime: "저녁",
        parking: true,
        facilities: ["화장실", "조명", "음수대"],
        openingHours: "06:00 - 22:00",
        restrictions: "공원 내 취사 금지"
    },
    {
        id: 2,
        name: "한강공원 농구장",
        address: "서울특별시 영등포구 여의동로 330",
        location: "영등포구",
        description: "한강변에 위치한 농구장으로, 시원한 강바람을 맞으며 운동할 수 있습니다.",
        images: ["/images/courts/hangang-park.jpg"],
        hoops: 4,
        rating: 4.0,
        bestTime: "아침",
        parking: true,
        facilities: ["화장실", "편의점", "자판기"],
        openingHours: "24시간",
        restrictions: "우천시 이용 제한"
    },
    {
        id: 3,
        name: "강남구민체육센터 농구장",
        address: "서울특별시 강남구 삼성로 168",
        location: "강남구",
        description: "실내 농구장으로, 날씨와 관계없이 이용 가능합니다.",
        images: ["/images/courts/gangnam-center.jpg"],
        hoops: 6,
        rating: 5.0,
        bestTime: "주말",
        parking: true,
        facilities: ["샤워실", "락커룸", "매점"],
        openingHours: "06:00 - 22:00",
        restrictions: "회원제 운영"
    },
    {
        id: 4,
        name: "마포구민체육센터",
        address: "서울특별시 마포구 백범로 235",
        location: "마포구",
        description: "깨끗하고 관리가 잘 되어있는 실내 농구장입니다.",
        images: ["/images/courts/mapo-center.jpg"],
        hoops: 4,
        rating: 4.0,
        bestTime: "오후",
        parking: true,
        facilities: ["화장실", "샤워실", "음수대"],
        openingHours: "09:00 - 21:00",
        restrictions: "실내화 필수"
    },
    {
        id: 5,
        name: "노원마을 농구장",
        address: "서울특별시 노원구 동일로 1286",
        location: "노원구",
        description: "동네 주민들이 자주 이용하는 아늑한 농구장입니다.",
        images: ["/images/courts/nowon-court.jpg"],
        hoops: 2,
        rating: 3.5,
        bestTime: "저녁",
        parking: false,
        facilities: ["벤치", "조명"],
        openingHours: "24시간",
        restrictions: "없음"
    },
    {
        id: 6,
        name: "서초실내체육관",
        address: "서울특별시 서초구 반포대로 58",
        location: "서초구",
        description: "전문적인 시설을 갖춘 실내 농구장입니다.",
        images: ["/images/courts/seocho-gym.jpg"],
        hoops: 6,
        rating: 4.5,
        bestTime: "오전",
        parking: true,
        facilities: ["샤워실", "락커룸", "체력단련실"],
        openingHours: "06:00 - 22:00",
        restrictions: "회원 우선"
    }
];

const CourtsPage = () => {
    const [viewMode, setViewMode] = useState<'card' | 'map'>('card');
    const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
    const [locationFilter, setLocationFilter] = useState('전체');
    const [courts, setCourts] = useState<Court[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 6;

    useEffect(() => {
        // API 호출 대신 더미 데이터 사용
        setCourts(DUMMY_COURTS);
    }, []);

    const locations = useMemo(() => {
        return ['전체', ...new Set(courts.map(court => court.location))];
    }, [courts]);

    const filteredCourts = useMemo(() => {
        if (locationFilter === '전체') return courts;
        return courts.filter(court => court.location === locationFilter);
    }, [courts, locationFilter]);

    const pageCount = Math.ceil(filteredCourts.length / itemsPerPage);
    const currentCourts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredCourts.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredCourts, currentPage]);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const Pagination = () => {
        if (pageCount <= 1) return null;

        return (
            <div className="flex justify-center gap-2 mt-8">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg ${
                        currentPage === 1
                            ? 'bg-zinc-800 text-gray-500 cursor-not-allowed'
                            : 'bg-zinc-800 text-white hover:bg-zinc-700'
                    }`}
                >
                    이전
                </button>

                {[...Array(pageCount)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 rounded-lg ${
                            currentPage === index + 1
                                ? 'bg-orange-500 text-white'
                                : 'bg-zinc-800 text-white hover:bg-zinc-700'
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pageCount}
                    className={`px-4 py-2 rounded-lg ${
                        currentPage === pageCount
                            ? 'bg-zinc-800 text-gray-500 cursor-not-allowed'
                            : 'bg-zinc-800 text-white hover:bg-zinc-700'
                    }`}
                >
                    다음
                </button>
            </div>
        );
    };

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
        <div className="bg-zinc-900/50 backdrop-blur rounded-xl border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all">
            <div
                className="relative h-48 cursor-pointer"
                onClick={() => setSelectedCourt(court)}>
                <img
                    src={court.images[0]}
                    alt={court.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
                    {court.hoops}개 링
                </div>
            </div>

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
        <>
            {/*<AuthCheck/>*/}
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
                        <>
                            <div className="grid md:grid-cols-3 gap-4">
                                {currentCourts.map(court => (
                                    <CourtCard key={court.id} court={court}/>
                                ))}
                            </div>
                            <Pagination />
                        </>
                    ) : (
                        <div className="bg-zinc-900 rounded-xl h-[600px] flex items-center justify-center">
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
        </>
    );
};

export default CourtsPage;