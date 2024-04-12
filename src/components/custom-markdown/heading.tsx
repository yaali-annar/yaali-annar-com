import { FC, ReactNode, createElement } from "react";
import { TOC_ID } from "./constants";

interface HeadingComponentProps {
  children?: ReactNode;
  id?: string;
}

const generateHeadingComponent = (level: number) => {
  const safeLevel = Math.max(1, Math.min(level, 6));
  const HeadingTag = `h${safeLevel}` as keyof JSX.IntrinsicElements;
  const HeadingComponent: FC<HeadingComponentProps> = ({ children, id }) => (
    <div id={id} className="flex justify-between">
      {createElement(HeadingTag, {}, children)}
      {id !== TOC_ID && (
        <a className="text-yellow-600" href={`#${TOC_ID}`}>
          [Back]
        </a>
      )}
    </div>
  );
  return HeadingComponent;
};

export default generateHeadingComponent;
