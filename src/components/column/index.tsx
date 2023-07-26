import { FC, useState } from 'react';

import { Draggable, Droppable } from 'react-beautiful-dnd';

import ColumnFooter from './column-footer';
import ColumnHeader from './column-header';
import { IColumn } from '../../types/column';
import { Card } from '../card';
import ColumnHeaderMenu from '../column-header-menu';

import styles from './styles.module.scss';

type ColumnProps = {
  column: IColumn;
  editColumnTitle: (id: string, title: string) => void;
  index: number;
};

const Column: FC<ColumnProps> = props => {
  const { column, editColumnTitle, index } = props;

  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState<boolean>(false);

  const handleMenuState = () => {
    setIsColumnMenuOpen(!isColumnMenuOpen);
  };

  return (
    <Draggable draggableId={column.id} index={index}>
      {provided => (
        <div
          className={styles.columns}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ColumnHeader
            id={column.id}
            title={column.title}
            editColumnTitle={editColumnTitle}
            handleMenuState={handleMenuState}
          />
          <Droppable droppableId={column.id} type="CARD">
            {dropProvided => (
              <div
                className={styles.cards}
                ref={dropProvided.innerRef}
                {...dropProvided.droppableProps}
              >
                {column.cards.map((id, index) => (
                  <Card key={id} cardId={id} index={index} />
                ))}
                {dropProvided.placeholder}
              </div>
            )}
          </Droppable>
          <ColumnFooter id={column.id} />
          {isColumnMenuOpen && (
            <ColumnHeaderMenu handleMenuState={handleMenuState} />
          )}
        </div>
      )}
    </Draggable>
  );
};
export default Column;
