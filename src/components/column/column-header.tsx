import React, { ChangeEvent, FC, useState } from 'react';

import title_menu from '../../assets/column_icons/menu_icon.svg';

import style from './styles.module.scss';

export type ColumnHeaderProps = {
  id: string;
  title: string;
  editColumnTitle: (id: string, title: string) => void;
  handleMenuState: () => void;
};

const ColumnHeader: FC<ColumnHeaderProps> = props => {
  const { title, editColumnTitle, id, handleMenuState } = props;

  const [columnTitle, setColumnTitle] = useState<string>(title);

  const onSaveTitle = () => {
    if (columnTitle.length > 0) {
      editColumnTitle(id, columnTitle);
    }
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setColumnTitle(event.target.value);
  };

  return (
    <div className={style.columns_title}>
      <input
        type="text"
        value={columnTitle}
        onChange={onChangeTitle}
        onBlur={onSaveTitle}
      />
      <button className={style.image} onClick={handleMenuState}>
        <img src={title_menu} alt="menu" />
      </button>
    </div>
  );
};
export default ColumnHeader;
