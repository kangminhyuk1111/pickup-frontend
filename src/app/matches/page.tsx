'use client';

import React, {useMemo, useState} from 'react';
import {MapPin, Clock, Calendar, Trophy, Plus, Search, Users, Wallet} from 'lucide-react';
import {AuthCheck} from "@/app/components/AuthCheck";
import MatchDetailModal from "@/app/matches/component/MatchDetailModal";

const PickupBoard = () => {
    const [locationFilter, setLocationFilter] = useState('all');
    const [levelFilter, setLevelFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMatch, setSelectedMatch] = useState(null);

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

    const locations = ['all', ...new Set(pickupPosts.map(post => post.location))];
    const levels = ['all', '초급', '중급', '상급'];

    const getLevelColor = (level: any) => {
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

    const filteredPosts = useMemo(() => {
        return pickupPosts.filter(post => {
            const matchesLocation = locationFilter === 'all' || post.location === locationFilter;
            const matchesLevel = levelFilter === 'all' || post.level === levelFilter;
            const matchesSearch = searchQuery === '' ||
                post.courtName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.location.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesLocation && matchesLevel && matchesSearch;
        });
    }, [pickupPosts, locationFilter, levelFilter, searchQuery]);

    const ProgressBar = ({current, max}: { current: any, max: any }) => (
        <div className="w-full bg-zinc-700 rounded-full h-2 mb-1">
            <div
                className="bg-gradient-to-r from-orange-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                style={{width: `${(current / max) * 100}%`}}
            />
        </div>
    );

    return (
        <>
            <AuthCheck/>
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
                        <button
                            className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2 w-full md:w-auto justify-center">
                            <Plus className="w-5 h-5"/>
                            새로운 매칭 만들기
                        </button>
                    </div>

                    {/* 검색 & 필터 */}
                    <div className="bg-zinc-800/30 backdrop-blur p-6 rounded-2xl mb-12 border border-zinc-700/50">
                        <div className="flex flex-wrap gap-4">
                            <div className="flex-1 min-w-[200px]">
                                <div className="relative">
                                    <Search
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5"/>
                                    <input
                                        type="text"
                                        placeholder="코트나 지역 검색..."
                                        className="w-full bg-zinc-900/50 text-white pl-12 pr-4 py-4 rounded-xl border border-zinc-700 focus:border-orange-500 outline-none"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                            <select
                                value={locationFilter}
                                onChange={(e) => setLocationFilter(e.target.value)}
                                className="bg-zinc-900/50 text-white px-6 py-4 rounded-xl border border-zinc-700 focus:border-orange-500 outline-none min-w-[150px]"
                            >
                                {locations.map(location => (
                                    <option key={location} value={location}>
                                        {location === 'all' ? '전체 지역' : location}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={levelFilter}
                                onChange={(e) => setLevelFilter(e.target.value)}
                                className="bg-zinc-900/50 text-white px-6 py-4 rounded-xl border border-zinc-700 focus:border-orange-500 outline-none min-w-[150px]"
                            >
                                {levels.map(level => (
                                    <option key={level} value={level}>
                                        {level === 'all' ? '전체 레벨' : level}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* 카드 그리드 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredPosts.map((post: any) => (
                            <div key={post.id} className="group">
                                <div
                                    className="bg-zinc-800/30 backdrop-blur rounded-2xl p-6 border border-zinc-700/50 hover:border-orange-500/50 transition-all h-full flex flex-col justify-between">
                                    {/* 카드 헤더 */}
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">
                                                {post.courtName}
                                            </h3>
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(post.level)}`}>
                                            {post.level}
                                        </span>
                                        </div>

                                        <div className="flex items-center gap-2 text-zinc-400 mb-6">
                                            <MapPin className="w-4 h-4 text-orange-500"/>
                                            {post.location}
                                        </div>

                                        {/* 정보 그리드 */}
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="bg-zinc-900/50 rounded-xl p-4">
                                                <div className="flex items-center gap-2 text-zinc-400 text-sm mb-1">
                                                    <Calendar className="w-4 h-4 text-orange-500"/>
                                                    날짜
                                                </div>
                                                <div className="text-white">{post.date}</div>
                                            </div>
                                            <div className="bg-zinc-900/50 rounded-xl p-4">
                                                <div className="flex items-center gap-2 text-zinc-400 text-sm mb-1">
                                                    <Clock className="w-4 h-4 text-orange-500"/>
                                                    시간
                                                </div>
                                                <div className="text-white">{post.time}</div>
                                            </div>
                                        </div>

                                        {/* 추가 정보 */}
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-zinc-400">참가 인원</span>
                                                    <span
                                                        className="text-white">{post.currentPlayers}/{post.maxPlayers}명</span>
                                                </div>
                                                <ProgressBar current={post.currentPlayers} max={post.maxPlayers}/>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2 text-zinc-400">
                                                    <Wallet className="w-4 h-4 text-orange-500"/>
                                                    참가비
                                                </div>
                                                <span className="text-white font-medium">{post.cost}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 카드 푸터 */}
                                    <div
                                        className="flex justify-between items-center pt-4 border-t border-zinc-700/50 mt-6">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                                                <Trophy className="w-5 h-5 text-white"/>
                                            </div>
                                            <div>
                                                <div className="text-zinc-400 text-sm">주최자</div>
                                                <div className="text-white font-medium">{post.host}</div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSelectedMatch(post)}
                                            className={`px-6 py-2 rounded-xl font-medium transition-all ${
                                                post.status === 'full'
                                                    ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                                                    : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:opacity-90'
                                            }`}
                                            disabled={post.status === 'full'}
                                        >
                                            {post.status === 'full' ? '마감됨' : '참여하기'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* 매치 상세 모달 */}
                {selectedMatch && (
                    <MatchDetailModal
                        match={selectedMatch}
                        isOpen={!!selectedMatch}
                        onClose={() => setSelectedMatch(null)}
                    />
                )}
            </div>
        </>
    );
};

export default PickupBoard;