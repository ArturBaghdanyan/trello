import { FC } from 'react';

import icon from '../../assets/labels/pencil.svg';
import { useCard } from '../../context/card-context';
import { ILabel } from '../../types/labels';

import styles from './styles.module.scss';

type LabelDataProps = {
  label: ILabel;
  onEdit: (id: string) => void;
  isChecked: boolean;
  cardId: string;
};

const LabelData: FC<LabelDataProps> = props => {
  const { onEdit, label, isChecked, cardId } = props;

  const { onAddNewLabel } = useCard();
  const onLabelClick = () => {
    onAddNewLabel(label.id, cardId);
  };

  return (
    <div className={`${styles.labels_menu}`}>
      <div className={`${styles.rows} group`}>
        <input type="checkbox" checked={isChecked} />
        <button
          style={{ backgroundColor: label.color }}
          onClick={onLabelClick}
        ></button>
        <span>You hover me!</span>
        <button className={styles.button_pencil} onClick={() => onEdit('edit')}>
          <img src={icon} alt="icon" />
        </button>
      </div>
    </div>
  );
};

export default LabelData;
