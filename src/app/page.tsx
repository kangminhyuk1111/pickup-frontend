'use client';

import HeroSection from '@/app/landing/HeroSection';
import FeaturesSection from '@/app/landing/FeaturesSection';
import CtaSection from '@/app/landing/CtaSection';
import {useEffect} from "react";
import {getFCMToken} from "@/app/firebase";
import {getMessaging, onMessage} from "firebase/messaging";
import {customErrToast} from "@/app/components/CustomErrorToast";

export default function Home() {

    useEffect(() => {
        if (!("Notification" in window)) {
            console.error("이 브라우저는 알림을 지원하지 않습니다.");
            return;
        }

        const initializeFCM = async () => {
            try {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    const token = await getFCMToken();
                    if (token) {
                        console.log('발급된 FCM 토큰:', token);

                        const messaging = getMessaging();
                        onMessage(messaging, (payload) => {
                            console.log('포그라운드 메시지 수신:', payload);

                            if (payload.notification) {
                                try {
                                    // 1. 권한 재확인
                                    if (Notification.permission !== 'granted') {
                                        console.log('알림 권한 없음:', Notification.permission);
                                        return;
                                    }

                                    try {
                                        console.log('1. Notification 생성 시도 시작');

                                        // 2. payload 데이터 확인
                                        const title = payload.notification.title || '알림';
                                        const body = payload.notification.body || '내용 없음';
                                        console.log('2. 알림 데이터:', { title, body });

                                        // 3. 최소한의 옵션으로 먼저 시도
                                        const notificationOptions = {
                                            body: body
                                        };
                                        console.log('3. 알림 옵션:', notificationOptions);

                                        // 4. Notification 생성
                                        const notification = new Notification(title, notificationOptions);
                                        console.log('4. Notification 객체 생성됨:', notification);

                                        // 5. 이벤트 리스너 추가
                                        notification.onclick = function(event) {
                                            console.log('알림 클릭됨');
                                            window.focus();
                                        };

                                        // 6. Toast 메시지
                                        customErrToast(body);

                                    } catch (error: any) {
                                        console.error('알림 생성 상세 에러:', {
                                            name: error.name,
                                            message: error.message,
                                            stack: error.stack
                                        });
                                    }
                                } catch (error) {
                                    console.error('알림 생성 중 오류:', error);
                                }
                            }
                        });
                    }
                } else {
                    console.log('알림 권한이 거부됨:', permission);
                }
            } catch (error) {
                console.error('FCM 초기화 에러:', error);
            }
        };

        // 여기서 함수를 실행
        initializeFCM();
    }, []);

    return (
        <main className="min-h-screen bg-black">
            <HeroSection/>
            <FeaturesSection/>
            <CtaSection/>
        </main>
    );
}