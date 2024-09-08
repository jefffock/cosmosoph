import { useState, useCallback } from "react";
import { Category } from "../../shared/types";

export function useCategorySelection(allCategories: Category[] | undefined) {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const getAllChildrenIds = (category: Category): number[] => {
    const ids = [
      category.category_id,
      ...(category.children?.flatMap(getAllChildrenIds) ?? []),
    ];
    console.log(`getAllChildrenIds for ${category.category_id}:`, ids);
    return ids;
  };

  const toggleCategory = useCallback(
    (category: Category) => {
      console.log("toggleCategory called with:", category);
      setSelectedCategories((prev) => {
        const isCurrentlySelected = prev.some(
          (c) => c.category_id === category.category_id,
        );
        console.log("Is category currently selected:", isCurrentlySelected);

        const findCategories = (
          categories: Category[],
          ids: number[],
        ): Category[] => {
          return categories.flatMap((c) =>
            ids.includes(c.category_id)
              ? [c, ...findCategories(c.children || [], ids)]
              : findCategories(c.children || [], ids),
          );
        };

        if (isCurrentlySelected) {
          const allIds = getAllChildrenIds(category);
          const categoriesToRemove = findCategories(prev, allIds);
          const newSelection = prev.filter(
            (c) =>
              !categoriesToRemove.some(
                (rc) => rc.category_id === c.category_id,
              ),
          );
          console.log(
            "Removing category and children. New selection:",
            newSelection,
          );
          return newSelection;
        } else {
          const allIds = getAllChildrenIds(category);
          const newCategories = findCategories(allCategories || [], allIds);
          const updatedSelection = [...prev, ...newCategories];
          console.log(
            "Adding category and children. New selection:",
            updatedSelection,
          );
          return updatedSelection;
        }
      });
    },
    [allCategories],
  );

  console.log("Current selectedCategories:", selectedCategories);

  return {
    selectedCategories,
    toggleCategory,
  };
}
