import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import request from '../helpers/fetch';
import { IMember } from '../types/member';

type memberProviderProps = {
  children: ReactNode;
};

type MemberType = {
  members: IMember[];
  isLoaded: boolean;
  hasError: boolean;
  findMemberById: (id: string) => IMember;
  addNewMember: (id: string, name: string, email: string) => void;
  editMemberText: (id: string, name: string, email: string) => void;
};

const Member = createContext<MemberType | null>(null);

const MemberProvider: FC<memberProviderProps> = ({ children }) => {
  const [members, setMembers] = useState<IMember[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const findMemberById = (id: string): IMember => {
    console.log(members, id);
    return members.find(el => el.id === id) as IMember;
  };

  const editMemberText = (id: string, name: string, email: string) => {
    const updatedCards = members.map(item => {
      if (item.id === id) {
        return {
          ...item,
          name,
          email,
        };
      }
      return item;
    });
    setMembers(updatedCards);
  };

  const addNewMember = (id: string, name: string, email: string) => {
    setMembers([
      ...members,
      {
        id,
        name,
        email,
      },
    ]);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await request<{ [x: string]: IMember }>('/members');
      return response;
    };

    getData()
      .then((response: { [x: string]: IMember }) => {
        const data = Object.keys(response).map(i => ({
          name: response[i].name,
          email: response[i].email,
          id: i,
        }));
        setMembers(data);
        setIsLoaded(true);
      })
      .catch(() => {
        setHasError(true);
        setIsLoaded(true);
      });
  }, []);

  return (
    <Member.Provider
      value={{
        members,
        isLoaded,
        hasError,
        editMemberText,
        addNewMember,
        findMemberById,
      }}
    >
      {children}
    </Member.Provider>
  );
};

const useMembers = () => {
  return useContext(Member) as MemberType;
};

export { MemberProvider, useMembers };
