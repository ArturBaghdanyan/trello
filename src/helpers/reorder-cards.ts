import reorderList from './reorder-list';
import { IColumn } from '../types/column';

const reorderCards = (
  columns: IColumn[],
  source: {
    droppableId: string;
    index: number;
  },
  destination: {
    droppableId: string;
    index: number;
  }
): IColumn[] => {
  const src = columns.findIndex(item => item.id === source.droppableId);
  const dest = columns.findIndex(item => item.id === destination.droppableId);

  if (src !== -1 && dest !== -1) {
    const current = columns[src].cards;
    const next = columns[dest].cards;
    const target = current[source.index];

    if (source.droppableId === destination.droppableId) {
      const reordered = reorderList(current, source.index, destination.index);
      const result = columns.map((i, index) => {
        if (index === src) {
          return {
            ...i,
            cards: reordered,
          };
        }
        return i;
      });
      return result;
    }

    current.splice(source.index, 1);
    next.splice(destination.index, 0, target);

    const result = columns.map((i, index) => {
      if (index === src) {
        return {
          ...i,
          cards: current,
        };
      } else if (dest === index) {
        return {
          ...i,
          cards: next,
        };
      }
      return i;
    });

    return result;
  }
  return columns;
};

export default reorderCards;
