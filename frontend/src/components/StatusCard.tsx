import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Coffee, Zap } from 'lucide-react';

const StatusCard: React.FC = () => {
    const [time, setTime] = useState('');
    const [coffeeCount, setCoffeeCount] = useState(1204);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            };
            setTime(new Intl.DateTimeFormat('en-IN', options).format(now));
        };

        const timer = setInterval(updateTime, 1000);
        updateTime();

        // Fun coffee incrementer
        const coffeeTimer = setInterval(() => {
            if (Math.random() > 0.98) {
                setCoffeeCount(prev => prev + 1);
            }
        }, 10000);

        return () => {
            clearInterval(timer);
            clearInterval(coffeeTimer);
        };
    }, []);

    return (
        <div className="relative group max-w-xs w-full">
            {/* Background Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

            <div className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl overflow-hidden gelly-card">
                {/* Floating particles background */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500 rounded-full blur-[40px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500 rounded-full blur-[40px] animate-pulse"></div>
                </div>

                <div className="relative z-10 flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">Live Status</span>
                        </div>
                        <span className="text-[10px] text-gray-500 font-mono">{time}</span>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/5 rounded-lg border border-white/5 group-hover:scale-110 transition-transform duration-300">
                                <Clock size={16} className="text-cyan-400" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-gray-500 uppercase">Local Time (IST)</span>
                                <span className="text-sm font-bold text-white tracking-tight">{time.split(' ')[0]} <span className="text-[10px] opacity-70">{time.split(' ')[1]}</span></span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/5 rounded-lg border border-white/5 group-hover:scale-110 transition-transform duration-300">
                                <MapPin size={16} className="text-pink-500" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-gray-500 uppercase">Location</span>
                                <span className="text-sm font-bold text-white tracking-tight">Andhra Pradesh, India 🇮🇳</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/5 rounded-lg border border-white/5 group-hover:scale-110 transition-transform duration-300">
                                <Coffee size={16} className="text-yellow-500" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-gray-500 uppercase">Coffee Fuel</span>
                                <span className="text-sm font-bold text-white tracking-tight">{coffeeCount.toLocaleString()} Cups</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Status */}
                    <div className="mt-2 pt-3 border-t border-white/5">
                        <div className="flex items-center gap-2">
                            <Zap size={14} className="text-purple-400" />
                            <span className="text-[11px] font-medium text-gray-300 italic">Available for new opportunities</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusCard;
