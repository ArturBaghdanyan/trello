import { FC } from 'react';

import styles from '../modal-list/styles.module.scss';

type CardMenuItemProps = {
  icon: string;
  text: string;
  onCardAction: (key: string) => void;
  itemKey: string;
};

export const CardMenuItem: FC<CardMenuItemProps> = props => {
  const { icon, text, onCardAction, itemKey } = props;

  return (
    <div
      onClick={() => onCardAction(itemKey)}
      className={`${styles.menu_child}`}
    >
      <img src={icon} alt={text} />
      <p>{text}</p>
    </div>
  );
};
