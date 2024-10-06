import useRegisteredProps from "@/hooks/use-registered-props";
import type {
  FC,
  InputHTMLAttributes,
} from "react";

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  allowTab?: boolean;
  description?: string;
  label?: string;
}

const CheckBox: FC<CheckBoxProps> = ({ description, name, label, onChange }) => {
  const registeredProps = useRegisteredProps({ name, onChange })
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
