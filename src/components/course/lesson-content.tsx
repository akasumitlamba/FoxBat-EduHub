"use client";

import type { Lesson } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle, RefreshCw } from 'lucide-react';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { CodePlayground } from './code-playground';
import { Quiz } from './quiz';
import { Separator } from '../ui/separator';
import { getCourseById } from '@/lib/courses';
import { useState } from 'react';

interface LessonContentProps {
  lesson: Lesson;
  courseId: string;
  onNext: () => void;
  onPrevious: () => void;
  isCompleted: boolean;
  isLastLesson: boolean;
}

export function LessonContent({ lesson, courseId, onNext, onPrevious, isCompleted, isLastLesson }: LessonContentProps) {
  const course = getCourseById(courseId);
  const { isLessonCompletable, setLessonCompleted } = useCourseProgress(course!);
  const [quizPassed, setQuizPassed] = useState<boolean | null>(null);

  const handleQuizSubmit = (score: number, total: number) => {
    const passed = (score / total) * 100 >= 70;
    setQuizPassed(passed);
    if(passed) {
      setLessonCompleted(lesson.id, true);
    }
  };

  const isCompletable = isLessonCompletable(lesson.id, quizPassed);

  return (
    <main className="flex-1 p-4 sm:p-6 md:p-8">
      <Card className="min-h-full flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">{lesson.title}</CardTitle>
          <CardDescription>
            {lesson.type === 'theory' && 'Read through the material below.'}
            {lesson.type === 'code' && 'Experiment with the code in the playground.'}
            {lesson.type === 'quiz' && 'Test your knowledge with this quiz. You need to score at least 70% to pass.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 prose dark:prose-invert max-w-none">
          {lesson.type === 'theory' && lesson.content && <div dangerouslySetInnerHTML={{ __html: lesson.content }} />}
          {lesson.type === 'code' && lesson.code && <CodePlayground initialCode={lesson.code} />}
          {lesson.type === 'quiz' && lesson.quiz && <Quiz questions={lesson.quiz} onQuizSubmit={handleQuizSubmit} lessonId={lesson.id} />}
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onPrevious}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {isLastLesson && isCompleted ? (
             <Button onClick={onNext} variant="default" className="bg-green-600 hover:bg-green-700">
               <CheckCircle className="mr-2 h-4 w-4" />
               Finish Course
             </Button>
          ) : (
            <Button onClick={onNext} disabled={!isCompletable}>
              {isCompleted ? 'Next Lesson' : 'Complete and Continue'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}

        </CardFooter>
      </Card>
    </main>
  );
}
