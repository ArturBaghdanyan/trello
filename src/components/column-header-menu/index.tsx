import { FC } from 'react';

import { useBoard } from '../../context/board-context';
import { cardModalList } from '../../data/card-modal-list';
import CloseButton from '../close-button';

import styles from './styles.module.scss';

type ColumnHeaderMenuProps = {
  handleMenuState: () => void;
};

const ColumnHeaderMenu: FC<ColumnHeaderMenuProps> = ({ handleMenuState }) => {
  const { columns, setColumns } = useBoard();

  function deleteColumn(id: string) {
    setColumns(columns.filter(el => el.id !== id));
  }

  return (
    <menu className={styles.menu}>
      <div className={styles.wrapper}>
        <div className={styles.list_header}>
          <h2>List actions</h2>
          <CloseButton
            className={styles.close_button}
            onClick={handleMenuState}
          />
        </div>
        <div className={styles.list_actions}>
          {cardModalList.map(el => (
            <div key={el.id}>
              <div className={styles.action_button}>
                {el.items.map(item => (
                  <div key={item.id}>
                    <button>{item.title}</button>
                  </div>
                ))}
              </div>
              <button onClick={() => deleteColumn(el.id)}>delete card</button>
            </div>
          ))}
        </div>
      </div>
    </menu>
  );
};
export default ColumnHeaderMenu;
