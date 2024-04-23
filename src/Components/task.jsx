
import React,{useState,useEffect,useRef} from 'react';
import { useDispatch } from 'react-redux';
//import { editColumn, removeColumn } from '../reducers/columnsReducer.js';
import { ReactComponent as Menu } from '../images/column/menu-vertical-svgrepo-com.svg'; 
import { ReactComponent as Arrow } from '../images/task/arrow-bottom-1-svgrepo-com.svg'; 

const Task=(props)=>{
    const [actionsStatus, setActionsStatus] = useState(false);
    const [selectCoords, setSelectCoords] = useState({ x: 0, y: 0 });
    const [name, setName] = useState(props.name);
    const [NewName, setNewName] = useState('');

    return(
        <div className="task" draggable>
            <header className='task-header'>
                <div>
                     <div>{props.title}</div>
                     <div></div>
                </div>
               
                <div>{props.description}</div>
            </header>
            <div>

            </div>
            <button></button>
        </div>
    );
};
export default Task;