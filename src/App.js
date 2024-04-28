import React,{useEffect,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addColumn } from './reducers/columnsReducer';
import './App.css'


import Project from './Components/project';
import Sidebar from './Components/sidebar';
import AppHeader from './Components/header';

function App() {
  console.log(useSelector(state => state.projectsReducer.projects ))
  const projects = useSelector(state => state.projectsReducer.projects);

  // useEffect(()=>{
  //   const hasEmptyColumnName = Object.values(columns).some(column => column && column.title && column.title.trim() === '');

  //   setAddPermision(!hasEmptyColumnName);
  // },[columns])

  
  return (
    <div className="App">
          <Sidebar></Sidebar>
      <div className='main'>
        <AppHeader></AppHeader>
      <div className='main-content'>

      {Object.values(projects).map(project => (
        <Project key={project.id} id={project.id} name={project.name} />
      ))}
        {/* {addPermision && (<button className='column-add' onClick={handleAddColumn}>+ Добавить колонку</button>)} */}
        </div>
      </div>
    </div>
  );
}

export default App;