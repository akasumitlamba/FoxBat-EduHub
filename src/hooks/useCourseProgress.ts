"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Course, Lesson } from '@/lib/types';

interface CourseProgress {
  completedLessons: string[];
  completionDate?: string;
}

const getProgressStore = (courseId: string): CourseProgress => {
  if (typeof window === 'undefined') {
    return { completedLessons: [] };
  }
  try {
    const progress = localStorage.getItem(`kalixa-progress-${courseId}`);
    if (!progress) return { completedLessons: [] };
    const parsed = JSON.parse(progress);
    return { 
      completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
      completionDate: parsed.completionDate
    };
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

export const useCourseProgress = (course: Course) => {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [completionDate, setCompletionDate] = useState<string | undefined>(undefined);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (course) {
      const storedProgress = getProgressStore(course.id);
      setCompletedLessons(storedProgress.completedLessons);
      setCompletionDate(storedProgress.completionDate);
      setIsInitialized(true);
    }
  }, [course]);

  const allLessons = useMemo(() => course?.modules.flatMap(m => m.lessons) || [], [course]);

  const setLessonCompleted = useCallback((lessonId: string, isCompleted: boolean) => {
    if (!isInitialized || !course) return;

    const currentProgress = getProgressStore(course.id);
    let newCompletedLessons: string[];

    if (isCompleted) {
      newCompletedLessons = [...new Set([...currentProgress.completedLessons, lessonId])];
    } else {
      newCompletedLessons = currentProgress.completedLessons.filter(id => id !== lessonId);
    }
    
    setCompletedLessons(newCompletedLessons);

    const totalLessons = allLessons.length;
    let newCompletionDate = currentProgress.completionDate;
    if (newCompletedLessons.length === totalLessons && !newCompletionDate) {
      newCompletionDate = new Date().toISOString();
      setCompletionDate(newCompletionDate);
    }
    
    saveProgressStore(course.id, { 
      completedLessons: newCompletedLessons, 
      completionDate: newCompletionDate 
    });
  }, [isInitialized, course, allLessons.length]);

  const isLessonCompleted = useCallback((lessonId: string) => {
    return completedLessons.includes(lessonId);
  }, [completedLessons]);

  const isModuleCompleted = useCallback((moduleId: string) => {
    const module = course?.modules.find(m => m.id === moduleId);
    if (!module) return false;
    return module.lessons.every(l => isLessonCompleted(l.id));
  }, [course?.modules, isLessonCompleted]);

  const isCourseCompleted = useCallback(() => {
    if (!course || !isInitialized) return false;
    return allLessons.length > 0 && completedLessons.length === allLessons.length;
  }, [course, allLessons.length, completedLessons.length, isInitialized]);
  
  const getCompletionDate = useCallback(() => {
    return completionDate ? new Date(completionDate) : null;
  }, [completionDate]);

  const isLessonCompletable = useCallback((lessonId: string, quizPassed: boolean | null) => {
    if (isLessonCompleted(lessonId)) return true;
    
    const lesson = allLessons.find(l => l.id === lessonId);
    if (!lesson) return false;

    if (lesson.type === 'quiz') {
      return quizPassed === true;
    }
    
    return true;
  }, [allLessons, isLessonCompleted]);

  const getNextLesson = useCallback((currentLessonId: string): Lesson | null => {
    const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
    if (currentIndex === -1 || currentIndex === allLessons.length - 1) {
      return null;
    }
    return allLessons[currentIndex + 1];
  }, [allLessons]);

  const getPreviousLesson = useCallback((currentLessonId: string): Lesson | null => {
    const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
    if (currentIndex <= 0) {
      return null;
    }
    return allLessons[currentIndex - 1];
  }, [allLessons]);

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
    isModuleCompleted,
    isCourseCompleted,
    getCompletionDate,
    isLessonCompletable,
    getNextLesson,
    getPreviousLesson,
  };
};
