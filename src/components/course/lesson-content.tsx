"use client";

import type { Lesson } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check, RefreshCw } from 'lucide-react';
import { Separator } from '../ui/separator';
import { CodePlayground } from './code-playground';
import { Quiz } from './quiz';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface LessonContentProps {
  lesson: Lesson;
  onNext: () => void;
  onPrevious: () => void;
  onToggleComplete: (lessonId: string, completed: boolean) => void;
  isCompleted: boolean;
  hasPrevious: boolean;
  hasNext: boolean;
}

export function LessonContent({ lesson, onNext, onPrevious, onToggleComplete, isCompleted, hasPrevious, hasNext }: LessonContentProps) {
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
        <CardContent className="flex-1 prose dark:prose-invert max-w-none">
          {lesson.type === 'theory' && lesson.content && <div dangerouslySetInnerHTML={{ __html: lesson.content }} />}
          {lesson.type === 'code' && lesson.code && <CodePlayground initialCode={lesson.code} />}
          {lesson.type === 'quiz' && lesson.quiz && <Quiz key={lesson.id} questions={lesson.quiz} />}
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="flex flex-col sm:flex-row items-center gap-4 justify-between">
          <Button variant="outline" onClick={onPrevious} disabled={!hasPrevious}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center space-x-2">
            <Switch 
              id={`complete-${lesson.id}`} 
              checked={isCompleted}
              onCheckedChange={(checked) => onToggleComplete(lesson.id, checked)}
            />
            <Label htmlFor={`complete-${lesson.id}`}>{isCompleted ? 'Completed' : 'Mark as Complete'}</Label>
          </div>

          <Button onClick={onNext} disabled={!hasNext}>
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
