import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/lib/db";
import { Category } from "../../shared/types";

export function useCategories() {
  return useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: async () => {
      const result = await fetchCategories();
      if (Array.isArray(result)) {
        return result;
      }
      throw new Error("Failed to fetch categories");
    },
  });
}
