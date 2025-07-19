"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateCourseFromNotes } from '@/ai/flows/generate-course-from-notes';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Loader2 } from 'lucide-react';
import { getCourses, saveCourses } from '@/lib/courses';
import type { Course } from '@/lib/types';
import Link from 'next/link';

const formSchema = z.object({
  notes: z.string().min(50, {
    message: "Notes must be at least 50 characters.",
  }),
});

export function AICourseGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCourse, setGeneratedCourse] = useState<Course | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedCourse(null);
    try {
      const result = await generateCourseFromNotes({ notionNotes: values.notes });
      
      const parsedCourse = JSON.parse(result.courseContent);

      const courseWithId: Course = {
        id: `course-${Date.now()}`,
        ...parsedCourse
      }
      
      setGeneratedCourse(courseWithId);
      
      const existingCourses = getCourses();
      saveCourses([...existingCourses, courseWithId]);

      toast({
        title: "Course Generated Successfully!",
        description: "Your new course has been created and saved.",
      });

    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem generating the course. Please check the format of your notes and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">AI Course Generator</CardTitle>
        <CardDescription>
          Paste your notes from Notion or any other source, and our AI will structure it into a full course with modules, lessons, and quizzes.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste your detailed course notes here... e.g., Course Title: My New Course. Module 1: ..."
                      className="min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Course
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
      {generatedCourse && (
        <CardContent className="mt-6 border-t pt-6">
            <h3 className="font-headline text-lg">Generated Course Preview:</h3>
            <p className="font-bold text-primary mt-2">{generatedCourse.title}</p>
            <p className="text-sm text-muted-foreground">{generatedCourse.description}</p>
            <div className="mt-4 space-y-2">
                {generatedCourse.modules.map(module => (
                    <div key={module.id || module.title} className="text-sm p-2 border rounded-md">
                        <p className="font-semibold">{module.title}</p>
                        <ul className="list-disc pl-5 mt-1 text-xs text-muted-foreground">
                            {module.lessons.map(lesson => (
                                <li key={lesson.id || lesson.slug}>{lesson.title} ({lesson.type})</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
             <Button asChild className="mt-4">
              <Link href={`/courses/${generatedCourse.id}`}>Go to Course</Link>
            </Button>
        </CardContent>
      )}
    </Card>
  );
}
