import { Button } from '@/components/ui/button';
import { BookOpen, Code, Terminal, Sparkles, MoveRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center">
          <Terminal className="h-6 w-6 text-primary" />
          <span className="ml-2 font-headline text-lg font-bold">Kalixa</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/courses/introduction-to-web-development" className="text-sm font-medium hover:underline underline-offset-4">
            Courses
          </Link>
          <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
            Dashboard
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline text-primary">
                    Unlock Your Coding Potential with Kalixa
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Interactive, AI-powered courses designed to take you from novice to pro. Learn by doing with our hands-on code playgrounds.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="group">
                    <Link href="/courses/introduction-to-web-development">
                      Start Learning
                      <MoveRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary">
                    <Link href="/dashboard">
                      Go to Dashboard
                    </Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x400.png"
                width="600"
                height="400"
                alt="Hero"
                data-ai-hint="coding abstract"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Learn Faster, Build Smarter</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Kalixa provides a rich learning environment with all the tools you need to succeed.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16 mt-12">
              <div className="grid gap-1 text-center">
                <BookOpen className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Structured Courses</h3>
                <p className="text-sm text-muted-foreground">Follow a clear path from basics to advanced topics with our well-designed modules and lessons.</p>
              </div>
              <div className="grid gap-1 text-center">
                <Code className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">Interactive Playground</h3>
                <p className="text-sm text-muted-foreground">Experiment with HTML, CSS, and JavaScript in a live environment. See your code come to life instantly.</p>
              </div>
              <div className="grid gap-1 text-center">
                <Sparkles className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold font-headline">AI-Powered Generation</h3>
                <p className="text-sm text-muted-foreground">Turn your notes into complete courses with our intelligent AI course creator.</p>
              </div>
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
