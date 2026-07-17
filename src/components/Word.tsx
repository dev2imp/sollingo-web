interface WordProps {
  text: string;
  onClick: () => void;
  isSelected?: boolean;
  disabled?: boolean;
}

function Word({ text, onClick, isSelected = false, disabled = false }: WordProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-xl border-2 font-medium text-base
        break-words whitespace-normal text-center
        max-w-[220px] transition-all duration-150 active:scale-95
        disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100
        ${
          isSelected
            ? "bg-emerald-600 text-white border-emerald-600"
            : "bg-white text-gray-800 border-gray-200 hover:border-emerald-400"
        }
      `}
    >
      {text}
    </button>
  );
}

export default Word;