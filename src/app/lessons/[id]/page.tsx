'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CURRICULUM } from '@/lib/curriculum';
import { SlideDeck } from '@/components/SlideDeck';
import { ChevronLeft, Lock, Shield } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import { usePrivacyProgram } from '@/hooks/usePrivacyProgram';

import toast from 'react-hot-toast';
import { LessonData } from '@/lib/curriculum';

export default function LessonPage() {
    const params = useParams();
    const router = useRouter();
    const { program, getUserProgressPDA, publicKey } = usePrivacyProgram();
    const [isSaving, setIsSaving] = useState(false);

    const lesson = useMemo(() => {
        return CURRICULUM.find(l => l.id === params.id) || null;
    }, [params.id]) as LessonData | null;

    useEffect(() => {
        if (!lesson) {
            router.push('/');
        }
    }, [lesson, router]);

    const handleComplete = async () => {
        if (!program || !publicKey || !lesson) {
            toast.error("Please connect your wallet to save progress.");
            return;
        }

        setIsSaving(true);
        const toastId = toast.loading("Finalizing your progress on-chain...");
        
        try {
            const pda = getUserProgressPDA(publicKey);
            
            // Re-verify account existence
            try {
                await program.account.userProgress.fetch(pda);
                
                // Call completion
                const signature = await program.methods
                    .completeLesson(lesson.id, 100)
                    .accounts({
                        userProgress: pda,
                        user: publicKey,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } as any)
                    .rpc();

                toast.success(
                  <span>
                    Lesson Verified!{" "}
                    <a 
                      href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 underline ml-1"
                    >
                      View Tx
                    </a>
                  </span>,
                  { id: toastId, duration: 10000 }
                );
            } catch {
                toast.error("On-chain account not found. Please initialize on the home page.", { id: toastId });
                setIsSaving(false);
                return;
            }
        } catch (error) {
            console.error("On-chain error:", error);
            toast.error("Failed to save progress. Ensure you have Devnet SOL.", { id: toastId });
            setIsSaving(false);
            return;
        }

        setIsSaving(false);
        router.push('/?completed=' + lesson.id);
    };

    if (!lesson) return null;

    return (
        <div className="min-h-screen bg-black text-white relative flex flex-col">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-900/5 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150 pointer-events-none" />
            </div>

            {/* Header */}
            <header className="relative z-10 py-3 px-8 flex items-center justify-between border-b border-white/5 backdrop-blur-md">
                <Link 
                    href="/"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-mono text-[10px] uppercase tracking-widest">Back</span>
                </Link>
                
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gradient-to-br from-purple-500 to-green-500 rounded-lg shadow-lg shadow-purple-500/10">
                        <Lock className="w-4 h-4 text-black" />
                    </div>
                    <span className="font-bold tracking-tighter text-lg">PRIVACY101</span>
                </div>

                <div className="flex items-center gap-2 opacity-60">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className="font-mono text-[10px] text-green-400 uppercase tracking-widest">Protected</span>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 max-w-6xl mx-auto w-full">
                <SlideDeck lesson={lesson} onComplete={handleComplete} />
            </main>

            {/* Saving Overlay */}
            <AnimatePresence>
                {isSaving && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center flex-col gap-4"
                    >
                        <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                        <p className="font-mono text-sm tracking-widest text-purple-400">SIGNING ON-CHAIN...</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer */}
            <footer className="relative z-10 py-3 px-8 border-t border-white/5 text-center text-[9px] font-mono text-gray-600 uppercase tracking-[0.3em]">
                Secure Learning Environment • End-to-End Encrypted
            </footer>
        </div>
    );
}
