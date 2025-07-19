import type { Course } from '@/lib/types';

export const initialCourses: Course[] = [
  {
    id: 'introduction-to-web-development',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development, including HTML, CSS, and JavaScript.',
    modules: [
      {
        id: 'module-1-html',
        title: 'Module 1: The Basics of HTML',
        lessons: [
          {
            id: 'html-intro',
            slug: 'html-introduction',
            title: 'Introduction to HTML',
            type: 'theory',
            content: `
              <p>HTML, or HyperText Markup Language, is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript.</p>
              <h3 class="font-headline">Key Concepts:</h3>
              <ul>
                <li><strong>Elements:</strong> The building blocks of HTML pages. They are represented by &lt;tags&gt;.</li>
                <li><strong>Tags:</strong> Keywords surrounded by angle brackets like &lt;html&gt;, &lt;head&gt;, &lt;body&gt;.</li>
                <li><strong>Attributes:</strong> Provide additional information about elements.</li>
              </ul>
              <p>In the next lesson, you'll get to write your first HTML code!</p>
            `,
          },
          {
            id: 'html-playground',
            slug: 'html-playground',
            title: 'Your First HTML Page',
            type: 'code',
            code: {
              html: `<h1>Hello, World!</h1>\n<p>This is my first web page.</p>`,
              css: `body {\n  font-family: sans-serif;\n  background-color: #f0f0f0;\n}\nh1 {\n  color: #30D5C8;\n}`,
              js: `console.log("Hello from the console!");`
            },
          },
        ],
      },
      {
        id: 'module-2-css',
        title: 'Module 2: Styling with CSS',
        lessons: [
          {
            id: 'css-intro',
            slug: 'css-introduction',
            title: 'Introduction to CSS',
            type: 'theory',
            content: `
              <p>Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language like HTML. CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.</p>
              <h3 class="font-headline">Core Principles:</h3>
              <ul>
                <li><strong>Selectors:</strong> Patterns used to select the element(s) you want to style.</li>
                <li><strong>Properties:</strong> The stylistic aspect of an element you want to change (e.g., color, font-size).</li>
                <li><strong>Values:</strong> The setting you want to apply to the chosen property.</li>
              </ul>
            `,
          },
          {
            id: 'css-playground',
            slug: 'css-playground',
            title: 'Styling Practice',
            type: 'code',
            code: {
              html: `<div class="card">\n  <h2>Styled Card</h2>\n  <p>This card has a custom style!</p>\n  <button class="btn">Click Me</button>\n</div>`,
              css: `.card {\n  padding: 20px;\n  border-radius: 8px;\n  background-color: #444;\n  box-shadow: 0 4px 8px rgba(0,0,0,0.2);\n}\n.btn {\n  background-color: #A78BFA;\n  color: #111;\n  border: none;\n  padding: 10px 15px;\n  border-radius: 5px;\n  cursor: pointer;\n}`,
              js: `document.querySelector('.btn').addEventListener('click', () => {\n  alert('Button clicked!');\n});`
            },
          },
        ],
      },
      {
        id: 'module-3-js',
        title: 'Module 3: Interactive JavaScript',
        lessons: [
           {
            id: 'js-intro',
            slug: 'js-introduction',
            title: 'Introduction to JavaScript',
            type: 'theory',
            content: `
              <p>JavaScript is a programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.</p>
              <p>It enables interactive web pages and is an essential part of web applications. The vast majority of websites use it for client-side page behavior, and all major web browsers have a dedicated JavaScript engine to execute it.</p>
            `,
          },
          {
            id: 'js-quiz',
            slug: 'javascript-quiz',
            title: 'JavaScript Knowledge Check',
            type: 'quiz',
            quiz: [
              {
                id: 'q1',
                question: 'What keyword is used to declare a variable in JavaScript?',
                options: ['var', 'let', 'const', 'All of the above'],
                correctAnswer: 'All of the above',
              },
              {
                id: 'q2',
                question: 'Which of the following is NOT a primitive data type in JavaScript?',
                options: ['String', 'Number', 'Object', 'Boolean'],
                correctAnswer: 'Object',
              },
            ],
          },
        ],
      },
    ],
  },
];

export const getCourses = (): Course[] => {
  if (typeof window === 'undefined') {
    return initialCourses;
  }
  try {
    const savedCourses = localStorage.getItem('kalixa-courses');
    if (savedCourses) {
      return JSON.parse(savedCourses);
    }
  } catch (error) {
    console.error("Failed to parse courses from localStorage", error);
    return initialCourses;
  }
  return initialCourses;
};

export const getCourseById = (id: string): Course | undefined => {
  return getCourses().find(course => course.id === id);
};

export const saveCourses = (coursesToSave: Course[]) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('kalixa-courses', JSON.stringify(coursesToSave));
    } catch (error) {
      console.error("Failed to save courses to localStorage", error);
    }
  }
};
