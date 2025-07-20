
"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { getCourses } from '@/lib/courses';

interface QuizScore {
  score: number;
  total: number;
}
interface CourseProgress {
  completedLessons: string[];
  quizScores: Record<string, QuizScore>;
  completionDate?: string;
}

const getProgressStore = (courseId: string): CourseProgress => {
  if (typeof window === 'undefined') {
    return { completedLessons: [], quizScores: {} };
  }
  try {
    const progress = localStorage.getItem(`foxbat-eduhub-progress-${courseId}`);
    return progress ? JSON.parse(progress) : { completedLessons: [], quizScores: {} };
  } catch (error) {
    console.error("Failed to parse progress from localStorage", error);
    return { completedLessons: [], quizScores: {} };
  }
};

const saveProgressStore = (courseId: string, progress: CourseProgress) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`foxbat-eduhub-progress-${courseId}`, JSON.stringify(progress));
    } catch (error) {
      console.error("Failed to save progress to localStorage", error);
    }
  }
};

export const useCourseProgress = (courseId: string) => {
  const [progressStore, setProgressStore] = useState<CourseProgress>({ completedLessons: [], quizScores: {} });
  const [isInitialized, setIsInitialized] = useState(false);
  
  const course = useMemo(() => getCourses().find(c => c.id === courseId), [courseId]);
  const allLessons = useMemo(() => course?.modules.flatMap(m => m.lessons) || [], [course]);

  useEffect(() => {
    if (courseId) {
      const storedProgress = getProgressStore(courseId);
      setProgressStore(storedProgress);
      setIsInitialized(true);
    }
  }, [courseId]);

  const completedLessons = useMemo(() => progressStore.completedLessons || [], [progressStore]);
  const quizScores = useMemo(() => progressStore.quizScores || {}, [progressStore]);

  const setLessonCompleted = useCallback((lessonId: string, isCompleted: boolean) => {
    setProgressStore(prev => {
      const newCompletedLessons = isCompleted
        ? [...new Set([...(prev.completedLessons || []), lessonId])]
        : (prev.completedLessons || []).filter(id => id !== lessonId);
      
      const newProgress = { ...prev, completedLessons: newCompletedLessons };

      const totalLessons = allLessons.length;
      if (totalLessons > 0 && newCompletedLessons.length === totalLessons && !newProgress.completionDate) {
        newProgress.completionDate = new Date().toISOString();
      }

      saveProgressStore(courseId, newProgress);
      return newProgress;
    });
  }, [courseId, allLessons.length]);

  const setQuizScore = useCallback((lessonId: string, score: QuizScore) => {
    setProgressStore(prev => {
        const newScores = { ...prev.quizScores, [lessonId]: score };
        const newProgress = { ...prev, quizScores: newScores };
        saveProgressStore(courseId, newProgress);
        return newProgress;
    });
  }, [courseId]);

  const resetProgress = useCallback(() => {
    const newProgress = { completedLessons: [], quizScores: {} };
    setProgressStore(newProgress);
    saveProgressStore(courseId, newProgress);
    localStorage.removeItem(`certificate-name-${courseId}`);
    localStorage.removeItem(`certificate-id-${courseId}`);
    window.location.reload();
  }, [courseId]);

  const isLessonCompleted = useCallback((lessonId: string) => {
    return completedLessons.includes(lessonId);
  }, [completedLessons]);
  
  const isLessonUnlocked = useCallback((lessonId: string) => {
    if (!isInitialized) return false;
    const lessonIndex = allLessons.findIndex(l => l.id === lessonId);
    if (lessonIndex === -1) return false;
    if (lessonIndex === 0) return true;
    
    const previousLesson = allLessons[lessonIndex - 1];
    return isLessonCompleted(previousLesson.id);
  }, [allLessons, isLessonCompleted, isInitialized]);

  const progress = useMemo(() => {
    const total = allLessons.length;
    if (!isInitialized || total === 0) {
      return { count: 0, total: 0, percentage: 0 };
    }
    const count = completedLessons.length;
    const percentage = (count / total) * 100;
    return { count, total, percentage };
  }, [isInitialized, allLessons.length, completedLessons.length]);

  const isCourseCompleted = useCallback(() => {
    return isInitialized && allLessons.length > 0 && completedLessons.length === allLessons.length;
  }, [isInitialized, completedLessons.length, allLessons.length]);


  const getCompletionDate = useCallback(() => {
    return progressStore.completionDate || null;
  }, [progressStore.completionDate]);

  return {
    isInitialized,
    progress,
    completedLessons,
    setLessonCompleted,
    isLessonCompleted,
    isLessonUnlocked,
    isCourseCompleted,
    getCompletionDate,
    quizScores,
    setQuizScore,
    resetProgress,
  };
};
