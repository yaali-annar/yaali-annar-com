import { FC, ReactNode, createElement } from "react";
import { Components } from "react-markdown";
import { TOC_ID } from "./constants";

interface ComponentProps {
  children?: ReactNode;
  id?: string;
}

const UlComponent: FC<ComponentProps> = ({ children }) => (
  <ul className="list-disc pl-4">{children}</ul>
);

const TableComponent: FC<ComponentProps> = ({ children }) => (
  <div className="border-colapse border border-yellow-400 rounded my-2 lg:my-4 inline-block overflow-x-auto max-w-full">
    <table>{children}</table>
  </div>
);

const TdComponent: FC<ComponentProps> = ({ children }) => (
  <td className="px-3 py-1">{children}</td>
);

const ThComponent: FC<ComponentProps> = ({ children }) => (
  <th className="px-3 py-1">{children}</th>
);

const generateHeadingComponent = (level: number) => {
  const safeLevel = Math.max(1, Math.min(level, 6));
  const HeadingTag = `h${safeLevel}` as keyof JSX.IntrinsicElements;
  const HeadingComponent: FC<ComponentProps> = ({ children, id }) => (
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
  h2: generateHeadingComponent(2),
  h3: generateHeadingComponent(3),
  h4: generateHeadingComponent(4),
  h5: generateHeadingComponent(5),
  h6: generateHeadingComponent(6),
  ul: UlComponent,
  table: TableComponent,
  td: TdComponent,
  th: ThComponent,
};

export default components;
