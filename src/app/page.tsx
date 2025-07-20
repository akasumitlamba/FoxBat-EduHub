
import { Button } from '@/components/ui/button';
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
    <Card className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out shadow-lg hover:-translate-y-2 hover:shadow-2xl hover:border-primary/50 bg-gradient-to-br from-card to-secondary/20">
       <CardHeader className="relative p-0 bg-secondary/50 flex items-center justify-center h-48 bg-gradient-to-br from-secondary via-background to-secondary">
        {course.bannerImage ? (
          <Image
            src={course.bannerImage}
            alt={`${course.title} logo`}
            width={120}
            height={120}
            className="w-32 h-32 object-contain [filter:drop-shadow(0_4px_8px_rgba(0,0,0,0.1))]"
          />
        ) : (
          <div className="w-full h-full bg-muted" />
        )}
        <div className="absolute top-4 right-4">
            <CourseManager course={course} />
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-6">
        <CardTitle className="font-headline text-xl mb-2">{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{course.modules.length} Modules • {lessonCount} Lessons</p>
        <Button asChild disabled={course.modules.length === 0}>
          <Link href={`/courses/${course.id}`}>
            {course.modules.length > 0 ? 'Start Course' : 'Coming Soon'}
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
      <header className="px-4 lg:px-6 h-14 flex items-center border-b sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <Link href="/" className="flex items-center justify-center">
          <Image src="/logo.png" alt="Foxbat EduHub Logo" width={32} height={32} />
          <span className="ml-2 font-headline text-lg font-bold">Foxbat EduHub</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Button variant="ghost" asChild>
            <Link href="#courses">Courses</Link>
          </Button>
          <ThemeSwitcher />
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  Learn at the Speed of a Foxbat
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Just as the legendary MiG-25 'Foxbat' redefined speed, our courses are engineered to accelerate your learning. Master complex skills in record time and stay ahead of the curve.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="courses" className="w-full py-12 md:py-16 lg:py-20 bg-secondary">
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
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center justify-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2025 Foxbat EduHub. All rights reserved.</p>
      </footer>
    </div>
  );
}
