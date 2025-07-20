
"use client";

import { useState } from 'react';
import { MoreVertical, RotateCcw, Share2, AlertCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import type { Course } from '@/lib/types';

export function CourseManager({ course }: { course: Course }) {
  const { toast } = useToast();
  const { resetProgress } = useCourseProgress(course.id);
  const [isResetAlertOpen, setIsResetAlertOpen] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: course.title,
      text: `Check out this course on Foxbat EduHub: ${course.title}`,
      url: `${window.location.origin}/courses/${course.id}`,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast({ title: 'Link Copied!', description: 'Course link copied to your clipboard.' });
      }
    } catch (error) {
      console.error('Share failed:', error);
      await navigator.clipboard.writeText(shareData.url);
      toast({ title: 'Link Copied!', description: 'Sharing failed, but the link is in your clipboard.' });
    }
  };

  const handleReset = () => {
    resetProgress();
    toast({ title: 'Progress Reset', description: `Your progress for "${course.title}" has been cleared.` });
    setIsResetAlertOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/50 hover:bg-background/80">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Course options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            <span>Share</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsResetAlertOpen(true)} className="text-destructive focus:text-destructive">
            <RotateCcw className="mr-2 h-4 w-4" />
            <span>Reset Progress</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isResetAlertOpen} onOpenChange={setIsResetAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently reset your progress for the course "{course.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReset}>
              Yes, reset my progress
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
