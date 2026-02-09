'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, AlertCircle, Trophy } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LessonData, Question } from '@/lib/curriculum';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import Image from 'next/image';

const InfographicRenderer = ({ type }: { type: string }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full aspect-square relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl shadow-purple-500/5 group"
        >
            <Image
                src={`/infographics/${type}.png`}
                alt={`${type} infographic`}
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                priority
            />
            {/* Subtle overlay glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </motion.div>
    );
};

const ImageRenderer = ({ src }: { src: string }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full aspect-square relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl shadow-purple-500/5 group"
        >
            <Image
                src={`/images/${src}.jpeg`}
                alt={`${src}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                priority
            />
        </motion.div>
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
                className="text-center p-8 bg-white/[0.02] border border-white/10 rounded-3xl"
            >
                <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Knowledge Confirmed!</h3>
                <p className="text-gray-400 mb-6">You scored {score} out of {questions.length}</p>
                <button 
                    onClick={onComplete}
                    className="px-10 py-3.5 bg-white text-black rounded-full font-bold hover:opacity-90 transition-all text-sm"
                >
                    CLAIM LESSON REWARD
                </button>
            </motion.div>
        );
    }

    const q = questions[currentQuestion];

    return (
        <div className="max-w-xl mx-auto py-4">
            <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Question {currentQuestion + 1} / {questions.length}</span>
                <div className="flex gap-1">
                    {questions.map((_, i) => (
                        <div key={i} className={cn("h-1 w-3 rounded-full transition-colors", i <= currentQuestion ? "bg-purple-500" : "bg-white/10")} />
                    ))}
                </div>
            </div>

            <h3 className="text-xl font-bold mb-6">{q.question}</h3>

            <div className="space-y-3 mb-3">
                {q.options.map((option, idx) => (
                    <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleAnswer(idx)}
                        className={cn(
                            "w-full p-4 rounded-2xl border text-left transition-all relative group overflow-hidden",
                            !isAnswered && "bg-white/5 border-white/10 hover:border-white/20 active:scale-[0.98]",
                            isAnswered && idx === q.correctAnswer && "bg-green-500/10 border-green-500/50 text-green-400",
                            isAnswered && selectedOption === idx && idx !== q.correctAnswer && "bg-red-500/10 border-red-500/50 text-red-400",
                            isAnswered && selectedOption !== idx && idx !== q.correctAnswer && "opacity-40"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">
                                {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="font-medium text-sm">{option}</span>
                        </div>
                    </button>
                ))}
            </div>

            <AnimatePresence>
                {isAnswered && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-2xl mb-1"
                    >
                        <div className="flex gap-3">
                            <AlertCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0" />
                            <p className="text-xs text-gray-400 leading-relaxed italic">{q.explanation}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {isAnswered && (
                <button
                    onClick={nextQuestion}
                    className="w-full py-4 bg-white text-black rounded-full font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all text-sm"
                >
                    {currentQuestion < questions.length - 1 ? 'NEXT QUESTION' : 'FINISH QUIZ'}
                    <ChevronRight className="w-4 h-4" />
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
        <div className="max-w-4xl mx-auto flex flex-col min-h-full">
            {/* Progress Bar */}
            <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">SLIDE {currentSlide + 1} / {lesson.slides.length}</span>
                  <span className="text-[10px] font-mono text-purple-400 italic">LESSON: {lesson.title}</span>
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
                    className="flex-1"
                >
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="py-4">
                            <h2 className="text-2xl font-bold mb-4 tracking-tight">{s.title}</h2>
                            <div className="text-base text-gray-400 leading-relaxed font-normal">
                                {s.content}
                            </div>
                        </div>
                        <div className="hidden md:block">
                            {s.type === 'infographic' && s.infographic ? (
                                <InfographicRenderer type={s.infographic} />
                            ) : s.type === 'image' && s.image ? (
                                <ImageRenderer src={s.image} />
                            ) : (
                                <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-sm aspect-video flex items-center justify-center">
                                    <lesson.icon className="w-16 h-16 text-purple-500/20" />
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="mt-8 flex justify-between">
                <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className={cn(
                        "p-3 rounded-full border border-white/10 bg-white/5 transition-all text-gray-400",
                        currentSlide === 0 ? "opacity-0 invisible" : "hover:bg-white/10 hover:text-white"
                    )}
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={nextSlide}
                    className="px-8 py-3 bg-white text-black rounded-full font-bold flex items-center gap-2 hover:opacity-90 hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-wider"
                >
                    {currentSlide < lesson.slides.length - 1 ? 'Next Slide' : 'Start Quiz'}
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};
