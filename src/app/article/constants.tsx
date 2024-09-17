import Tagalur from '@/articles/tagalur/index.mdx'
import type { Element, MDXProps } from 'mdx/types'

type MDXComponent = (props: MDXProps) => Element

const slugToComponent: Record<string, MDXComponent> = {
  'tagalur': Tagalur
}

export { slugToComponent }