import React, { useState } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

interface InputFieldProps<TFormValues extends FieldValues> {
  type?: string;
  name: Path<TFormValues>;
  placeholder: string;
  register: UseFormRegister<TFormValues>;
  errors: FieldErrors;
  className?: string;
}

const InputField = <TFormValues extends FieldValues>({
  type,
  name,
  placeholder,
  register,
  errors,
  className,
}: InputFieldProps<TFormValues>) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col max-w-full">
      <div className="relative flex items-center">
        <input
          type={type === "password" && showPassword ? "text" : type}
          className={`border border-gray-300 p-2 my-2 rounded-md w-full pr-10 text-lg ${className || ""}`}
          placeholder={placeholder}
          {...register(name, { required: true })}
          autoComplete="off"
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-2 text-gray-500 hover:text-gray-700"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
          </button>
        )}
      </div>
      {errors[name] && (
        <span className="text-xs text-red-500">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};
export default InputField;
