'use client';

import React, {useState} from 'react';
import {X} from 'lucide-react';
import axiosInstance from "@/app/api/axios-intercepter";
import {AuthCheck} from "@/app/components/AuthCheck";

interface FormData {
    title: string;
    description: string;
    courtName: string;
    location: string;
    date: string;         // datetime 대신 date와 time으로 분리
    time: string;
    level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
    maxPlayers: number;
    cost: number;
    rules: string[];
}

const LEVEL_DISPLAY = {
    BEGINNER: '초급',
    INTERMEDIATE: '중급',
    ADVANCED: '상급'
} as const;


const WriteMatchForm = () => {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        courtName: '',
        location: '',
        date: '',         // 초기값 변경
        time: '',         // 초기값 추가
        level: 'BEGINNER',
        maxPlayers: 6,
        cost: 0,
        rules: ['']
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleDateTimeChange = (date: string | null, time: string | null) => {
        setFormData(prev => ({
            ...prev,
            date: date || '',
            time: time || ''
        }));
    };

    const handleAddRule = () => {
        setFormData(prev => ({
            ...prev,
            rules: [...prev.rules, '']
        }));
    };

    const handleRemoveRule = (index: number) => {
        setFormData(prev => ({
            ...prev,
            rules: prev.rules.filter((_, i) => i !== index)
        }));
    };

    const handleRuleChange = (index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            rules: prev.rules.map((rule, i) => i === index ? value : rule)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log(formData)

        const rulesString = formData.rules
            .filter(rule => rule.trim() !== '')
            .join(',');

        try {
            const payload = {
                title: formData.title,
                description: formData.description,
                courtName: formData.courtName,
                location: formData.location,
                date: formData.date,
                time: formData.time,
                level: formData.level,      // 이미 'BEGINNER', 'INTERMEDIATE', 'ADVANCED' 중 하나
                currentPlayers: 1,
                maxPlayers: formData.maxPlayers,
                cost: Number(formData.cost),
                rules: rulesString
            };

            console.log('Sending payload:', payload); // 데이터 확인용

            const response = await axiosInstance.post('/matches', payload);

            window.location.href = '/matches';
        } catch (error) {
            console.error('Error creating match:', error);
            setErrors({submit: '매치 생성 중 오류가 발생했습니다.'});
        }
    };

    return (
        <>
            <AuthCheck/>
            <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black pt-24 pb-20">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                            새로운 매치 만들기
                        </h1>
                        <p className="text-zinc-400 mt-2">새로운 농구 매치를 만들어 함께할 플레이어를 모집해보세요!</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* 제목 */}
                        <div>
                            <label className="block text-white font-medium mb-2">제목</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                                className="w-full bg-zinc-800/50 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-orange-500 outline-none"
                                placeholder="매력적인 제목을 입력해주세요"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                            )}
                        </div>

                        {/* 코트 정보 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-white font-medium mb-2">코트 이름</label>
                                <input
                                    type="text"
                                    value={formData.courtName}
                                    onChange={(e) => setFormData(prev => ({...prev, courtName: e.target.value}))}
                                    className="w-full bg-zinc-800/50 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-orange-500 outline-none"
                                    placeholder="예) 올림픽공원 농구장"
                                />
                                {errors.courtName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.courtName}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-white font-medium mb-2">위치</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
                                    className="w-full bg-zinc-800/50 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-orange-500 outline-none"
                                    placeholder="예) 서울 송파구 방이동"
                                />
                                {errors.location && (
                                    <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                                )}
                            </div>
                        </div>

                        {/* 날짜/시간 */}
                        <div>
                            <label className="block text-white font-medium mb-2">날짜 및 시간</label>
                            <div className="relative">
                                <input
                                    type="datetime-local"
                                    value={`${formData.date}T${formData.time}`}
                                    onChange={(e) => {
                                        const dateObj = new Date(e.target.value);
                                        const date = dateObj.toISOString().split('T')[0];
                                        const time = dateObj.toTimeString().split(' ')[0];
                                        handleDateTimeChange(date, time);
                                    }}
                                    className="w-full bg-zinc-800/50 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-orange-500 outline-none"
                                />
                            </div>
                            {errors.datetime && (
                                <p className="text-red-500 text-sm mt-1">{errors.datetime}</p>
                            )}
                        </div>
                        {/* 레벨/인원/참가비 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-white font-medium mb-2">레벨</label>
                                <select
                                    value={formData.level}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        level: e.target.value as FormData['level']
                                    }))}
                                    className="w-full bg-zinc-800/50 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-orange-500 outline-none"
                                >
                                    <option value="BEGINNER">초급</option>
                                    <option value="INTERMEDIATE">중급</option>
                                    <option value="ADVANCED">상급</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-white font-medium mb-2">최대 인원</label>
                                <input
                                    type="number"
                                    value={formData.maxPlayers}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        maxPlayers: parseInt(e.target.value)
                                    }))}
                                    className="w-full bg-zinc-800/50 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-orange-500 outline-none"
                                    min="2"
                                    max="20"
                                />
                                {errors.maxPlayers && (
                                    <p className="text-red-500 text-sm mt-1">{errors.maxPlayers}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-white font-medium mb-2">참가비</label>
                                <input
                                    type="number"
                                    value={formData.cost}
                                    onChange={(e) => setFormData(prev => ({...prev, cost: parseInt(e.target.value)}))}
                                    className="w-full bg-zinc-800/50 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-orange-500 outline-none"
                                    min="0"
                                    step="1000"
                                />
                                {errors.cost && (
                                    <p className="text-red-500 text-sm mt-1">{errors.cost}</p>
                                )}
                            </div>
                        </div>

                        {/* 설명 */}
                        <div>
                            <label className="block text-white font-medium mb-2">매치 설명</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                                className="w-full bg-zinc-800/50 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-orange-500 outline-none min-h-[100px]"
                                placeholder="매치에 대한 상세한 설명을 입력해주세요"
                            />
                        </div>

                        {/* 규칙 */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-white font-medium">주의사항 (규칙)</label>
                                <button
                                    type="button"
                                    onClick={handleAddRule}
                                    className="text-orange-500 hover:text-orange-400 text-sm"
                                >
                                    + 규칙 추가
                                </button>
                            </div>
                            <div className="space-y-2">
                                {formData.rules.map((rule, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={rule}
                                            onChange={(e) => handleRuleChange(index, e.target.value)}
                                            className="flex-1 bg-zinc-800/50 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-orange-500 outline-none"
                                            placeholder="예) 정시 출발, 체육관 규칙 준수 등"
                                        />
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveRule(index)}
                                                className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
                                            >
                                                <X className="w-5 h-5 text-white"/>
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 제출 버튼 */}
                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-orange-500/20"
                            >
                                매치 생성하기
                            </button>
                        </div>

                        {/* 전체 에러 메시지 */}
                        {errors.submit && (
                            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500">
                                {errors.submit}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
};

export default WriteMatchForm;