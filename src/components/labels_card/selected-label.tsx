import React, { FC } from 'react';

import { useLabels } from '../../context/label-context';

type SelectedLabelProps = {
  labelId: string;
};
const SelectedLabel: FC<SelectedLabelProps> = ({ labelId }) => {
  const { findLabelById } = useLabels();
  const label = findLabelById(labelId);

  return (
    <div>
      <span
        className="flex w-18 h-8 rounded"
        style={{ backgroundColor: label.color }}
      >
        {label.color}
      </span>
    </div>
  );
};

export default SelectedLabel;
