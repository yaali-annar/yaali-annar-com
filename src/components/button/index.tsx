import { createAccessibleProps } from "@/utils/function";
import { classNames } from "@/utils/string";
import type { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick: () => void;
    primary?: boolean;
    secondary?: boolean;
}

const Button: FC<ButtonProps> = ({ className: classNameFromProps = '', primary = false, secondary = false, onClick, ...rest }) => {
    const interactiveProps = onClick ? createAccessibleProps(onClick) : {}
    const className = classNames(classNameFromProps, 'btn', {
        'btn-primary': primary, 'btn-secondary': secondary
    })
    return <button {...{ className }} {...interactiveProps} {...rest} />
}

export default Button