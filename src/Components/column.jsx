import React,{useState} from 'react';
import Task from './task.jsx'
import { ReactComponent as Menu } from '../images/column/menu-vertical-svgrepo-com.svg'; 

const Column=(props)=>{

    const [tasks, setTasks] = useState([]);
    const [actionsStatus, setActionsStatus] = useState(false);
    const [action, setAction] = useState();
    // Функция для добавления новой задачи
    const addTask = () => {
        // Создаем новую задачу (в данном примере просто объект с уникальным идентификатором)
        const newTask = {
            id: Math.random(), // Уникальный идентификатор
            title: 'Новая задача',
        };

        // Добавляем новую задачу в список задач
        setTasks(prevTasks => [...prevTasks, newTask]);
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
    const TaskDrop=()=>{
        
    }
    const blendedColor = blendColors('#f7f6fe', props.color, 0.05);
    return(
        <div className="column" style={{ backgroundColor: blendedColor}} onDrop={TaskDrop} Droppable>
            <div className='column-color' style={{ backgroundColor: props.color }}/>
            <header className='column-header'>
                <div className='column-header-name'>{props.name}</div>
                <div className='column-header-menu'>
                    <Menu className='svg'></Menu>
                </div>
                </header>
            <div className='column-tasks'>

                {tasks.map(task => (
                    <Task key={task.id} title={task.title} />
                ))}

                <button className='column-tasks-add' onClick={addTask}>+ Добавить задачу</button>
            </div>
            <div className='column-actions'>

            </div>
        </div>
    );
};
export default Column;