'use client';

import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Zap, 
  CheckCircle2, 
  Circle, 
  ExternalLink, 
  Gift, 
  Cpu,
  Fingerprint,
  Ghost
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const TASKS = [
  {
    id: 1,
    title: "The Burner Strategy",
    description: "Initialize a burner wallet for high-risk interactions. Never compromise your main stash.",
    icon: <Ghost className="w-6 h-6" />,
    link: "https://solana.com/docs/intro/wallets",
    reward: "10 PRIV",
  },
  {
    id: 2,
    title: "VPN Shielding",
    description: "Learn why IP masking is essential for blockchain privacy. Set up a privacy-focused VPN.",
    icon: <Shield className="w-6 h-6" />,
    link: "https://www.privacytools.io/privacy-vpn",
    reward: "20 PRIV",
  },
  {
    id: 3,
    title: "RPC Privacy",
    description: "Use private RPC endpoints to prevent node providers from tracking your transaction history.",
    icon: <Cpu className="w-6 h-6" />,
    link: "https://docs.solana.com/cluster/rpc-endpoints",
    reward: "30 PRIV",
  },
  {
    id: 4,
    title: "Metadata Scrubbing",
    description: "Remove revealing metadata from your on-chain identity and social profiles.",
    icon: <Fingerprint className="w-6 h-6" />,
    reward: "40 PRIV",
  }
];

export default function Home() {
  const { connected, publicKey } = useWallet();
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [isMinting, setIsMinting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [verifying, setVerifying] = useState<number | null>(null);

  const toggleTask = (id: number) => {
    if (completedTasks.includes(id)) {
      setCompletedTasks(completedTasks.filter(tid => tid !== id));
    } else {
      setVerifying(id);
      setTimeout(() => {
        setCompletedTasks([...completedTasks, id]);
        setVerifying(null);
      }, 1500);
    }
  };

  const progress = (completedTasks.length / TASKS.length) * 100;
  const allCompleted = completedTasks.length === TASKS.length;

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
      } else {
        alert(`Airdrop Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Claim Error:', error);
      alert('Failed to initiate airdrop. Please try again.');
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-900/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150" />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/5 backdrop-blur-md">
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

      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium mb-6">
            <Zap className="w-3 h-3 fill-current" />
            <span>POWERED BY ANONCOIN</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 leading-tight">
            Privacy is <span className="text-green-400 italic">Normal</span>.
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Privacy is a fundamental right. Complete the tasks below to learn the essentials of cypherpunk operations and earn <span className="text-white font-mono">$PRIV</span> rewards.
          </p>
        </motion.div>

        {/* Progress Section */}
        <div className="mb-20">
          <div className="flex justify-between items-end mb-4">
            <div className="text-left">
              <span className="text-sm font-mono text-gray-500 block mb-1">CURRICULUM PROGRESS</span>
              <span className="text-2xl font-bold">{completedTasks.length} / {TASKS.length} LESSONS</span>
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
          {TASKS.map((task, idx) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "group relative p-6 rounded-2xl border transition-all overflow-hidden",
                completedTasks.includes(task.id) 
                  ? "bg-green-500/5 border-green-500/30" 
                  : "bg-white/[0.02] border-white/10"
              )}
            >
              {/* Task Content */}
              <div className="relative z-10 flex gap-5">
                <div className={cn(
                  "p-3 rounded-xl border transition-colors h-fit",
                  completedTasks.includes(task.id)
                    ? "bg-green-500/20 border-green-500/30 text-green-400"
                    : "bg-white/5 border-white/10 text-gray-400"
                )}>
                  {task.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-xl">{task.title}</h3>
                    {completedTasks.includes(task.id) && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                  </div>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed italic">
                    {task.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono text-purple-400 bg-purple-400/10 px-2 py-1 rounded">
                      <Gift className="w-3 h-3" />
                      REWARD: {task.reward}
                    </div>
                    {completedTasks.includes(task.id) ? (
                      <button 
                        onClick={() => toggleTask(task.id)}
                        className="text-xs text-gray-500 hover:text-white transition-colors underline"
                      >
                        Reset
                      </button>
                    ) : (
                      <button 
                         disabled={verifying === task.id}
                         onClick={() => toggleTask(task.id)}
                         className={cn(
                           "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all",
                           verifying === task.id 
                             ? "bg-white/5 text-white/50 cursor-wait"
                             : "bg-white text-black hover:bg-white/90"
                         )}
                      >
                        {verifying === task.id ? (
                          <>
                            <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            VERIFYING...
                          </>
                        ) : (
                          <>
                            <ExternalLink className="w-3 h-3" />
                            VERIFY TASK
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Hover Effect */}
              {!completedTasks.includes(task.id) && (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="mt-20 py-20 px-8 rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-sm overflow-hidden relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          
          <h2 className="text-4xl font-bold mb-4">Ready to Claim?</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
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
                "relative group px-12 py-4 rounded-full font-bold text-lg transition-all overflow-hidden",
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
            className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-xl bg-black/60"
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

      <footer className="relative z-10 py-10 px-8 border-t border-white/5 text-center text-gray-600 text-sm font-mono uppercase tracking-[0.2em]">
        &copy; 2026 PRIVACY101 • BUILT FOR SOLANA PRIVACY HACKATHON
      </footer>
    </main>
  );
}
