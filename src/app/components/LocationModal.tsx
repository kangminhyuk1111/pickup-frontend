'use client';

import React from 'react';
import { X, Navigation2, ExternalLink } from 'lucide-react';

interface LocationModalProps {
    isOpen: boolean;
    onClose: () => void;
    location: {
        name: string;
        address: string;
        coordinates: {
            lat: number;
            lng: number;
        };
    };
}

const LocationModal = ({ isOpen, onClose, location }: LocationModalProps) => {
    if (!isOpen) return null;

    const handleNaverMapClick = () => {
        window.open(`https://map.naver.com/v5/search/${encodeURIComponent(location.address)}`);
    };

    const handleKakaoMapClick = () => {
        window.open(`https://map.kakao.com/link/search/${encodeURIComponent(location.address)}`);
    };

    const handleGoogleMapClick = () => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-zinc-900 rounded-xl w-full max-w-lg mx-4">
                <div className="p-6">
                    {/* 헤더 */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">{location.name}</h3>
                            <p className="text-gray-400">{location.address}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* 지도 선택 버튼 */}
                    <div className="space-y-3">
                        <button
                            onClick={handleNaverMapClick}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-2">
                                <Navigation2 className="w-5 h-5" />
                                <span className="font-semibold">네이버 지도에서 보기</span>
                            </div>
                            <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>

                        <button
                            onClick={handleKakaoMapClick}
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 px-4 rounded-lg flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-2">
                                <Navigation2 className="w-5 h-5" />
                                <span className="font-semibold">카카오 지도에서 보기</span>
                            </div>
                            <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>

                        <button
                            onClick={handleGoogleMapClick}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-2">
                                <Navigation2 className="w-5 h-5" />
                                <span className="font-semibold">구글 지도에서 보기</span>
                            </div>
                            <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </div>

                    {/* 안내 메시지 */}
                    <div className="mt-6 text-sm text-gray-400">
                        * 선택한 지도 앱에서 정확한 위치를 확인할 수 있습니다.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationModal;