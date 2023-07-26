import { FC } from 'react';

import eye from '../../assets/card-modal_icons/eye.svg';
import { ICard } from '../../types/card';
import { CardActivity } from '../card-activity';
import { CardDescription } from '../card-description';
import ChecklistModal from '../checklist/checklist-modal';
import SelectedLabel from '../labels_card/selected-label';
import SelectedMember from '../members/selected-member';
import { ModalList } from '../modal-list';

import styles from './styles.module.scss';

type CardWrapperProps = {
  card: ICard;
};

export const CardWrapper: FC<CardWrapperProps> = ({ card }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <div className={`${styles.notification}`}>
          <div className="flex flex-col">
            <div>Member</div>
            <div className="flex gap-x-3">
              {card.members.map(memberId => (
                <SelectedMember key={memberId} memberId={memberId} />
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <div>Label</div>
            <div className="flex gap-x-3">
              {card.labels.map(labelId => (
                <SelectedLabel key={labelId} labelId={labelId} />
              ))}
            </div>
          </div>
          <div className={styles.not_text}>
            <span>Notifications</span>
            <div className={styles.notification_button}>
              <img src={eye} alt="eye" />
              <button>Watch</button>
            </div>
          </div>
        </div>
        <CardDescription card={card} />
        {card.checklist.map(checkId => (
          <ChecklistModal key={checkId} cardId={card.id} checkId={checkId} />
        ))}
        <CardActivity />
      </div>
      <ModalList card={card} />
    </div>
  );
};
