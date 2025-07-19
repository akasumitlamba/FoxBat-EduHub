"use client";

import type { Course, Lesson, Module } from '@/lib/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle, Circle, Code, BookOpen, HelpCircle, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { Progress } from '@/components/ui/progress';

interface CourseSidebarProps {
  course: Course;
  activeLesson: Lesson;
  setActiveLesson: (lesson: Lesson) => void;
}

const getIconForLesson = (type: Lesson['type']) => {
  switch (type) {
    case 'theory': return <BookOpen className="h-4 w-4" />;
    case 'code': return <Code className="h-4 w-4" />;
    case 'quiz': return <HelpCircle className="h-4 w-4" />;
    default: return <Circle className="h-4 w-4" />;
  }
};

export function CourseSidebar({ course, activeLesson, setActiveLesson }: CourseSidebarProps) {
  const { progress, isLessonCompleted, isModuleCompleted, isInitialized } = useCourseProgress(course);

  return (
    <div className="flex h-full flex-col">
      <div className="p-4">
        <h2 className="text-lg font-semibold font-headline">{course.title}</h2>
        <Progress value={isInitialized ? progress.percentage : 0} className="mt-2 h-2" />
        <p className="text-xs text-muted-foreground mt-1">{isInitialized ? Math.round(progress.percentage) : 0}% complete</p>
      </div>
      <ScrollArea className="flex-1">
        <Accordion type="multiple" defaultValue={course.modules.map(m => m.id)} className="w-full px-4">
          {course.modules.map((module: Module, moduleIndex) => {
            const isLocked = moduleIndex > 0 && !isModuleCompleted(course.modules[moduleIndex - 1].id);
            return (
              <AccordionItem value={module.id} key={module.id}>
                <AccordionTrigger className={cn("font-semibold text-left", isLocked && "text-muted-foreground cursor-not-allowed")}>
                  <div className="flex items-center gap-2">
                    {isLocked && <Lock className="h-4 w-4" />}
                    {module.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1">
                    {module.lessons.map((lesson: Lesson) => (
                      <li key={lesson.id}>
                        <button
                          onClick={() => setActiveLesson(lesson)}
                          disabled={isLocked}
                          className={cn(
                            'flex w-full items-center gap-3 rounded-md p-2 text-left text-sm transition-colors',
                            activeLesson.id === lesson.id
                              ? 'bg-accent text-accent-foreground'
                              : 'hover:bg-muted/50',
                            isLessonCompleted(lesson.id) ? 'text-muted-foreground' : 'text-foreground',
                            isLocked && 'cursor-not-allowed text-muted-foreground/50 hover:bg-transparent'
                          )}
                        >
                          {isLessonCompleted(lesson.id) ? (
                            <CheckCircle className="h-4 w-4 text-primary" />
                          ) : (
                            <Circle className="h-4 w-4" />
                          )}
                          <span className="flex-1">{lesson.title}</span>
                          {getIconForLesson(lesson.type)}
                        </button>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </ScrollArea>
    </div>
  );
}
