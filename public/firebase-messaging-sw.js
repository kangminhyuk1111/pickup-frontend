// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyAywUBb0Uel2ol0hcCMhmcS_tW5my3gnjs",
    authDomain: "pickup-basketball-matching.firebaseapp.com",
    projectId: "pickup-basketball-matching",
    storageBucket: "pickup-basketball-matching.firebasestorage.app",
    messagingSenderId: "324167877983",
    appId: "1:324167877983:web:60d5840537e1071b22a2ea",
    measurementId: "G-EJ08W35QPY"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('백그라운드 메시지 받음:', payload);  // 디버깅용 로그

    // 로컬 알림 보내기
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/logo192.png',  // public 폴더에 있는 아이콘
        badge: '/logo192.png',
        tag: 'notification-1'  // 알림 구분용 태그
    };

    self.registration.showNotification(notificationTitle, notificationOptions)
        .then(() => {
            console.log('알림 표시 성공');
        })
        .catch(error => {
            console.error('알림 표시 실패:', error);
        });

    return self.registration.showNotification(notificationTitle, notificationOptions);
});