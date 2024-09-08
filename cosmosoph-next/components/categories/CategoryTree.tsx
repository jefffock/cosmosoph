"use client";

import React from "react";
import { Category } from "../../../shared/types";
import CategoryChip from "./CategoryChip";

interface CategoryTreeProps {
  categories: Category[];
  selectedCategories: Category[];
  onSelect: (category: Category) => void;
  level?: number;
}

const CategoryTree: React.FC<CategoryTreeProps> = ({
  categories,
  onSelect,
  selectedCategories,
  level = 0,
}) => {
  const handleSelect = (category: Category) => {
    onSelect(category);
  };

  return (
    <div>
      {categories.map((category) => (
        <div
          key={category.category_id}
          className="mb-2"
          style={{ marginLeft: `${level * 2}rem` }}
        >
          <CategoryChip
            category={category}
            isSelected={selectedCategories.some(
              (c) => c.category_id === category.category_id,
            )}
            onClick={() => handleSelect(category)}
          />
          {category.children && category.children.length > 0 && (
            <CategoryTree
              categories={category.children}
              onSelect={onSelect}
              selectedCategories={selectedCategories}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryTree;
