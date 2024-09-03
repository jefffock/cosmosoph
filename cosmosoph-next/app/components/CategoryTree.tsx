"use client"

import React, { useEffect, useState } from 'react';

interface Category {
  category_id: number;
  name: string;
  description: string | null;
  children: Category[];
}

const CategoryTree: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      async function fetchCategories() {
        try {
          const data = await fetch('/api/categories').then(res => res.json());
          console.log('Fetched categories in CategoryTree:', data);
          setCategories(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
          setIsLoading(false);
        }
      }
      fetchCategories();
    }, []);
  
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Category Tree</h2>
      {categories.length > 0 ? categories.map((category) => (
        <CategoryItem key={category.category_id} category={category} />
      )) : <div>No categories found</div>}
    </div>
  );
};

const CategoryItem: React.FC<{ category: Category }> = ({ category }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="ml-4">
      <div className="flex items-center my-2">
        {category.children.length > 0 && (
          <button onClick={toggleExpand} className="mr-2">
            {isExpanded ? "Close" : "Open" }
          </button>
        )}
        <span className="font-semibold">{category.name}</span>
      </div>
      {category.description && (
        <p className="text-sm text-gray-600 ml-6 mb-2">{category.description}</p>
      )}
      {isExpanded && category.children.length > 0 && (
        <div className="ml-6">
          {category.children.map((child) => (
            <CategoryItem key={child.category_id} category={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryTree;