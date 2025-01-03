'use client';

import React, {useState} from 'react';
import {
    MapPin,
    Clock,
    Calendar,
    Trophy,
    Users,
    Wallet,
    MessageCircle,
    Share2,
    AlertCircle,
    X
} from 'lucide-react';
import type {Post} from "@/app/matches/type/post-type";

interface MatchDetailModalProps {
    match: Post;
    isOpen: boolean;
    onClose: () => void;
}

const MatchDetailModal = ({match, isOpen, onClose}: MatchDetailModalProps) => {
    const [showJoinModal, setShowJoinModal] = useState(false);

    if (!isOpen) return null;

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'BEGINNER':
                return 'bg-green-500/10 text-green-500';
            case 'INTERMEDIATE':
                return 'bg-yellow-500/10 text-yellow-500';
            case 'ADVANCED':
                return 'bg-red-500/10 text-red-500';
            default:
                return 'bg-gray-500/10 text-gray-500';
        }
    };

    const formatLevel = (level: string) => {
        const levelMap: { [key: string]: string } = {
            'BEGINNER': '초급',
            'INTERMEDIATE': '중급',
            'ADVANCED': '상급'
        };
        return levelMap[level] || level;
    };

    const formatDate = (date: string) => {
        const d = new Date(date);
        return d.toLocaleDateString('ko-KR', {month: 'long', day: 'numeric', weekday: 'short'});
    };

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':');
        return `${hours}:${minutes}`;
    };

    const formatCost = (cost: number) => {
        return cost === 0 ? '무료' : `${cost.toLocaleString()}원`;
    };

    const ProgressBar = ({current, max}: { current: number, max: number }) => (
        <div className="w-full bg-zinc-700 rounded-full h-2 mb-1">
            <div
                className="bg-gradient-to-r from-orange-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                style={{width: `${(current / max) * 100}%`}}
            />
        </div>
    );

    const JoinModal = () => (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
            <div className="bg-zinc-900 rounded-xl max-w-lg w-full p-6">
                <h3 className="text-xl font-bold text-white mb-4">매치 참가하기</h3>
                <textarea
                    placeholder="주최자에게 메시지를 남겨주세요..."
                    className="w-full bg-zinc-800 text-white rounded-xl p-4 min-h-32 border border-zinc-700 focus:border-orange-500 outline-none"
                />
                <div className="flex gap-3 mt-4">
                    <button
                        onClick={() => setShowJoinModal(false)}
                        className="flex-1 px-6 py-3 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 transition-all"
                    >
                        취소
                    </button>
                    <button
                        className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:opacity-90 transition-all"
                    >
                        참가 신청
                    </button>
                </div>
            </div>
        </div>
    );

    // rules를 배열로 변환
    const rulesList = typeof match.rules === 'string' ? match.rules.split(',') : [];

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="max-w-4xl w-full mx-4">
                <div className="bg-zinc-800/30 backdrop-blur rounded-2xl border border-zinc-700/50 relative">
                    {/* 닫기 버튼 */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-all"
                    >
                        <X className="w-6 h-6 text-white"/>
                    </button>

                    {/* 메인 카드 */}
                    <div className="p-6">
                        {/* 제목과 코트 정보 */}
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">{match.title}</h2>
                                <div className="text-lg text-white mb-2">{match.courtName}</div>
                                <div className="flex items-center gap-2 text-zinc-400">
                                    <MapPin className="w-4 h-4 text-orange-500"/>
                                    {match.location}
                                </div>
                            </div>
                            <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${getLevelColor(match.level)}`}>
                                {formatLevel(match.level)}
                            </span>
                        </div>

                        {/* 날짜/시간 그리드 */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-zinc-900/50 rounded-xl p-4">
                                <div className="flex items-center gap-2 text-zinc-400 text-sm mb-1">
                                    <Calendar className="w-4 h-4 text-orange-500"/>
                                    날짜
                                </div>
                                <div className="text-white text-lg">{formatDate(match.date)}</div>
                            </div>
                            <div className="bg-zinc-900/50 rounded-xl p-4">
                                <div className="flex items-center gap-2 text-zinc-400 text-sm mb-1">
                                    <Clock className="w-4 h-4 text-orange-500"/>
                                    시간
                                </div>
                                <div className="text-white text-lg">{formatTime(match.time)}</div>
                            </div>
                        </div>

                        {/* 참가자 현황 */}
                        <div className="bg-zinc-900/50 rounded-xl p-4 mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2 text-zinc-400">
                                    <Users className="w-4 h-4 text-orange-500"/>
                                    참가 현황
                                </div>
                                <span className="text-white">
                                    {match.currentPlayers}/{match.maxPlayers}명
                                </span>
                            </div>
                            <ProgressBar current={match.currentPlayers} max={match.maxPlayers}/>
                        </div>

                        {/* 비용 */}
                        <div className="flex items-center justify-between bg-zinc-900/50 rounded-xl p-4 mb-6">
                            <div className="flex items-center gap-2 text-zinc-400">
                                <Wallet className="w-4 h-4 text-orange-500"/>
                                참가비
                            </div>
                            <span className="text-white text-lg font-medium">{formatCost(match.cost)}</span>
                        </div>

                        {/* 설명 */}
                        <div className="bg-zinc-900/50 rounded-xl p-4 mb-6">
                            <h3 className="font-medium text-white mb-2">매치 설명</h3>
                            <p className="text-zinc-400">{match.description || "매치 설명이 없습니다."}</p>
                        </div>

                        {/* 주의사항 */}
                        {rulesList.length > 0 && (
                            <div className="bg-zinc-900/50 rounded-xl p-4">
                                <h3 className="font-medium text-white mb-2 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-orange-500"/>
                                    주의사항
                                </h3>
                                <ul className="space-y-2">
                                    {rulesList.map((rule, index) => (
                                        <li key={index} className="text-zinc-400 flex items-center gap-2">
                                            <span className="w-1 h-1 bg-orange-500 rounded-full"/>
                                            {rule.trim()}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* 하단 액션 바 */}
                    <div className="border-t border-zinc-700/50 p-6 flex items-center justify-between bg-zinc-900/30">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                                    <Trophy className="w-6 h-6 text-white"/>
                                </div>
                                <div>
                                    <div className="text-zinc-400 text-sm">주최자</div>
                                    <div className="text-white font-medium">Host #{match.hostId}</div>
                                </div>
                            </div>
                            <button className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-all">
                                <MessageCircle className="w-5 h-5 text-white"/>
                            </button>
                        </div>
                        <div className="flex gap-3">
                            <button className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-all">
                                <Share2 className="w-5 h-5 text-white"/>
                            </button>
                            <button
                                onClick={() => setShowJoinModal(true)}
                                className={`px-6 py-2 rounded-xl font-medium transition-all ${
                                    match.status === 'CLOSED' || match.currentPlayers >= match.maxPlayers
                                        ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:opacity-90'
                                }`}
                                disabled={match.status === 'CLOSED' || match.currentPlayers >= match.maxPlayers}
                            >
                                {match.status === 'CLOSED' || match.currentPlayers >= match.maxPlayers ? '마감됨' : '참여하기'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 참가 모달 */}
            {showJoinModal && <JoinModal/>}
        </div>
    );
};

export default MatchDetailModal;