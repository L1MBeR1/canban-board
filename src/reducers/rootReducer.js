import { combineReducers } from 'redux';
import sidebarReducer from './sidebarReducer';
import columnReducer from './columnsReducer';


const rootReducer = combineReducers({
  sidebarReducer,
  columnReducer
});

export default rootReducer;