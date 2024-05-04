import { tasksFetchSuccess, tasksFetchError } from './reducers/tasksReducer';
import axios from 'axios';

export const fetchTasks = async (dispatch) => {
  try {
    const response = await axios.get(`https://b24-9t4mro.bitrix24.ru/rest/1/uv94tc04ks798yhf/tasks.task.list.json`);
    const tasksData = response.data.result;
    const tasksArray = Array.isArray(tasksData) ? tasksData : Object.values(tasksData);
    console.log(tasksArray)
    dispatch(tasksFetchSuccess(tasksArray));
  } catch (error) {
    dispatch(tasksFetchError(error.message));
  }
};