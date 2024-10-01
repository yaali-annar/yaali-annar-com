import type {
  FC,
  InputHTMLAttributes,
} from "react";
import { useFormContext } from "react-hook-form";

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  allowTab?: boolean;
  description?: string;
  label?: string;
}

const CheckBox: FC<CheckBoxProps> = ({ allowTab, description, name, label }) => {
  const { register } = useFormContext();
  const registeredProps = name ? register(name) : {};
  return (
    <div className="flex flex-col gap-1 lg:gap-2">
      <div className="flex items-center gap-2 lg:gap-4">
        <input type="checkbox" className="h-4 w-4 rounded" {...registeredProps} />
        {label && <label htmlFor={name} className="text-base lg:text-lg">{label} </label>}
      </div>
      {description && <p className="text-sm lg:text-base">{description}</p>}
    </div>
  );
};

export default CheckBox;
