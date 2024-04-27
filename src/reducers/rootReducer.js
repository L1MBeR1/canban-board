import { combineReducers } from 'redux';
import sidebarReducer from './sidebarReducer';
import columnReducer from './columnsReducer';
import tasksReducer from './tasksReducer';
import projectsReducer from './projectsReducer';


const rootReducer = combineReducers({
  sidebarReducer,
  columnReducer,
  tasksReducer,
  projectsReducer,
});

export default rootReducer;