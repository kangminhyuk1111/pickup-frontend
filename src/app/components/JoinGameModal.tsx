'use client';

import React from 'react';
import { X, AlertCircle } from 'lucide-react';

interface JoinGameModalProps {
    isOpen: boolean;
    onClose: () => void;
    gameInfo: {
        courtName: string;
        date: string;
        time: string;
        level: string;
        cost: string;
    };
    onJoin: (message: string) => void;
}

const JoinGameModal = ({ isOpen, onClose, gameInfo, onJoin }: JoinGameModalProps) => {
    const [message, setMessage] = React.useState('');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* 배경 오버레이 */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* 모달 컨텐츠 */}
            <div className="relative bg-zinc-900 rounded-xl w-full max-w-lg mx-4">
                <div className="p-6">
                    {/* 헤더 */}
                    <div className="flex justify-between items-start mb-6">
                        <h3 className="text-xl font-bold text-white">게임 참여하기</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* 게임 정보 */}
                    <div className="bg-zinc-800/50 rounded-lg p-4 mb-6">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <div className="text-gray-400 mb-1">장소</div>
                                <div className="text-white font-semibold">{gameInfo.courtName}</div>
                            </div>
                            <div>
                                <div className="text-gray-400 mb-1">날짜</div>
                                <div className="text-white font-semibold">{gameInfo.date}</div>
                            </div>
                            <div>
                                <div className="text-gray-400 mb-1">시간</div>
                                <div className="text-white font-semibold">{gameInfo.time}</div>
                            </div>
                            <div>
                                <div className="text-gray-400 mb-1">참가비</div>
                                <div className="text-white font-semibold">{gameInfo.cost}</div>
                            </div>
                        </div>
                    </div>

                    {/* 주의사항 */}
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-6">
                        <div className="flex gap-2 text-orange-500 mb-2">
                            <AlertCircle className="w-5 h-5" />
                            <span className="font-semibold">참여 전 확인사항</span>
                        </div>
                        <ul className="text-orange-200/80 text-sm space-y-1">
                            <li>• 시간을 준수해 주세요</li>
                            <li>• 불참 시 사전에 알려주세요</li>
                            <li>• 참가비는 현장에서 납부합니다</li>
                        </ul>
                    </div>

                    {/* 메시지 입력 */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            호스트에게 메시지 남기기 (선택)
                        </label>
                        <textarea
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                            placeholder="예) 처음 참여합니다. 잘 부탁드려요!"
                            rows={3}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>

                    {/* 버튼 */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => onJoin(message)}
                            className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                        >
                            참여하기
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 bg-zinc-800 text-gray-300 py-3 rounded-lg font-semibold hover:bg-zinc-700 transition-colors"
                        >
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinGameModal;