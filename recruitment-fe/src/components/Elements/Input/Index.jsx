import { forwardRef } from "react";
import Label from "./Label";
import Input from "./Input";

const InputForm = forwardRef((props, ref) => {
    const { label, name, type, placeholder, onChange, value, className } =
        props;
    return (
        <div>
            <Label htmlFor={name}>{label}</Label>
            <Input
                name={name}
                type={type}
                placeholder={placeholder}
                ref={ref}
                onChange={onChange}
                value={value}
                className={className}
            />
        </div>
    );
});

InputForm.displayName = "InputForm";

export default InputForm;
