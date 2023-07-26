import { ChangeEvent, FC, useState } from 'react';

import close from '../../assets/column_icons/close_icon.svg';
import { useCard } from '../../context/card-context';
import { useChecklist } from '../../context/checklist-context';

import styles from './styles.module.scss';

type CheckListType = {
  onClose: () => void;
  cardId: string;
};

const Checklist: FC<CheckListType> = props => {
  const { onClose, cardId } = props;
  const [checkInput, setCheckInput] = useState('');

  const { onAddNewChecklist } = useCard();
  const { addNewChecklist } = useChecklist();

  const onChecklistClick = () => {
    console.log('aaa', checkInput);
    addNewChecklist(checkInput).then(({ checklistId }) => {
      onAddNewChecklist(checklistId, cardId);
    });
    setCheckInput('');
    onClose();
  };

  const onCardChangeChecklist = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckInput(event.target.value);
  };

  return (
    <div className={styles.checklist}>
      <div className={styles.checklist_header}>
        <h2>Add checklist</h2>
        <button className={styles.close_card} onClick={onClose}>
          <img src={close} alt="close" />
        </button>
      </div>
      <div className={styles.underline}></div>
      <h3>Title</h3>
      <div className={styles.input}>
        <input
          type="text"
          placeholder="Checklist"
          value={checkInput}
          onChange={onCardChangeChecklist}
        />
      </div>

      <div className={styles.checklist_footer}>
        <button onClick={() => onChecklistClick()}>Add</button>
      </div>
    </div>
  );
};
export default Checklist;
