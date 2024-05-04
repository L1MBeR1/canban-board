import React, { useState, useEffect, useRef } from 'react'; // Импортируем один раз useEffect и useRef
import { ReactComponent as CloseSidebarIcon } from '../images/sidebar/sidebar-close-svgrepo-com.svg'; 
import { ReactComponent as OpenSidebarIcon } from '../images/sidebar/sidebar-open-svgrepo-com.svg'; 
import axios from 'axios';
import {  useDispatch } from 'react-redux';

import { addProject,deleteProject,deleteAllProjects} from '../reducers/projectsReducer.js';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const IconRef = useRef(null);
    const [contentWidth, setContentWidth] = useState('auto');
    const [projects, setProjects] = useState([]);
    const [choisenProjects, setChoisenProjects] = useState([]);
    const dispatch = useDispatch();
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (IconRef.current) {
            setContentWidth(IconRef.current.offsetWidth);
        }
    }, [isOpen]);
    
  
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('https://b24-9t4mro.bitrix24.ru/rest/1/uv94tc04ks798yhf/sonet_group.get.json');
                setProjects(response.data.result);
                console.log(response.data);
            } catch (error) {
                console.error('Ошибка при получении списка проектов:', error);
            }
        };

        fetchProjects();
    }, []);
    useEffect(() => {

    }, [choisenProjects]);
    const handleProjectSelection = (projectId,projectName) => {
        const isSelected = choisenProjects.includes(projectId);
        if (isSelected) {
            setChoisenProjects(choisenProjects.filter(id => id !== projectId));
            dispatch(deleteProject(projectId))
        } else {
            setChoisenProjects([...choisenProjects, projectId]);
            dispatch(addProject(projectId,projectName))
        }
    };
    const handleSelectAllProjects = () => {
        const allProjectIds = projects.map(project => project.ID);
        setChoisenProjects(allProjectIds);
        const allProjectsToAdd = projects.map(project => ({
            id: project.ID,
            name: project.NAME 
          }));
        
          allProjectsToAdd.forEach(project => {
            dispatch(addProject(project.id, project.name));
          });
    };
    
    const handleDeselectAllProjects = () => {
        setChoisenProjects([]);
        dispatch(deleteAllProjects());
    };
    return (
        <aside className='sidebar' style={{ width: !isOpen ? contentWidth : 250+'px' }}>
            <header className='sidebar-header'>
                {isOpen && (
                    <div className='sidebar-title'>
                        Проекты и группы
                    </div>
                )}
                <div className='sidebar-icon' onClick={toggleSidebar} ref={IconRef}>
                    {!isOpen ? <CloseSidebarIcon className='sidebar-icon-svg' /> : <OpenSidebarIcon className='sidebar-icon-svg' />}
                </div>
            </header>
            <hr></hr>

            {isOpen && (
                <div className='sidebar-projects'>
                    {projects.map(project => (
                        <div className='sidebar-project' key={project.ID}>{project.NAME}
                            <div className="custom-CheckBox" onClick={() => handleProjectSelection(project.ID,project.NAME)}
                            style={{ backgroundColor: !choisenProjects.includes(project.ID) ? '#ccc' : '#7189ff' }}>
                                <div className="custom-CheckBox-content" >
                                    <div className="custom-CheckBox-circle" style={{ transform: `translateX(${!choisenProjects.includes(project.ID) ? '20%' : '115%'})` }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='sidebar-buttons'>
                    <button className='sidebar-projects-add' onClick={handleSelectAllProjects}>Выбрать все </button>
                    <button className='sidebar-projects-remove' onClick={handleDeselectAllProjects}>Убрать все </button>
                    </div>
                    
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
