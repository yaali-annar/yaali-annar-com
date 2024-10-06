import type { ChangeEvent, ChangeEventHandler } from "react";
import { useFormContext } from "react-hook-form";

interface UseRegisteredPropsParameters<T> {
  name?: string;
  onChange?: ChangeEventHandler<T>;
}

const useRegisteredProps = <T>({
  name,
  onChange = async () => {},
}: UseRegisteredPropsParameters<T>) => {
  const formContext = useFormContext();

  if (!formContext || !name) {
    return { onChange };
  }

  const registeredProps = formContext.register(name);

  registeredProps.onChange = async (event) => {
    await registeredProps.onChange(event);
    onChange(event as ChangeEvent<T>);
  };

  return registeredProps;
};

export default useRegisteredProps;
