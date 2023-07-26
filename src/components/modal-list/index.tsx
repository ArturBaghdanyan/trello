import { FC } from 'react';

import { addCardData, cardActionData } from '../../data/modal-list';
import { ICard } from '../../types/card';
import CardMenu from '../card-menu';

import styles from './styles.module.scss';

type MoveCardProps = {
  card: ICard;
};

export const ModalList: FC<MoveCardProps> = ({ card }) => {
  return (
    <menu className={styles.menu}>
      <CardMenu addToCard={addCardData} actions={cardActionData} card={card} />
    </menu>
  );
};
