// selectedTaskReducer.js

// Экшены для управления состоянием выбранной задачи
export const SELECT_TASK = 'SELECT_TASK';
export const DELETE_TASK = 'DELETE_TASK';

// Начальное состояние для выбранной задачи
export const initialState = {
  selectedTaskId: null,
};

// Редуктор для управления состоянием выбранной задачи
const selectedTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_TASK:
      return {
        ...state,
        selectedTaskId: action.payload,
      };
    case DELETE_TASK:
      return {
        ...state,
        selectedTaskId: null, // Сбрасываем выбранную задачу после удаления
      };
    default:
      return state;
  }
};

// Экшен-криэйторы
export const selectTask = (taskId) => ({
  type: SELECT_TASK,
  payload: taskId,
});

export const deleteTask = () => ({
  type: DELETE_TASK,
});

export default selectedTaskReducer;
