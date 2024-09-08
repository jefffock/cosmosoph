import { Category, WisdomItem } from "../../../shared/types";

async function fetchFromWorkerWithParams<T>(
  endpoint: string,
  params?: Record<string, string>,
): Promise<T> {
  const workerUrl = process.env.NEXT_PUBLIC_WORKER_URL;
  if (!workerUrl) {
    throw new Error("Worker URL is not defined in environment variables");
  }

  const apiEndpoint = `/api/${endpoint}`;
  const url = new URL(`${workerUrl}${apiEndpoint}`);

  if (params) {
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key]),
    );
  }

  console.log(`Fetching data from: ${url.toString()}`);
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export async function fetchCategories(): Promise<Category[]> {
  return fetchFromWorkerWithParams<Category[]>("categories");
}

export async function fetchWisdomItems(
  categories?: Category[],
): Promise<WisdomItem[]> {
  const categoryIds = categories?.map((cat) => cat.category_id);
  console.log(
    categoryIds && categoryIds.length > 0
      ? `Fetching wisdom items for categories: ${categoryIds.join(", ")}`
      : "Fetching all wisdom items",
  );
  const params =
    categoryIds && categoryIds.length > 0
      ? { categories: categoryIds.join(",") }
      : undefined;
  const result = await fetchFromWorkerWithParams<WisdomItem[]>(
    "wisdom",
    params,
  );
  console.log(`Fetched ${result.length} wisdom items`);
  return result;
}
