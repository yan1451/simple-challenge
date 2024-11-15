import { ReactNode } from 'react';

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  className?: string;
}

const Button = ({ type, children, className }: ButtonProps) => (
    <button className={className} type={type}>
      {children}
    </button>
  );
  
  export default Button;
  