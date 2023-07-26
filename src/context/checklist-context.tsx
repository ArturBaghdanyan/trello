import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import request from '../helpers/fetch';
import { IChecklist } from '../types/checklist';

type ChecklistProviderProps = {
  children: ReactNode;
};

type CheckListType = {
  checklist: IChecklist[];
  isLoaded: boolean;
  hasError: boolean;
  findChecklistById: (id: string) => IChecklist;
  editCardChecklist: (id: string, title: string) => void;
  addNewChecklist: (
    title: string
  ) => Promise<{ checklistId: string; status: string }>;
  editChecklist: (id: string, title: string) => void;
  deleteChecklist: (id: string) => void;
};

const Checklist = createContext<CheckListType | null>(null);

const ChecklistProvider: FC<ChecklistProviderProps> = ({ children }) => {
  const [checklist, setChecklist] = useState<IChecklist[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const findChecklistById = (id: string): IChecklist => {
    const find = checklist.find(el => el.id === id) as IChecklist;
    return find;
  };

  const editChecklist = async (id: string, title: string) => {
    try {
      const check = findChecklistById(id);
      await request(`/checklist/${id}`, {
        method: 'PUT',
        data: {
          ...check,
          title,
        },
      });
      const updatedCards = checklist.map(item => {
        if (item.id === id) {
          return {
            ...item,
            title,
          };
        }
        return item;
      });
      setChecklist(updatedCards);
    } catch (err) {
      return { status: 'failed' };
    }
  };

  const addNewChecklist = async (title: string) => {
    try {
      const response = await request<{ name: string }>('/checklist', {
        method: 'POST',
        data: { title },
      });
      setChecklist([...checklist, { id: response.name, title }]);
      return { status: 'success', checklistId: response.name };
    } catch {
      return { status: 'failed', checklistId: '' };
    }
  };

  const deleteChecklist = async (id: string) => {
    console.log('asfa', id);
    try {
      await request<{ name: string }>(`/checklist/${id}`, {
        method: 'DELETE',
      });
      return { status: 'success' };
    } catch {
      return { status: 'failed' };
    }
  };

  const editCardChecklist = (id: string, title: string) => {
    const updatedCards = checklist.map(item => {
      if (item.id === id) {
        return {
          ...item,
          title,
        };
      }
      return item;
    });
    setChecklist(updatedCards);
  };

  const getData = async () => {
    const response = await request<{ [x: string]: IChecklist }>('/checklist');
    try {
      const data = Object.keys(response).map(i => ({
        title: response[i].title,
        id: i,
      }));
      console.log('res', data);
      setChecklist(data);
      setIsLoaded(true);
    } catch {
      setHasError(true);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Checklist.Provider
      value={{
        checklist,
        isLoaded,
        hasError,
        findChecklistById,
        editCardChecklist,
        addNewChecklist,
        editChecklist,
        deleteChecklist,
      }}
    >
      {children}
    </Checklist.Provider>
  );
};

const useChecklist = () => {
  return useContext(Checklist) as CheckListType;
};

export { ChecklistProvider, useChecklist };
