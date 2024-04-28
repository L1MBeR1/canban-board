import React,{useEffect,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addColumn } from './reducers/columnsReducer';
import { tasksFetchSuccess, tasksFetchError } from './reducers/tasksReducer';
import './App.css'

import axios from 'axios';
import Project from './Components/project';
import Sidebar from './Components/sidebar';
import AppHeader from './Components/header';
import { fetchTasks } from './task';
function App() {
  console.log(useSelector(state => state.projectsReducer.projects ))
  const projects = useSelector(state => state.projectsReducer.projects);

  const [tasks, setTasks] = useState();

  // useEffect(()=>{
  //   const hasEmptyColumnName = Object.values(columns).some(column => column && column.title && column.title.trim() === '');

  //   setAddPermision(!hasEmptyColumnName);
  // },[columns])
  
  const dispatch = useDispatch();

  const fetchData = () => {
    fetchTasks(dispatch);
  };

  // Вы можете вызывать fetchData по необходимости, например, при монтировании компонента
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="App">
          <Sidebar></Sidebar>
      <div className='main'>
        <AppHeader></AppHeader>
      <div className='main-content' style={{ justifyContent: Object.values(projects).length === 0 ? 'center' : 'normal' }}>

      {Object.values(projects).length === 0 ? (
            <div className='main-content-warn'>Выберите один из проектов</div>
          ) : (
            Object.values(projects).map(project => (
              <Project key={project.id} id={project.id} name={project.name} />
            ))
          )}
        {/* {addPermision && (<button className='column-add' onClick={handleAddColumn}>+ Добавить колонку</button>)} */}
        </div>
      </div>
    </div>
  );
}

export default App;