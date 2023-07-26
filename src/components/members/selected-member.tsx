import React, { FC } from 'react';

import { useMembers } from '../../context/member-context';

type SelectedMemberProps = {
  memberId: string;
};
const SelectedMember: FC<SelectedMemberProps> = ({ memberId }) => {
  const { findMemberById } = useMembers();
  const member = findMemberById(memberId);

  return (
    <div>
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-400">
        {member.name[0]}
      </span>
    </div>
  );
};

export default SelectedMember;
