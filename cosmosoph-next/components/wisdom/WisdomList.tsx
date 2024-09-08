import React, { useState, useEffect } from "react";
import { Category, WisdomItem } from "../../../shared/types";
import WisdomCard from "./WisdomCard";
import { useSwipe } from "../../hooks/useSwipe";
import Button from "../Button";

interface WisdomListProps {
  wisdom: WisdomItem[];
  onCategorySelect: (category: Category) => void;
  selectedCategories: Category[];
}

const WisdomList: React.FC<WisdomListProps> = ({
  wisdom,
  onCategorySelect,
  selectedCategories,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { onTouchStart, onTouchMove, onTouchEnd, swipeDirection } = useSwipe();

  useEffect(() => {
    if (swipeDirection === "left") {
      handleNext();
    } else if (swipeDirection === "right") {
      handlePrevious();
    }
  }, [swipeDirection]);

  const handleNext = () => {
    if (currentIndex < wisdom.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (wisdom.length === 0) {
    return <div>No wisdom found</div>;
  }

  console.log(wisdom);

  return (
    <div className="wisdom-container w-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">Wisdom</h2>
      <div
        className="wisdom-card-container relative overflow-hidden w-full"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="wisdom-card-slider flex transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 50}%)`,
          }}
        >
          {wisdom.map((item, index) => (
            <div
              key={item.wisdom_id}
              className="wisdom-card-wrapper w-1/2 flex-shrink-0"
            >
              <WisdomCard
                wisdom={item}
                onCategoryClick={onCategorySelect}
                selectedCategories={selectedCategories}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="button-container max-w-[400px] w-full mx-auto px-4 mt-6">
        <div className="flex justify-between">
          <Button onClick={handlePrevious} disabled={currentIndex === 0}>
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentIndex === wisdom.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WisdomList;
