
"use client";

import type { Course, Lesson, Module } from '@/lib/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle, Circle, Lock, Award, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { useMemo } from 'react';

interface CourseSidebarProps {
  course: Course;
  activeLesson: Lesson;
  setActiveLesson: (lesson: Lesson) => void;
}

export function CourseSidebar({ course, activeLesson, setActiveLesson }: CourseSidebarProps) {
  const { isLessonCompleted, isLessonUnlocked, progress, isCourseCompleted } = useCourseProgress(course.id);

  const defaultAccordionValues = useMemo(() => {
    if (!activeLesson) return [];
    const activeModule = course.modules.find(m => m.lessons.some(l => l.id === activeLesson.id));
    return activeModule ? [activeModule.id] : [];
  }, [activeLesson, course.modules]);

  const courseCompleted = isCourseCompleted();

  return (
    <div className="flex h-full flex-col border-r">
       <div className="p-4 border-b">
         <Button variant="link" asChild className="p-0 h-auto mb-4 text-sm">
            <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Homepage
            </Link>
         </Button>
        <h2 className="text-lg font-semibold font-headline">{course.title}</h2>
        <Progress value={progress.percentage} className="mt-2 h-2" />
        <p className="text-xs text-muted-foreground mt-1">{Math.round(progress.percentage)}% complete</p>
      </div>
      <ScrollArea className="flex-1">
        <Accordion type="multiple" defaultValue={defaultAccordionValues} className="w-full px-2">
          {course.modules.map((module: Module) => (
              <AccordionItem value={module.id} key={module.id} className="border-b-0">
                <AccordionTrigger className="font-semibold text-left hover:no-underline rounded-md px-2 hover:bg-muted">
                    {module.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1 mt-1">
                    {module.lessons.map((lesson: Lesson) => {
                      const unlocked = isLessonUnlocked(lesson.id);
                      const completed = isLessonCompleted(lesson.id);
                      const active = activeLesson.id === lesson.id;

                      return (
                        <li key={lesson.id}>
                          <button
                            onClick={() => unlocked && setActiveLesson(lesson)}
                            disabled={!unlocked}
                            className={cn(
                              'flex w-full items-center gap-3 rounded-md p-2 text-left text-sm transition-colors',
                              active
                                ? 'bg-primary text-primary-foreground hover:bg-primary'
                                : 'hover:bg-muted',
                              !unlocked && 'cursor-not-allowed opacity-50'
                            )}
                          >
                            {completed ? (
                              <CheckCircle className={cn("h-4 w-4", active ? "text-primary-foreground" : "text-primary")} />
                            ) : unlocked ? (
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
          <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
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
