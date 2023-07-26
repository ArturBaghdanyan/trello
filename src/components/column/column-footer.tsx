import { ChangeEvent, FC, FormEvent, useState } from 'react';

import { v4 } from 'uuid';

import add_elem from '../../assets/column_icons/add_icon.svg';
import clipboard from '../../assets/column_icons/clipboard.svg';
import close from '../../assets/column_icons/close_icon.svg';
import { useBoard } from '../../context/board-context';
import { useCard } from '../../context/card-context';

import styles from './styles.module.scss';

export type ColumnFooterProps = {
  id: string;
};

const ColumnFooter: FC<ColumnFooterProps> = ({ id }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [cardTitle, setCardTitle] = useState<string>('');

  const { addNewCard } = useCard();
  const { onAddNewCard } = useBoard();

  const onChangeCardTitle = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCardTitle(event.target.value);
  };

  const onAddCard = (event: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    event.preventDefault();
    if (cardTitle.length > 0) {
      const cardId = v4();
      addNewCard(cardTitle).then(res => {
        onAddNewCard(id, res.cardId);
      });
      setCardTitle('');
    }
  };

  const closeAddCardForm = () => {
    setIsExpanded(false);
    setCardTitle('');
  };

  return isExpanded ? (
    <form className={styles.footer_openEl} onSubmit={onAddCard}>
      <textarea value={cardTitle} onChange={onChangeCardTitle} rows={3} />
      <div className={styles.footer_footerText}>
        <button onClick={onAddCard} className={styles.button}>
          Add card
        </button>
        <button onClick={closeAddCardForm}>
          <img src={close} alt="close" />
        </button>
      </div>
    </form>
  ) : (
    <div className={styles.footer_closeEl}>
      <div className={styles.closeEl_column_1}>
        <img src={add_elem} alt="add-elem" />
        <button onClick={() => setIsExpanded(true)}>Add a card</button>
      </div>
      <div className={styles.closeEl_column_2}>
        <img src={clipboard} alt="clipboard" />
      </div>
    </div>
  );
};

export default ColumnFooter;
