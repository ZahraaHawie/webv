import { PortableText } from '@portabletext/react'
import { urlFor } from './client'

// Custom components for rendering different block types
const components = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="my-4">
          <img
            src={urlFor(value).url()}
            alt={value.alt || 'Image'}
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {children}
        </a>
      )
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mb-4 mt-6">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mb-3 mt-5">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-semibold mb-2 mt-4">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-semibold mb-2 mt-3">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
    ),
  },
}

export function PortableTextComponent({ value }: { value: any }) {
  return <PortableText value={value} components={components} />
}
