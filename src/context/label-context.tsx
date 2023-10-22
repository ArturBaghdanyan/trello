import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import request from '../helpers/fetch';
import { ILabel } from '../types/labels';

type LabelProviderProps = {
  children: ReactNode;
};

type LabelType = {
  labels: ILabel[];
  isLoaded: boolean;
  hasError: boolean;
  findLabelById: (id: string) => ILabel;
  addNewLabel: (value: string, color: string) => void;
  editLabelTitle: (id: string, value: string, color: string) => void;
  editLabelColor: (id: string, color: string) => void;
};

const Label = createContext<LabelType | null>(null);

const LabelProvider: FC<LabelProviderProps> = ({ children }) => {
  const [labels, setLabels] = useState<ILabel[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const findLabelById = (id: string): ILabel => {
    return labels.find(el => el.id === id) as ILabel;
  };

  const addNewLabel = async (value: string, color: string) => {
    try {
      const response = await request<{ name: string }>('/labels', {
        method: 'POST',
        data: { value, color },
      });
      setLabels([...labels, { id: response.name, value, color }]);
      return { status: 'success', cardId: response.name };
    } catch {
      return { status: 'failed', cardId: '' };
    }
  };

  const editLabelTitle = async (id: string, value: string, color: string) => {
    try {
      const label = findLabelById(id);
      await request(`/labels/${id}`, {
        method: 'PUT',
        data: {
          ...label,
          value,
          color,
        },
      });
      const updatedCards = labels.map(item => {
        if (item.id === id) {
          return {
            ...item,
            value,
            color,
          };
        }
        return item;
      });
      setLabels(updatedCards);
    } catch (err) {
      return { status: 'failed' };
    }
  };
  const editLabelColor = (id: string, color: string) => {
    const updatedCards = labels.map(item => {
      if (item.id === id) {
        return {
          ...item,
          color,
        };
      }
      return item;
    });
    setLabels(updatedCards);
  };

  useEffect(() => {
    const getData = async () => {
      return await request<{ [x: string]: ILabel }>('/labels');
    };

    getData()
      .then((response: { [x: string]: ILabel }) => {
        const data = Object.keys(response).map(i => ({
          value: response[i].value,
          color: response[i].color,
          id: i,
        }));
        setLabels(data);
        setIsLoaded(true);
      })
      .catch(() => {
        setHasError(true);
        setIsLoaded(true);
      });
  }, []);

  return (
    <Label.Provider
      value={{
        labels,
        isLoaded,
        hasError,
        findLabelById,
        addNewLabel,
        editLabelTitle,
        editLabelColor,
      }}
    >
      {children}
    </Label.Provider>
  );
};

const useLabels = () => {
  return useContext(Label) as LabelType;
};

export { LabelProvider, useLabels };
