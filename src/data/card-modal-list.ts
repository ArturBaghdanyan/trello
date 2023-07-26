import { v4 } from 'uuid';

import { IColumnMenuSection } from '../types/column-menu';
export const cardModalList: IColumnMenuSection[] = [
  {
    id: v4(),
    items: [
      {
        id: v4(),
        title: 'Add card...',
      },
      {
        id: v4(),
        title: 'Copy list...',
      },
      {
        id: v4(),
        title: 'Move list...',
      },
      {
        id: v4(),
        title: 'Watch',
      },
    ],
  },
  {
    id: v4(),
    items: [
      {
        id: v4(),
        title: 'Sort by...',
      },
    ],
  },
  {
    id: v4(),
    items: [
      {
        id: v4(),
        title: 'Automation',
      },
    ],
  },
  {
    id: v4(),
    items: [
      {
        id: v4(),
        title: 'When a card to the list...',
      },
      {
        id: v4(),
        title: 'every day,sort list by...',
      },
      {
        id: v4(),
        title: 'Every Monday, sort list by...',
      },
      {
        id: v4(),
        title: 'Create a custom rule...',
      },
    ],
  },
  {
    id: v4(),
    items: [
      {
        id: v4(),
        title: 'Move all cards in this list...',
      },
      {
        id: v4(),
        title: 'Archive all cards in this list...',
      },
    ],
  },
  {
    id: v4(),
    items: [
      {
        id: v4(),
        title: 'Archive this list...',
      },
    ],
  },
];
