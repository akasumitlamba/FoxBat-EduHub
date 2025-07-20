
"use client";

import { useState, useCallback, useEffect } from 'react';
import type { Lesson } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Award } from 'lucide-react';
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
  isCourseCompleted: boolean;
}

export function LessonContent({ courseId, lesson, onNext, onPrevious, hasPrevious, hasNext, isCourseCompleted }: LessonContentProps) {
  const { isLessonCompleted, setLessonCompleted, setQuizScore } = useCourseProgress(courseId);
  const [isCompleted, setIsCompleted] = useState(isLessonCompleted(lesson.id));
  
  // This effect ensures local state is updated if progress changes elsewhere
  useEffect(() => {
    setIsCompleted(isLessonCompleted(lesson.id));
  }, [lesson.id, isLessonCompleted]);

  const handleQuizSubmit = useCallback((score: number, total: number) => {
    setQuizScore(lesson.id, { score, total });
    const passed = (score / total) >= 0.7;
    if (passed) {
      setLessonCompleted(lesson.id, true);
      setIsCompleted(true); // Eagerly update local state
    } else {
      setIsCompleted(false);
    }
  }, [lesson.id, setLessonCompleted, setQuizScore]);

  // Mark theory/code lessons as complete when moving away from them
  const handleProceed = () => {
    if (lesson.type !== 'quiz' && !isCompleted) {
      setLessonCompleted(lesson.id, true);
      setIsCompleted(true);
    }
    onNext();
  };
  
  const canProceed = lesson.type !== 'quiz' || isCompleted;

  return (
    <main className="flex-1 p-4 sm:p-6 md:p-8">
      <Card className="min-h-full flex flex-col shadow-none border-0">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">{lesson.title}</CardTitle>
          <CardDescription>
            {lesson.type === 'theory' && 'Read through the material below.'}
            {lesson.type === 'code' && 'Experiment with the code in the playground.'}
            {lesson.type === 'quiz' && 'Test your knowledge with this quiz. You need to score at least 70% to proceed.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 prose dark:prose-invert max-w-none">
          {lesson.content && (lesson.type === 'theory' || lesson.type === 'code') && <div dangerouslySetInnerHTML={{ __html: lesson.content }} />}
          {lesson.type === 'code' && lesson.code && <CodePlayground initialCode={lesson.code} />}
          {lesson.type === 'quiz' && lesson.quiz && <Quiz key={lesson.id} questions={lesson.quiz} onQuizSubmit={handleQuizSubmit} />}
        </CardContent>
        <Separator className="my-6" />
        <CardFooter className="flex flex-col sm:flex-row items-center gap-4 justify-between">
          <Button variant="outline" onClick={onPrevious} disabled={!hasPrevious}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {isCourseCompleted && !hasNext ? (
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href={`/courses/${courseId}/certificate`}>
                    <Award className="mr-2 h-4 w-4" />
                    Get Your Certificate
                </Link>
            </Button>
           ) : (
            <Button onClick={handleProceed} disabled={!hasNext || !canProceed}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
           )}
        </CardFooter>
      </Card>
    </main>
  );
}
