import React from 'react';
import { useGetItemsQuery } from './apiSlice';

const ItemsList = () => {
  const { data: items, error, isLoading } = useGetItemsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching items!</div>;

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

export default ItemsList;
