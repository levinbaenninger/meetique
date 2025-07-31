'use client';

import * as React from 'react';
import Markdown from 'react-markdown';

interface Props {
  markdownText: string | null;
}

function MarkdownView({ markdownText }: Props) {
  return (
    <Markdown
      components={{
        h1: (props) => <h1 {...props} className='mb-6 text-2xl font-medium' />,
        h2: (props) => <h2 {...props} className='mb-4 text-xl font-medium' />,
        h3: (props) => <h3 {...props} className='mb-3 text-lg font-medium' />,
        h4: (props) => <h4 {...props} className='mb-2 text-base font-medium' />,
        p: (props) => (
          <p
            {...props}
            className='text-muted-foreground mb-2 text-sm leading-relaxed'
          />
        ),
        ul: (props) => (
          <ul {...props} className='mb-2 list-inside list-disc pl-5' />
        ),
        li: (props) => (
          <li
            {...props}
            className='text-muted-foreground mb-0 text-sm leading-relaxed'
          />
        ),
        strong: (props) => (
          <strong {...props} className='text-muted-foreground font-semibold' />
        ),
        code: (props) => (
          <code
            {...props}
            className='text-muted-foreground bg-muted rounded-md px-1 py-0.5 text-sm'
          />
        ),
        blockquote: (props) => (
          <blockquote
            {...props}
            className='text-muted-foreground border-primary border-l-2 pl-4'
          />
        ),
        img: (props) => (
          <img {...props} className='mb-2 rounded-md' alt={props.alt} />
        ),
      }}
    >
      {markdownText}
    </Markdown>
  );
}

export { MarkdownView };
