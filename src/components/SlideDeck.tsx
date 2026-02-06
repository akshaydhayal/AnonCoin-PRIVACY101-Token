'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, HelpCircle, ArrowRight, Trophy } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LessonData, Question } from '@/lib/curriculum';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Components for Infographics
const BurnerConcept = () => (
    <div className="flex flex-col items-center justify-center p-8 bg-purple-500/5 border border-purple-500/10 rounded-3xl">
        <div className="flex gap-8 items-center mb-8">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-gray-500 opacity-50">
                <div className="text-[10px] font-mono mb-2 uppercase">Main Wallet</div>
                <div className="w-16 h-1 bg-gray-500 rounded" />
            </div>
            <div className="h-[2px] w-12 border-t-2 border-dashed border-red-500/30 relative">
                <XIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
            </div>
            <div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500/30 text-purple-400 shadow-lg shadow-purple-500/20">
                <div className="text-[10px] font-mono mb-2 uppercase">Burner Wallet</div>
                <div className="w-16 h-1 bg-purple-400 rounded" />
            </div>
        </div>
        <p className="text-xs text-purple-400 font-mono text-center uppercase tracking-widest">Digital Isolation Layer</p>
    </div>
);

const XIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const InfographicPlaceholder = ({ type }: { type: string }) => {
    if (type === 'burner-concept') return <BurnerConcept />;
    
    return (
        <div className="w-full aspect-video bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-green-500 opacity-20 animate-pulse" />
            <span className="text-gray-500 font-mono text-xs uppercase tracking-[0.2em]">{type}</span>
        </div>
    );
};

export const Quiz: React.FC<{ 
    questions: Question[], 
    onComplete: () => void 
}> = ({ questions, onComplete }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const handleAnswer = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
        setIsAnswered(true);
        if (index === questions[currentQuestion].correctAnswer) {
            setScore(prev => prev + 1);
        }
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setIsFinished(true);
        }
    };

    if (isFinished) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-12 bg-white/[0.02] border border-white/10 rounded-3xl"
            >
                <div className="w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Trophy className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-3xl font-bold mb-2">Knowledge Confirmed!</h3>
                <p className="text-gray-400 mb-8">You scored {score} out of {questions.length}</p>
                <button 
                    onClick={onComplete}
                    className="px-12 py-4 bg-white text-black rounded-full font-bold hover:opacity-90 transition-all"
                >
                    CLAIM LESSON REWARD
                </button>
            </motion.div>
        );
    }

    const q = questions[currentQuestion];

    return (
        <div className="max-w-xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Question {currentQuestion + 1} / {questions.length}</span>
                <div className="flex gap-1">
                    {questions.map((_, i) => (
                        <div key={i} className={cn("h-1 w-4 rounded-full transition-colors", i <= currentQuestion ? "bg-purple-500" : "bg-white/10")} />
                    ))}
                </div>
            </div>

            <h3 className="text-2xl font-bold mb-8">{q.question}</h3>

            <div className="space-y-4 mb-10">
                {q.options.map((option, idx) => (
                    <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleAnswer(idx)}
                        className={cn(
                            "w-full p-6 rounded-2xl border text-left transition-all relative group overflow-hidden",
                            !isAnswered && "bg-white/5 border-white/10 hover:border-white/20 active:scale-[0.98]",
                            isAnswered && idx === q.correctAnswer && "bg-green-500/10 border-green-500/50 text-green-400",
                            isAnswered && selectedOption === idx && idx !== q.correctAnswer && "bg-red-500/10 border-red-500/50 text-red-400",
                            isAnswered && selectedOption !== idx && idx !== q.correctAnswer && "opacity-40"
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center text-xs font-bold">
                                {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="font-medium">{option}</span>
                        </div>
                    </button>
                ))}
            </div>

            <AnimatePresence>
                {isAnswered && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 bg-purple-500/5 border border-purple-500/10 rounded-2xl mb-10"
                    >
                        <div className="flex gap-3">
                            <AlertCircle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                            <p className="text-sm text-gray-400 leading-relaxed italic">{q.explanation}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {isAnswered && (
                <button
                    onClick={nextQuestion}
                    className="w-full py-5 bg-white text-black rounded-full font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                >
                    {currentQuestion < questions.length - 1 ? 'NEXT QUESTION' : 'FINISH QUIZ'}
                    <ChevronRight className="w-5 h-5" />
                </button>
            )}
        </div>
    );
};

export const SlideDeck: React.FC<{ 
    lesson: LessonData,
    onComplete: () => void 
}> = ({ lesson, onComplete }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);

    const progress = ((currentSlide + 1) / lesson.slides.length) * 100;

    const nextSlide = () => {
        if (currentSlide < lesson.slides.length - 1) {
            setCurrentSlide(prev => prev + 1);
        } else {
            setShowQuiz(true);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(prev => prev - 1);
        }
    };

    if (showQuiz) {
        return <Quiz questions={lesson.quiz} onComplete={onComplete} />;
    }

    const s = lesson.slides[currentSlide];

    return (
        <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-12">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">SLIDE {currentSlide + 1} OF {lesson.slides.length}</span>
                  <span className="text-xs font-mono text-purple-400 italic">LESSON: {lesson.title}</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-gradient-to-r from-purple-500 to-green-500"
                        animate={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Slide Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="min-h-[400px]"
                >
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-8 tracking-tight">{s.title}</h2>
                            <div className="text-xl text-gray-400 leading-relaxed font-light">
                                {s.content}
                            </div>
                        </div>
                        <div className="hidden md:block">
                            {s.type === 'infographic' && s.infographic ? (
                                <InfographicPlaceholder type={s.infographic} />
                            ) : (
                                <div className="p-8 bg-white/[0.02] border border-white/10 rounded-3xl backdrop-blur-sm aspect-square flex items-center justify-center">
                                    <lesson.icon className="w-24 h-24 text-purple-500/20" />
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="mt-12 flex justify-between">
                <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className={cn(
                        "p-4 rounded-full border border-white/10 bg-white/5 transition-all",
                        currentSlide === 0 ? "opacity-0 invisible" : "hover:bg-white/10"
                    )}
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={nextSlide}
                    className="px-10 py-4 bg-white text-black rounded-full font-bold flex items-center gap-2 hover:opacity-90 hover:scale-105 active:scale-95 transition-all"
                >
                    {currentSlide < lesson.slides.length - 1 ? 'NEXT SLIDE' : 'START QUIZ'}
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};
