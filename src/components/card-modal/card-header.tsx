import React, { ChangeEvent, FC, useState } from 'react';

import close from '../../assets/card-modal_icons/close.svg';
import cover from '../../assets/card-modal_icons/cover.svg';
import { useBoard } from '../../context/board-context';
import { useCard } from '../../context/card-context';
import ClickAway from '../click-away';
import MoveCard from '../move-card';

import styles from './styles.module.scss';

type CardHeaderProps = {
  cardId: string;
  title: string;
  onClose: () => void;
  editCardTitle: (cardId: string, title: string) => void;
  isCardAbsolute?: boolean;
};

const CardHeader: FC<CardHeaderProps> = props => {
  const { cardId, title, onClose } = props;

  const [cardTitle, setCardTitle] = useState<string>(title);
  const [isMoveCardModalOpen, setIsMoveCardModalOpen] =
    useState<boolean>(false);

  const { getColumnById, getColumnIdByCardId } = useBoard();

  const { columnId } = getColumnIdByCardId(cardId);
  const currentColumn = getColumnById(columnId || '');

  const { editCardTitle } = useCard();

  const onCardChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setCardTitle(event.target.value);
  };

  const onSaveCardTitle = () => {
    if (cardTitle.length > 0) {
      editCardTitle(cardId, cardTitle);
    }
  };

  const toggleMoveCard = () => {
    setIsMoveCardModalOpen(!isMoveCardModalOpen);
  };

  return (
    <div className={styles.header_list}>
      <div className={styles.title}>
        <img src={cover} alt="cover" />
        <input
          type="text"
          value={cardTitle}
          onChange={onCardChangeTitle}
          onBlur={onSaveCardTitle}
        />
        <button className={styles.close} onClick={onClose}>
          <img src={close} alt="close" />
        </button>
      </div>

      <div className={`${styles.title_footer}`}>
        <p>in list</p>
        <button onClick={() => setIsMoveCardModalOpen(true)}>
          {currentColumn?.title}
        </button>
      </div>

      {isMoveCardModalOpen && (
        <ClickAway onClickAway={() => setIsMoveCardModalOpen(false)}>
          <MoveCard
            cardId={cardId}
            onClose={toggleMoveCard}
            isCardAbsolute={true}
          />
        </ClickAway>
      )}
    </div>
  );
};
export default CardHeader;
