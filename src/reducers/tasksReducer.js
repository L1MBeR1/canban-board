// tasksReducer.js

// Экшены для управления состоянием задач
export const TASKS_FETCH_SUCCESS = 'TASKS_FETCH_SUCCESS';
export const TASKS_FETCH_ERROR = 'TASKS_FETCH_ERROR';

// Начальное состояние для задач
export const initialState = {
  tasks: [],
  loading: true,
  error: null,
};

// Редуктор для управления состоянием задач
const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASKS_FETCH_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        error: null,
      };
    case TASKS_FETCH_ERROR:
      return {
        ...state,
        tasks: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Экшен-криэйторы
export const tasksFetchSuccess = (tasks) => ({
  type: TASKS_FETCH_SUCCESS,
  payload: tasks,
});

export const tasksFetchError = (error) => ({
  type: TASKS_FETCH_ERROR,
  payload: error,
});

export default tasksReducer;