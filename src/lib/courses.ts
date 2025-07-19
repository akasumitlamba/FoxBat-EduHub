import type { Course } from '@/lib/types';

export const initialCourses: Course[] = [
  {
    id: 'html-fundamentals',
    title: 'HTML Fundamentals',
    description: 'Learn the foundational language of the web. This course covers everything from basic tags to complex forms.',
    bannerImage: 'https://placehold.co/600x400.png',
    modules: [
      {
        id: 'module-1-basics',
        title: 'Module 1: Getting Started with HTML',
        lessons: [
          {
            id: 'html-intro',
            slug: 'html-introduction',
            title: 'What is HTML?',
            type: 'theory',
            content: `
              <p>HTML (HyperText Markup Language) is the standard language for creating web pages. It provides the structure for content on the internet.</p>
              <p>In this course, we'll use a simple mnemonic to remember the core technologies of the web:</p>
              <ul>
                <li><strong>PURPLE - CSS</strong> (For styling)</li>
                <li><strong>DINO - HTML</strong> (For structure)</li>
                <li><strong>DANCED - JS</strong> (For interactivity)</li>
              </ul>
              <p>Let's dive into the DINO and learn about HTML tags!</p>
            `,
          },
          {
            id: 'p-tag',
            slug: 'p-tag',
            title: 'Paragraph Tag',
            type: 'theory',
            content: `
              <h3>Paragraph Tag (&lt;p&gt;)</h3>
              <p>The <code>&lt;p&gt;</code> tag defines a paragraph. It's one of the most common tags you'll use. Browsers automatically add some space (a margin) before and after each paragraph.</p>
              <pre><code>&lt;p&gt;This is a paragraph.&lt;/p&gt;\n&lt;p&gt;This is another paragraph.&lt;/p&gt;</code></pre>
            `,
          },
          {
            id: 'heading-tags',
            slug: 'heading-tags',
            title: 'Heading Tags',
            type: 'theory',
            content: `
              <h3>Heading Tags (&lt;h1&gt; to &lt;h6&gt;)</h3>
              <p>Heading tags are used to define headings for your sections. <code>&lt;h1&gt;</code> defines the most important heading, while <code>&lt;h6&gt;</code> defines the least important.</p>
              <pre><code>&lt;h1&gt;This is Heading 1&lt;/h1&gt;\n&lt;h2&gt;This is Heading 2&lt;/h2&gt;\n&lt;h3&gt;This is Heading 3&lt;/h3&gt;</code></pre>
            `,
          },
           {
            id: 'bold-tag',
            slug: 'bold-tag',
            title: 'Bold Tag',
            type: 'theory',
            content: `
              <h3>Bold Tag (&lt;b&gt;)</h3>
              <p>The <code>&lt;b&gt;</code> tag specifies bold text without any extra importance. It's used for drawing attention to text stylistically.</p>
              <pre><code>&lt;p&gt;This text is normal, but this is &lt;b&gt;bold&lt;/b&gt;.&lt;/p&gt;</code></pre>
            `,
          },
          {
            id: 'lists-playground',
            slug: 'lists-playground',
            title: 'Working with Lists',
            type: 'code',
            content: `
              <p>HTML offers two main types of lists: ordered lists (<code>&lt;ol&gt;</code>) for numbered items, and unordered lists (<code>&lt;ul&gt;</code>) for bulleted items. Each item within a list is defined by a list item (<code>&lt;li&gt;</code>) tag. You can even nest lists inside each other!</p>
            `,
            code: {
              html: `<p>My favorite colors:</p>
<ul>
  <li>Blue</li>
  <li>Green</li>
  <li>Purple</li>
</ul>

<p>My top 3 priorities:</p>
<ol>
  <li>Learn HTML</li>
  <li>Practice coding</li>
  <li>Build a website
    <ul>
      <li>Design first</li>
      <li>Then code</li>
    </ul>
  </li>
</ol>`,
              css: `body {
  font-family: sans-serif;
  line-height: 1.6;
}`
            },
          },
          {
            id: 'basics-quiz',
            slug: 'basics-quiz',
            title: 'Basics Knowledge Check',
            type: 'quiz',
            quiz: [
              {
                id: 'q-basics-1',
                question: 'Which tag is used to define the most important heading?',
                options: ['<h6>', '<h1>', '<head>', '<p>'],
                correctAnswer: '<h1>',
              },
               {
                id: 'q-basics-2',
                question: 'How do you create a bulleted list?',
                options: ['<ol>', '<ul>', '<list>', '<li>'],
                correctAnswer: '<ul>',
              }
            ]
          }
        ]
      },
      {
        id: 'module-2-links-media',
        title: 'Module 2: Links, Images, and Attributes',
        lessons: [
          {
            id: 'anchor-tag',
            slug: 'anchor-tag',
            title: 'The Anchor Tag',
            type: 'code',
            content: `
              <h3>Anchor Tag (&lt;a&gt;)</h3>
              <p>The <code>&lt;a&gt;</code> tag creates hyperlinks. The <code>href</code> attribute is essential as it specifies the link's destination URL.</p>
              <p>To make a link open in a new browser tab, you can add the <code>target="_blank"</code> attribute.</p>
            `,
            code: {
              html: `<p>Visit our search engine of choice:</p>
<a href="https://www.google.com" target="_blank">Go to Google</a>`
            }
          },
          {
            id: 'img-tag',
            slug: 'img-tag',
            title: 'The Image Tag',
            type: 'code',
            content: `
              <h3>Image Tag (&lt;img&gt;)</h3>
              <p>The <code>&lt;img&gt;</code> tag embeds an image. It's a self-closing tag and requires two main attributes:</p>
              <ul>
                <li><strong><code>src</code></strong>: Specifies the path or URL to the image.</li>
                <li><strong><code>alt</code></strong>: Provides alternative text for screen readers and if the image fails to load. This is very important for accessibility!</li>
              </ul>
            `,
            code: {
              html: `<h1>My Favorite Animal</h1>
<p>Here is a placeholder picture of a cat.</p>
<img 
  src="https://placehold.co/300x200.png" 
  alt="A placeholder image of a cute cat"
  width="300"
  height="200"
>`,
            },
          },
          {
            id: 'comments',
            slug: 'comments',
            title: 'HTML Comments',
            type: 'theory',
            content: `
              <h3>Comments in HTML</h3>
              <p>Comments are notes in your code that are not displayed in the browser. They start with <code>&lt;!--</code> and end with <code>--&gt;</code>. They are useful for explaining your code to yourself and others.</p>
              <pre><code>&lt;!-- This is a comment, it won't show up! --&gt;\n&lt;p&gt;This paragraph, however, will be displayed.&lt;/p&gt;</code></pre>
            `,
          },
          {
            id: 'links-media-quiz',
            slug: 'links-media-quiz',
            title: 'Links & Media Quiz',
            type: 'quiz',
            quiz: [
              {
                id: 'q-links-1',
                question: 'Which attribute specifies the destination of a link?',
                options: ['src', 'link', 'href', 'dest'],
                correctAnswer: 'href',
              },
               {
                id: 'q-links-2',
                question: 'What is the purpose of the `alt` attribute on an `<img>` tag?',
                options: ['To add a caption', 'For accessibility and as a fallback', 'To set the image title', 'To link the image'],
                correctAnswer: 'For accessibility and as a fallback',
              }
            ]
          }
        ]
      },
      {
        id: 'module-3-structure',
        title: 'Module 3: Structuring Content',
        lessons: [
          {
            id: 'block-inline',
            slug: 'block-inline',
            title: 'Block vs. Inline Elements',
            type: 'theory',
            content: `
              <p>HTML elements are categorized into two main types: block-level and inline.</p>
              <h4>Block-Level Elements</h4>
              <p>These elements start on a new line and take up the full width available. Think of them as building blocks that stack on top of each other. Examples: <code>&lt;div&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;h1&gt;-&lt;h6&gt;</code>.</p>
              <h4>Inline Elements</h4>
              <p>These elements do not start on a new line and only take up as much width as necessary. They flow within the text. Examples: <code>&lt;span&gt;</code>, <code>&lt;a&gt;</code>, <code>&lt;b&gt;</code>, <code>&lt;img&gt;</code>.</p>
            `,
          },
          {
            id: 'div-span-playground',
            slug: 'div-span-playground',
            title: 'Div and Span Practice',
            type: 'code',
            content: `
              <p>The <code>&lt;div&gt;</code> tag is a generic block-level container used to group other elements, often for layout and styling with CSS. The <code>&lt;span&gt;</code> tag is its inline equivalent, used to group and style parts of text without breaking the flow.</p>
            `,
            code: {
              html: `<div class="container">
  <h2>A Title in a Div</h2>
  <p>
    This paragraph contains a <span class="highlight">highlighted</span> word.
    Divs help structure the page, while spans target specific parts of content.
  </p>
</div>
<div class="container">
  <p>This is a second container.</p>
</div>`,
              css: `body {
  font-family: sans-serif;
}
.container {
  background-color: #eee;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
}
.highlight {
  color: #8B5CF6; /* a nice purple */
  font-weight: bold;
}`,
            }
          },
          {
            id: 'semantic-html',
            slug: 'semantic-html',
            title: 'Semantic Markup',
            type: 'theory',
            content: `
              <p>Semantic markup involves using HTML tags that convey the meaning and structure of the content, not just its presentation. This helps search engines, screen readers, and other developers understand your website's structure.</p>
              <ul>
                <li><code>&lt;header&gt;</code>: Introductory content for a page or section.</li>
                <li><code>&lt;nav&gt;</code>: A set of navigation links.</li>
                <li><code>&lt;main&gt;</code>: The main, unique content of the page.</li>
                <li><code>&lt;article&gt;</code>: A self-contained piece of content (e.g., a blog post).</li>
                <li><code>&lt;section&gt;</code>: A thematic grouping of content.</li>
                <li><code>&lt;footer&gt;</code>: Footer content, like copyrights or contact info.</li>
              </ul>
            `,
          },
          {
            id: 'tables',
            slug: 'tables',
            title: 'Creating Tables',
            type: 'code',
            content: `
              <p>Tables are used to display data in rows and columns. They are made up of several tags working together: <code>&lt;table&gt;</code>, <code>&lt;tr&gt;</code> (row), <code>&lt;th&gt;</code> (header cell), and <code>&lt;td&gt;</code> (data cell).</p>
            `,
            code: {
              html: `<table>
  <thead>
    <tr>
      <th>Animal</th>
      <th>Average Mass (kg)</th>
      <th>Available</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Elephant</td>
      <td>6000</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Giraffe</td>
      <td>2600</td>
      <td>No</td>
    </tr>
    <tr>
      <td>Zebra</td>
      <td>500</td>
      <td>Yes</td>
    </tr>
  </tbody>
</table>`,
              css: `table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
thead {
  background-color: #f2f2f2;
}
`
            }
          },
          {
            id: 'structure-quiz',
            slug: 'structure-quiz',
            title: 'Structure Knowledge Check',
            type: 'quiz',
            quiz: [
              {
                id: 'q-struct-1',
                question: 'Which of the following is a block-level element?',
                options: ['<span>', '<a>', '<img>', '<div>'],
                correctAnswer: '<div>',
              },
               {
                id: 'q-struct-2',
                question: 'Which tag should be used for the main content of a page?',
                options: ['<section>', '<main>', '<article>', '<content>'],
                correctAnswer: '<main>',
              }
            ]
          }
        ]
      },
      {
        id: 'module-4-forms',
        title: 'Module 4: Building Forms',
        lessons: [
          {
            id: 'form-basics',
            slug: 'form-basics',
            title: 'Form & Input Basics',
            type: 'theory',
            content: `
              <p>Forms are a key part of the interactive web, allowing users to send data to a server.</p>
              <ul>
                <li><strong><code>&lt;form&gt;</code></strong>: The container for all form controls.</li>
                <li><strong><code>&lt;label&gt;</code></strong>: A caption for an input field. The <code>for</code> attribute links it to an input's <code>id</code>, improving accessibility.</li>
                <li><strong><code>&lt;input&gt;</code></strong>: The most versatile form element. Its behavior is defined by its <code>type</code> attribute.</li>
              </ul>
            `
          },
          {
            id: 'form-playground',
            slug: 'form-playground',
            title: 'Your First Form',
            type: 'code',
            content: `
              <p>Let's build a simple contact form. Notice how the <code>label</code>'s <code>for</code> attribute matches the <code>input</code>'s <code>id</code> attribute. This is best practice for accessibility, allowing users to click the label to focus on the input field.</p>
            `,
            code: {
              html: `<form action="/submit-form">
  <label for="name">Name:</label><br>
  <input type="text" id="name" name="user_name"><br><br>

  <label for="email">Email:</label><br>
  <input type="email" id="email" name="user_email"><br><br>

  <label for="password">Password:</label><br>
  <input type="password" id="password" name="user_password" placeholder="Enter a secure password"><br><br>

  <input type="submit" value="Submit">
</form>`,
              css: `label {
  display: block;
  margin-top: 10px;
}
input[type="text"],
input[type="email"],
input[type="password"] {
  width: 90%;
  padding: 8px;
  margin-top: 4px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
input[type="submit"] {
  background-color: #2563EB;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}`
            }
          },
          {
            id: 'more-inputs',
            slug: 'more-inputs',
            title: 'More Input Types',
            type: 'theory',
            content: `
              <p>Beyond text fields, HTML provides a rich set of input types for better user experience and data collection.</p>
              <ul>
                <li><strong>Radio Buttons <code>(type="radio")</code></strong>: Allow selecting one option from a group. All radio buttons in a group must share the same <code>name</code> attribute.</li>
                <li><strong>Checkboxes <code>(type="checkbox")</code></strong>: Allow selecting zero or more options from a set.</li>
                <li><strong>Dropdowns <code>(&lt;select&gt;)</code></strong>: A dropdown list of options, defined by <code>&lt;option&gt;</code> tags.</li>
              </ul>
            `
          },
          {
            id: 'selection-playground',
            slug: 'selection-playground',
            title: 'Selection Controls Practice',
            type: 'code',
            content: `
              <p>Practice using radio buttons, checkboxes, and select dropdowns. These are essential for gathering structured user input.</p>
            `,
            code: {
              html: `<!-- Radio Buttons for single choice -->
<p>Favorite Language:</p>
<input type="radio" id="html" name="fav_language" value="HTML">
<label for="html">HTML</label><br>
<input type="radio" id="css" name="fav_language" value="CSS">
<label for="css">CSS</label><br>
<input type="radio" id="js" name="fav_language" value="JavaScript">
<label for="js">JavaScript</label><br><br>

<!-- Checkboxes for multiple choices -->
<p>What vehicles do you own?</p>
<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
<label for="vehicle1">I have a bike</label><br>
<input type="checkbox" id="vehicle2" name="vehicle2" value="Car">
<label for="vehicle2">I have a car</label><br><br>

<!-- Select dropdown -->
<label for="cars">Choose a car:</label>
<select name="cars" id="cars">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
</select>`
            }
          },
          {
            id: 'form-validation',
            slug: 'form-validation',
            title: 'Form Validation',
            type: 'code',
            content: `
              <p>HTML has built-in validation attributes to ensure users provide valid input without needing JavaScript.</p>
              <ul>
                <li><strong><code>required</code></strong>: The field must be filled out.</li>
                <li><strong><code>minlength</code> / <code>maxlength</code></strong>: Defines the minimum and maximum number of characters for a text field.</li>
                <li><strong><code>min</code> / <code>max</code></strong>: Defines the minimum and maximum values for a number field.</li>
              </ul>
              <p>Try submitting the form below without filling out the required field.</p>
            `,
            code: {
              html: `<form action="/form">
  <label for="username">Username:</label><br>
  <input type="text" id="username" name="username" required minlength="5" maxlength="15" placeholder="5-15 characters"><br><br>
  <input type="submit">
</form>`
            }
          },
          {
            id: 'final-quiz',
            slug: 'final-quiz',
            title: 'Final HTML Quiz',
            type: 'quiz',
            quiz: [
              {
                id: 'q-final-1',
                question: 'Which attribute is used to group radio buttons together?',
                options: ['id', 'group', 'name', 'class'],
                correctAnswer: 'name',
              },
               {
                id: 'q-final-2',
                question: 'To make an input field mandatory, which attribute should you use?',
                options: ['validate', 'important', 'required', 'must-fill'],
                correctAnswer: 'required',
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'introduction-to-css',
    title: 'Introduction to CSS',
    description: 'Learn how to style your web pages and bring your designs to life with Cascading Style Sheets.',
    bannerImage: 'https://placehold.co/600x400.png',
    modules: []
  }
];

let courses: Course[] | null = null;

export const getCourses = (): Course[] => {
  if (typeof window === 'undefined') {
    return initialCourses;
  }
  if (courses) {
    return courses;
  }
  try {
    const storedCourses = localStorage.getItem('kalixa-courses');
    if (storedCourses) {
      courses = JSON.parse(storedCourses);
    } else {
      courses = initialCourses;
      saveCourses(courses);
    }
  } catch (e) {
    console.error('Failed to parse courses from localStorage', e);
    courses = initialCourses;
  }
  return courses!;
};

export const saveCourses = (newCourses: Course[]) => {
  courses = newCourses;
  if (typeof window !== 'undefined') {
    localStorage.setItem('kalixa-courses', JSON.stringify(courses));
  }
};


export const getCourseById = (id: string): Course | undefined => {
  return getCourses().find(course => course.id === id);
};
