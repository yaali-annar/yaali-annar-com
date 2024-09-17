import type { MDXComponents } from 'mdx/types'
import components from './components/custom-markdown/components'

export const useMDXComponents = (mdxComponents: MDXComponents): MDXComponents => ({
  ...components,
  ...mdxComponents,
})