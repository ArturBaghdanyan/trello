import { FC } from 'react';

import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import { AddColumnForm } from './addColumnForm';
import bgImage from '../../assets/background_image.jpg';
import { useBoard } from '../../context/board-context';
import reorderCards from '../../helpers/reorder-cards';
import reorderList from '../../helpers/reorder-list';
import Column from '../column';

import style from './styles.module.scss';

const Board: FC = () => {
  const { columns, setColumns, addNewColumn, editColumnTitle, isLoaded } =
    useBoard();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (result.type === 'COLUMN') {
      const reorderedList = reorderList(
        columns,
        source.index,
        destination.index
      );

      setColumns(reorderedList);

      return;
    }

    const reorderedList = reorderCards(columns, source, destination);
    setColumns(reorderedList);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {provided => (
          <div
            className={style.wrapper}
            style={{ backgroundImage: `url(${bgImage})` }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {isLoaded ? (
              columns.map((column, index) => (
                <div key={column.id}>
                  <Column
                    index={index}
                    column={column}
                    editColumnTitle={editColumnTitle}
                  />
                </div>
              ))
            ) : (
              <p>loading...</p>
            )}

            {provided.placeholder}
            <AddColumnForm onAdd={addNewColumn} />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default Board;
