interface ProgressBarProps {
  progress: number;
  max: number;
  callBack?: (progress: number) => void;
}

function ProgressBar({ progress, max, callBack }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (progress / max) * 100));

  return (
    <div className="w-full flex items-center gap-3">
      <div
        onClick={() => callBack && callBack(progress)}
        className={`relative flex-1 h-3 rounded-full bg-gray-200 overflow-hidden ${
          callBack ? "cursor-pointer" : ""
        }`}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-emerald-600 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
        {progress} / {max}
      </span>
    </div>
  );
}

export default ProgressBar;