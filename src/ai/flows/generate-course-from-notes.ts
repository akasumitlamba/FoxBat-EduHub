'use server';

/**
 * @fileOverview An AI agent that generates a structured course with modules, lessons, and quizzes from Notion notes.
 *
 * - generateCourseFromNotes - A function that handles the course generation process.
 * - GenerateCourseFromNotesInput - The input type for the generateCourseFromNotes function.
 * - GenerateCourseFromNotesOutput - The return type for the generateCourseFromNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCourseFromNotesInputSchema = z.object({
  notionNotes: z.string().describe('The Notion notes for the course.'),
});
export type GenerateCourseFromNotesInput = z.infer<typeof GenerateCourseFromNotesInputSchema>;

const GenerateCourseFromNotesOutputSchema = z.object({
  courseContent: z
    .string()
    .describe(
      'The structured course content with modules, lessons, and quizzes in JSON format.'
    ),
});
export type GenerateCourseFromNotesOutput = z.infer<typeof GenerateCourseFromNotesOutputSchema>;

export async function generateCourseFromNotes(
  input: GenerateCourseFromNotesInput
): Promise<GenerateCourseFromNotesOutput> {
  return generateCourseFromNotesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCourseFromNotesPrompt',
  input: {schema: GenerateCourseFromNotesInputSchema},
  output: {schema: GenerateCourseFromNotesOutputSchema},
  prompt: `You are an expert course creator. You will take the following Notion notes and generate a structured course with modules, lessons, and quizzes in JSON format.

Notion notes: {{{notionNotes}}}

Please ensure that the output is valid JSON. Focus on creating a well-structured and engaging course.
`,
});

const generateCourseFromNotesFlow = ai.defineFlow(
  {
    name: 'generateCourseFromNotesFlow',
    inputSchema: GenerateCourseFromNotesInputSchema,
    outputSchema: GenerateCourseFromNotesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
