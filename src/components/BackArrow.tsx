interface BackArrowProps {
  onClick: () => void;
}

function BackArrow({ onClick }: BackArrowProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Go back"
      className="flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:bg-gray-200 active:scale-90 transition-all duration-150"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
  );
}

export default BackArrow;