import { ChangeEvent, FC, KeyboardEvent, TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  allowTab?: boolean;
}

const TextArea: FC<TextAreaProps> = ({ allowTab, ...props }) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Tab" && allowTab) {
      event.preventDefault(); // Prevent the default focus change
      const textarea = event.target as HTMLTextAreaElement;

      // Insert tab character at the cursor position
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;
      const beforeCursor = value.substring(0, start);
      const afterCursor = value.substring(end);

      // Set the new value with the tab inserted
      textarea.value = `${beforeCursor}\t${afterCursor}`;
      // Move the cursor after the tab
      textarea.selectionStart = textarea.selectionEnd = start + 1;

      // Trigger onChange event manually if it exists
      if (props.onChange) {
        const fakeEvent = {
          ...event,
          target: textarea,
        } as ChangeEvent<HTMLTextAreaElement>;
        props.onChange(fakeEvent);
      }
    }
  };

  return <textarea {...props} onKeyDown={handleKeyDown} />;
};

export default TextArea;
