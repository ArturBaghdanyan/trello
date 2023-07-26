import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import request from '../helpers/fetch';
import { IColumn } from '../types/column';

type BoardProviderProps = {
  children: ReactNode;
};

type BoardType = {
  columns: IColumn[];
  setColumns: Dispatch<SetStateAction<IColumn[]>>;
  isLoaded: boolean;
  hasError: boolean;
  addNewColumn: (column: IColumn) => void;
  editColumnTitle: (id: string, title: string) => void;
  onAddNewCard: (columnId: string, cardId: string) => void;
  getColumnIdByCardId: (cardId: string) => {
    currentIndex: number | null;
    columnId: string | null;
  };
  getColumnById: (id: string) => IColumn;
};

const Board = createContext<BoardType | null>(null);

const BoardProvider: FC<BoardProviderProps> = ({ children }) => {
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const addNewColumn = async (column: IColumn) => {
    await request<{ name: string }>('/columns', {
      method: 'POST',
      data: column,
    })
      .then(resp => {
        setColumns([...columns, { ...column, id: resp.name }]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getColumnById = (id: string): IColumn => {
    const currentColumn = columns.find(el => el.id === id) as IColumn;
    return currentColumn;
  };

  const onAddNewCard = async (columnId: string, cardId: string) => {
    try {
      const column = await getColumnById(columnId);

      await request(`/columns/${columnId}`, {
        method: 'PUT',
        data: {
          ...column,
          cards: [...column.cards, cardId],
        },
      });

      const updatedColumns = columns.map(item => {
        if (item.id === columnId) {
          return {
            ...item,
            cards: [...item.cards, cardId],
          };
        }
        return item;
      });
      setColumns(updatedColumns);
      return { status: 'success' };
    } catch (err) {
      return { status: 'failed' };
    }
  };

  const editColumnTitle = async (id: string, title: string) => {
    try {
      const column = getColumnById(id);

      await request(`/columns/${id}`, {
        method: 'PUT',
        data: {
          ...column,
          title,
        },
      });

      const updatedColumns = columns.map(item => {
        if (item.id === id) {
          return {
            ...item,
            title,
          };
        }
        return item;
      });
      setColumns(updatedColumns);
      return { status: 'success' };
    } catch (err) {
      return { status: 'failed' };
    }
  };

  const getColumnIdByCardId = (cardId: string) => {
    let columnId = null;
    let currentIndex = null;

    for (const item of columns) {
      const cardIndex = item.cards.findIndex(i => i === cardId);
      if (cardIndex !== -1) {
        columnId = item.id;
        currentIndex = cardIndex + 1;
        break;
      }
    }
    return { columnId, currentIndex };
  };

  useEffect(() => {
    const getData = async () => {
      const response = await request<{ [x: string]: IColumn }>('/columns');
      return response;
    };
    getData()
      .then((response: { [x: string]: IColumn }) => {
        const data = Object.keys(response).map(i => ({
          title: response[i].title,
          cards: response[i].cards || [],
          id: i,
        }));
        setColumns(data);
        setIsLoaded(true);
      })
      .catch(() => {
        setHasError(true);
        setIsLoaded(true);
      });
  }, []);

  return (
    <Board.Provider
      value={{
        columns,
        setColumns,
        isLoaded,
        hasError,
        addNewColumn,
        editColumnTitle,
        onAddNewCard,
        getColumnIdByCardId,
        getColumnById,
      }}
    >
      {children}
    </Board.Provider>
  );
};

const useBoard = () => {
  return useContext(Board) as BoardType;
};

export { BoardProvider, useBoard };
