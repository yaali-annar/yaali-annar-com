import type { ChangeEvent, ChangeEventHandler } from "react";
import { useFormContext } from "react-hook-form";

interface UseRegisteredPropsParameters<T> {
  name?: string;
  onChange?: ChangeEventHandler<T>;
}

const useRegisteredProps = <T>({
  name,
  onChange: onChangeFromProps = async () => {},
}: UseRegisteredPropsParameters<T>) => {
  const formContext = useFormContext();

  if (!formContext || !name) {
    return { onChange: onChangeFromProps };
  }

  const registeredProps = formContext.register(name);
  const { onChange } = registeredProps;

  registeredProps.onChange = async (event) => {
    await onChange(event);
    onChange(event as ChangeEvent<T>);
  };

  return registeredProps;
};

export default useRegisteredProps;
