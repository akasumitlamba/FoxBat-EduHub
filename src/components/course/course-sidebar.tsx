
"use client";

import type { Course, Lesson, Module } from '@/lib/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle, Circle, Lock, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useCourseProgress } from '@/hooks/useCourseProgress';

interface CourseSidebarProps {
  course: Course;
  activeLesson: Lesson;
  setActiveLesson: (lesson: Lesson) => void;
  isCourseCompleted: boolean;
}

export function CourseSidebar({ course, activeLesson, setActiveLesson, isCourseCompleted: courseCompleted }: CourseSidebarProps) {
  const { isLessonCompleted, isLessonUnlocked, progress } = useCourseProgress(course.id);
  const progressPercentage = progress.percentage;
  
  return (
    <div className="flex h-full flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold font-headline">{course.title}</h2>
        <Progress value={progressPercentage} className="mt-2 h-2" />
        <p className="text-xs text-muted-foreground mt-1">{Math.round(progressPercentage)}% complete</p>
      </div>
      <ScrollArea className="flex-1">
        <Accordion type="multiple" defaultValue={course.modules.map(m => m.id)} className="w-full px-4">
          {course.modules.map((module: Module) => (
              <AccordionItem value={module.id} key={module.id}>
                <AccordionTrigger className="font-semibold text-left">
                    {module.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1">
                    {module.lessons.map((lesson: Lesson) => {
                      const isUnlocked = isLessonUnlocked(lesson.id);
                      const isCompleted = isLessonCompleted(lesson.id);
                      
                      const isClickable = isUnlocked || isCompleted;
                      const isActive = activeLesson.id === lesson.id;

                      return (
                        <li key={lesson.id}>
                          <button
                            onClick={() => isClickable && setActiveLesson(lesson)}
                            disabled={!isClickable}
                            className={cn(
                              'flex w-full items-center gap-3 rounded-md p-2 text-left text-sm transition-colors',
                              isActive
                                ? 'bg-primary text-primary-foreground hover:bg-primary'
                                : 'hover:bg-muted/50',
                              !isClickable && 'cursor-not-allowed opacity-50'
                            )}
                          >
                            {isCompleted ? (
                              <CheckCircle className={cn("h-4 w-4 text-primary", isActive && "text-primary-foreground")} />
                            ) : isUnlocked ? (
                              <Circle className="h-4 w-4" />
                            ) : (
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className={cn('flex-1')}>{lesson.title}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
       {courseCompleted && (
        <div className="p-4 mt-auto border-t">
          <Button asChild className="w-full">
            <Link href={`/courses/${course.id}/certificate`}>
              <Award className="mr-2 h-4 w-4" />
              Get Your Certificate
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
