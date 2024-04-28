import { tasksFetchSuccess, tasksFetchError } from './reducers/tasksReducer';
import axios from 'axios';

export const fetchTasks = async (dispatch) => {
  try {
    const response = await axios.get(`https://b24-g6zt20.bitrix24.ru/rest/1/l9n2br54u6w01qyc/tasks.task.list.json`);
    const tasksData = response.data.result;
    const tasksArray = Array.isArray(tasksData) ? tasksData : Object.values(tasksData);
    dispatch(tasksFetchSuccess(tasksArray));
  } catch (error) {
    dispatch(tasksFetchError(error.message));
  }
};