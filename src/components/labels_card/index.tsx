import { ChangeEvent, FC, useState } from 'react';

import CreateLabelModal from './create-label-modal';
import EditLabelModal from './edit-label-modal';
import LabelData from './label-data';
import close from '../../assets/card-modal_icons/close.svg';
import { useLabels } from '../../context/label-context';
import { ICard } from '../../types/card';

import styles from './styles.module.scss';

type LabelsCardProps = {
  onClose: () => void;
  card: ICard;
};

const LabelsCard: FC<LabelsCardProps> = props => {
  const { onClose, card } = props;

  const [inputText, setInputText] = useState<string>('');
  const [isEditModalOpen, setIsEditModalOpen] = useState<string | null>(null);

  const { labels } = useLabels();

  const onEdit = (id: string) => {
    setIsEditModalOpen(() => id);
  };

  const onCloseEditModal = () => {
    setIsEditModalOpen(null);
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputText(e.target.value);
  };

  if (inputText.length > 0) {
    labels.map((label: any) => {
      return label.button.color.match(inputText);
    });
  }
  return (
    <div className={styles.container}>
      <div className={styles.labels_header}>
        <h2>Labels</h2>
        <button onClick={onClose}>
          <img src={close} alt="close" />
        </button>
      </div>
      <div className={styles.underline}></div>
      <div className={styles.input}>
        <input
          type="text"
          placeholder="Search labels"
          onChange={inputHandler}
          value={inputText}
        />
      </div>
      <h2>Labels</h2>

      <div>
        {labels.map(label => (
          <LabelData
            key={label.id}
            onEdit={onEdit}
            label={label}
            cardId={card.id}
            isChecked={card.labels.includes(label.id)}
          />
        ))}
      </div>
      {isEditModalOpen === 'edit' && (
        <EditLabelModal onCloseEditModal={onCloseEditModal} />
      )}
      {isEditModalOpen && (
        <CreateLabelModal onCloseEditModal={onCloseEditModal} />
      )}
      <div className={styles.change_label}>
        <button onClick={() => onEdit('create')}>Create a new label</button>
      </div>
    </div>
  );
};

export default LabelsCard;
