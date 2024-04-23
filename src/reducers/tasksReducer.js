import { ADD_TASK, EDIT_TASK, REMOVE_TASK } from '../actionsTypes/tasksActionTypes';

let nextId = 3; // Установим начальное значение для следующего id

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

const initialState = {
  tasks: {
    // '0': { id: 0, columnId: 0, title: 'Сделать план проекта' },
    // '1': { id: 1, columnId: 1, title: 'Написать код для функции X' },
    // '2': { id: 2, columnId: 2, title: 'Подготовить презентацию' },
  },
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
