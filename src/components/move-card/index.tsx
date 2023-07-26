import React, { ChangeEvent, FC, useState } from 'react';

import close from '../../assets/card-modal_icons/close.svg';
import { useBoard } from '../../context/board-context';
import reorderCards from '../../helpers/reorder-cards';

import styles from './styles.module.scss';

type MoveCardProps = {
  cardId: string;
  onClose: () => void;
  isCardAbsolute?: boolean;
};

const MoveCard: FC<MoveCardProps> = props => {
  const { cardId, onClose, isCardAbsolute } = props;

  const { columns, setColumns, getColumnIdByCardId, getColumnById } =
    useBoard();

  const { columnId, currentIndex } = getColumnIdByCardId(cardId);

  const [destinationId, setDestinationId] = useState<string>(columnId || '');
  const [destinationIndex, setDestinationIndex] = useState<number>(
    currentIndex || 1
  );

  const currentDestinationColumn = getColumnById(destinationId);

  const onSave = () => {
    if (columnId && currentIndex && destinationId && destinationIndex) {
      const reorderedList = reorderCards(
        columns,
        { droppableId: columnId, index: currentIndex },
        { droppableId: destinationId, index: destinationIndex }
      );
      setColumns(reorderedList);
      onClose();
    }
  };

  const onDestinationSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setDestinationId(event.target.value);
    setDestinationIndex(1);
  };

  const onDestinationIndexSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setDestinationIndex(+event.target.value);
  };

  return (
    <div className={`${styles.move} ${isCardAbsolute ? styles.list_move : ''}`}>
      <div className={styles.title}>
        <span>Move card</span>
        <button onClick={onClose}>
          <img src={close} alt="close" />
        </button>
      </div>
      <div className={styles.outer}>
        <h2>Select destination</h2>
        <div className={styles.wrapper}>
          <select className={styles.move_el} onChange={onDestinationSelect}>
            {columns.map((item, index) => (
              <option key={item.id} value={index}>
                {item.title}
              </option>
            ))}
          </select>
          <select
            className={styles.move_el}
            onChange={onDestinationSelect}
            value={destinationId}
          >
            {columns.map(item => (
              <option key={item.id} value={item.id}>
                {`${item.title} ${columnId === item.id ? '(current)' : ''}`}
              </option>
            ))}
          </select>
          <select
            className={styles.move_el}
            onChange={onDestinationIndexSelect}
          >
            {currentDestinationColumn.cards.map((i, index) => (
              <option value={index + 1} key={i}>
                {index + 1}
              </option>
            ))}
            {columnId !== currentDestinationColumn.id && (
              <option value={currentDestinationColumn.cards.length + 1}>
                {currentDestinationColumn.cards.length + 1}
              </option>
            )}
          </select>
        </div>
      </div>
      <div className={styles.button}>
        <button onClick={onSave}>Move</button>
      </div>
    </div>
  );
};
export default MoveCard;
