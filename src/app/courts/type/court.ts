// src/data/courts.ts
export interface Court {
    id: number;
    name: string;
    location: string;
    address: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    hoops: number;
    surface: string;
    lighting: boolean;
    parking: boolean;
    rating: number;
    images: string[];
    facilities: string[];
    bestTime: string;
}

export const courts: Court[] = [
    {
        id: 1,
        name: "잠실 한강공원 농구장",
        location: "송파구",
        address: "서울 송파구 잠실동 1-1",
        coordinates: {
            lat: 37.5185,
            lng: 127.0765
        },
        hoops: 4,
        surface: "아스팔트",
        lighting: true,
        parking: true,
        rating: 4.5,
        images: ["/img/court/jamsil.jpg"],
        facilities: ["화장실", "편의점", "벤치"],
        bestTime: "저녁",
    },
    {
        id: 2,
        name: "반포 종합운동장",
        location: "서초구",
        address: "서울 서초구 반포동 123",
        coordinates: {
            lat: 37.5038,
            lng: 127.0087
        },
        hoops: 6,
        surface: "고무",
        lighting: true,
        parking: true,
        rating: 4.8,
        images: ["/img/court/banpo.jpg"],
        facilities: ["화장실", "주차장", "음수대"],
        bestTime: "아침",
    },
    {
        id: 3,
        name: "강남 도곡공원 농구장",
        location: "강남구",
        address: "서울 강남구 도곡동 123-45",
        coordinates: {
            lat: 37.4867,
            lng: 127.0454
        },
        hoops: 2,
        surface: "아스팔트",
        lighting: true,
        parking: false,
        rating: 4.2,
        images: ["/img/court/dogok.jpg"],
        facilities: ["벤치", "음수대"],
        bestTime: "저녁",
    },
    {
        id: 4,
        name: "양재천 농구장",
        location: "서초구",
        address: "서울 서초구 양재동 236",
        coordinates: {
            lat: 37.4734,
            lng: 127.0432
        },
        hoops: 4,
        surface: "고무",
        lighting: true,
        parking: true,
        rating: 4.6,
        images: ["/img/court/yangjae.jpg"],
        facilities: ["화장실", "주차장", "벤치"],
        bestTime: "오후",
    },
    {
        id: 5,
        name: "천호공원 농구장",
        location: "강동구",
        address: "서울 강동구 천호동 456",
        coordinates: {
            lat: 37.5454,
            lng: 127.1234
        },
        hoops: 2,
        surface: "아스팔트",
        lighting: false,
        parking: true,
        rating: 4.0,
        images: ["/img/court/cheonho.jpg"],
        facilities: ["화장실", "벤치"],
        bestTime: "오전",
    },
    {
        id: 6,
        name: "올림픽공원 농구장",
        location: "송파구",
        address: "서울 송파구 방이동 88",
        coordinates: {
            lat: 37.5202,
            lng: 127.1212
        },
        hoops: 6,
        surface: "고무",
        lighting: true,
        parking: true,
        rating: 4.9,
        images: ["/img/court/olympicpark.jpg"],
        facilities: ["화장실", "편의점", "주차장", "음수대"],
        bestTime: "저녁",
    },
    {
        id: 7,
        name: "동작 달빛농구장",
        location: "동작구",
        address: "서울 동작구 상도동 789",
        coordinates: {
            lat: 37.5012,
            lng: 126.9432
        },
        hoops: 4,
        surface: "아스팔트",
        lighting: true,
        parking: false,
        rating: 4.3,
        images: ["/img/court/boramae.jpg"],
        facilities: ["화장실", "벤치", "음수대"],
        bestTime: "저녁",
    },
    {
        id: 8,
        name: "뚝섬한강공원 농구장",
        location: "광진구",
        address: "서울 광진구 자양동 410-1",
        coordinates: {
            lat: 37.5297,
            lng: 127.0668
        },
        hoops: 4,
        surface: "고무",
        lighting: true,
        parking: true,
        rating: 4.7,
        images: ["/img/court/dduksum.jpg"],
        facilities: ["화장실", "편의점", "주차장", "벤치"],
        bestTime: "저녁",
    }
];