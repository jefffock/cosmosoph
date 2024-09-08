import { fetchWisdomItems } from "@/lib/db";
import { useQuery } from "@tanstack/react-query";
import { WisdomItem, Category } from "../../shared/types";

export function useWisdom(selectedCategories: Category[]) {
  const {
    data: wisdom,
    isLoading,
    error,
  } = useQuery<WisdomItem[]>({
    queryKey: ["wisdomItems", selectedCategories],
    queryFn: () =>
      fetchWisdomItems(
        selectedCategories.length > 0 ? selectedCategories : undefined,
      ),
    enabled: true,
  });

  return { wisdom, isLoading, error };
}
