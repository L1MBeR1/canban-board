import { ADD_COLUMN, EDIT_COLUMN, REMOVE_COLUMN, UPDATE_GLOBAL_COLUMNS } from '../actionsTypes/columnsActionsTypes'; // Импорт action types

let nextId = 0; // Переменная для хранения следующего id

export const addColumn = (projectId, title, color) => ({
  type: ADD_COLUMN,
  payload: { id: nextId++, projectId, title, color },
});

export const editColumn = (columnId, newTitle) => ({
  type: EDIT_COLUMN,
  payload: { columnId, newTitle },
});

export const removeColumn = (columnId) => ({
  type: REMOVE_COLUMN,
  payload: { columnId },
});

export const updateGlobalColumns = (allColumns) => ({
  type: UPDATE_GLOBAL_COLUMNS,
  payload: { allColumns },
});

const initialState = {
  columns: {},
  columnOrder: [],
};

const columnReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COLUMN: {
      const { projectId, title, color } = action.payload;
      const newColumnId = nextId++;
      const newColumn = {
        id: newColumnId,
        projectId,
        title,
        color,
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
    case UPDATE_GLOBAL_COLUMNS: {
      const { allColumns } = action.payload;
      return {
        ...state,
        columns: allColumns,
        columnOrder: Object.keys(allColumns), // Не преобразовываем ключи, чтобы сохранить порядок
      };
    }
    default:
      return state;
  }
};

export default columnReducer;
