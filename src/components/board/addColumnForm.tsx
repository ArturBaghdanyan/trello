import { FC, FormEvent, useState } from 'react';

import { IColumn } from '../../types/column';

type AddColumnFormProps = {
  onAdd: (column: IColumn) => void;
};

export const AddColumnForm: FC<AddColumnFormProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.length > 0) {
      onAdd({ title: text, cards: [], id: '' });
      setText('');
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <button style={{ color: 'white' }}>Add Another List</button>
    </form>
  );
};
