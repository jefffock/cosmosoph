'use client'

import { useState, useEffect } from 'react';
import { WisdomRow } from '../../../../shared/types';
import WisdomTableRow from './WisdomRow';

export default function AllWisdom() {
  const [wisdom, setWisdom] = useState<WisdomRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWisdom();
  }, []);

  const fetchWisdom = async () => {
    try {
      const response = await fetch('/api/wisdom');
      if (!response.ok) {
        throw new Error('Failed to fetch wisdom');
      }
      const data = await response.json();
      setWisdom(data);
      setIsLoading(false);
    } catch (err) {
      setError('Error fetching wisdom. Please try again later.');
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="wisdom-container">
      <h2>All Wisdom</h2>
      <ul className="wisdom-list">
        {wisdom.map((item) => (
            <WisdomTableRow wisdom={item} />
        ))}
      </ul>
    </div>
  );
}