'use client';

import React, { useEffect, useState } from 'react';
import { Category } from '../../../shared/types';

export default function Categories(): React.ReactElement {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await fetch('/api/categories').then(res => res.json());
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
    <div>
		<h1>Categories Hierarchy</h1>
		{categories?.length > 0  ? categories.map(cat => (
			<div key={cat.category_id}>
				{cat.name}
			</div>
		)) : null}					    
    </div>
  );
}