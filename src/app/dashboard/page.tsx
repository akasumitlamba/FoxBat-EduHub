import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AICourseGenerator } from '@/components/dashboard/ai-course-generator';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
       <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center">
          <span className="ml-2 font-headline text-lg font-bold">Dashboard</span>
        </Link>
      </header>
       <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
            <AICourseGenerator />
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">My Courses</CardTitle>
                    <CardDescription>An overview of your enrolled and created courses.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Course listing coming soon...</p>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
