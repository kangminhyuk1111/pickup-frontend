'use client';

import React, {useMemo, useState} from 'react';
import {MapPin, Users, Clock, Calendar, Trophy, CreditCard, Plus, Search} from 'lucide-react';
import JoinGameModal from "@/app/components/JoinGameModal";
import LocationModal from "@/app/components/LocationModal";

const PickupBoard = () => {
    const [filter, setFilter] = useState('all');
    const [selectedGame, setSelectedGame] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<any>(null);
    const [locationFilter, setLocationFilter] = useState<string>('all');
    const [levelFilter, setLevelFilter] = useState<string>('all');

    const pickupPosts = [
        {
            id: 1,
            location: "강남구",
            courtName: "강남 체육관",
            date: "2024-03-24",
            time: "19:00-21:00",
            currentPlayers: 8,
            maxPlayers: 10,
            level: "중급",
            cost: "5,000원",
            host: "농구왕",
            status: 'recruiting',
            remainingSpots: 2
        },
        {
            id: 2,
            location: "서초구",
            courtName: "서초 공원 코트",
            date: "2024-03-24",
            time: "20:00-22:00",
            currentPlayers: 10,
            maxPlayers: 10,
            level: "상급",
            cost: "무료",
            host: "조던",
            status: 'full',
            remainingSpots: 0
        },
        {
            id: 3,
            location: "송파구",
            courtName: "롯데월드몰 코트",
            date: "2024-03-25",
            time: "18:00-20:00",
            currentPlayers: 6,
            maxPlayers: 10,
            level: "초급",
            cost: "무료",
            host: "커리",
            status: 'recruiting',
            remainingSpots: 4
        }
    ];

    const getLevelColor = (level: string) => {
        switch (level) {
            case '초급':
                return 'bg-green-500/10 text-green-500';
            case '중급':
                return 'bg-yellow-500/10 text-yellow-500';
            case '상급':
                return 'bg-red-500/10 text-red-500';
            default:
                return 'bg-gray-500/10 text-gray-500';
        }
    };

    const getStatusBadge = (status: string, remainingSpots: number) => {
        switch (status) {
            case 'recruiting':
                return (
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
                        <span className="text-green-500 font-semibold">
              {remainingSpots}자리 남음
            </span>
                    </div>
                );
            case 'full':
                return (
                    <div className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full font-semibold">
                        마감
                    </div>
                );
            default:
                return null;
        }
    };

    const handleJoinClick = (post: any) => {
        setSelectedGame(post);
        setIsModalOpen(true);
    };

    const handleJoinSubmit = (message: string) => {
        console.log('게임 참여:', selectedGame?.id, '메시지:', message);
        setIsModalOpen(false);
        setSelectedGame(null);
    };

    const handleLocationClick = (post: any) => {
        setSelectedLocation({
            name: post.courtName,
            address: `${post.location} ${post.courtName}`, // 실제 구현시 정확한 주소 필요
            coordinates: {
                lat: 37.123456, // 실제 구현시 정확한 좌표 필요
                lng: 127.123456
            }
        });
        setIsLocationModalOpen(true);
    };

    const filteredPosts = useMemo(() => {
        return pickupPosts.filter(post => {
            const matchesLocation = locationFilter === 'all' || post.location.includes(locationFilter);
            const matchesLevel = levelFilter === 'all' || post.level === levelFilter;
            return matchesLocation && matchesLevel;
        });
    }, [pickupPosts, locationFilter, levelFilter]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4">
                {/* 헤더 섹션 */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                            농구 메이트 찾기
                        </h1>
                        <p className="text-zinc-400 mt-2 text-lg">근처의 매칭을 찾아보세요</p>
                    </div>
                    <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2 w-full md:w-auto justify-center">
                        <Plus className="w-5 h-5" />
                        새로운 매칭 만들기
                    </button>
                </div>

                {/* 검색 & 필터 */}
                <div className="bg-zinc-800/30 backdrop-blur p-6 rounded-2xl mb-12 border border-zinc-700/50">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[200px]">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="코트나 지역 검색..."
                                    className="w-full bg-zinc-900/50 text-white pl-12 pr-4 py-4 rounded-xl border border-zinc-700 focus:border-orange-500 outline-none"
                                />
                            </div>
                        </div>
                        <select className="bg-zinc-900/50 text-white px-6 py-4 rounded-xl border border-zinc-700 focus:border-orange-500 outline-none min-w-[150px]">
                            <option value="all">전체 레벨</option>
                            <option value="beginner">초급</option>
                            <option value="intermediate">중급</option>
                            <option value="advanced">상급</option>
                        </select>
                    </div>
                </div>

                {/* 카드 그리드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pickupPosts.map((post) => (
                        <div key={post.id} className="group">
                            <div className="bg-zinc-800/30 backdrop-blur rounded-2xl p-6 border border-zinc-700/50 hover:border-orange-500/50 transition-all h-full flex flex-col justify-between">
                                {/* 카드 헤더 */}
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">
                                            {post.courtName}
                                        </h3>
                                        <span className="px-3 py-1 bg-orange-500/10 text-orange-500 rounded-full text-sm font-medium">
                      {post.remainingSpots}자리 남음
                    </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-zinc-400 mb-6">
                                        <MapPin className="w-4 h-4 text-orange-500" />
                                        {post.location}
                                    </div>

                                    {/* 정보 그리드 */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-zinc-900/50 rounded-xl p-4">
                                            <div className="flex items-center gap-2 text-zinc-400 text-sm mb-1">
                                                <Calendar className="w-4 h-4 text-orange-500" />
                                                날짜
                                            </div>
                                            <div className="text-white">{post.date}</div>
                                        </div>
                                        <div className="bg-zinc-900/50 rounded-xl p-4">
                                            <div className="flex items-center gap-2 text-zinc-400 text-sm mb-1">
                                                <Clock className="w-4 h-4 text-orange-500" />
                                                시간
                                            </div>
                                            <div className="text-white">{post.time}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* 카드 푸터 */}
                                <div className="flex justify-between items-center pt-4 border-t border-zinc-700/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                                            <Trophy className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-zinc-400 text-sm">주최자</div>
                                            <div className="text-white font-medium">{post.host}</div>
                                        </div>
                                    </div>
                                    <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium hover:opacity-90 transition-all">
                                        참여하기
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PickupBoard;