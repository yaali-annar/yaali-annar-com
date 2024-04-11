import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeToc from "@jsdevtools/rehype-toc";
import rehypeSlug from "rehype-slug";
import { FC } from "react";

import style from "./styles.module.css";

interface Props {
  children: string;
}

const tocId = "table-of-contents";

const NavComponent: Components["nav"] = ({ children }) => (
  <nav className={style.toc}>
    <h2 className="mt-2" id={tocId}>
      Table of Contents
    </h2>
    {children}
  </nav>
);

const H2Component: Components["h2"] = ({ children, id }) => (
  <div id={id} className="flex justify-between">
    <h2>{children}</h2>
    <a className="text-yellow-600" href={`#${tocId}`}>
      [Back]
    </a>
  </div>
);

const CustomMarkdown: FC<Props> = ({ children }) => (
  <ReactMarkdown
    remarkPlugins={[remarkMath, remarkGfm]}
    rehypePlugins={[
      rehypeSlug,
      [
        rehypeToc,
        {
          cssClasses: { listItem: style.listItem },
        },
      ],
      rehypeKatex,
    ]}
    components={{
      h2: H2Component,
      nav: NavComponent,
    }}
  >
    {children}
  </ReactMarkdown>
);

export default CustomMarkdown;
