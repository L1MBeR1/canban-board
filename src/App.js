import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addColumn } from './reducers/columnsReducer';
import './App.css'

import Column from './Components/column';
import Sidebar from './Components/sidebar';
import AppHeader from './Components/header';

function App() {
  console.log(useSelector(state => state.columnReducer.columns  ))
  const columns = useSelector(state => state.columnReducer.columns);
  const dispatch = useDispatch();

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
        {Object.values(columns).map(column => (
          <Column key={column.id} id={column.id} name={column.title} color={column.color} />
        ))}
        <button className='column-add' onClick={handleAddColumn}>+ Добавить колонку</button>
        </div>
      </div>
    </div>
  );
}

export default App;