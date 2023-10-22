import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import request from '../helpers/fetch';
import { ICard } from '../types/card';

type CardProviderProps = {
  children: ReactNode;
};

type CardType = {
  cards: ICard[];
  isLoaded: boolean;
  hasError: boolean;
  getCardById: (id: string) => Promise<ICard>;
  findCardById: (id: string) => ICard;
  addNewCard: (title: string) => Promise<{ status: string; cardId: string }>;
  onCardSelect: (id: string) => void;
  activeCard: string | null;
  cardModalClose: () => void;
  editCardTitle: (id: string, title: string) => void;
  editCardDescription: (id: string, description: string) => void;
  onAddColorCard: (id: string, cardId: string) => void;
  onAddNewLabel: (labelId: string, cardId: string) => void;
  onAddNewMember: (memberId: string, cardId: string) => void;
  onAddNewChecklist: (checkId: string, cardId: string) => void;
  onDeleteChecklist: (cardId: string, checkId: string) => void;
  deleteCardById: (id: string) => void;
};

const Card = createContext<CardType | null>(null);

const CardProvider: FC<CardProviderProps> = ({ children }) => {
  const [cards, setCards] = useState<ICard[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const [activeCard, setActiveCard] = useState<null | string>(null);

  const findCardById = (id: string): ICard => {
    return cards.find(el => el.id === id) as ICard;
  };

  const deleteCardById = (id: string) => {
    console.log('delete card', id);
    const index = cards.findIndex(el => el.id === id);
    if (index !== -1) {
      cards.splice(index, 1);
      return true;
    }
    return false;
  };

  // const deleteCardById = (id: string) => {
  //   console.log('delete card', id);
  //   setCards(cards => cards.filter(card => card.id !== id));
  // };

  const getCardById = async (id: string): Promise<ICard> => {
    const response = await request<ICard>(`/cards/${id}`);
    return { ...response, id };
  };

  const onCardSelect = (id: string) => {
    setActiveCard(id);
  };

  const addNewCard = async (title: string) => {
    try {
      const response = await request<{ name: string }>('/cards', {
        method: 'POST',
        data: { title },
      });
      setCards([
        ...cards,
        { id: response.name, title, labels: [], members: [], checklist: [] },
      ]);
      return { status: 'success', cardId: response.name };
    } catch {
      return { status: 'failed', cardId: '' };
    }
  };

  const onAddColorCard = (cardId: string, labelId: string) => {
    const updatedCards = cards.map(item => {
      if (item.id === cardId) {
        return {
          ...item,
          labels: [...item.labels, labelId],
        };
      }
      return item;
    });
    setCards(updatedCards);
  };

  const onAddNewLabel = async (labelId: string, cardId: string) => {
    try {
      const card = findCardById(cardId);
      const hasLabel = card.labels.includes(labelId);

      let newLabels: string[] = [];

      if (hasLabel) {
        newLabels = card.labels.filter(i => i !== labelId);
      } else {
        newLabels = [...card.labels, labelId];
      }

      await request(`/cards/${cardId}`, {
        method: 'PUT',
        data: {
          ...card,
          labels: newLabels,
        },
      });
      const updatedCards = cards.map(item => {
        if (item.id === cardId) {
          return {
            ...item,
            labels: newLabels,
          };
        }
        return item;
      });
      setCards(updatedCards);
    } catch (error) {
      console.error(error, 'error');
    }
  };

  const onAddNewMember = async (memberId: string, cardId: string) => {
    const card = findCardById(cardId);
    const hasMember = card.members.includes(memberId);

    let newMembers = card.members;

    if (hasMember) {
      newMembers = newMembers.filter(i => i !== memberId);
    } else {
      newMembers = [...newMembers, memberId];
    }
    await request(`/cards/${cardId}`, {
      method: 'PUT',
      data: {
        ...card,
        members: newMembers,
      },
    });
    const updatedCards = cards.map(item => {
      if (item.id === cardId) {
        return {
          ...item,
          members: newMembers,
        };
      }
      return item;
    });
    setCards(updatedCards);
  };

  const onAddNewChecklist = async (checkId: string, cardId: string) => {
    const card = findCardById(cardId);
    const newChecklist = [...card.checklist, checkId];
    const clone = {} as any;
    for (const key in newChecklist) {
      clone[key] = newChecklist[key];
    }

    await request(`/cards/${cardId}`, {
      method: 'PUT',
      data: {
        ...card,
        checklist: clone,
      },
    });
    const updatedCards = cards.map(item => {
      if (item.id === cardId) {
        return {
          ...item,
          checklist: newChecklist,
        };
      }
      return item;
    });
    setCards(updatedCards);
  };

  const cardModalClose = () => {
    setActiveCard(null);
  };

  const editCardTitle = async (id: string, title: string) => {
    try {
      const card = await getCardById(id);
      await request(`/cards/${id}`, {
        method: 'PUT',
        data: {
          ...card,
          title,
        },
      });
      const updatedCards = cards.map(item => {
        if (item.id === id) {
          return {
            ...item,
            title,
          };
        }
        return item;
      });
      setCards(updatedCards);
    } catch (err) {
      return { status: 'failed' };
    }
  };

  const editCardDescription = (id: string, description: string) => {
    const updatedCards = cards.map(item => {
      if (item.id === id) {
        return {
          ...item,
          description,
        };
      }
      return item;
    });
    setCards(updatedCards);
  };

  const onDeleteChecklist = async (cardId: string, checkId: string) => {
    console.log('cheklistId', cardId, checkId);
    try {
      await request<{ name: string }>(`/cards/${cardId}/checklist/${checkId}`, {
        method: 'DELETE',
      });
      return { status: 'success' };
    } catch (error) {
      console.log('error', error);
      return { status: 'failed' };
    }
  };

  useEffect(() => {
    const getData = async () => {
      return await request<{ [x: string]: ICard }>('/cards');
    };

    getData()
      .then((response: { [x: string]: ICard }) => {
        const data = Object.keys(response).map(i => ({
          title: response[i].title,
          labels: response[i].labels || [],
          members: response[i].members || [],
          checklist: response[i].checklist || [],
          id: i,
        }));
        setCards(data);
        setIsLoaded(true);
        return { status: 'success' };
      })
      .catch(() => {
        setHasError(true);
        setIsLoaded(true);
        return { status: 'failed' };
      });
  }, []);

  return (
    <Card.Provider
      value={{
        cards,
        isLoaded,
        hasError,
        getCardById,
        findCardById,
        addNewCard,
        activeCard,
        onCardSelect,
        cardModalClose,
        editCardTitle,
        editCardDescription,
        onAddColorCard,
        onAddNewLabel,
        onAddNewMember,
        onAddNewChecklist,
        onDeleteChecklist,
        deleteCardById,
      }}
    >
      {children}
    </Card.Provider>
  );
};

const useCard = () => {
  return useContext(Card) as CardType;
};

export { CardProvider, useCard };
