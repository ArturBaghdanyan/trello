import React, { FC } from 'react';

import { IMember } from '../../types/member';

import styles from './styles.module.scss';

type MemberTextProps = {
  member: IMember;
  onClick: (memberId: string) => void;
};

const MembersText: FC<MemberTextProps> = ({ member, onClick }) => {
  return (
    <div className={styles.members_text}>
      <div className={styles.members_item} onClick={() => onClick(member.id)}>
        <span>{member.name[0]}</span>
        <div>{member.name}</div>
        <button>({member.email})</button>
      </div>
    </div>
  );
};

export default MembersText;
