import React from "react";
import { WisdomItem, Category } from "../../../shared/types";
import CategoryChip from "../categories/CategoryChip";

interface WisdomCardProps {
  wisdom: WisdomItem;
  onCategoryClick: (category: Category) => void;
  selectedCategories: Category[];
}

const WisdomCard: React.FC<WisdomCardProps> = ({
  wisdom,
  onCategoryClick,
  selectedCategories,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 m-4 max-w-sm w-full">
      <p className="text-xl font-semibold mb-4">{wisdom.content}</p>
      <p className="text-gray-600 mb-2">
        {wisdom.author ? `- ${wisdom.author}` : "Unknown Author"}
      </p>
      <div className="mt-4">
        {wisdom.categories && wisdom.categories.length > 0 ? (
          wisdom.categories.map((category: Category) => (
            <CategoryChip
              key={category.category_id}
              category={category}
              isSelected={selectedCategories.some(
                (cat) => cat.category_id === category.category_id,
              )}
              onClick={onCategoryClick}
            />
          ))
        ) : (
          <span className="text-gray-500">No categories</span>
        )}
      </div>
    </div>
  );
};

export default WisdomCard;
