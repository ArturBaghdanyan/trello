import { v4 } from 'uuid';

import attachment from '../assets/card-modal_icons/attachment.svg';
import check from '../assets/card-modal_icons/check.svg';
import clock from '../assets/card-modal_icons/clock.svg';
import cover from '../assets/card-modal_icons/cover.svg';
import label from '../assets/card-modal_icons/label.svg';
import person from '../assets/card-modal_icons/person.svg';
import { ICardMenuItem } from '../types/modal';

export const addCardData: ICardMenuItem[] = [
  {
    id: v4(),
    key: 'members',
    icon: person,
    text: 'Members',
  },
  {
    id: v4(),
    key: 'labels',
    icon: label,
    text: 'Labels',
  },
  {
    id: v4(),
    key: 'checklist',
    icon: check,
    text: 'Checklist',
  },
  {
    id: v4(),
    key: 'dates',
    icon: clock,
    text: 'Dates',
  },
  {
    id: v4(),
    key: 'attachment',
    icon: attachment,
    text: 'Attachment',
  },
  {
    id: v4(),
    key: 'cover',
    icon: cover,
    text: 'Cover',
  },
];

export const cardActionData: ICardMenuItem[] = [
  {
    id: v4(),
    key: 'move',
    icon: person,
    text: 'Move',
  },
  {
    id: v4(),
    key: 'copy',
    icon: label,
    text: 'Copy',
  },
  {
    id: v4(),
    key: 'make',
    icon: check,
    text: 'Make template',
  },
  {
    id: v4(),
    key: 'archive',
    icon: clock,
    text: 'Archive',
  },
  {
    id: v4(),
    key: 'share',
    icon: attachment,
    text: 'Share',
  },
];
