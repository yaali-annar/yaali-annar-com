import type {
  FC,
  SelectHTMLAttributes,
} from "react";
import { useFormContext } from "react-hook-form";

interface Option {
  value: number | string
  text?: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  description?: string;
  label?: string;
  options: Option[];
}

const Select: FC<SelectProps> = ({ description, label, name, options, ...props }) => {
  const formContext = useFormContext();
  const registeredProps = (formContext && name) ? formContext.register(name) : {};
  return (
    <div className="flex flex-col gap-1 lg:gap-2">
      {label && <label htmlFor={name} className="text-base lg:text-lg">{label} </label>}
      <select {...registeredProps} {...props}>
        {options.map(({ text, value }) => <option key={value} value={value}>{text ?? value}</option>)}
      </select>
      {description && <p className="text-sm lg:text-base">{description}</p>}
    </div>
  );
};

export default Select;
