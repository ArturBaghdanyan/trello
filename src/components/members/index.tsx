import { FC } from 'react';

import MembersText from './members-text';
import close from '../../assets/column_icons/close_icon.svg';
import { useCard } from '../../context/card-context';
import { useMembers } from '../../context/member-context';

import styles from './styles.module.scss';

type MembersType = {
  onClose: () => void;
  cardId: string;
};
const Members: FC<MembersType> = props => {
  const { onClose, cardId } = props;

  const { onAddNewMember } = useCard();
  const { members } = useMembers();

  const onMemberClick = (memberId: string) => {
    onAddNewMember(memberId, cardId);
  };

  return (
    <div className={styles.members}>
      <div className={styles.members_header}>
        <h2>Members</h2>
        <button className={styles.close_card} onClick={onClose}>
          <img src={close} alt="close" />
        </button>
      </div>
      <div className={styles.underline}></div>
      <div className={styles.input}>
        <input type="text" placeholder="Search members" />
      </div>

      <h3>Board Members</h3>
      {members.map(member => (
        <MembersText key={member.id} member={member} onClick={onMemberClick} />
      ))}

      <div className={styles.members_footer}>
        <button>Show other Workspace members</button>
      </div>
    </div>
  );
};
export default Members;
