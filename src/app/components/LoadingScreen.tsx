import React from 'react';

const LoadingScreen = ({isLoading}: any) => {
    if (!isLoading) return null;

    return (
        <div
            className={`fixed inset-0 bg-black z-50 flex items-center justify-center transition-opacity duration-300 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="text-center">
                <div className="w-16 h-16 relative animate-spin">
                    <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
                    <div
                        className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
                </div>
                <p className="text-white mt-4 font-medium text-lg animate-pulse">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingScreen;