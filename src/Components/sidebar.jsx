import React, { useState, useEffect, useRef } from 'react'; // Импортируем один раз useEffect и useRef
import { ReactComponent as CloseSidebarIcon } from '../images/sidebar/sidebar-close-svgrepo-com.svg'; 
import { ReactComponent as OpenSidebarIcon } from '../images/sidebar/sidebar-open-svgrepo-com.svg'; 
import axios from 'axios';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const IconRef = useRef(null);
    const [contentWidth, setContentWidth] = useState('auto');

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
                const response = await axios.get('https://b24-g6zt20.bitrix24.ru/rest/1/l9n2br54u6w01qyc/sonet_group.get.json');
                console.log(response.data.result);
            } catch (error) {
                console.error('Ошибка при получении списка проектов:', error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <aside className='sidebar' style={{ width: !isOpen ? contentWidth : 250+'px' }}>
            <header className='sidebar-header'>
                {isOpen && (
                    <div className='sidebar-title'>
                        Проекты
                    </div>
                )}
                <div className='sidebar-icon' onClick={toggleSidebar} ref={IconRef}>
                    {!isOpen ? <CloseSidebarIcon className='sidebar-icon-svg' /> : <OpenSidebarIcon className='sidebar-icon-svg' />}
                </div>
            </header>

            {isOpen && (
                <div className='sidebar-projects'>
                    <button className='sidebar-projects-add'>+ Добавить проект</button>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
