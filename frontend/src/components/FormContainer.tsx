import { ReactNode } from "react";

interface FormContainerProps {
  children: ReactNode;
  className?: string;
}

const FormContainer = ({ children, className }: FormContainerProps) => (
  <div className={className}>{children}</div>
);

export default FormContainer;
