import type {
  FC,
  InputHTMLAttributes,
} from "react";
import { useFormContext } from "react-hook-form";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  description?: string;
  label?: string;
}

const TextInput: FC<TextInputProps> = ({ description, name, label, ...props }) => {
  const { register } = useFormContext();
  const registeredProps = name ? register(name) : {};
  return (
    <div className="flex flex-col gap-1 lg:gap-2">
      {label && <label htmlFor={name} className="text-base lg:text-lg">{label} </label>}
      <input type="text" className="w-full" {...registeredProps} />
      {description && <p className="text-sm lg:text-base">{description}</p>}
    </div>
  );
};

export default TextInput;
