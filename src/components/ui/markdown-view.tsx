'use client';

import Image from 'next/image';
import * as React from 'react';
import Markdown from 'react-markdown';

export enum MarkdownStyleType {
  TextPrimary,
  TextMuted,
}

interface Props {
  markdownText: string | null;
  type: MarkdownStyleType;
}

function MarkdownView({
  markdownText,
  type = MarkdownStyleType.TextPrimary,
}: Props) {
  return (
    <Markdown
      components={{
        h1: (props) => (
          <h1
            {...props}
            className={`${getColor(type)} mb-6 text-2xl font-medium`}
          />
        ),
        h2: (props) => (
          <h2
            {...props}
            className={`${getColor(type)} mb-4 text-xl font-medium`}
          />
        ),
        h3: (props) => (
          <h3
            {...props}
            className={`${getColor(type)} mb-3 text-lg font-medium`}
          />
        ),
        h4: (props) => (
          <h4
            {...props}
            className={`${getColor(type)} mb-2 text-base font-medium`}
          />
        ),
        p: (props) => (
          <p
            {...props}
            className={`${getColor(type)} mb-2 text-sm leading-relaxed`}
          />
        ),
        ul: (props) => (
          <ul
            {...props}
            className={`${getColor(type)} mb-2 list-inside list-disc pl-5`}
          />
        ),
        li: (props) => (
          <li
            {...props}
            className={`${getColor(type)} mb-0 text-sm leading-relaxed`}
          />
        ),
        strong: (props) => (
          <strong {...props} className={`${getColor(type)} font-semibold`} />
        ),
        code: (props) => (
          <code
            {...props}
            className={`${getColor(type)} bg-muted rounded-md px-1 py-0.5 text-sm`}
          />
        ),
        blockquote: (props) => (
          <blockquote
            {...props}
            className={`${getColor(type)} border-primary border-l-2 pl-4`}
          />
        ),
        img: ({ src = '', alt = '', width, height, ...props }) => (
          <Image
            src={src.toString()}
            alt={alt}
            width={typeof width === 'number' ? width : 800}
            height={typeof height === 'number' ? height : 600}
            className='mb-2 rounded-md'
            {...props}
          />
        ),
      }}
    >
      {markdownText}
    </Markdown>
  );
}

function getColor(markdownStyleType: MarkdownStyleType): string {
  switch (markdownStyleType) {
    case MarkdownStyleType.TextPrimary:
      return 'text-black';
    case MarkdownStyleType.TextMuted:
      return 'text-muted-foreground';
    default:
      return 'text-black';
  }
}

export { MarkdownView };
