import React from 'react';
import Task from './task.jsx'

const Column=(props)=>{
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
    
    const blendedColor = blendColors('#f7f6fe', props.color, 0.025);
    return(
        <div className="column" style={{ backgroundColor: blendedColor}}>
            <div className='column-color' style={{ backgroundColor: props.color }}/>
            <div className='column-name'>{props.name}</div>
            <div className='column-tasks'>
                <Task></Task>
                <button className='column-tasks-add'>+ Добавить задачу</button>
            </div>
        </div>
    );
};
export default Column;