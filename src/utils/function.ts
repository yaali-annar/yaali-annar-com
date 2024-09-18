type KeyMapping = string[];
type AccessibleProps = {
  onClick: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  tabIndex: number;
  role: string;
};

const createAccessibleProps = (
  handler: () => void,
  keyMapping: KeyMapping = ["Enter", " "]
): AccessibleProps => {
  return {
    onClick: handler,
    onKeyPress: (e: React.KeyboardEvent) => {
      if (keyMapping.includes(e.key)) {
        handler();
      }
    },
    tabIndex: 0, // Makes the element focusable
    role: "button", // Indicates this element is a button to assistive technology
  };
};

export { createAccessibleProps };
