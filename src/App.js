import './App.css';

import AppHeader from "./Components/header.jsx"
import Sidebar from "./Components/sidebar.jsx"
import Column from './Components/column.jsx'

function App() {
  return (
    <div className="App">
      <Sidebar></Sidebar>
      <div className='main'>
        <AppHeader></AppHeader>
        <div className='main-content'>
          <Column name='Готово' color='#7189ff'></Column>
          <Column name='В разработке' color='#50118C'></Column>
        </div>
      </div>
    </div>
  );
}

export default App;
