'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Zap, 
  CheckCircle2, 
  ExternalLink, 
  Gift, 
  BookOpen
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CURRICULUM } from '@/lib/curriculum';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { usePrivacyProgram } from '@/hooks/usePrivacyProgram';
import toast from 'react-hot-toast';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function HomeContent() {
  const { connected, publicKey } = useWallet();
  const { program, getUserProgressPDA } = usePrivacyProgram();
  const searchParams = useSearchParams();
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [isMinting, setIsMinting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasOnChainAccount, setHasOnChainAccount] = useState<boolean | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);

  // Sync progress from On-Chain only
  useEffect(() => {
    async function fetchProgress() {
      if (!connected || !publicKey || !program) {
        setCompletedTasks([]);
        return;
      }

      try {
        const pda = getUserProgressPDA(publicKey);
        const account = await program.account.userProgress.fetch(pda);
        if (account) {
          setCompletedTasks(account.completedLessons as string[]);
          setHasOnChainAccount(true);
        }
      } catch (e) {
        setHasOnChainAccount(false);
        setCompletedTasks([]);
      }
    }
    fetchProgress();
  }, [publicKey, program, connected, searchParams]);

  const progress = (completedTasks.length / CURRICULUM.length) * 100;
  const allCompleted = completedTasks.length === CURRICULUM.length;

  const handleInitialize = async () => {
    if (!program || !publicKey) return;
    setIsInitializing(true);
    const toastId = toast.loading("Initializing your privacy profile on devnet...");
    
    try {
      const pda = getUserProgressPDA(publicKey);
      const signature = await program.methods
        .initializeUser()
        .accounts({
          userProgress: pda,
          user: publicKey,
        } as any)
        .rpc();
      
      setHasOnChainAccount(true);
      toast.success(
        (t) => (
          <span>
            Profile Initialized!{" "}
            <a 
              href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 underline ml-1"
            >
              View Tx
            </a>
          </span>
        ),
        { id: toastId, duration: 10000 }
      );
    } catch (e) {
      console.error("Initialization error:", e);
      toast.error("Failed to initialize on-chain progress. Ensure you have Devnet SOL.", { id: toastId });
    } finally {
      setIsInitializing(false);
    }
  };

  const handleClaim = async () => {
    if (!connected || !allCompleted || !publicKey) return;
    setIsMinting(true);
    
    try {
      const response = await fetch('/api/airdrop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: publicKey.toBase58(),
          tickerName: "Privacy Legend",
          tickerSymbol: "PL101",
          description: "Earned by completing PRIVACY101 curriculum"
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setShowSuccess(true);
        toast.success("Airdrop verification complete! Check your wallet for the $PRIV badge.");
      } else {
        toast.error(`Airdrop Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Claim Error:', error);
      toast.error('Failed to initiate airdrop. Please try again.');
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-black text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-900/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150 pointer-events-none" />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-8 py-2 border-b border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-green-500 rounded-lg shadow-lg shadow-purple-500/20">
            <Lock className="w-6 h-6 text-black" />
          </div>
          <span className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            PRIVACY101
          </span>
        </div>
        <WalletMultiButton className="!bg-white/5 !border !border-white/10 hover:!bg-white/10 !transition-all !rounded-full !h-10 !px-6 !text-sm" />
      </nav>

      <section className="relative z-10 max-w-5xl mx-auto px-6 py-0 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium mb-0">
            <Zap className="w-3 h-3 fill-current" />
            <span>POWERED BY ANONCOIN</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-1 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 leading-tight">
            Privacy is <span className="text-green-400 italic">Normal</span>.
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6 leading-relaxed">
            Privacy is a fundamental right. Complete the slide-based lessons below to learn the essentials of cypherpunk operations and earn <span className="text-white font-mono">$PRIV</span> rewards.
          </p>
        </motion.div>

        {/* On-Chain Status Banner */}
        {connected && hasOnChainAccount === false && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-6 rounded-2xl border border-purple-500/30 bg-purple-500/5 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-4 text-left"
          >
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-400" />
                Go On-Chain
              </h3>
              <p className="text-gray-400 text-sm">
                To start tracking your progress, you must initialize your <span className="text-white font-mono">UserProgress</span> PDA on Solana.
              </p>
            </div>
            <button
              onClick={handleInitialize}
              disabled={isInitializing}
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-full font-bold transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isInitializing ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Zap className="w-4 h-4" />
              )}
              INITIALIZE ON-CHAIN
            </button>
          </motion.div>
        )}

        {/* Progress Section */}
        <div className="mb-4">
          <div className="flex justify-between items-end mb-1">
            <div className="text-left">
              <span className="text-sm font-mono text-gray-500 block mb-1">CURRICULUM PROGRESS</span>
              <span className="text-2xl font-bold">{completedTasks.length} / {CURRICULUM.length} LESSONS</span>
            </div>
            <span className="text-sm font-mono text-green-400">{Math.round(progress)}% COMPLETE</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              className="h-full bg-gradient-to-r from-purple-500 to-green-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", bounce: 0, duration: 1 }}
            />
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid md:grid-cols-2 gap-6 text-left">
          {CURRICULUM.map((lesson, idx) => (
            <Link key={lesson.id} href={`/lessons/${lesson.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "group relative p-5 rounded-2xl border transition-all overflow-hidden cursor-pointer h-full",
                  completedTasks.includes(lesson.id) 
                    ? "bg-green-500/5 border-green-500/30" 
                    : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                )}
              >
                {/* Task Content */}
                <div className="relative z-10 flex gap-4">
                  <div className={cn(
                    "p-2 rounded-xl border transition-colors h-fit",
                    completedTasks.includes(lesson.id)
                      ? "bg-green-500/20 border-green-500/30 text-green-400"
                      : "bg-white/5 border-white/10 text-gray-400"
                  )}>
                    <lesson.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg">{lesson.title}</h3>
                      {completedTasks.includes(lesson.id) && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                    </div>
                    <p className="text-gray-400 text-sm mb-3 leading-relaxed italic line-clamp-2">
                      {lesson.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-mono text-purple-400 bg-purple-400/10 px-2 py-1 rounded">
                        <Gift className="w-3 h-3" />
                        REWARD: {lesson.reward}
                      </div>
                      {!completedTasks.includes(lesson.id) && (
                        <span className="text-xs font-bold text-white/50 group-hover:text-white transition-colors flex items-center gap-1">
                          START SLIDES
                          <BookOpen className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Hover Effect */}
                {!completedTasks.includes(lesson.id) && (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                )}
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="mt-12 py-4 px-8 rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-sm overflow-hidden relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          
          <h2 className="text-2xl font-bold mb-2">Ready to Claim?</h2>
          <p className="text-gray-400 mb-1 max-w-lg mx-auto">
            Once all lessons are complete, you can mint your limited edition <span className="text-white font-mono">PRIVACY101</span> badge and receive your <span className="text-white font-mono">$PRIV</span> token airdrop.
          </p>

          {!connected ? (
            <div className="inline-block p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
              <WalletMultiButton className="!bg-white !text-black !rounded-full !px-8 !py-3 !font-bold hover:!opacity-90 !transition-all" />
            </div>
          ) : (
            <button
              disabled={!allCompleted || isMinting}
              onClick={handleClaim}
              className={cn(
                "relative group px-10 py-3.5 rounded-full font-bold transition-all overflow-hidden",
                allCompleted 
                  ? "bg-gradient-to-r from-purple-500 to-green-500 text-white shadow-lg shadow-purple-500/20 hover:scale-105 active:scale-95" 
                  : "bg-white/5 text-gray-500 cursor-not-allowed border border-white/10"
              )}
            >
              <span className="relative z-10 flex items-center gap-3">
                {isMinting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    TRANSMITTING...
                  </>
                ) : (
                  <>
                    <Gift className="w-6 h-6" />
                    COLLECT REWARDS
                  </>
                )}
              </span>
              {allCompleted && !isMinting && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity" />
              )}
            </button>
          )}

          {!allCompleted && connected && (
            <p className="mt-4 text-xs font-mono text-gray-500 uppercase tracking-widest">
              Unlock the secrets of privacy to claim
            </p>
          )}
        </motion.div>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-6 backdrop-blur-xl bg-black/60"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#0A0A0A] border border-white/10 p-10 rounded-3xl max-w-lg w-full text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-purple-500/10" />
              <div className="relative z-10">
                <div className="w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Airdrop Initiated!</h3>
                <p className="text-gray-400 mb-8">
                  Your <span className="text-white font-mono">$PRIV</span> tokens are being minted via Anoncoin protocols. Privacy is now your default state.
                </p>
                <button 
                  onClick={() => setShowSuccess(false)}
                  className="w-full py-4 bg-white text-black rounded-full font-bold hover:opacity-90 transition-all"
                >
                  STAY PRIVATE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative z-10 py-4 px-8 border-t border-white/5 text-center text-gray-600 text-sm font-mono uppercase tracking-[0.2em]">
        &copy; 2026 PRIVACY101 • BUILT FOR SOLANA PRIVACY HACKATHON
      </footer>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
