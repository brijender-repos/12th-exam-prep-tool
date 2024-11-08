'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SlidingPanel } from '@/components/SlidingPanel';

interface Item {
  id: number;
  name: string;
  description: string;
}

const items: Item[] = [
  { id: 1, name: 'Item 1', description: 'This is item 1' },
  { id: 2, name: 'Item 2', description: 'This is item 2' },
  { id: 3, name: 'Item 3', description: 'This is item 3' },
];

export default function ItemsPage() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold mb-4'>Items</h1>
      <ul className='space-y-2'>
        {items.map((item) => (
          <li key={item.id} className='flex justify-between items-center'>
            <span>{item.name}</span>
            <Button onClick={() => setSelectedItem(item)}>View Details</Button>
          </li>
        ))}
      </ul>
      <SlidingPanel
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.name}
      >
        {selectedItem && (
          <div>
            <p>{selectedItem.description}</p>
            {/* Add more details or components here */}
          </div>
        )}
      </SlidingPanel>
    </div>
  );
}
