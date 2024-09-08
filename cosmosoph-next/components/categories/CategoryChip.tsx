import React from "react";
import { Category } from "../../../shared/types";

interface CategoryChipProps {
  category: Category;
  isSelected: boolean;
  onClick: (category: Category) => void;
}

const CategoryChip: React.FC<CategoryChipProps> = ({
  category,
  isSelected,
  onClick,
}) => {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 cursor-pointer ${
        isSelected
          ? "bg-green-200 text-green-800 hover:bg-green-300"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
      onClick={() => onClick(category)}
    >
      {category.name}
    </span>
  );
};

export default CategoryChip;
