import React,{useEffect,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addColumn } from './reducers/columnsReducer';
import './App.css'


import Project from './Components/project';
import Sidebar from './Components/sidebar';
import AppHeader from './Components/header';

function App() {
  console.log(useSelector(state => state.projectsReducer.projects ))
  const [addPermision, setAddPermision] = useState(true);
  const projects = useSelector(state => state.projectsReducer.projects);
  const dispatch = useDispatch();
  // useEffect(()=>{
  //   const hasEmptyColumnName = Object.values(columns).some(column => column && column.title && column.title.trim() === '');

  //   setAddPermision(!hasEmptyColumnName);
  // },[columns])
  const handleAddColumn = () => {
    dispatch(addColumn('', getRandomColor())); // Добавляем новую колонку с белым цветом
  };
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
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