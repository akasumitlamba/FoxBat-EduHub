"use client";

import { useState, useCallback } from 'react';
import type { QuizQuestion } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizProps {
  questions: QuizQuestion[];
  onQuizSubmit: (score: number, total: number) => void;
  lessonId: string;
}

export function Quiz({ questions, onQuizSubmit, lessonId }: QuizProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = questions.reduce((acc, q) => {
    return answers[q.id] === q.correctAnswer ? acc + 1 : acc;
  }, 0);

  const handleAnswerChange = useCallback((questionId: string, value: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  }, [submitted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onQuizSubmit(score, questions.length);
  };
  
  const handleRetake = useCallback(() => {
    setSubmitted(false);
    setAnswers({});
    onQuizSubmit(0, questions.length); // Reset parent state
  }, [onQuizSubmit, questions.length]);

  return (
    <div className="space-y-8 not-prose">
      {submitted && (
        <Alert variant={(score / questions.length) >= 0.7 ? "default" : "destructive"} className="bg-card">
          <AlertTitle>Quiz Results</AlertTitle>
          <AlertDescription>
            You scored {score} out of {questions.length}. {(score / questions.length) >= 0.7 ? "Great job! You passed." : "You need to score at least 70% to pass. Please try again."}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((q, index) => {
          const isCorrect = answers[q.id] === q.correctAnswer;
          const showResult = submitted;

          return (
            <Card key={q.id} className={cn(
              "p-6",
              showResult && (isCorrect ? 'border-primary' : 'border-destructive')
            )}>
              <p className="font-semibold mb-4">{index + 1}. {q.question}</p>
              <RadioGroup
                value={answers[q.id]}
                onValueChange={(value) => handleAnswerChange(q.id, value)}
                disabled={submitted}
              >
                {q.options.map((option, i) => {
                  const isCorrectOption = option === q.correctAnswer;
                  const isSelected = answers[q.id] === option;
                  
                  return (
                    <div key={i} className="flex items-center space-x-2 py-1">
                      <RadioGroupItem value={option} id={`${q.id}-${i}`} />
                      <Label htmlFor={`${q.id}-${i}`} className={cn("flex-1", showResult && isCorrectOption && 'text-primary')}>{option}</Label>
                      {showResult && isSelected && (isCorrect ? <Check className="text-primary"/> : <X className="text-destructive"/>)}
                    </div>
                  );
                })}
              </RadioGroup>
            </Card>
          );
        })}
        
        {!submitted && (
          <Button type="submit" disabled={Object.keys(answers).length !== questions.length}>
            Submit Quiz
          </Button>
        )}
        {submitted && (score / questions.length) < 0.7 && (
          <Button onClick={handleRetake} type="button">
            Retake Quiz
          </Button>
        )}
      </form>
    </div>
  );
}
