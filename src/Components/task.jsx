
import React,{useState,useEffect,useRef} from 'react';
import { useDispatch } from 'react-redux';
//import { editColumn, removeColumn } from '../reducers/columnsReducer.js';
import { ReactComponent as Menu } from '../images/column/menu-vertical-svgrepo-com.svg'; 
import { ReactComponent as Arrow } from '../images/task/arrow-bottom-1-svgrepo-com.svg'; 
import { ReactComponent as Comments} from '../images/task/comments-lines-svgrepo-com.svg';
import { ReactComponent as Files} from '../images/task/files-svgrepo-com.svg';
import axios from 'axios';
import { fetchTasks } from '../task.js';
import {selectTask } from '../reducers/selectedTaskReducer.js'
// import { editTask, removeTask } from '../reducers/tasksReducer';

const Task=(props)=>{
    console.log(props)
    const [actionsStatus, setActionsStatus] = useState(false);
    const [expandedStatus, setExpandedStatus] = useState(false);
    const [selectCoords, setSelectCoords] = useState({ x: 0, y: 0 });
    const [name, setName] = useState('');
    const [NewName, setNewName] = useState('');
    const [files, setFiles] = useState();
    const inputRef = useRef(null);
    

    const fetchData = () => {
        fetchTasks(dispatch);
      };
    const deleteTask = async (taskId) => {
        try {
          const response = await axios.post(`https://b24-g6zt20.bitrix24.ru/rest/1/l9n2br54u6w01qyc/tasks.task.delete.json`, {
            taskId: taskId
          });
      
          // Обработка ответа, если необходимо
          console.log('Задача успешно удалена:', response.data);
        } catch (error) {
          console.error('Ошибка при удалении задачи:', error);
        }
      };
      const addTask = async (title, responsibleId,columnId,projectID) => {
        try {
          const response = await axios.post(`https://b24-g6zt20.bitrix24.ru/rest/1/l9n2br54u6w01qyc/tasks.task.add.json`, {
              fields: {
                TITLE: title,
                STAGE_ID:columnId,
                RESPONSIBLE_ID: responsibleId ,
                GROUP_ID:projectID
            }
          });
      
          console.log("Новая задача успешно добавлена:", response);
          // Возвращаем идентификатор новой задачи, если это необходимо
          return response.data.taskId;
        } catch (error) {
          console.error("Ошибка при добавлении задачи:", error);
          throw error; // Пробрасываем ошибку дальше, если это необходимо
        }
      };
      const renameTask = async (taskId, name) => {
        try {
            const response = await axios.post('https://b24-g6zt20.bitrix24.ru/rest/1/l9n2br54u6w01qyc/tasks.task.update', {
                taskId: taskId,
                fields: {
                    TITLE: name
                }
            });
            return response.data.result;
        } catch (error) {
            console.error('Ошибка при обновлении задачи:', error);
            throw error;
        }
    };
    const getTaskFiles = async (taskId) => {
      try {
          const response = await axios.post(`https://b24-g6zt20.bitrix24.ru/rest/1/l9n2br54u6w01qyc/task.item.getfiles`, {
              taskId: taskId
          });
          console.log('Файлы задачи:', response.data.result);
          setFiles(response.data.result);
      } catch (error) {
          console.error('Ошибка при получении данных о файлах:', error);
      }
  };
      useEffect(() => {
        setName(props.name);
        getTaskFiles(props.id);
    }, [props]);
    useEffect(() => {
        if (props.name === '') {
            inputRef.current.focus();
        }
    }, [props.name]);
    const dispatch = useDispatch();
    useEffect(()=>{
        // dispatch(editTask(props.id, name));
        if (name === '') {
            inputRef.current.focus();
        }
    },[name])
    // setAction(props.action);
    // console.log(action)
    
    const handleExpandedStatus = () => {
        // setExpandedStatus(!expandedStatus)
        dispatch(selectTask(props.id))
      };
    const handleDeleteTask = () => {
    //   dispatch(removeTask(props.id)); 
        closeActions();
        deleteTask(props.id)
        
        .then(() => {
            fetchData(); 
          })
          .catch(error => {
            console.error('Произошла ошибка при удалении задачи:', error);
          });
    };

    const handleInputBlur=()=>{
        if (NewName.trim() !== '') {
            setName(NewName);
            if (props.new===true){
            addTask(NewName,1,props.columnId,props.projectid)
            .then(() => {
                fetchData(); 
              })
              .catch(error => {
                console.error('Произошла ошибка при удалении задачи:', error);
              });
            }else{
            renameTask(props.id,NewName)
                .then(() => {
                    fetchData(); 
                  })
                  .catch(error => {
                    console.error('Произошла ошибка при удалении задачи:', error);
                  });
            }
        }
        else{
            fetchData(); 
        }
        setNewName('');
        // setDel(true).then(() => {
        //     fetchData(); 
        //   })
        //   .catch(error => {
        //     console.error('Произошла ошибка при удалении задачи:', error);
        //   });

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
         
        setNewName(name);
        setName('')
    }

    const menuTrigger=(e)=>{
        setSelectCoords({ x: e.pageX -90, y: e.pageY+ e.target.clientHeight });
        setActionsStatus(!actionsStatus)
        console.log(e)
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
            <div className='task-decription'>{props.description}</div>
            <div className='task-iconsButton'>
                  <div className='icons'>
                    <div className='task-icon'>
                      <Comments className='svg'/> {props.comments ? props.comments : 0}
                    </div>
                    <div className='task-icon'>
                    <Files className='svg'/> {files ? files.length : 0}
                      </div>
                  </div>
                  <div className='button'>
                    <button onClick={handleExpandedStatus} className='task-expand'>
                      Открыть
                      <Arrow className='svg'></Arrow>
                      </button>
                  </div>
            </div>

            
            <div className='column-actions' style={{ display: actionsStatus ? 'flex' : 'none', position: 'absolute', top: selectCoords.y, left: selectCoords.x }}>
                <div className='column-rename' onClick={handleRenameTask}>Переименовать</div>
                <div className='column-delete' onClick={handleDeleteTask}>Удалить</div>
            </div>
        </div>
    );
};
export default Task;