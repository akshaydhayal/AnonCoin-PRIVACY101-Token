'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LessonContent {
  id: number;
  title: string;
  description: string;
  reward: string;
  fullContent: React.ReactNode;
  externalLink?: string;
  steps: string[];
}

interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: LessonContent | null;
  isCompleted: boolean;
  onVerify: (id: number) => void;
  verifying: boolean;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  isOpen,
  onClose,
  lesson,
  isCompleted,
  onVerify,
  verifying,
}) => {
  if (!lesson) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="relative h-32 flex items-center px-8 bg-gradient-to-br from-purple-500/20 to-green-500/10 border-b border-white/5">
              <div className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                 <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10">
                    <X className="w-5 h-5" />
                 </button>
              </div>
              <div>
                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-2 block">Lesson Component</span>
                <h2 className="text-3xl font-bold">{lesson.title}</h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-6 text-gray-300">
                <div className="prose prose-invert max-w-none">
                  {lesson.fullContent}
                </div>

                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                  <h4 className="flex items-center gap-2 font-bold mb-4 text-white">
                    <ShieldCheck className="w-5 h-5 text-green-400" />
                    Practical Steps
                  </h4>
                  <ul className="space-y-3">
                    {lesson.steps.map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed">
                        <span className="text-purple-400 font-mono font-bold">{i + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                {lesson.externalLink && (
                  <a 
                    href={lesson.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-sm font-medium"
                  >
                    View Official Documentation
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 bg-[#0D0D0D] border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-mono uppercase tracking-tighter">Lesson Reward</div>
                  <div className="font-bold text-green-400">{lesson.reward}</div>
                </div>
              </div>

              {isCompleted ? (
                <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                  COMPLETED
                </div>
              ) : (
                <button
                  disabled={verifying}
                  onClick={() => onVerify(lesson.id)}
                  className={cn(
                    "relative group px-10 py-3 rounded-full font-bold transition-all overflow-hidden",
                    "bg-white text-black hover:scale-105 active:scale-95 disabled:scale-100",
                    verifying && "cursor-wait opacity-80"
                  )}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {verifying ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        VERIFYING...
                      </>
                    ) : (
                      "COMPLETE LESSON"
                    )}
                  </span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
