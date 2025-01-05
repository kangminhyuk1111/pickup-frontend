'use client';

import React, {useMemo, useState, useEffect} from 'react';
import {MapPin, Clock, Calendar, Users, Wallet, Plus, Search, ChevronLeft, ChevronRight} from 'lucide-react';
import {AuthCheck} from "@/app/components/AuthCheck";
import MatchDetailModal from "@/app/matches/component/MatchDetailModal";
import type {Post, Level, Status} from "@/app/matches/type/post-type";
import Link from "next/link";
import axiosInstance from "@/app/api/axios-intercepter";

const ITEMS_PER_PAGE = 10;

const PickupBoard = () => {
    const [locationFilter, setLocationFilter] = useState('all');
    const [levelFilter, setLevelFilter] = useState<Level | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMatch, setSelectedMatch] = useState<Post | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const LEVEL_MAPPING = {
        '초급': 'BEGINNER',
        '중급': 'INTERMEDIATE',
        '상급': 'ADVANCED'
    } as const;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                const { data } = await axiosInstance.get('/matches');

                // 날짜와 시간을 기준으로 정렬하기 전에 level 변환
                const transformedData = data.map((post: Post) => ({
                    ...post,
                    level: LEVEL_MAPPING[post.level as keyof typeof LEVEL_MAPPING] || post.level
                }));

                const sortedData = transformedData.sort((a: Post, b: Post) => {
                    const dateA = new Date(`${a.date}T${a.time}`);
                    const dateB = new Date(`${b.date}T${b.time}`);
                    return dateA.getTime() - dateB.getTime();
                });

                setPosts(sortedData);
            } catch (err: any) {
                setError(err.message);
                console.error('Error fetching matches:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const locations = useMemo(() => {
        const uniqueLocations = [...new Set(posts.map(post => post.location))];
        return ['all', ...uniqueLocations];
    }, [posts]);

    const levels: (Level | 'all')[] = ['all', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

    const formatLevel = (level: Level) => {
        const levelMap: Record<Level, string> = {
            'BEGINNER': '초급',
            'INTERMEDIATE': '중급',
            'ADVANCED': '상급'
        };
        return levelMap[level];
    };

    const getLevelColor = (level: Level) => {
        switch (level) {
            case 'BEGINNER':
                return 'text-green-500';
            case 'INTERMEDIATE':
                return 'text-yellow-500';
            case 'ADVANCED':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    };

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':');
        return `${hours}:${minutes}`;
    };

    const formatDate = (date: string) => {
        const d = new Date(date);
        return d.toLocaleDateString('ko-KR', {month: 'long', day: 'numeric', weekday: 'short'});
    };

    const formatCost = (cost: number) => {
        return cost === 0 ? '무료' : `${cost.toLocaleString()}원`;
    };

    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesLocation = locationFilter === 'all' || post.location.includes(locationFilter);
            const matchesLevel = levelFilter === 'all' || post.level === levelFilter;
            const matchesSearch = searchQuery === '' ||
                post.courtName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.location.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesLocation && matchesLevel && matchesSearch;
        });
    }, [posts, locationFilter, levelFilter, searchQuery]);

    // 페이지네이션 계산
    const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
    const paginatedPosts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredPosts, currentPage]);

    // 필터 변경 시 첫 페이지로 이동
    useEffect(() => {
        setCurrentPage(1);
    }, [locationFilter, levelFilter, searchQuery]);

    // 페이지 이동 핸들러
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // 페이지 상단으로 스크롤
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    if (isLoading) {
        return (
            <div
                className="min-h-screen bg-gradient-to-b from-zinc-900 to-black pt-24 pb-20 flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="min-h-screen bg-gradient-to-b from-zinc-900 to-black pt-24 pb-20 flex items-center justify-center">
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

    return (
        <>
            <AuthCheck/>
            <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4">
                    {/* 헤더 섹션 */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                                농구 메이트 찾기
                            </h1>
                            <p className="text-zinc-400 mt-2 text-base md:text-lg">근처의 매칭을 찾아보세요</p>
                        </div>
                        <Link href="/matches/write" className="w-full md:w-auto">
                            <button
                                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2 w-full justify-center">
                                <Plus className="w-5 h-5"/>
                                새로운 매칭 만들기
                            </button>
                        </Link>
                    </div>

                    {/* 검색 & 필터 */}
                    <div
                        className="bg-zinc-800/30 backdrop-blur p-4 md:p-6 rounded-2xl mb-6 md:mb-8 border border-zinc-700/50">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 min-w-0">
                                <div className="relative">
                                    <Search
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5"/>
                                    <input
                                        type="text"
                                        placeholder="코트나 지역 검색..."
                                        className="w-full bg-zinc-900/50 text-white pl-12 pr-4 py-3 md:py-4 rounded-xl border border-zinc-700 focus:border-orange-500 outline-none"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                                <select
                                    value={locationFilter}
                                    onChange={(e) => setLocationFilter(e.target.value)}
                                    className="bg-zinc-900/50 text-white px-4 py-3 md:px-6 md:py-4 rounded-xl border border-zinc-700 focus:border-orange-500 outline-none w-full sm:w-40"
                                >
                                    {locations.map(location => (
                                        <option key={location} value={location}>
                                            {location === 'all' ? '전체 지역' : location}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={levelFilter}
                                    onChange={(e) => setLevelFilter(e.target.value as Level | 'all')}
                                    className="bg-zinc-900/50 text-white px-4 py-3 md:px-6 md:py-4 rounded-xl border border-zinc-700 focus:border-orange-500 outline-none w-full sm:w-40"
                                >
                                    {levels.map(level => (
                                        <option key={level} value={level}>
                                            {level === 'all' ? '전체 레벨' : formatLevel(level as Level)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 리스트 뷰 - 모바일 */}
                    <div className="block md:hidden">
                        <div className="space-y-4">
                            {paginatedPosts.map((post) => (
                                <div
                                    key={post.id}
                                    onClick={() => setSelectedMatch(post)}
                                    className="bg-zinc-800/30 backdrop-blur p-4 rounded-xl border border-zinc-700/50 hover:bg-zinc-700/30 transition-colors cursor-pointer"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-white font-medium mb-1">{post.title}</h3>
                                            <div className="flex items-center gap-2 text-zinc-400 text-sm">
                                                <MapPin className="w-4 h-4 text-orange-500"/>
                                                {post.location}
                                            </div>
                                        </div>
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(post.level)}`}>
                                            {formatLevel(post.level)}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-sm mb-3">
                                        <div className="flex items-center gap-2 text-white">
                                            <Calendar className="w-4 h-4 text-orange-500"/>
                                            {formatDate(post.date)}
                                        </div>
                                        <div className="flex items-center gap-2 text-white">
                                            <Clock className="w-4 h-4 text-orange-500"/>
                                            {formatTime(post.time)}
                                        </div>
                                        <div className="flex items-center gap-2 text-white">
                                            <Users className="w-4 h-4 text-orange-500"/>
                                            {post.currentPlayers}/{post.maxPlayers}명
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-white">{formatCost(post.cost)}</span>
                                        {post.status === 'OPEN' && post.currentPlayers < post.maxPlayers ? (
                                            <button
                                                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-medium hover:opacity-90 transition-opacity">
                                                참여하기
                                            </button>
                                        ) : (
                                            <span
                                                className="px-4 py-1.5 rounded-lg bg-zinc-700 text-zinc-400 text-sm font-medium">
                                                마감
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 리스트 뷰 - 데스크톱 */}
                    <div
                        className="hidden md:block bg-zinc-800/30 backdrop-blur rounded-2xl border border-zinc-700/50 overflow-hidden">
                        <div className="divide-y divide-zinc-700/50">
                            {/* 기존 데스크톱 헤더 및 리스트 아이템 */}
                            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-zinc-800/50 text-zinc-400 text-sm">
                                <div className="col-span-4">코트 정보</div>
                                <div className="col-span-2">날짜</div>
                                <div className="col-span-1">시간</div>
                                <div className="col-span-1">레벨</div>
                                <div className="col-span-2">인원</div>
                                <div className="col-span-2">참가비</div>
                            </div>
                        </div>
                        <div
                            className="hidden md:block bg-zinc-800/30 backdrop-blur rounded-2xl border border-zinc-700/50 overflow-hidden">
                            <div className="divide-y divide-zinc-700/50">
                                {/* 리스트 아이템 */}
                                {paginatedPosts.map((post) => (
                                    <div
                                        key={post.id}
                                        onClick={() => setSelectedMatch(post)}
                                        className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-zinc-700/30 transition-colors cursor-pointer group"
                                    >
                                        <div className="col-span-4">
                                            <div className="text-white font-medium group-hover:text-orange-500">
                                                {post.title}
                                            </div>
                                            <div className="flex items-center gap-2 text-zinc-400 text-sm mt-1">
                                                <MapPin className="w-4 h-4 text-orange-500"/>
                                                {post.location}
                                            </div>
                                        </div>
                                        <div className="col-span-2 flex items-center text-white">
                                            {formatDate(post.date)}
                                        </div>
                                        <div className="col-span-1 flex items-center text-white">
                                            {formatTime(post.time)}
                                        </div>
                                        <div className="col-span-1 flex items-center">
                    <span className={`font-medium ${getLevelColor(post.level)}`}>
                        {formatLevel(post.level)}
                    </span>
                                        </div>
                                        <div className="col-span-2 flex items-center text-white">
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4 text-orange-500"/>
                                                {post.currentPlayers}/{post.maxPlayers}명
                                            </div>
                                        </div>
                                        <div className="col-span-2 flex items-center justify-between">
                                            <span className="text-white">{formatCost(post.cost)}</span>
                                            {post.status === 'OPEN' && post.currentPlayers < post.maxPlayers && (
                                                <button
                                                    className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-medium hover:opacity-90 transition-opacity">
                                                    참여하기
                                                </button>
                                            )}
                                            {(post.status !== 'OPEN' || post.currentPlayers >= post.maxPlayers) && (
                                                <span
                                                    className="px-4 py-1.5 rounded-lg bg-zinc-700 text-zinc-400 text-sm font-medium">
                            마감
                        </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 페이지네이션 */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 md:gap-4 mt-6">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg bg-zinc-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5"/>
                            </button>

                            <div className="flex gap-1 md:gap-2">
                                {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`px-3 py-1 md:px-4 md:py-2 rounded-lg text-sm ${
                                            currentPage === page
                                                ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                                                : 'bg-zinc-800 text-white hover:bg-zinc-700'
                                        } transition-colors`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg bg-zinc-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors"
                            >
                                <ChevronRight className="w-5 h-5"/>
                            </button>
                        </div>
                    )}
                </div>

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