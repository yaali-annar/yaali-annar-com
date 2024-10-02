import type {
  FC,
  InputHTMLAttributes,
} from "react";
import { type ChangeHandler, useFormContext } from "react-hook-form";

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  allowTab?: boolean;
  description?: string;
  label?: string;
  onChange?: ChangeHandler;
}

const CheckBox: FC<CheckBoxProps> = ({ description, name, label, onChange }) => {
  const formContext = useFormContext();
  let registeredProps = {}

  if (formContext && name) {
    const propsFromRegistration = formContext.register(name);
    propsFromRegistration.onChange = async (event) => {
      await propsFromRegistration.onChange(event);
      onChange?.(event)
    }
    registeredProps = propsFromRegistration;
  };
  return (
    <div className="flex flex-col gap-1 lg:gap-2">
      <div className="flex items-center gap-2 lg:gap-4">
        <input type="checkbox" className="h-4 w-4 rounded" {...registeredProps} {...{ onChange }} />
        {label && <label htmlFor={name} className="text-base lg:text-lg">{label} </label>}
      </div>
      {description && <p className="text-sm lg:text-base">{description}</p>}
    </div>
  );
};

export default CheckBox;
