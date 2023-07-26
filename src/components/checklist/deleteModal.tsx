import React, { FC } from 'react';

import close from '../../assets/checklist_icon/close.svg';
import { useCard } from '../../context/card-context';

import styles from './styles.module.scss';

type CardCheckProps = {
  onClose: () => void;
  cardId: string;
  checkId: string;
};

export const DeleteModal: FC<CardCheckProps> = props => {
  const { onClose, cardId, checkId } = props;

  const { onDeleteChecklist } = useCard();

  return (
    <div className={styles.modal}>
      <div className={styles.delete_modal}>
        <div className={styles.title}>
          <span>delete checklist</span>
          <button onClick={onClose}>
            <img src={close} alt="close" />
          </button>
        </div>
        <div className="border-2"></div>
        <div className="w-full">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
            rem.
          </p>
        </div>
        <div>
          <button
            onClick={() => onDeleteChecklist(cardId, checkId)}
            className={styles.delete_button}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
