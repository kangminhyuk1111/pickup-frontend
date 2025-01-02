// components/LoginAlert.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';

interface LoginAlertProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LoginAlert: React.FC<LoginAlertProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-zinc-800/30 backdrop-blur rounded-2xl p-8 max-w-sm w-full mx-4 border border-zinc-700/50">
                <div className="text-center">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-4">
                        로그인이 필요합니다
                    </h3>
                    <p className="text-zinc-400 mb-8">
                        농구 메이트 찾기 서비스를 이용하기 위해서는 로그인이 필요합니다.
                    </p>
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={onClose}
                        className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-orange-500/20"
                    >
                        로그인하러 가기
                    </button>
                </div>
            </div>
        </div>
    );
};

export const showLoginAlert = () => {
    return new Promise<void>((resolve) => {
        const alertContainer = document.createElement('div');
        document.body.appendChild(alertContainer);

        const handleClose = () => {
            window.location.href = '/login';
            const root = createRoot(alertContainer);
            root.unmount();
            document.body.removeChild(alertContainer);
            resolve();
        };

        const root = createRoot(alertContainer);
        root.render(<LoginAlert isOpen={true} onClose={handleClose} />);
    });
};