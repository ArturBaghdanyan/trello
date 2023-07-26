import React, { ChangeEvent, FC, FormEvent, useState } from 'react';

import close from '../../assets/card-modal_icons/close.svg';
import { useLabels } from '../../context/label-context';
import { editButton } from '../../data/edit-button';

import styles from './styles.module.scss';

type CreateLabelModalProps = {
  onCloseEditModal: () => void;
};

const CreateLabelModal: FC<CreateLabelModalProps> = ({ onCloseEditModal }) => {
  const [inputTitle, setInputTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState<any>('');
  const { addNewLabel } = useLabels();

  const addLabelCard = (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    console.log('aaa', selectedColor);
    e.preventDefault();
    addNewLabel(selectedColor?.id, selectedColor?.color);
  };

  const onCardChangeLabel = (event: ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.labels_header}>
        <h2>Edit Labels</h2>
        <button onClick={onCloseEditModal}>
          <img src={close} alt="close" />
        </button>
      </div>
      <div className={styles.underline}></div>
      <div className="w-full h-20 bg-gray-200 flex items-center justify-center">
        <div
          className="w-4/5 h-8"
          style={{
            backgroundColor: selectedColor ? selectedColor.color : 'green',
          }}
        >
          {inputTitle}
        </div>
      </div>
      <div>Title</div>
      <div className={styles.input}>
        <input type="text" value={inputTitle} onChange={onCardChangeLabel} />
      </div>
      <h2>Select a color</h2>
      <div className={styles.colors}>
        {editButton.map(i => (
          <div key={i.id} className={styles.bgColors}>
            {i.buttonColor.map(item => (
              <div key={item.id}>
                <button
                  style={{ backgroundColor: item.color }}
                  className="w-12 h-8 rounded"
                  onClick={() => setSelectedColor(item)}
                ></button>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.change_label}>
        <button>Remove color</button>
      </div>
      <div className={styles.underline}></div>
      <div className={styles.button_click}>
        <button className="bg-blue-400" onClick={addLabelCard}>
          Save
        </button>
        <button className="bg-red-500">Delete</button>
      </div>
    </div>
  );
};
export default CreateLabelModal;
