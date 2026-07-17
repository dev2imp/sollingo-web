interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

function Button({ text, onClick, variant = "primary", disabled = false }: ButtonProps) {
  const baseStyles =
    "px-6 py-3 rounded-2xl font-semibold text-base transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100";

  const variantStyles = {
    primary:
      "bg-emerald-600 text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/30",
    secondary:
      "bg-white text-emerald-700 border-2 border-emerald-600 hover:bg-emerald-50",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {text}
    </button>
  );
}

export default Button;