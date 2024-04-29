import { combineReducers } from 'redux';
import sidebarReducer from './sidebarReducer';
import columnReducer from './columnsReducer';
import tasksReducer from './tasksReducer';
import projectsReducer from './projectsReducer';
import selectedTaskReducer from './selectedTaskReducer';


const rootReducer = combineReducers({
  sidebarReducer,
  columnReducer,
  tasksReducer,
  projectsReducer,
  selectedTaskReducer
});

export default rootReducer;