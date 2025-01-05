'use client';

import React from 'react';
import { Calendar } from 'lucide-react';

interface DateTimePickerFieldProps {
    value: string;  // ISO 문자열 형식으로 변경
    onChange: (date: string | null, time: string | null) => void;
    error?: string;
}

export const DateTimePickerField: React.FC<DateTimePickerFieldProps> = ({ value, onChange, error }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            const dateObj = new Date(e.target.value);
            const date = dateObj.toISOString().split('T')[0];
            const time = dateObj.toTimeString().split(' ')[0];
            onChange(date, time);
        } else {
            onChange(null, null);
        }
    };

    return (
        <div>
            <label className="block text-white font-medium mb-2">날짜 및 시간</label>
            <div className="relative">
                <input
                    type="datetime-local"
                    value={value}
                    onChange={handleChange}
                    className="w-full bg-zinc-900/50 text-white rounded-xl border border-zinc-700 px-4 py-2 focus:outline-none focus:border-orange-500 hover:border-orange-500"
                    readOnly
                />
                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-white" size={20} />
            </div>
            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </div>
    );
};

export default DateTimePickerField;