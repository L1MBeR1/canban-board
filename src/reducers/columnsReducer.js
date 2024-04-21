import { ADD_COLUMN, EDIT_COLUMN, REMOVE_COLUMN } from '../actionsTypes/columnsActionsTypes'; // Импорт action types

let nextId = 2; // Переменная для хранения следующего id

export const addColumn = (title, color) => ({
  type: ADD_COLUMN,
  payload: { id: nextId++, title, color },
});

export const editColumn = (columnId, newTitle) => ({
  type: EDIT_COLUMN,
  payload: { columnId, newTitle },
});

export const removeColumn = (columnId) => ({
  type: REMOVE_COLUMN,
  payload: { columnId },
});

const initialState = {
  columns: {
    '0': {
      id: 0,
      title: 'Нужно сделать',
      color: '#FF5733',
    },
    '1': {
      id: 1,
      title: 'В работе',
      color: '#ffcf14',
    },
    '2': {
      id: 2,
      title: 'Готово',
      color: '#33FF57',
    },
  },
  columnOrder: [0, 1, 2],
};

const columnReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COLUMN: {
      const newColumnId = nextId++;
      const newColumn = {
        id: newColumnId,
        title: action.payload.title,
        color: action.payload.color,
      };
      return {
        ...state,
        columns: {
          ...state.columns,
          [newColumnId]: newColumn,
        },
        columnOrder: [...state.columnOrder, newColumnId],
      };
    }
    case EDIT_COLUMN: {
      const { columnId, newTitle } = action.payload;
      return {
        ...state,
        columns: {
          ...state.columns,
          [columnId]: {
            ...state.columns[columnId],
            title: newTitle,
          },
        },
      };
    }
    case REMOVE_COLUMN: {
      const { columnId } = action.payload;
      const { [columnId]: removedColumn, ...updatedColumns } = state.columns;
      const updatedColumnOrder = state.columnOrder.filter(id => id !== columnId);
      return {
        ...state,
        columns: updatedColumns,
        columnOrder: updatedColumnOrder,
      };
    }
    default:
      return state;
  }
};

export default columnReducer;
