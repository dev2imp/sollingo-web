import { useState, useEffect } from "react";

interface FavoriteStarProps {
  isFavorited: boolean;
  onClick: () => void;
  size?: number;
}

function FavoriteStar({ isFavorited, onClick, size = 28 }: FavoriteStarProps) {
  const [displayedAsFavorited, setDisplayedAsFavorited] = useState(isFavorited);

  useEffect(() => {
    setDisplayedAsFavorited(isFavorited);
  }, [isFavorited]);

  const handleClick = () => {
    setDisplayedAsFavorited((prev) => !prev); // flip instantly, visually
    onClick(); // still tells the parent to do the real add/remove logic
  };

  return (
    <button
      onClick={handleClick}
      aria-label={displayedAsFavorited ? "Remove from favorites" : "Add to favorites"}
      className="flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-90 transition-all duration-150"
      style={{ width: size + 12, height: size + 12 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={displayedAsFavorited ? "#dc2626" : "none"}
        stroke={displayedAsFavorited ? "#dc2626" : "#9ca3af"}
        strokeWidth={2}
        strokeLinejoin="round"
        className="transition-colors duration-150"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </button>
  );
}

export default FavoriteStar;