import { combineReducers } from 'redux';
import sidebarReducer from './sidebarReducer';
import columnReducer from './columnsReducer';
import tasksReducer from './tasksReducer';


const rootReducer = combineReducers({
  sidebarReducer,
  columnReducer,
  tasksReducer,
});

export default rootReducer;