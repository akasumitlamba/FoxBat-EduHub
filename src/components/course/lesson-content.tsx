
"use client";

import { useState, useCallback } from 'react';
import type { Lesson } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Lock, Award } from 'lucide-react';
import { Separator } from '../ui/separator';
import { CodePlayground } from './code-playground';
import { Quiz } from './quiz';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import Link from 'next/link';

interface LessonContentProps {
  courseId: string;
  lesson: Lesson;
  onNext: () => void;
  onPrevious: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  isNextUnlocked: boolean;
  isCourseCompleted: boolean;
}

export function LessonContent({ courseId, lesson, onNext, onPrevious, hasPrevious, hasNext, isNextUnlocked, isCourseCompleted }: LessonContentProps) {
  const { isLessonCompleted, setLessonCompleted, setQuizScore } = useCourseProgress(courseId);
  const isCompleted = isLessonCompleted(lesson.id);

  const [quizPassed, setQuizPassed] = useState(isCompleted);

  const handleQuizSubmit = useCallback((score: number, total: number) => {
    setQuizScore(lesson.id, { score, total });
    const passed = (score / total) >= 0.7;
    if (passed) {
      setQuizPassed(true);
      setLessonCompleted(lesson.id, true);
    } else {
      setQuizPassed(false);
    }
  }, [lesson.id, setLessonCompleted, setQuizScore]);
  
  const canProceed = lesson.type !== 'quiz' || quizPassed;

  return (
    <main className="flex-1 p-4 sm:p-6 md:p-8">
      <Card className="min-h-full flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">{lesson.title}</CardTitle>
          <CardDescription>
            {lesson.type === 'theory' && 'Read through the material below.'}
            {lesson.type === 'code' && 'Experiment with the code in the playground.'}
            {lesson.type === 'quiz' && 'Test your knowledge with this quiz. You need to score at least 70% to proceed.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 prose dark:prose-invert max-w-none">
          {lesson.type === 'theory' && lesson.content && <div dangerouslySetInnerHTML={{ __html: lesson.content }} />}
          {lesson.type === 'code' && lesson.code && <CodePlayground initialCode={lesson.code} />}
          {lesson.type === 'quiz' && lesson.quiz && <Quiz key={lesson.id} questions={lesson.quiz} onQuizSubmit={handleQuizSubmit} />}
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="flex flex-col sm:flex-row items-center gap-4 justify-between">
          <Button variant="outline" onClick={onPrevious} disabled={!hasPrevious}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {isCourseCompleted && !hasNext ? (
            <Button asChild>
                <Link href={`/courses/${courseId}/certificate`}>
                    <Award className="mr-2 h-4 w-4" />
                    Get Your Certificate
                </Link>
            </Button>
           ) : (
            <Button onClick={onNext} disabled={!hasNext || !canProceed}>
              Next
              {isNextUnlocked ? <ArrowRight className="ml-2 h-4 w-4" /> : <Lock className="ml-2 h-4 w-4" />}
            </Button>
           )}
        </CardFooter>
      </Card>
    </main>
  );
}
