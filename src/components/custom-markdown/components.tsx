import {
  createElement,
  isValidElement,
} from "react";
import type {
  AnchorHTMLAttributes,
  FC,
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";
import type { Components } from "react-markdown";
import { TOC_ID } from "./constants";
import Gloss from "./gloss";

const PreComponent: FC<HTMLAttributes<HTMLPreElement>> = ({ children }) => {
  if (isValidElement(children)) {
    const { className, children: code } = children.props;
    if (className === "language-gloss" && typeof code === "string") {
      return <Gloss>{code}</Gloss>;
    }
  }
  return <pre>{children}</pre>;
};

const UlComponent: FC<HTMLAttributes<HTMLUListElement>> = ({ children }) => (
  <ul className="list-disc pl-4">{children}</ul>
);

const TableComponent: FC<TableHTMLAttributes<HTMLTableElement>> = ({ children }) => (
  <div className="border-colapse border border-yellow-400 rounded my-2 lg:my-4 inline-block overflow-x-auto max-w-full">
    <table>{children}</table>
  </div>
);

const TdComponent: FC<TdHTMLAttributes<HTMLTableCellElement>> = ({ children }) => (
  <td className="px-3 py-1">{children}</td>
);

const ThComponent: FC<ThHTMLAttributes<HTMLTableCellElement>> = ({ children }) => (
  <th className="px-3 py-1">{children}</th>
);

const AComponent: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  children = "",
  href = "",
}) => (
  <a className="text-black bg-yellow-400 px-2 rounded-full" href={href}>
    {children}
  </a>
);

const generateHeadingComponent = (level: number) => {
  const safeLevel = Math.max(1, Math.min(level, 6));
  const HeadingTag = `h${safeLevel}` as keyof JSX.IntrinsicElements;
  const HeadingComponent: FC<HTMLAttributes<HTMLHeadingElement>> = ({
    children,
    id,
  }) => (
    <>
      <div id={id} className="flex justify-between items-center">
        {createElement(HeadingTag, {}, children)}
        {id !== TOC_ID && (
          <>
            <div className="grow px-2">
              <hr className="border-yellow-500" />
            </div>
            <a className="text-yellow-600" href={`#${TOC_ID}`}>
              [Back]
            </a>
          </>
        )}
      </div>
    </>
  );
  return HeadingComponent;
};

const components: Components = {
  a: AComponent,
  h2: generateHeadingComponent(2),
  h3: generateHeadingComponent(3),
  h4: generateHeadingComponent(4),
  h5: generateHeadingComponent(5),
  h6: generateHeadingComponent(6),
  ul: UlComponent,
  pre: PreComponent,
  table: TableComponent,
  td: TdComponent,
  th: ThComponent,
};

export default components;
