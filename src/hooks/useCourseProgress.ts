"use client";

import { useState, useEffect, useCallback } from 'react';

const getProgress = (courseId: string): string[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const progress = localStorage.getItem(`kalixa-progress-${courseId}`);
    return progress ? JSON.parse(progress) : [];
  } catch (error) {
    console.error("Failed to parse progress from localStorage", error);
    return [];
  }
};

const saveProgress = (courseId: string, completedLessons: string[]) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`kalixa-progress-${courseId}`, JSON.stringify(completedLessons));
    } catch (error) {
      console.error("Failed to save progress to localStorage", error);
    }
  }
};

export const useCourseProgress = (courseId: string) => {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setCompletedLessons(getProgress(courseId));
    setIsInitialized(true);
  }, [courseId]);

  const toggleLessonCompleted = useCallback((lessonId: string) => {
    if (!isInitialized) return;
    
    const newCompletedLessons = completedLessons.includes(lessonId)
      ? completedLessons.filter(id => id !== lessonId)
      : [...completedLessons, lessonId];
    
    setCompletedLessons(newCompletedLessons);
    saveProgress(courseId, newCompletedLessons);
  }, [completedLessons, courseId, isInitialized]);

  const isLessonCompleted = useCallback((lessonId: string) => {
    return completedLessons.includes(lessonId);
  }, [completedLessons]);
  
  const progressPercentage = (totalLessons: number) => {
    if (totalLessons === 0 || !isInitialized) return 0;
    return (completedLessons.length / totalLessons) * 100;
  };

  return { completedLessons, toggleLessonCompleted, isLessonCompleted, progressPercentage, isInitialized };
};
