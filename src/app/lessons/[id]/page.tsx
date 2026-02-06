'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CURRICULUM } from '@/lib/curriculum';
import { SlideDeck } from '@/components/SlideDeck';
import { ChevronLeft, Lock, Shield } from 'lucide-react';
import Link from 'next/link';

export default function LessonPage() {
    const params = useParams();
    const router = useRouter();
    const [lesson, setLesson] = useState<any>(null);

    useEffect(() => {
        const found = CURRICULUM.find(l => l.id === params.id);
        if (!found) {
            router.push('/');
        } else {
            setLesson(found);
        }
    }, [params.id, router]);

    const handleComplete = () => {
        // Save progress to localStorage
        const completed = JSON.parse(localStorage.getItem('completed_lessons') || '[]');
        if (!completed.includes(lesson.id)) {
            completed.push(lesson.id);
            localStorage.setItem('completed_lessons', JSON.stringify(completed));
        }
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
            <header className="relative z-10 p-8 flex items-center justify-between border-b border-white/5 backdrop-blur-md">
                <Link 
                    href="/"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                >
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-mono text-xs uppercase tracking-widest">Quit Lesson</span>
                </Link>
                
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-green-500 rounded-lg shadow-lg shadow-purple-500/20">
                        <Lock className="w-5 h-5 text-black" />
                    </div>
                    <span className="font-bold tracking-tighter text-xl">PRIVACY101</span>
                </div>

                <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="font-mono text-xs text-green-400 uppercase tracking-widest">Enrolled</span>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-8 max-w-6xl mx-auto w-full">
                <SlideDeck lesson={lesson} onComplete={handleComplete} />
            </main>

            {/* Footer */}
            <footer className="relative z-10 p-8 border-t border-white/5 text-center text-[10px] font-mono text-gray-600 uppercase tracking-[0.3em]">
                Secure Learning Environment • End-to-End Encrypted
            </footer>
        </div>
    );
}
