import React, { FC, useState } from 'react';

import { CardMenuItem } from './item';
import { ICard } from '../../types/card';
import { ICardMenuItem } from '../../types/modal';
import Checklist from '../checklist';
import ClickAway from '../click-away';
import LabelsCard from '../labels_card';
import Members from '../members';
import styles from '../modal-list/styles.module.scss';
import MoveCard from '../move-card';

type CardMenuProps = {
  addToCard: ICardMenuItem[];
  actions: ICardMenuItem[];
  card: ICard;
};

const CardMenu: FC<CardMenuProps> = props => {
  const { addToCard, actions, card } = props;

  const [isMoveCardModalOpen, setIsMoveCardModalOpen] =
    useState<boolean>(false);
  const [isLabelModalOpen, setIsLabelModalOpen] = useState<boolean>(false);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState<boolean>(false);
  const [isChecklistModalOpen, setIsChecklistModalOpen] =
    useState<boolean>(false);

  const onCardAction = (keys: string) => {
    switch (keys) {
      case 'move':
        setIsMoveCardModalOpen(!isMoveCardModalOpen);
        break;
      case 'labels':
        setIsLabelModalOpen(true);
        break;
      case 'members':
        setIsMembersModalOpen(true);
        break;
      case 'checklist':
        setIsChecklistModalOpen(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className={`${styles.menu_parent}`}>
      <div className="relative">
        <h3>Add to Card</h3>
        {addToCard.map((item: ICardMenuItem) => (
          <CardMenuItem
            icon={item.icon}
            text={item.text}
            key={item.key}
            itemKey={item.key}
            onCardAction={onCardAction}
          />
        ))}
      </div>
      <div className="relative">
        <h3>Actions</h3>
        {actions.map((i: ICardMenuItem) => (
          <CardMenuItem
            icon={i.icon}
            text={i.text}
            key={i.key}
            itemKey={i.key}
            onCardAction={onCardAction}
          />
        ))}
        {isMoveCardModalOpen && (
          <ClickAway onClickAway={() => setIsMoveCardModalOpen(false)}>
            <MoveCard
              cardId={card.id}
              onClose={() => setIsMoveCardModalOpen(false)}
              isCardAbsolute={false}
            />
          </ClickAway>
        )}
        {isLabelModalOpen && (
          <ClickAway onClickAway={() => setIsLabelModalOpen(false)}>
            <LabelsCard
              onClose={() => setIsLabelModalOpen(false)}
              card={card}
            />
          </ClickAway>
        )}

        {isMembersModalOpen && (
          <ClickAway onClickAway={() => setIsMembersModalOpen(false)}>
            <Members
              onClose={() => setIsMembersModalOpen(false)}
              cardId={card.id}
            />
          </ClickAway>
        )}
        {isChecklistModalOpen && (
          <ClickAway onClickAway={() => setIsChecklistModalOpen(false)}>
            <Checklist
              onClose={() => setIsChecklistModalOpen(false)}
              cardId={card.id}
            />
          </ClickAway>
        )}
      </div>
    </div>
  );
};

export default CardMenu;
