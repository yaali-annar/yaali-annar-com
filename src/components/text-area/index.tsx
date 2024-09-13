import type {
  ChangeEvent,
  FC,
  KeyboardEvent,
  Ref,
  TextareaHTMLAttributes,
} from "react";
import { useFormContext } from "react-hook-form";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  allowTab?: boolean;
  label?: string;
}

const TextArea: FC<TextAreaProps> = ({ allowTab, className = '', name, label, ...props }) => {
  const { register } = useFormContext(); // retrieve all hook methods
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
  const registeredProps = name ? register(name) : {};
  return (
    <div className={`flex flex-col gap-1 lg:gap-2 ${className}`} >
      <label className="text-base lg:text-lg" htmlFor={name}>{label}</label>
      <textarea className="w-full" {...props} {...registeredProps} onKeyDown={handleKeyDown} />
    </div>
  );
};

export default TextArea;
