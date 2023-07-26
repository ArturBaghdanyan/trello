import React, { FC, useState } from 'react';

import { Draggable } from 'react-beautiful-dnd';

import pencil from '../../assets/column_icons/pencil.svg';
import { useCard } from '../../context/card-context';
import CardModal from '../card-modal';

import styles from './styles.module.scss';

type CardProps = {
  cardId: string;
  index: number;
};

export const Card: FC<CardProps> = ({ cardId, index }) => {
  const { findCardById } = useCard();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const currentCard = findCardById(cardId);

  return (
    <Draggable draggableId={cardId} index={index}>
      {provided => (
        <>
          <div
            className={styles.card}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div
              className={styles.card_text}
              onClick={() => setOpenModal(true)}
            >
              {currentCard.title}
            </div>
            <button className={styles.button_pencil}>
              <img src={pencil} alt="pencil" />
            </button>
          </div>
          {openModal && (
            <CardModal card={currentCard} onClose={() => setOpenModal(false)} />
          )}
        </>
      )}
    </Draggable>
  );
};
