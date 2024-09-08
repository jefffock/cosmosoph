'use client';

import React, { useState } from 'react';

interface Category {
  category_id: number;
  name: string;
}

interface AddWisdomFormProps {
  categories: Category[];
//   onSubmit: (wisdom: { content: string; author: string; categoryId: number }) => void;
}

const AddWisdomForm: React.FC<AddWisdomFormProps> = ({ categories }) => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [categoryId, setCategoryId] = useState('');

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('content:>>', content);
    console.log('author:>>', author);
    console.log('categoryId:>>', categoryId);
  };


  return (
    <>
        <p>Add Wisdom</p>
    </>
    // <form onSubmit={handleSubmit}>
    //   <textarea
    //     value={content}
    //     onChange={(e) => setContent(e.target.value)}
    //     placeholder="Enter wisdom content"
    //     required
    //   />
    //   <input
    //     type="text"
    //     value={author}
    //     onChange={(e) => setAuthor(e.target.value)}
    //     placeholder="Author"
    //     required
    //   />
    //   <select
    //     value={categoryId}
    //     onChange={(e) => setCategoryId(e.target.value)}
    //     required
    //   >
    //     <option value="">Select a category</option>
    //     {categories.map((category) => (
    //       <option key={category.category_id} value={category.category_id}>
    //         {category.name}
    //       </option>
    //     ))}
    //   </select>
    //   <button type="submit">Add Wisdom</button>
    // </form>
  );
};

export default AddWisdomForm;