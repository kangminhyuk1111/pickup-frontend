import {initializeApp} from 'firebase/app';
import {getMessaging, getToken} from "firebase/messaging";

// Firebase 설정
const firebaseConfig = {
    apiKey: "AIzaSyAywUBb0Uel2ol0hcCMhmcS_tW5my3gnjs",
    authDomain: "pickup-basketball-matching.firebaseapp.com",
    projectId: "pickup-basketball-matching",
    storageBucket: "pickup-basketball-matching.firebasestorage.app",
    messagingSenderId: "324167877983",
    appId: "1:324167877983:web:60d5840537e1071b22a2ea",
    measurementId: "G-EJ08W35QPY"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// FCM 토큰 가져오기 함수
const getFCMToken = async () => {
    try {
        const messaging = getMessaging(app);
        const token = await getToken(messaging, {
            vapidKey: "BBNlZzZLJdW1laBTYGIKw55CTCLj5E6XAvcHySS4-6_saco5z9MjFgELyPfvh9451t5bKyzIpNSKepx80GPEPZk"
        });

        if (token) {
            console.log('FCM 토큰:', token);
            return token;
        }

        return null;
    } catch (error) {
        console.error('FCM 토큰 발급 에러:', error);
        return null;
    }
};

export {getFCMToken};