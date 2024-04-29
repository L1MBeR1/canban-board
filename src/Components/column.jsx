import React,{useState,useEffect,useRef,useForceUpdate} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { editColumn, removeColumn } from '../reducers/columnsReducer.js';
// import { addTask,changeTaskColumn } from '../reducers/tasksReducer.js';
import Task from './task.jsx'
import { ReactComponent as Menu } from '../images/column/menu-vertical-svgrepo-com.svg'; 
import axios from 'axios';
import { fetchTasks } from '../task.js';


const Column=(props)=>{
    console.log(props)
    const tasksObject = useSelector(state => state.tasksReducer.tasks);
    console.log(tasksObject)
    //console.log(useSelector(state => state.tasksReducer.tasks  ))
    //const tasks = useSelector(state => state.tasksReducer.tasks);
    const [actionsStatus, setActionsStatus] = useState(false);
    const [addPermision, setAddPermision] = useState(true);
    const [selectCoords, setSelectCoords] = useState({ x: 0, y: 0 });
    const [name, setName] = useState(props.name);
    const [NewName, setNewName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    //const [OldName, setOldName] = useState('');
    //const tasksInCurrentColumn = Object.values(tasks).filter(task => task.columnId === props.id);
    const inputRef = useRef(null);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const dispatch = useDispatch();
    const fetchData = () => {
        fetchTasks(dispatch);
      };
    
    // const fetchTasks = async (id) => {
    //     try {
    //       const response = await axios.post('https://b24-g6zt20.bitrix24.ru/rest/1/l9n2br54u6w01qyc/tasks.task.list', {
    //         filter: { STAGE_ID: id }
    //       });
    //       console.log(id,response.data.result);
    //       setTasks(response.data.result);
    //       setIsLoading(false); // Устанавливаем состояние загрузки в false после получения задач
    //     } catch (error) {
    //       console.error('Ошибка при получении списка задач:', error);
    //       setIsLoading(false); // Устанавливаем состояние загрузки в false в случае ошибки
    //     }
    //   };
    useEffect(() => {
        setIsLoading(true);
        const filtered = [];
    
        // Перебираем каждый массив в объекте и фильтруем его задачи по stageId
        for (const key in tasksObject) {
          if (Object.prototype.hasOwnProperty.call(tasksObject, key)) {
            const tasksArray = tasksObject[key];
            const filteredArray = tasksArray.filter(task => task.stageId === props.id);
            filtered.push(...filteredArray);
          }
        }
        console.log(filtered)
        setFilteredTasks(filtered);
        setIsLoading(false);
        setAddPermision(true)
      }, [tasksObject]); // Перезапускаем эффект при изменении tasks или props.id
      

    // useEffect(()=>{
    //     const hasEmptyColumnName =tasksInCurrentColumn.some(task => task.title.trim() === '');
    //     setAddPermision(!hasEmptyColumnName);
    //   },[tasksInCurrentColumn])
    useEffect(() => {
        
        if (props.name === '') {
            inputRef.current.focus();
        }
    }, [props.name]);

    useEffect(()=>{
        dispatch(editColumn(props.id, name));
    },[name])
    // setAction(props.action);
    // console.log(action)
    

    const handleDeleteColumn = () => {
      dispatch(removeColumn(props.id)); 
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
    const handleRenameColumn=()=>{
        setName('')
        setNewName(name);
    }

    const handleAddTask = () => {
        // dispatch(addTask(props.id, ''));
        setAddPermision(!addPermision)
    };
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
    function blendColors(color1, color2, percent) {
       
        const r1 = parseInt(color1.substring(1, 3), 16);
        const g1 = parseInt(color1.substring(3, 5), 16);
        const b1 = parseInt(color1.substring(5, 7), 16);
        const r2 = parseInt(color2.substring(1, 3), 16);
        const g2 = parseInt(color2.substring(3, 5), 16);
        const b2 = parseInt(color2.substring(5, 7), 16);
    
       
        const r = Math.round(r1 * (1 - percent) + r2 * percent);
        const g = Math.round(g1 * (1 - percent) + g2 * percent);
        const b = Math.round(b1 * (1 - percent) + b2 * percent);
    
       
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    const moveTaskToStage = async (taskId, stageId) => {
        try {
            const response = await axios.post('https://b24-g6zt20.bitrix24.ru/rest/1/l9n2br54u6w01qyc/tasks.task.update', {
                taskId: taskId,
                fields: {
                    STAGE_ID: stageId
                }
            });
            return response.data.result;
        } catch (error) {
            console.error('Ошибка при обновлении задачи:', error);
            throw error;
        }
    };
    const TaskDrop=(e)=>{
        e.preventDefault();
        const taskId = parseInt(e.dataTransfer.getData('taskId'));
        const columnId = parseInt(e.dataTransfer.getData('columnId'));

        console.log(columnId,props.id,taskId)
        // if (columnId !== props.id){
        //     dispatch(changeTaskColumn(taskId, props.id));
        // }
        moveTaskToStage(`${taskId}`, props.id).then(() => {
            // fetchTasks(props.id);
            // fetchTasks(`${columnId}`);
            fetchData();

          });
    }
    const columnRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
       
      };
    const blendedColor = blendColors('#f7f6fe', props.color, 0.05);
    return(
        <div className="column" ref={columnRef} style={{ backgroundColor: blendedColor}} onDrop={TaskDrop} tabIndex="0" onBlur={closeActions} Droppable onDragOver={handleDragOver} >
            <div className='column-color' style={{ backgroundColor: props.color }}/>
            <header className='column-header'>
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
                    <div className="column-header-name" 
                    // onDoubleClick={handleRenameColumn}
                    >{name}</div>
                )}
                <div className='column-header-menu' onClick={menuTrigger}>
                    {props.id}
                    {/* <Menu className='svg'></Menu> */}
                </div>
                </header>
            <div className='column-tasks'>
                
            {isLoading ? (
                <div>Загрузка задач...</div>
            ) : (
                filteredTasks.map(task => (
                <Task 
                key={task.id} 
                name={task.title} 
                id={task.id} 
                columnId={props.id} 
                projectid={props.projectid} 
                new={false} 
                comments={task.commentsCount}
                description={task.description}
                />
                ))
            )}

            {addPermision ? (<button className='column-tasks-add' onClick={handleAddTask}>+ Добавить задачу</button>):(
                <Task name='' columnId={props.id} projectid={props.projectid} new={true}></Task>
            )}
            </div>
            {/* <div className='column-actions' style={{ display: actionsStatus ? 'flex' : 'none', position: 'absolute', top: selectCoords.y, left: selectCoords.x }}>
                <div className='column-rename' onClick={handleRenameColumn}>Переименовать</div>
                <div className='column-delete' onClick={handleDeleteColumn}>Удалить</div>
            </div> */}
        </div>
    );
};
export default Column;