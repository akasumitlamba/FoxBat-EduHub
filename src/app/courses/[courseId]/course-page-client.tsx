"use client";

import React, { useState, useMemo, useEffect } from 'react';
import type { Course, Lesson } from '@/lib/types';
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import Link from 'next/link';
import { Terminal, Award } from 'lucide-react';
import { CourseSidebar } from '@/components/course/course-sidebar';
import { LessonContent } from '@/components/course/lesson-content';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { Button } from '@/components/ui/button';

export function CoursePageClient({ course }: { course: Course }) {
  const allLessons = useMemo(() => course.modules.flatMap(m => m.lessons), [course]);
  const { progress, isLessonCompleted, isModuleCompleted, setLessonCompleted, isCourseCompleted, isInitialized, getNextLesson, getPreviousLesson } = useCourseProgress(course);

  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    if (isInitialized) {
      const firstIncompleteLesson = allLessons.find(l => !isLessonCompleted(l.id));
      setActiveLesson(firstIncompleteLesson || allLessons[allLessons.length - 1]);
    }
  }, [isInitialized, allLessons, isLessonCompleted]);

  const handleSetActiveLesson = (lesson: Lesson) => {
      const moduleIndex = course.modules.findIndex(m => m.lessons.some(l => l.id === lesson.id));
      const isLocked = moduleIndex > 0 && !isModuleCompleted(course.modules[moduleIndex - 1].id);
      
      if (!isLocked) {
          setActiveLesson(lesson);
      }
  };

  const handleNext = () => {
    if (!activeLesson) return;
    setLessonCompleted(activeLesson.id, true);
    const nextLesson = getNextLesson(activeLesson.id);
    if (nextLesson) {
      setActiveLesson(nextLesson);
    }
  };

  const handlePrevious = () => {
      if (!activeLesson) return;
      const prevLesson = getPreviousLesson(activeLesson.id);
      if (prevLesson) {
          setActiveLesson(prevLesson);
      }
  };
  
  if (!activeLesson) {
      return (
          <div className="flex items-center justify-center min-h-screen">
              Loading course...
          </div>
      );
  }

  const isCompleted = isLessonCompleted(activeLesson.id);
  const nextLesson = getNextLesson(activeLesson.id);
  const isLastLesson = !nextLesson;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md sm:h-16 sm:px-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Terminal className="h-6 w-6 text-primary" />
              <span className="font-headline text-lg font-bold">Kalixa</span>
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-4">
             {isCourseCompleted() ? (
              <Button asChild>
                <Link href={`/courses/${course.id}/certificate`}>
                  <Award className="mr-2 h-4 w-4" />
                  View Certificate
                </Link>
              </Button>
            ) : (
             <div className="text-sm text-muted-foreground">{Math.round(progress.percentage)}% complete</div>
            )}
          </div>
        </header>
        <div className="flex flex-1">
          <Sidebar collapsible="icon">
            <CourseSidebar 
              course={course} 
              activeLesson={activeLesson} 
              setActiveLesson={handleSetActiveLesson} 
            />
          </Sidebar>
          <SidebarInset>
            <LessonContent 
              key={activeLesson.id} 
              lesson={activeLesson} 
              courseId={course.id} 
              onNext={handleNext}
              onPrevious={handlePrevious}
              isCompleted={isCompleted}
              isLastLesson={isLastLesson}
            />
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
