import useRegisteredProps from "@/hooks/use-registered-props";
import type {
  ChangeEventHandler,
  FC,
} from "react";

interface RadioButtonOption {
  label: string;
  value: string;
  description?: string;
}

interface RadioButtonGroupProps {
  name: string;
  options: RadioButtonOption[];
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const RadioButtonGroup: FC<RadioButtonGroupProps> = ({ name, options, onChange }) => {
  const registeredProps = useRegisteredProps({ onChange, name })

  return (
    <div className="flex flex-col gap-2 lg:gap-4">
      {options.map(({ label, value, description }) => (
        <div key={value} className="flex flex-col gap-1">
          <div className="flex items-center gap-2 lg:gap-4">
            <input
              type="radio"
              className="h-4 w-4 rounded-full"
              value={value}
              {...registeredProps}
            />
            {label && <label htmlFor={name} className="text-base lg:text-lg">{label}</label>}
          </div>
          {description && <p className="text-sm lg:text-base">{description}</p>}
        </div>
      ))}
    </div>
  );
};

export default RadioButtonGroup;
