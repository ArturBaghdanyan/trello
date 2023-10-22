import { FC } from 'react';

import { useBoard } from '../../context/board-context';
import { cardModalList } from '../../data/card-modal-list';
import CloseButton from '../close-button';

import styles from './styles.module.scss';

type ColumnHeaderMenuProps = {
  handleMenuState: () => void;
  columnId: string;
};

const ColumnHeaderMenu: FC<ColumnHeaderMenuProps> = ({
  handleMenuState,
  columnId,
}) => {
  const { deleteColumn, getColumnById } = useBoard();

  const currentColumn = getColumnById(columnId);
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
            </div>
          ))}
          <button onClick={() => deleteColumn(currentColumn.id)}>
            delete column
          </button>
        </div>
      </div>
    </menu>
  );
};
export default ColumnHeaderMenu;
