import { ADD_TASK, EDIT_TASK, REMOVE_TASK, CHANGE_TASK_COLUMN } from '../actionsTypes/tasksActionTypes';

let nextId = 0; // Установим начальное значение для следующего id

export const addTask = (columnId, title) => ({
  type: ADD_TASK,
  payload: { id: nextId++, columnId, title },
});

export const editTask = (taskId, newTitle) => ({
  type: EDIT_TASK,
  payload: { taskId, newTitle },
});

export const removeTask = (taskId) => ({
  type: REMOVE_TASK,
  payload: { taskId },
});

export const changeTaskColumn = (taskId, newColumnId) => ({
  type: CHANGE_TASK_COLUMN,
  payload: { taskId, newColumnId },
});

const initialState = {
  tasks: {},
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK: {
      const { id, columnId, title } = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [id]: { id, columnId, title },
        },
      };
    }
    case EDIT_TASK: {
      const { taskId, newTitle } = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [taskId]: {
            ...state.tasks[taskId],
            title: newTitle,
          },
        },
      };
    }
    case CHANGE_TASK_COLUMN: {
      const { taskId, newColumnId } = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [taskId]: {
            ...state.tasks[taskId],
            columnId: newColumnId,
          },
        },
      };
    }
    case REMOVE_TASK: {
      const { [action.payload.taskId]: removedTask, ...updatedTasks } = state.tasks;
      return {
        ...state,
        tasks: updatedTasks,
      };
    }
    default:
      return state;
  }
};

export default taskReducer;
