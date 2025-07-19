import { Button } from '@/components/ui/button';
import { Terminal } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getCourses } from '@/lib/courses';
import type { Course } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { CourseManager } from '@/components/course/course-manager';

function CourseCard({ course }: { course: Course }) {
  const lessonCount = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);

  return (
    <Card className="flex flex-col">
       <CardHeader className="relative">
        <Image
          src={course.bannerImage || `https://placehold.co/600x400.png`}
          alt={course.title}
          width={600}
          height={400}
          className="rounded-lg object-cover"
          data-ai-hint={course.id === 'introduction-to-web-development' ? 'web development' : 'online course abstract'}
        />
        <div className="absolute top-4 right-4">
            <CourseManager course={course} />
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <CardTitle className="font-headline text-xl mb-2">{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{course.modules.length} Modules • {lessonCount} Lessons</p>
        <Button asChild>
          <Link href={`/courses/${course.id}`}>
            Start Course
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function Home() {
  const courses = getCourses();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center">
          <Terminal className="h-6 w-6 text-primary" />
          <span className="ml-2 font-headline text-lg font-bold">Kalixa</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <ThemeSwitcher />
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                  Welcome to Kalixa
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Your journey to coding mastery starts here. Explore our interactive, AI-powered courses.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="courses" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 font-headline">Our Courses</h2>
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Kalixa. All rights reserved.</p>
      </footer>
    </div>
  );
}
