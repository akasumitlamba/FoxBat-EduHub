"use client";

import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CodePlaygroundProps {
  initialCode: {
    html?: string;
    css?: string;
    js?: string;
  };
}

export function CodePlayground({ initialCode }: CodePlaygroundProps) {
  const [html, setHtml] = useState(initialCode.html || '');
  const [css, setCss] = useState(initialCode.css || '');
  const [js, setJs] = useState(initialCode.js || '');
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[600px] not-prose">
      <Card className="flex flex-col">
        <Tabs defaultValue="html" className="flex-1 flex flex-col">
          <CardHeader>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="html">HTML</TabsTrigger>
              <TabsTrigger value="css">CSS</TabsTrigger>
              <TabsTrigger value="js">JavaScript</TabsTrigger>
            </TabsList>
          </CardHeader>
          <TabsContent value="html" className="flex-1 px-6 pb-6 -mt-4">
            <Textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              placeholder="HTML code..."
              className="w-full h-full font-code resize-none bg-background text-foreground"
              aria-label="HTML code editor"
            />
          </TabsContent>
          <TabsContent value="css" className="flex-1 px-6 pb-6 -mt-4">
            <Textarea
              value={css}
              onChange={(e) => setCss(e.target.value)}
              placeholder="CSS code..."
              className="w-full h-full font-code resize-none bg-background text-foreground"
              aria-label="CSS code editor"
            />
          </TabsContent>
          <TabsContent value="js" className="flex-1 px-6 pb-6 -mt-4">
            <Textarea
              value={js}
              onChange={(e) => setJs(e.target.value)}
              placeholder="JavaScript code..."
              className="w-full h-full font-code resize-none bg-background text-foreground"
              aria-label="JavaScript code editor"
            />
          </TabsContent>
        </Tabs>
      </Card>
      <div className="h-full">
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="font-headline text-sm">Preview</CardTitle>
            </CardHeader>
            <CardContent className="h-full pb-6">
                <iframe
                  srcDoc={srcDoc}
                  title="output"
                  sandbox="allow-scripts"
                  frameBorder="0"
                  width="100%"
                  height="90%"
                  className="bg-white rounded-md"
                />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
