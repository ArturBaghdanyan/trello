import { useState } from 'react';

import addCard from '../../assets/activity/add-card.svg';
import attachment from '../../assets/activity/attachment.svg';
import emoji from '../../assets/activity/emoji.svg';
import member from '../../assets/activity/member.svg';

import styles from './styles.module.scss';

export const HideElement = () => {
  const [selectedOption, setSelectedOption] = useState(false);
  const [isCloseDesc, setIsCloseDesc] = useState<boolean>(false);

  const handleButtonChange = (event: any) => {
    setSelectedOption(event.target.checked);
  };

  const closeCardForm = () => {
    setIsCloseDesc(!isCloseDesc);
  };

  return (
    <div className={styles.show}>
      <div className={styles.show_save}>
        <textarea name="selectedOption" onChange={handleButtonChange} />
        <button onClick={closeCardForm} disabled={!selectedOption}>
          Save
        </button>
      </div>
      <button className={styles.icons}>
        <img src={attachment} alt="attachment" />
        <img src={member} alt="member" />
        <img src={emoji} alt="emoji" />
        <img src={addCard} alt="add-card" />
      </button>
    </div>
  );
};
