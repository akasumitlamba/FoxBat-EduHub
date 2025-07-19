"use client";

import React, { useState, useMemo, useEffect } from 'react';
import type { Course, Lesson } from '@/lib/types';
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import Link from 'next/link';
import { Terminal } from 'lucide-react';
import { CourseSidebar } from '@/components/course/course-sidebar';
import { LessonContent } from '@/components/course/lesson-content';
import { useCourseProgress } from '@/hooks/useCourseProgress';

export function CoursePageClient({ course }: { course: Course }) {
  const allLessons = useMemo(() => course.modules.flatMap(m => m.lessons), [course]);
  const [activeLesson, setActiveLesson] = useState<Lesson>(allLessons[0]);
  const { progressPercentage, isInitialized } = useCourseProgress(course.id);
  const [currentProgress, setCurrentProgress] = useState(0);
  
  const totalLessons = allLessons.length;

  useEffect(() => {
    if (isInitialized) {
      setCurrentProgress(progressPercentage(totalLessons));
    }
  }, [isInitialized, progressPercentage, totalLessons]);

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
            <div className="text-sm text-muted-foreground">{Math.round(currentProgress)}% complete</div>
          </div>
        </header>
        <div className="flex flex-1">
          <Sidebar collapsible="icon">
            <CourseSidebar course={course} activeLesson={activeLesson} setActiveLesson={setActiveLesson} />
          </Sidebar>
          <SidebarInset>
            <LessonContent key={activeLesson.id} lesson={activeLesson} courseId={course.id} />
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
