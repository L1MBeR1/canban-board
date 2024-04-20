import React from 'react';

const Task=(props)=>{

    return(
        <div className="Task">
            <header>
                <div>{props.name}</div>
                <div>{props.description}</div>
            </header>
            <div>

            </div>
        </div>
    );
};
export default Task;