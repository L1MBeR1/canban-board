
import React,{useState,useEffect,useRef} from 'react';
import { useDispatch } from 'react-redux';
//import { editColumn, removeColumn } from '../reducers/columnsReducer.js';
import { ReactComponent as Menu } from '../images/column/menu-vertical-svgrepo-com.svg'; 
import { ReactComponent as Arrow } from '../images/task/arrow-bottom-1-svgrepo-com.svg'; 
import { editTask, removeTask } from '../reducers/tasksReducer';

const Task=(props)=>{
    const [actionsStatus, setActionsStatus] = useState(false);
    const [expandedStatus, setExpandedStatus] = useState(false);
    const [selectCoords, setSelectCoords] = useState({ x: 0, y: 0 });
    const [name, setName] = useState(props.name);
    const [NewName, setNewName] = useState('');
    const inputRef = useRef(null);
    useEffect(() => {
        
        if (props.name === '') {
            inputRef.current.focus();
        }
    }, [props.name]);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(editTask(props.id, name));
    },[name])
    // setAction(props.action);
    // console.log(action)
    
    const handleExpandedStatus = () => {
        setExpandedStatus(!expandedStatus)
      };
    const handleDeleteTask = () => {
      dispatch(removeTask(props.id)); 
    };

    const handleInputBlur=()=>{
        if (NewName.trim() !== '') {
            setName(NewName);
        }

        setNewName('');
    }
    const handleInputChange = (e) => {
        setNewName(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleInputBlur(); 
        }
    };
    const handleRenameTask=()=>{
        setName('')
        setNewName(name);
    }

    const menuTrigger=(e)=>{
        setSelectCoords({ x: e.target.offsetLeft -90, y: e.target.offsetTop + e.target.clientHeight + 5 });
        setActionsStatus(!actionsStatus)
        //console.log(e)
    }
    const closeActions = () => {
    if (actionsStatus) {
        setActionsStatus(false)
    }
    };
    const handleDragStart = (e) => {
        e.dataTransfer.setData('taskId', props.id); // Устанавливаем идентификатор задачи
        e.dataTransfer.setData('columnId', props.columnId); // Устанавливаем идентификатор колонки
        //console.log(props.columnId)
      };
    return(
        <div className="task" draggable tabIndex="0" onBlur={closeActions} onDragStart={handleDragStart}>
            <header className='task-header'>
                {name === '' ? ( 
                    <input
                        ref={inputRef}
                        type="text"

                        value={NewName}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onKeyDown={handleKeyDown}
                        placeholder="Введите название"
                        maxLength={40}
                    />
                ) : (
                     <div onDoubleClick={handleRenameTask}>{name}</div>
                    )}
                    <div className='task-header-menu' onClick={menuTrigger}>
                    <Menu className='svg'></Menu>
                    </div>
               
            </header>
            <div className='task-content'>
                <div className='task-decription'>{props.description}</div>
                <div className='task-files'></div>
                <div className='task-comments'></div>
            </div>
            <button onClick={handleExpandedStatus} className='task-expand'><Arrow className='svg'></Arrow></button>
            <div className='column-actions' style={{ display: actionsStatus ? 'flex' : 'none', position: 'absolute', top: selectCoords.y, left: selectCoords.x }}>
                <div className='column-rename' onClick={handleRenameTask}>Переименовать</div>
                <div className='column-delete' onClick={handleDeleteTask}>Удалить</div>
            </div>
        </div>
    );
};
export default Task;