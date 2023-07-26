import React, { FC } from 'react';

import CardHeader from './card-header';
import { CardWrapper } from './card-wrapper';
import { useCard } from '../../context/card-context';
import { ICard } from '../../types/card';
import ClickAway from '../click-away';

import styles from './styles.module.scss';

type CardModalProps = {
  card: ICard;
  onClose: () => void;
};

const CardModal: FC<CardModalProps> = ({ onClose, card }) => {
  const { editCardTitle } = useCard();

  return (
    <div className={styles.overlay}>
      <ClickAway className={styles.container} onClickAway={onClose}>
        <div className={styles.outer}>
          <CardHeader
            cardId={card.id}
            title={card.title}
            onClose={onClose}
            editCardTitle={editCardTitle}
          />
        </div>
        <CardWrapper card={card} />
      </ClickAway>
    </div>
  );
};
export default CardModal;
