import React, { ChangeEvent, FC, FormEvent, useMemo, useState } from 'react';

import { DeleteModal } from './deleteModal';
import checkbox from '../../assets/checklist_icon/checkbox.svg';
import close from '../../assets/checklist_icon/close.svg';
import { useChecklist } from '../../context/checklist-context';

import styles from './styles.module.scss';

type CardCheckProps = {
  cardId: string;
  checkId: string;
};

const ChecklistModal: FC<CardCheckProps> = ({ cardId, checkId }) => {
  const [isOpenChecklist, setIsOpenChecklist] = useState<boolean>(false);
  const [checklist, setChecklist] = useState<any>('');
  const [onClose, setOnClose] = useState<boolean>(false);

  const { editCardChecklist, findChecklistById } = useChecklist();

  const findChecklist = useMemo(() => {
    if (!checkId) return { title: '' };
    return findChecklistById(checkId);
  }, [checkId]);

  const addCheckCard = (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault();
    editCardChecklist(checklist.id, checklist.title);
    setIsOpenChecklist(false);
  };

  const toggleCardForm = () => {
    setIsOpenChecklist(true);
  };

  const onCardChangeChecklist = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setChecklist(event.target.value);
  };

  const onSaveCardTitle = () => {
    if (checklist.length > 0) {
      editCardChecklist(checkId, checklist);
    }
  };

  return (
    <div className={styles.checklist_modal}>
      <div className={styles.check_icon}>
        <img src={checkbox} alt="checklist" />
      </div>
      {isOpenChecklist ? (
        <div>
          <textarea
            className={styles.text}
            value={checklist}
            onChange={onCardChangeChecklist}
            onBlur={onSaveCardTitle}
          />
          <span>{findChecklist.title}</span>
          <div className={styles.footer_text}>
            <button className={styles.button_save} onClick={addCheckCard}>
              Save
            </button>
            <button className={styles.button_cancel} onClick={toggleCardForm}>
              <img src={close} alt="close" />
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-between relative">
          <div onClick={() => setIsOpenChecklist(true)}>
            <button>{checklist || 'check'}</button>
          </div>
          <div>
            <button onClick={() => setOnClose(true)}>Delete</button>
            {onClose && (
              <DeleteModal
                cardId={cardId}
                checkId={checkId}
                onClose={() => setOnClose(false)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChecklistModal;
