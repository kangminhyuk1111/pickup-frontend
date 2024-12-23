"use client";
import React from 'react';
import {
    UserPlus,
    MapPin,
    Users,
    Calendar,
    MessageSquare,
    Star,
    AlertCircle,
    ChevronDown
} from 'lucide-react';

const GuideAccordion = ({ title, description, children }: {
    title: string;
    description: string;
    children: React.ReactNode;
}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="border-b border-zinc-800">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-center justify-between text-left"
            >
                <div>
                    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                    <p className="text-gray-400">{description}</p>
                </div>
                <ChevronDown
                    className={`w-6 h-6 text-gray-400 transition-transform ${
                        isOpen ? 'transform rotate-180' : ''
                    }`}
                />
            </button>
            {isOpen && (
                <div className="pb-6">
                    {children}
                </div>
            )}
        </div>
    );
};

const GuidePage = () => {
    return (
        <div className="min-h-screen bg-black">
            {/* 헤더 섹션 */}
            <section className="relative py-20 bg-zinc-900">
                <div className="max-w-6xl mx-auto px-4 pt-20">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
                            PICKUP 이용가이드
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            PICKUP과 함께 새로운 농구 파트너를 찾아보세요.<br/>
                            간단한 단계를 따라 시작할 수 있습니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* 퀵 가이드 섹션 */}
            <section className="py-20 bg-black">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center">
                        시작하기
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
                            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-6">
                                <UserPlus className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">1. 프로필 만들기</h3>
                            <p className="text-gray-400">
                                간단한 회원가입 후, 나의 포지션과 실력을 설정하세요.
                            </p>
                        </div>
                        <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
                            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-6">
                                <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">2. 코트 찾기</h3>
                            <p className="text-gray-400">
                                내 주변의 농구장을 찾고 실시간 현황을 확인하세요.
                            </p>
                        </div>
                        <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
                            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-6">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">3. 매칭 참여</h3>
                            <p className="text-gray-400">
                                원하는 시간과 장소의 매칭에 참여하거나 직접 모집해보세요.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 상세 가이드 섹션 */}
            <section className="py-20 bg-zinc-900">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center">
                        상세 가이드
                    </h2>

                    <GuideAccordion
                        title="프로필 설정하기"
                        description="나의 농구 스타일을 표현해보세요."
                    >
                        <div className="space-y-4 text-gray-400">
                            <p>• 기본 정보 입력: 키, 몸무게 등 농구에 필요한 정보를 입력하세요.</p>
                            <p>• 포지션 설정: 주 포지션과 서브 포지션을 설정할 수 있습니다.</p>
                            <p>• 실력 수준: 자신의 실력을 객관적으로 평가하여 설정해주세요.</p>
                            <p>• 플레이 스타일: 선호하는 플레이 스타일을 태그로 추가할 수 있습니다.</p>
                        </div>
                    </GuideAccordion>

                    <GuideAccordion
                        title="매칭 참여하기"
                        description="다양한 방식으로 게임에 참여해보세요."
                    >
                        <div className="space-y-4 text-gray-400">
                            <p>• 매칭 검색: 지역, 시간, 실력대 등을 기준으로 원하는 매칭을 찾아보세요.</p>
                            <p>• 매칭 생성: 직접 매칭을 만들고 팀원을 모집할 수 있습니다.</p>
                            <p>• 팀 매칭: 팀 단위로 다른 팀과의 매칭을 진행할 수 있습니다.</p>
                        </div>
                    </GuideAccordion>

                    <GuideAccordion
                        title="매너 평가 시스템"
                        description="건전한 매칭 문화를 만들어갑니다."
                    >
                        <div className="space-y-4 text-gray-400">
                            <p>• 매너 점수: 매칭 후 서로에 대한 매너 평가를 진행합니다.</p>
                            <p>• 신고 기능: 비매너 행위는 신고할 수 있습니다.</p>
                            <p>• 제재 정책: 지속적인 비매너 행위는 서비스 이용이 제한될 수 있습니다.</p>
                        </div>
                    </GuideAccordion>
                </div>
            </section>

            {/* FAQ 섹션 */}
            <section className="py-20 bg-black">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center">
                        자주 묻는 질문
                    </h2>

                    <div className="space-y-6">
                        <GuideAccordion
                            title="서비스 이용은 무료인가요?"
                            description="비용 관련 안내"
                        >
                            <p className="text-gray-400">
                                네, PICKUP의 모든 기본 기능은 무료로 이용하실 수 있습니다.
                                매칭 참여, 팀 찾기, 코트 정보 확인 등 모든 서비스를 제한 없이 이용해보세요.
                            </p>
                        </GuideAccordion>

                        <GuideAccordion
                            title="매칭 취소는 어떻게 하나요?"
                            description="매칭 취소 정책 안내"
                        >
                            <div className="space-y-4 text-gray-400">
                                <p>• 매칭 시작 24시간 전까지: 자유롭게 취소 가능</p>
                                <p>• 매칭 시작 24시간 이내: 매너 점수에 영향을 줄 수 있음</p>
                                <p>• 당일 취소: 매너 점수 차감</p>
                            </div>
                        </GuideAccordion>

                        <GuideAccordion
                            title="실력 인증은 어떻게 하나요?"
                            description="실력 인증 시스템 안내"
                        >
                            <div className="space-y-4 text-gray-400">
                                <p>• 영상 인증: 자신의 플레이 영상을 업로드</p>
                                <p>• 매칭 평가: 매칭 후 서로의 실력을 평가</p>
                                <p>• 공식 인증: PICKUP 공식 이벤트 참여를 통한 인증</p>
                            </div>
                        </GuideAccordion>
                    </div>
                </div>
            </section>

            {/* 문의하기 섹션 */}
            <section className="py-20 bg-zinc-900">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">
                        더 궁금한 점이 있으신가요?
                    </h2>
                    <p className="text-gray-400 mb-8">
                        언제든 문의해주세요. 신속하게 답변해드리겠습니다.
                    </p>
                    <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600">
                        문의하기
                    </button>
                </div>
            </section>
        </div>
    );
};

export default GuidePage;