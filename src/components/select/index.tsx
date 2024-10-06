import useRegisteredProps from "@/hooks/use-registered-props";
import type {
  FC,
  SelectHTMLAttributes,
} from "react";

interface Option {
  value: number | string
  text?: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  description?: string;
  label?: string;
  options: Option[];
}

const Select: FC<SelectProps> = ({ description, label, name, onChange, options, ...props }) => {
  const registeredProps = useRegisteredProps({ onChange, name })
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
