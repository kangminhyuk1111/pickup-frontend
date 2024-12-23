'use client';

import React, {useMemo, useState} from 'react';
import {MapPin, Users, Clock, Calendar, Trophy, CreditCard} from 'lucide-react';
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

        <div className="min-h-screen bg-black pt-20 pb-20">
            <div className="max-w-6xl mx-auto px-4">
                {/* 헤더 섹션 */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">픽업 게임</h1>
                        <p className="text-gray-400">함께 농구할 친구를 찾아보세요</p>
                    </div>
                    <button
                        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full font-bold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2">
                        <Users className="w-5 h-5"/>
                        게임 만들기
                    </button>
                </div>

                {/* 필터 섹션 */}
                <div
                    className="bg-gradient-to-r from-zinc-900/50 to-zinc-800/30 backdrop-blur p-6 rounded-xl mb-8 border border-zinc-800">
                    <div className="flex flex-wrap gap-4">
                        <select
                            className="bg-zinc-800/50 text-white px-6 py-3 rounded-full border border-zinc-700 focus:border-orange-500 outline-none transition-all hover:border-orange-500/50"
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                        >
                            <option value="all">전체 지역</option>
                            <option value="강남">강남구</option>
                            <option value="서초">서초구</option>
                            <option value="송파">송파구</option>
                        </select>
                        <select
                            className="bg-zinc-800/50 text-white px-6 py-3 rounded-full border border-zinc-700 focus:border-orange-500 outline-none transition-all hover:border-orange-500/50"
                            value={levelFilter}
                            onChange={(e) => setLevelFilter(e.target.value)}
                        >
                            <option value="all">모든 레벨</option>
                            <option value="초급">초급</option>
                            <option value="중급">중급</option>
                            <option value="상급">상급</option>
                        </select>
                    </div>
                    <div className="mt-4 text-gray-400 text-sm">
                        {filteredPosts.length === 0 ? (
                            "해당하는 게임이 없습니다."
                        ) : (
                            `총 ${filteredPosts.length}개의 게임이 있습니다.`
                        )}
                    </div>
                </div>

                {/* 게시글 목록 */}
                <div className="space-y-6">
                    {filteredPosts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 backdrop-blur rounded-xl p-6 border border-zinc-800 hover:border-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/10"
                        >
                            {/* 상단 섹션 */}
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-3">{post.courtName}</h3>
                                    <div className="flex items-center text-gray-400 gap-4">
                                        <div
                                            className="flex items-center text-gray-400 cursor-pointer hover:text-white transition-colors"
                                            onClick={() => handleLocationClick(post)}
                                        >
                                            <MapPin className="w-4 h-4 mr-2 text-orange-500"/>
                                            {post.location}
                                        </div>
                                        <div
                                            className={`px-4 py-1 rounded-full text-sm font-semibold ${getLevelColor(post.level)}`}>
                                            {post.level}
                                        </div>
                                    </div>
                                </div>
                                {getStatusBadge(post.status, post.remainingSpots)}
                            </div>

                            {/* 정보 섹션 */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div
                                    className="bg-gradient-to-br from-zinc-800/50 to-zinc-800/30 rounded-xl p-4 hover:border-orange-500/20 border border-transparent transition-all">
                                    <div className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-orange-500"/>
                                        날짜
                                    </div>
                                    <div className="text-white font-semibold">{post.date}</div>
                                </div>
                                <div
                                    className="bg-gradient-to-br from-zinc-800/50 to-zinc-800/30 rounded-xl p-4 hover:border-orange-500/20 border border-transparent transition-all">
                                    <div className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-orange-500"/>
                                        시간
                                    </div>
                                    <div className="text-white font-semibold">{post.time}</div>
                                </div>
                                <div
                                    className="bg-gradient-to-br from-zinc-800/50 to-zinc-800/30 rounded-xl p-4 hover:border-orange-500/20 border border-transparent transition-all">
                                    <div className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                                        <Users className="w-4 h-4 text-orange-500"/>
                                        참여 인원
                                    </div>
                                    <div className="text-white font-semibold">
                                        {post.currentPlayers}/{post.maxPlayers}명
                                    </div>
                                </div>
                                <div
                                    className="bg-gradient-to-br from-zinc-800/50 to-zinc-800/30 rounded-xl p-4 hover:border-orange-500/20 border border-transparent transition-all">
                                    <div className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                                        <CreditCard className="w-4 h-4 text-orange-500"/>
                                        참가비
                                    </div>
                                    <div className="text-white font-semibold">{post.cost}</div>
                                </div>
                            </div>

                            {/* 하단 섹션 */}
                            <div className="flex justify-between items-center border-t border-zinc-800 pt-6">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20">
                                        <Trophy className="w-5 h-5 text-white"/>
                                    </div>
                                    <div>
                                        <div className="text-gray-400 text-sm">주최자</div>
                                        <div className="text-white font-semibold">{post.host}</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleJoinClick(post)}
                                    className={`px-8 py-3 rounded-full font-bold transition-all ${
                                        post.status === 'recruiting'
                                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/20'
                                            : 'bg-zinc-800 text-gray-400 cursor-not-allowed'
                                    }`}
                                    disabled={post.status !== 'recruiting'}
                                >
                                    {post.status === 'recruiting' ? '참여하기' : '마감됨'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {/* 모달 추가 */}
                {selectedGame && (
                    <JoinGameModal
                        isOpen={isModalOpen}
                        onClose={() => {
                            setIsModalOpen(false);
                            setSelectedGame(null);
                        }}
                        gameInfo={{
                            courtName: selectedGame.courtName,
                            date: selectedGame.date,
                            time: selectedGame.time,
                            level: selectedGame.level,
                            cost: selectedGame.cost,
                        }}
                        onJoin={handleJoinSubmit}
                    />
                )}
                {selectedLocation && (
                    <LocationModal
                        isOpen={isLocationModalOpen}
                        onClose={() => {
                            setIsLocationModalOpen(false);
                            setSelectedLocation(null);
                        }}
                        location={selectedLocation}
                    />
                )}
            </div>
        </div>
    );
};

export default PickupBoard;