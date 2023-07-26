import { ChangeEvent, FC, FormEvent, useState } from 'react';

import description_icon from '../../assets/card-modal_icons/menu_description.svg';
import { useCard } from '../../context/card-context';
import { ICard } from '../../types/card';
import styles from '../card-description/styles.module.scss';

type CardDescProps = {
  card: ICard;
};

export const CardDescription: FC<CardDescProps> = ({ card }) => {
  const { editCardDescription } = useCard();
  const [description, setDescription] = useState(card.description || '');
  const [isDescriptionFormOpen, setIsDescriptionFormOpen] =
    useState<boolean>(false);

  const toggleCardForm = () => {
    setIsDescriptionFormOpen(!isDescriptionFormOpen);
  };

  const addDescCard = (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault();
    editCardDescription(card.id, description);
    setIsDescriptionFormOpen(false);
  };

  const onCardChangeDesc = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  return (
    <div className={styles.description}>
      <div className={styles.child1}>
        <img src={description_icon} alt="description" />
      </div>
      <div className={styles.child2}>
        <div className={styles.description_title}>
          <h2>Description</h2>
          <div
            className={`${styles.edit} ${
              isDescriptionFormOpen ? styles.edit_2 : ''
            }`}
          >
            {card.description && !isDescriptionFormOpen && (
              <button onClick={toggleCardForm}>Edit</button>
            )}
          </div>
        </div>

        {isDescriptionFormOpen ? (
          <div className={styles.open_el}>
            <textarea
              className={styles.text}
              value={description}
              onChange={onCardChangeDesc}
            />
            <div className={styles.footer_text}>
              <button className={styles.button_save} onClick={addDescCard}>
                Save
              </button>
              <button className={styles.button_cancel} onClick={toggleCardForm}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-start">
            <button onClick={() => setIsDescriptionFormOpen(true)}>
              {description || 'Add description'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
