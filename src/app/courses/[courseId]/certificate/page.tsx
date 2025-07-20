
"use client";

import { useEffect, useState, useRef } from 'react';
import { notFound, useParams } from 'next/navigation';
import { getCourseById } from '@/lib/courses';
import type { Course } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download } from 'lucide-react';
import Image from 'next/image';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { v4 as uuidv4 } from 'uuid';
import { ThemeSwitcher } from '@/components/theme-switcher';
import Link from 'next/link';

export default function CertificatePage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const course = getCourseById(courseId);
  const { isCourseCompleted, getCompletionDate } = useCourseProgress(courseId);
  
  const [name, setName] = useState('');
  const [credentialId, setCredentialId] = useState('');
  const [completionDate, setCompletionDate] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    if(course && isCourseCompleted()) {
      const storedName = localStorage.getItem(`certificate-name-${courseId}`) || '';
      setName(storedName);
      
      let storedId = localStorage.getItem(`certificate-id-${courseId}`);
      if (!storedId) {
        storedId = uuidv4();
        localStorage.setItem(`certificate-id-${courseId}`, storedId);
      }
      setCredentialId(storedId);

      const date = getCompletionDate();
      if (date) {
        setCompletionDate(new Date(date).toLocaleDateString());
      }

    }
  }, [courseId, course, isCourseCompleted, getCompletionDate]);

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
    link.download = `Foxbat_EduHub_Certificate_${course?.title.replace(/\s+/g, '_')}.png`;
    link.click();
  };

  if (!isClient) return null;

  if (!course || !isCourseCompleted()) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-secondary p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-4 mb-8">
        <div className="flex justify-between items-center">
            <Button variant="link" asChild>
                <Link href={`/courses/${courseId}`}>&larr; Back to Course</Link>
            </Button>
            <ThemeSwitcher />
        </div>
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
        className="w-full max-w-4xl aspect-[1.414_1] bg-background text-foreground shadow-2xl flex flex-col justify-between relative overflow-hidden p-8 sm:p-12"
      >
        <div className="absolute inset-0 w-full h-full text-primary/50" style={{'--color-1': 'hsl(var(--primary))', '--color-2': 'hsl(var(--accent))'} as React.CSSProperties}>
          <svg width="100%" height="100%" viewBox="0 0 842 595" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="838" height="591" fill="none" stroke="currentColor" strokeWidth="2" rx="10"/>
            
            <g id="corner-top-left" transform="translate(10, 10)">
              <path d="M0 50 A 50 50 0 0 1 50 0 L 0 0 Z" fill="var(--color-1)" opacity="0.1"/>
              <path d="M0 30 A 30 30 0 0 1 30 0 L 0 0 Z" fill="var(--color-2)" opacity="0.1"/>
            </g>
            <g id="corner-top-right" transform="translate(832, 10) scale(-1, 1)">
              <path d="M0 50 A 50 50 0 0 1 50 0 L 0 0 Z" fill="var(--color-1)" opacity="0.1"/>
              <path d="M0 30 A 30 30 0 0 1 30 0 L 0 0 Z" fill="var(--color-2)" opacity="0.1"/>
            </g>
            <g id="corner-bottom-left" transform="translate(10, 585) scale(1, -1)">
              <path d="M0 50 A 50 50 0 0 1 50 0 L 0 0 Z" fill="var(--color-1)" opacity="0.1"/>
              <path d="M0 30 A 30 30 0 0 1 30 0 L 0 0 Z" fill="var(--color-2)" opacity="0.1"/>
            </g>
            <g id="corner-bottom-right" transform="translate(832, 585) scale(-1, -1)">
              <path d="M0 50 A 50 50 0 0 1 50 0 L 0 0 Z" fill="var(--color-1)" opacity="0.1"/>
              <path d="M0 30 A 30 30 0 0 1 30 0 L 0 0 Z" fill="var(--color-2)" opacity="0.1"/>
            </g>

            <path d="M40,5 C100,20 200,0 300,10 S 450,20 550,5 S 700,-10 750,15 S 800,20 840,10" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
            <path d="M40,590 C100,575 200,595 300,585 S 450,575 550,590 S 700,605 750,580 S 800,575 840,585" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>

          </svg>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
           <Image src="/logo.png" alt="Foxbat EduHub Logo" width={500} height={500} className="transform rotate-[-30deg]"/>
        </div>

        <div className="text-center z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Image src="/logo.png" alt="Foxbat EduHub Logo" width={40} height={40}/>
            <span className="font-headline text-4xl font-bold">Foxbat EduHub</span>
          </div>
          <p className="text-lg text-muted-foreground">Certificate of Completion</p>
        </div>

        <div className="text-center my-8 z-10">
          <p className="text-xl mb-2">This certifies that</p>
          <h2 className="text-4xl sm:text-5xl font-bold font-headline text-primary break-words">
            {name || 'Your Name Here'}
          </h2>
          <p className="text-xl mt-4">has successfully completed the course</p>
          <h3 className="text-2xl sm:text-3xl font-semibold mt-2">{course.title}</h3>
        </div>

        <div className="flex justify-between items-end text-xs text-muted-foreground mt-auto z-10">
           <div>
             <p>Date of Completion: {completionDate || 'Calculating...'}</p>
           </div>
           <div className="border border-muted-foreground/50 rounded-md p-2 text-center">
            <p className="font-mono text-xs">Credential ID: {credentialId}</p>
           </div>
        </div>
      </div>
    </div>
  );
}
