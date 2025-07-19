import { getCourseById } from '@/lib/courses';
import { notFound } from 'next/navigation';
import { CoursePageClient } from './course-page-client';

type CoursePageProps = {
  params: {
    courseId: string;
  };
};

export default function CoursePage({ params }: CoursePageProps) {
  const course = getCourseById(params.courseId);

  if (!course) {
    notFound();
  }

  return <CoursePageClient course={course} />;
}
