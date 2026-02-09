'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Copy, 
  Database, 
  ShieldCheck,
  Globe,
  Coins,
  Zap
} from 'lucide-react';
import toast from 'react-hot-toast';

const TOKEN_SPECS = [
  { label: 'SYMBOL', value: 'PRIVV', icon: Coins, color: 'text-green-400' },
  { label: 'NAME', value: 'Privacy101 Coin', icon: Database, color: 'text-purple-400' },
  { label: 'CHAIN', value: 'Solana', icon: Globe, color: 'text-blue-400' },
  { label: 'ADDRESS', value: '63zi4...ogoe', full: '63zi4yxtSCGsEKzpCQ2mo7PzzTE26E1t1LC3xs9rdoge', icon: ShieldCheck, color: 'text-red-400' },
  { label: 'ABOUT', value: 'Learn Privacy. Earn $PRIV. Own Your Data.', icon: Zap, color: 'text-orange-400' },
];

export const TokenInfo = () => {
    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`${label} copied!`, {
            style: {
                background: '#0a0a0a',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)',
                fontSize: '12px',
                fontFamily: 'monospace'
            }
        });
    };

    return (
        <section className="relative mt-20 mb-12">
            <div className="absolute inset-x-0 -top-24 h-64 bg-gradient-to-b from-purple-500/5 to-transparent blur-3xl opacity-50 pointer-events-none" />
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative max-w-5xl mx-auto px-6"
            >
                <div className="flex items-center gap-4 mb-3">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-[10px] font-mono text-purple-500 uppercase tracking-[0.5em] font-bold">Project AnonCoin Info</span>
                        {/* <span className="text-xs text-gray-500 font-mono tracking-widest uppercase">Protocol Integrity Layer</span> */}
                    </div>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-px rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl">
                    {TOKEN_SPECS.map((spec) => (
                        <div 
                            key={spec.label}
                            className={`group relative p-3 bg-black/40 hover:bg-white/[0.04] transition-all duration-500 cursor-pointer ${
                                spec.label === 'ABOUT' ? 'lg:col-span-2' : ''
                            }`}
                            onClick={() => spec.full ? copyToClipboard(spec.full, spec.label) : null}
                        >
                            <div className="flex items-center gap-2.5 h-full">
                                <div className={`p-2 rounded-lg bg-white/[0.03] w-fit ${spec.color} border border-white/5 group-hover:scale-110 group-hover:bg-white/[0.05] transition-all duration-500 shadow-xl shadow-black/20 shrink-0`}>
                                    <spec.icon className="w-3.5 h-3.5" />
                                </div>
                                <div className="space-y-0.5 min-w-0 flex-1">
                                    <p className="text-[8px] font-mono text-gray-500 uppercase tracking-widest font-semibold">{spec.label}</p>
                                    <div className="flex items-center gap-1.5 overflow-hidden">
                                        <p className={`text-[12px] font-bold font-mono tracking-tight text-white group-hover:text-purple-400 transition-colors ${
                                            spec.label === 'ABOUT' ? 'whitespace-normal leading-tight' : 'truncate'
                                        }`}>
                                            {spec.value}
                                        </p>
                                        {spec.full && (
                                            <Copy className="w-2 h-2 text-gray-600 group-hover:text-purple-500 transition-colors opacity-50 group-hover:opacity-100 shrink-0" />
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Subtle Glow Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-${spec.color.split('-')[1]}-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                        </div>
                    ))}
                </div>
                
                <p className="text-center mt-6 text-[10px] font-mono text-gray-600 uppercase tracking-widest animate-pulse">
                    Verified Cryptographic Metadata • Anonymous Infrastructure
                </p>
            </motion.div>
        </section>
    );
};

export default TokenInfo;
