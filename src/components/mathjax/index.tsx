import { FC, useEffect, useState } from "react";

interface MathJaxProps {
  children: string;
}

const MathJax: FC<MathJaxProps> = ({ children }) => {
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (typeof window?.MathJax !== "undefined") {
      setOutput(children);
    }
  }, [children]);

  useEffect(() => {
    window.MathJax.typeset();
  }, [children]);

  return <>{children}</>;
};

export default MathJax;
