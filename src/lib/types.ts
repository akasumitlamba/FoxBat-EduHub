export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  type: 'theory' | 'code' | 'quiz';
  content?: string;
  code?: {
    html?: string;
    css?: string;
    js?: string;
  };
  quiz?: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
}
