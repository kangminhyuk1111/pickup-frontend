import React from 'react';
import { Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black border-t border-zinc-800 py-12 text-gray-400">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <h4 className="text-2xl font-black text-white mb-4">PICKUP</h4>
                        <p className="text-sm">
                            농구를 즐기는 새로운 방법
                        </p>
                        <div className="flex space-x-4 mt-4">
                            <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                            <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                        </div>
                    </div>
                    <div>
                        <h5 className="text-white font-bold mb-4">Service</h5>
                        <ul className="space-y-2 text-sm">
                            <li className="hover:text-white cursor-pointer">매칭 시스템</li>
                            <li className="hover:text-white cursor-pointer">코트 찾기</li>
                            <li className="hover:text-white cursor-pointer">팀 매칭</li>
                            <li className="hover:text-white cursor-pointer">이용 가이드</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-white font-bold mb-4">Support</h5>
                        <ul className="space-y-2 text-sm">
                            <li className="hover:text-white cursor-pointer">FAQ</li>
                            <li className="hover:text-white cursor-pointer">공지사항</li>
                            <li className="hover:text-white cursor-pointer">피드백</li>
                            <li className="hover:text-white cursor-pointer">문의하기</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-white font-bold mb-4">Contact</h5>
                        <p className="text-sm">
                            support@pickup.com<br />
                            1234-5678<br />
                            09:00 - 18:00
                        </p>
                    </div>
                </div>
                <div className="border-t border-zinc-800 mt-8 pt-8 text-sm text-center">
                    © 2024 PICKUP. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;