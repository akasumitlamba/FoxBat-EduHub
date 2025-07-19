"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { notFound, useParams } from 'next/navigation';
import { getCourseById } from '@/lib/courses';
import type { Course } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, Terminal } from 'lucide-react';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { v4 as uuidv4 } from 'uuid';

export default function CertificatePage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const course = getCourseById(courseId);
  const { isCourseCompleted } = useCourseProgress(course!);
  
  const [name, setName] = useState('');
  const [credentialId, setCredentialId] = useState('');
  const [isClient, setIsClient] = useState(false);
  
  const certificateRef = useRef<HTMLDivElement>(null);

  const checkCourseCompletion = useCallback(() => {
    return course && isCourseCompleted();
  }, [course, isCourseCompleted]);

  useEffect(() => {
    setIsClient(true);
    if(checkCourseCompletion()) {
      const storedName = localStorage.getItem(`certificate-name-${courseId}`) || '';
      setName(storedName);
      
      let storedId = localStorage.getItem(`certificate-id-${courseId}`);
      if (!storedId) {
        storedId = uuidv4();
        localStorage.setItem(`certificate-id-${courseId}`, storedId);
      }
      setCredentialId(storedId);
    }
  }, [courseId, checkCourseCompletion]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    localStorage.setItem(`certificate-name-${courseId}`, e.target.value);
  }

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(certificateRef.current, { scale: 2 });
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `Kalixa_Certificate_${course?.title.replace(/\s+/g, '_')}.png`;
    link.click();
  };

  if (!isClient) return null;

  if (!course || !isCourseCompleted()) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-secondary p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-4 mb-8">
        <h1 className="text-3xl font-bold font-headline text-center">Congratulations!</h1>
        <p className="text-muted-foreground text-center">You have successfully completed the course. Enter your name to generate your certificate.</p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <div className="flex-1 space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input id="name" value={name} onChange={handleNameChange} placeholder="Enter your full name" />
          </div>
          <Button onClick={handleDownload} className="self-end">
            <Download className="mr-2 h-4 w-4" />
            Download Certificate
          </Button>
        </div>
      </div>
      
      <div 
        ref={certificateRef} 
        className="w-full max-w-4xl aspect-[1.414_1] bg-background text-foreground p-8 sm:p-12 border-4 border-primary shadow-2xl flex flex-col justify-between"
      >
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Terminal className="h-10 w-10 text-primary" />
            <span className="font-headline text-4xl font-bold">Kalixa</span>
          </div>
          <p className="text-lg text-muted-foreground">Certificate of Completion</p>
        </div>

        <div className="text-center my-8">
          <p className="text-xl mb-2">This certifies that</p>
          <h2 className="text-4xl sm:text-5xl font-bold font-headline text-primary break-words">
            {name || 'Your Name Here'}
          </h2>
          <p className="text-xl mt-4">has successfully completed the course</p>
          <h3 className="text-2xl sm:text-3xl font-semibold mt-2">{course.title}</h3>
        </div>

        <div className="flex justify-between items-end text-xs text-muted-foreground mt-auto">
           <div>
             <p>Date of Completion: {new Date().toLocaleDateString()}</p>
           </div>
           <div>
            <p>Credential ID: {credentialId}</p>
           </div>
        </div>
      </div>
    </div>
  );
}
