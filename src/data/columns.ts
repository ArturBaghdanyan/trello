import { v4 as uuidv4 } from 'uuid';

import { IColumn } from '../types/column';

export const columns: IColumn[] = [
  {
    id: uuidv4(),
    title: 'a',
    cards: ['1', '2'],
  },
  {
    id: uuidv4(),
    title: 'b',
    cards: ['3', '4'],
  },
  {
    id: uuidv4(),
    title: 'c',
    cards: ['5', '6'],
  },
];
