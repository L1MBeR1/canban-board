import React from 'react';

const Task=(props)=>{

    return(
        <div className="task" draggable>
            <header className='task-header'>
                <div>
                     <div>{props.name}</div>
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