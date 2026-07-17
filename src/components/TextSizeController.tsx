import { useTextSize } from "../hooks/useTextSize";

function TextSizeControl() {
  const { decrease, increase, isAtMin, isAtMax } = useTextSize();

  return (
    <div className="flex items-center gap-1 bg-white border-2 border-gray-200 rounded-full px-1 py-1">
      <button
        onClick={decrease}
        disabled={isAtMin}
        aria-label="Decrease text size"
        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 text-sm font-semibold hover:bg-gray-100 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        A-
      </button>
      <button
        onClick={increase}
        disabled={isAtMax}
        aria-label="Increase text size"
        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 text-base font-semibold hover:bg-gray-100 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        A+
      </button>
    </div>
  );
}

export default TextSizeControl;