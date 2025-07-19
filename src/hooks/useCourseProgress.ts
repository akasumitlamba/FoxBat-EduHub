"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { getCourses } from '@/lib/courses';

interface CourseProgress {
  completedLessons: string[];
}

const getProgressStore = (courseId: string): CourseProgress => {
  if (typeof window === 'undefined') {
    return { completedLessons: [] };
  }
  try {
    const progress = localStorage.getItem(`kalixa-progress-${courseId}`);
    return progress ? JSON.parse(progress) : { completedLessons: [] };
  } catch (error) {
    console.error("Failed to parse progress from localStorage", error);
    return { completedLessons: [] };
  }
};

const saveProgressStore = (courseId: string, progress: CourseProgress) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`kalixa-progress-${courseId}`, JSON.stringify(progress));
    } catch (error) {
      console.error("Failed to save progress to localStorage", error);
    }
  }
};

export const useCourseProgress = (courseId: string) => {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const course = useMemo(() => getCourses().find(c => c.id === courseId), [courseId]);
  const allLessons = useMemo(() => course?.modules.flatMap(m => m.lessons) || [], [course]);

  useEffect(() => {
    const storedProgress = getProgressStore(courseId);
    setCompletedLessons(storedProgress.completedLessons || []);
    setIsInitialized(true);
  }, [courseId]);

  const setLessonCompleted = useCallback((lessonId: string, isCompleted: boolean) => {
    const newCompletedLessons = isCompleted
      ? [...new Set([...completedLessons, lessonId])]
      : completedLessons.filter(id => id !== lessonId);
    
    setCompletedLessons(newCompletedLessons);
    saveProgressStore(courseId, { completedLessons: newCompletedLessons });
  }, [courseId, completedLessons]);

  const isLessonCompleted = useCallback((lessonId: string) => {
    return completedLessons.includes(lessonId);
  }, [completedLessons]);

  const progress = useMemo(() => {
    if (!isInitialized || allLessons.length === 0) {
      return { count: 0, total: 0, percentage: 0 };
    }
    const total = allLessons.length;
    const count = completedLessons.length;
    const percentage = total > 0 ? (count / total) * 100 : 0;
    return { count, total, percentage };
  }, [isInitialized, allLessons, completedLessons]);

  return {
    isInitialized,
    progress,
    completedLessons,
    setLessonCompleted,
    isLessonCompleted,
  };
};
