"use client";

import type { Lesson } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { CodePlayground } from './code-playground';
import { Quiz } from './quiz';
import { Separator } from '../ui/separator';

interface LessonContentProps {
  lesson: Lesson;
  courseId: string;
}

export function LessonContent({ lesson, courseId }: LessonContentProps) {
  const { isLessonCompleted, toggleLessonCompleted } = useCourseProgress(courseId);
  const isCompleted = isLessonCompleted(lesson.id);

  return (
    <main className="flex-1 p-4 sm:p-6 md:p-8">
      <Card className="min-h-full flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">{lesson.title}</CardTitle>
          <CardDescription>
            {lesson.type === 'theory' && 'Read through the material below.'}
            {lesson.type === 'code' && 'Experiment with the code in the playground.'}
            {lesson.type === 'quiz' && 'Test your knowledge with this quiz.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 prose prose-invert max-w-none">
          {lesson.type === 'theory' && lesson.content && <div dangerouslySetInnerHTML={{ __html: lesson.content }} />}
          {lesson.type === 'code' && lesson.code && <CodePlayground initialCode={lesson.code} />}
          {lesson.type === 'quiz' && lesson.quiz && <Quiz questions={lesson.quiz} />}
        </CardContent>
        <Separator className="my-4" />
        <CardFooter>
          <Button onClick={() => toggleLessonCompleted(lesson.id)}>
            <CheckCircle className="mr-2 h-4 w-4" />
            {isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
