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
            const { BN } = await import('@coral-xyz/anchor');
            const rewardAmount = parseInt(lesson.reward.split(' ')[0]) || 0;
            console.log("Claiming Reward:", rewardAmount, "$PRIVV");
            
            // 1. Check if profile exists
            let needsInitialization = false;
            try {
                await program.account.userProgress.fetch(pda);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                if (err.message?.includes("Account does not exist") || err.message?.includes("could not find account")) {
                    needsInitialization = true;
                } else {
                    // It's a real error (RPC, network, etc.)
                    throw err;
                }
            }

            // 2. Build Transaction
            let transaction = program.methods.completeLesson(
                lesson.id, 
                100, 
                new BN(rewardAmount)
            ).accounts({
                userProgress: pda,
                user: publicKey,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any);

            if (needsInitialization) {
                toast.loading("First lesson! Initializing your profile...", { id: toastId });
                // Prepend initialization
                transaction = program.methods.completeLesson(
                    lesson.id, 
                    100, 
                    new BN(rewardAmount)
                ).accounts({
                    userProgress: pda,
                    user: publicKey,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } as any).preInstructions([
                    await program.methods.initializeUser().accounts({
                        userProgress: pda,
                        user: publicKey,
                        // @ts-expect-error - anchor web3 is available
                        systemProgram: program.provider.opts.anchor?.web3.SystemProgram.programId || "11111111111111111111111111111111",
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } as any).instruction()
                ]);
            }

            const signature = await transaction.rpc();

            toast.success(
              <span>
                {needsInitialization ? "Profile Ready & " : ""}Progress Saved! {rewardAmount} $PRIVV Allocated.{" "}
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("FULL ON-CHAIN ERROR:", error);
            
            // Check for common Solana errors
            let errorMessage = "Failed to save progress. Ensure you have Devnet SOL.";
            
            if (error.message?.includes("0x0")) {
                errorMessage = "Transaction failed simulation. Check your Devnet SOL balance.";
            } else if (error.message?.includes("User rejected")) {
                errorMessage = "Transaction cancelled by user.";
            } else if (error.logs) {
                console.log("On-chain Logs:", error.logs);
                errorMessage = `On-chain error: ${error.message}`;
            }

            toast.error(errorMessage, { id: toastId });
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
