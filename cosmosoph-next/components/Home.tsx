"use client";

import React from "react";
import CategoryTree from "./categories/CategoryTree";
import { useCategories } from "@/hooks/useCategories";
import { useWisdom } from "@/hooks/useWisdom";
import WisdomList from "./wisdom/WisdomList";
import { Category } from "../../shared/types";
import { useCategorySelection } from "@/hooks/useCategorySelection";

export default function Home() {
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const { selectedCategories, toggleCategory } =
    useCategorySelection(categories);

  const {
    wisdom,
    isLoading: wisdomLoading,
    error: wisdomError,
  } = useWisdom(selectedCategories);

  if (categoriesLoading || wisdomLoading) return <div>Loading...</div>;
  if (categoriesError || wisdomError) return <div>An error occurred</div>;

  return (
    <div>
      {wisdom && wisdom.length > 0 ? (
        <WisdomList
          wisdom={wisdom}
          onCategorySelect={toggleCategory}
          selectedCategories={selectedCategories}
        />
      ) : (
        <div>No wisdom found</div>
      )}
      {categories && categories.length > 0 ? (
        <CategoryTree
          categories={categories}
          onSelect={toggleCategory}
          selectedCategories={selectedCategories}
        />
      ) : (
        <div>No categories found</div>
      )}
    </div>
  );
}
