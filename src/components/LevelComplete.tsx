interface LevelCompleteProps {
  levelName: number;
  correctCount: number;
  totalCount: number;
  onNewLevel: () => void;
}

function LevelComplete({ levelName, correctCount, totalCount, onNewLevel }: LevelCompleteProps) {
  const percentage = Math.round((correctCount / totalCount) * 100);

  const getMessage = () => {
    if (percentage === 100) return "Perfect score!";
    if (percentage >= 80) return "Great job!";
    if (percentage >= 50) return "Good effort!";
    return "Keep practicing!";
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-sm rounded-3xl bg-white shadow-xl overflow-hidden">
        <div className="flex flex-col items-center gap-3 px-8 pt-10 pb-8 bg-emerald-600">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl">
            🎉
          </div>
          <h2 className="text-2xl font-bold text-white">Level {levelName} complete!</h2>
          <p className="text-emerald-50 text-sm">{getMessage()}</p>
        </div>

        <div className="flex flex-col items-center gap-4 px-8 py-8">
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" strokeWidth="10" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#059669"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - percentage / 100)}`}
              />
            </svg>
            <span className="absolute text-2xl font-bold text-gray-800">{percentage}%</span>
          </div>

          <p className="text-gray-500 text-sm">
            <span className="font-semibold text-gray-800">{correctCount}</span> out of{" "}
            <span className="font-semibold text-gray-800">{totalCount}</span> correct
          </p>
        </div>

        <button
          onClick={onNewLevel}
          className="w-full py-4 bg-gray-900 text-white font-semibold hover:bg-gray-800 active:scale-[0.98] transition-all"
        >
          New Level
        </button>
      </div>
    </div>
  );
}

export default LevelComplete;