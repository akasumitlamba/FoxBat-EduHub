
"use client";

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import type { Course, Lesson } from '@/lib/types';
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import Link from 'next/link';
import Image from 'next/image';
import { CourseSidebar } from '@/components/course/course-sidebar';
import { LessonContent } from '@/components/course/lesson-content';
import { useCourseProgress } from '@/hooks/useCourseProgress';

export function CoursePageClient({ course }: { course: Course }) {
  const { isLessonCompleted, setLessonCompleted, isInitialized, progress, isLessonUnlocked, isCourseCompleted } = useCourseProgress(course.id);
  const allLessons = useMemo(() => course.modules.flatMap(m => m.lessons), [course]);

  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    if (isInitialized && allLessons.length > 0) {
      const firstIncompleteLesson = allLessons.find(l => !isLessonCompleted(l.id));
      const lastCompletedLesson = allLessons.slice().reverse().find(l => isLessonCompleted(l.id));
      setActiveLesson(firstIncompleteLesson || lastCompletedLesson || allLessons[0]);
    }
  }, [isInitialized, allLessons, isLessonCompleted]);

  const handleSetLessonCompleted = useCallback((lessonId: string, completed: boolean) => {
    setLessonCompleted(lessonId, completed);
  }, [setLessonCompleted]);

  const handleSetActiveLesson = useCallback((lesson: Lesson) => {
    if (isLessonUnlocked(lesson.id)) {
      setActiveLesson(lesson);
    }
  }, [isLessonUnlocked]);

  const getNextLesson = useCallback(() => {
    if (!activeLesson) return null;
    const currentIndex = allLessons.findIndex(l => l.id === activeLesson.id);
    if (currentIndex > -1 && currentIndex < allLessons.length - 1) {
      return allLessons[currentIndex + 1];
    }
    return null;
  }, [activeLesson, allLessons]);

  const getPreviousLesson = useCallback(() => {
    if (!activeLesson) return null;
    const currentIndex = allLessons.findIndex(l => l.id === activeLesson.id);
    if (currentIndex > 0) {
      return allLessons[currentIndex - 1];
    }
    return null;
  }, [activeLesson, allLessons]);

  const handleNext = useCallback(() => {
    if (!activeLesson) return;
    handleSetLessonCompleted(activeLesson.id, true);
    const nextLesson = getNextLesson();
    if (nextLesson) {
      setActiveLesson(nextLesson);
    }
  }, [activeLesson, getNextLesson, handleSetLessonCompleted]);

  const handlePrevious = useCallback(() => {
    const previousLesson = getPreviousLesson();
    if (previousLesson) {
      setActiveLesson(previousLesson);
    }
  }, [getPreviousLesson]);
  
  if (!isInitialized || !activeLesson) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading course...
      </div>
    );
  }
  
  const courseCompleted = isCourseCompleted();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md sm:h-16 sm:px-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image src="/logo.png" alt="Foxbat EduHub Logo" width={32} height={32} />
              <span className="font-headline text-lg font-bold">Foxbat EduHub</span>
            </Link>
          </div>
           <div className="ml-auto flex items-center gap-4">
             <div className="text-sm text-muted-foreground">{Math.round(progress.percentage)}% complete</div>
          </div>
        </header>
        <div className="flex flex-1">
          <Sidebar>
            <CourseSidebar 
              course={course} 
              activeLesson={activeLesson} 
              setActiveLesson={handleSetActiveLesson}
              isCourseCompleted={courseCompleted}
            />
          </Sidebar>
          <SidebarInset>
            <LessonContent 
              key={activeLesson.id} 
              courseId={course.id}
              lesson={activeLesson}
              onNext={handleNext}
              onPrevious={handlePrevious}
              hasPrevious={!!getPreviousLesson()}
              hasNext={!!getNextLesson()}
              isCourseCompleted={courseCompleted}
            />
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
