import clsx from "clsx";
import { Button } from "primereact/button";

interface ButtonProps {
  label?: string;
  className?: string;
}

function CustomButton({ label, className }: ButtonProps) {
  return (
    <Button
      label={label}
      className={clsx("border-0 px-6 py-2 shadow-none hover:opacity-95 active:opacity-85", className)}
    />
  );
}
export default CustomButton;
