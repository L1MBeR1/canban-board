import React, { useState, useEffect, useRef } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { deleteTask } from '../reducers/selectedTaskReducer.js';
import { ReactComponent as CloseSidebarIcon } from '../images/taskSidebar/close-svgrepo-com.svg'; 
import { ReactComponent as EditIcon } from '../images/taskSidebar/edit-svgrepo-com.svg'; 
import File from '../Components/file.jsx'; // Подключаем компонент File
import Comment from './comment.jsx';
import { fetchTasks } from '../task.js';
const TaskSidebar = () => {
    const dispatch = useDispatch();
    const selectedTaskId = useSelector(state => state.selectedTaskReducer.selectedTaskId);
    const [data, setData] = useState();
    const [files, setFiles] = useState([]);
    const [isOpen, setIsOpen] = useState([]);
    const [Rename, setRename] = useState(false);
    const [Newname, setNewname] = useState();
    const [Redescription, setRedescription] = useState(false);
    const [Newdescription, setNewdescription] = useState('');
    const [Newcomment, setNewcomment] = useState('');
    const [comments, setComments] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const sidebar = useRef(null);

    const inputName = useRef(null);
    const inputDescription = useRef(null);

    const fetchData = () => {
        fetchTasks(dispatch);
      };

    useEffect(() => {
        if (selectedTaskId) {
            console.log('Выбранная задача:', selectedTaskId);
            getTaskInfo(selectedTaskId)
            getTaskFiles(selectedTaskId);
            getTaskComments(selectedTaskId)
            sidebar.current.focus();
        } else {
            console.log('Задача удалена');
            setData(null);
        }
    }, [selectedTaskId]);
    useEffect(() => {
        if (Rename == true) {
            setNewname(data.task.title)
            inputName.current.focus();
        }
    }, [Rename]);
    useEffect(() => {
        if (selectedTaskId) {
        const fetchDataInterval = setInterval(() => {
            getTaskComments(selectedTaskId);
        }, 5000); 
    
        return () => clearInterval(fetchDataInterval);
    }
      }, [selectedTaskId]);
    useEffect(() => {
        if (Redescription == true) {
            setNewdescription(data.task.description)
            inputDescription.current.focus();
        }
    }, [Redescription]);
    const getTaskInfo = async (taskId) => {
        try {
            const response = await axios.post(`https://b24-g6zt20.bitrix24.ru/rest/1/l9n2br54u6w01qyc/tasks.task.get.json`, {
                taskId: taskId,
                select: ['*']
            });
            setData(response.data.result);
            return response;
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
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
        
    const getTaskComments = async (taskId) => {
        try {
            const response = await axios.post(`https://b24-g6zt20.bitrix24.ru/rest/1/l9n2br54u6w01qyc/task.commentitem.getlist.json`, 
                [taskId, {'POST_DATE': 'asc'}]
            );
            console.log('Комменты задачи:', response.data.result);
            setComments(response.data.result);
        } catch (error) {
            console.error('Ошибка при получении данных о комментах:', error);
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
    const redescriptionTask = async (taskId, decription) => {
        try {
            const response = await axios.post('https://b24-g6zt20.bitrix24.ru/rest/1/l9n2br54u6w01qyc/tasks.task.update', {
                taskId: taskId,
                fields: {
                    DESCRIPTION: decription
                }
            });
            return response.data.result;
        } catch (error) {
            console.error('Ошибка при обновлении задачи:', error);
            throw error;
        }
    };
    const createComment = async (taskId, message) => {
        try {
            const response = await axios.post(`https://b24-g6zt20.bitrix24.ru/rest/1/l9n2br54u6w01qyc/task.commentitem.add`, [
                taskId,
                {
                    'POST_MESSAGE': message
                }
            ]);
            console.log('Создан комментарий:', response.data());
            return response.data();
        } catch (error) {
            console.error('Ошибка при создании комментария:', error);
        }
    };
    const closeSidebar = () => {
        dispatch(deleteTask());
    };
    const handleRename = () => {
        
        setRename(true)
        
        setNewname('')
    };
    const handleChangeName = (e) => {
        setNewname(e.target.value)
    };
    const handleApplyNewName = () => {
        console.log(Newname)
        renameTask(data.task.id,Newname).then(() => {
            getTaskInfo(selectedTaskId);
            fetchData();
          })
          .catch(error => {
            console.error('Произошла ошибка при удалении задачи:', error);
          });
         
        setRename(false)
        setNewname('')
    };
    const handleKeyDownNewname = (e) => {
        if (e.key === 'Enter') {
            handleApplyNewName(); 
        }
    };
    const handleRedescription = () => {
        
        setRedescription(true)
        
        setNewdescription('')
    };
    const handleChangedescription = (e) => {
        setNewdescription(e.target.value)
    };
    const handleApplyNewdescription = () => {
        redescriptionTask(data.task.id,Newdescription).then(() => {
            getTaskInfo(selectedTaskId);
            fetchData();
          })
          .catch(error => {
            console.error('Произошла ошибка при удалении задачи:', error);
          });

        setRedescription(false)
        setNewdescription('')
    };
    const handleKeyDownNewdescription = (e) => {
        if (e.key === 'Enter') {
            handleApplyNewdescription(); 
        }
    };
    const handleChangeComment = (e) => {
        setNewcomment(e.target.value)
    };
    const handleKeyDownNewComment = (e) => {
        if (e.key === 'Enter') {
            handleApplyNewComment(); 
        }
    };
    const handleApplyNewComment = () => {
        createComment(data.task.id,Newcomment).then(() => {
            getTaskComments(selectedTaskId);
            fetchData();
            setNewcomment('')
          })
          .catch(error => {
            console.error('Произошла ошибка при удалении задачи:', error);
          });
        setNewcomment('')
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = async () => {
            const fileContent = reader.result.split(',')[1]; // Получаем содержимое файла в base64
            console.log(file.name, fileContent);
            try {
                const uploadResult = await uploadFileToBitrix(file.name, fileContent);
                console.log('Upload result:', uploadResult);
    
                // Получение идентификатора загруженного файла из результатов загрузки
                const fileId = uploadResult.ID;
    
                // Прикрепление загруженного файла к задаче
                const attachResult = await attachFileToTask(data.task.id, fileId).then(() => {
                    getTaskFiles(data.task.id)
                  })
                  .catch(error => {
                    console.error('Произошла ошибка при удалении задачи:', error);
                  });;
                console.log('Attach result:', attachResult);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    
        reader.readAsDataURL(file);
        

    };
    const attachFileToTask = async (taskId, fileId) => {
        try {
            const response = await axios.post(`https://b24-g6zt20.bitrix24.ru/rest/1/l9n2br54u6w01qyc/tasks.task.files.attach`, {
                taskId: taskId,
                fileId: fileId
            });

            console.log('File attached to task successfully:', response.data.result);
        } catch (error) {
            console.error('Error attaching file to task in Bitrix24:', error);
        }
    };
    const uploadFileToBitrix = async (fileName, fileContent) => {
        try {
            const response = await axios.post(`https://b24-g6zt20.bitrix24.ru/rest/1/l9n2br54u6w01qyc/disk.storage.uploadfile`, {
                id: 1, // ID хранилища
                data: {
                    NAME: fileName
                },
                fileContent: fileContent
            });

            console.log('File uploaded successfully:', response.data.result);
            return(response.data.result)
        } catch (error) {
            console.error('Error uploading file to Bitrix24:', error);
        }
    };

    return (
        <div className='taskSidebar' tabIndex="0" style={{ width: data !== null ? '25%' : '0' }} 
        // onBlur={closeSidebar} 
        ref={sidebar}>
            <div className='taskSidebar-close' onClick={closeSidebar}>
                <CloseSidebarIcon className='svg' />
            </div>
            {data && data.task && (
                <div className='taskSidebar-content'>
                    {Rename == false ?(<div className='taskSidebar-title'>
                        {data.task.title}
                        <button className='taskSidebar-change' onClick={handleRename}>
                        <EditIcon className='svg'></EditIcon>
                        </button>
                    </div>):
                    (
                        <input
                        ref={inputName}
                        type="text"
                        value={Newname}
                        onChange={handleChangeName}
                        onBlur={handleApplyNewName}
                        onKeyDown={handleKeyDownNewname}
                        placeholder="Введите название"
                        maxLength={40}
                    />
                    )
                    }


                    <hr></hr>
                    <div className='taskSidebar-content-item'>
                        <div className='taskSidebar-content-title'>Описание:</div>
                
                        {Redescription !== true && data.task.description !=='' ?(<div>{data.task.description}
                        <button className='taskSidebar-change' onClick={handleRedescription}>
                        <EditIcon className='svg'></EditIcon>
                        </button>
                        </div>):
                        (
                            <input
                            ref={inputDescription}
                            type="text"
                            value={Newdescription}
                            onChange={handleChangedescription}
                            onBlur={handleApplyNewdescription}
                            onKeyDown={handleKeyDownNewdescription}
                            placeholder="Введите описание"
                            maxLength={40}
                        />
                        )
                        }

                    </div>
                    <div className='taskSidebar-content-item'>
                        <div className='taskSidebar-content-title'>Файлы:</div>
                        <div className='files'>
                            {files.length != 0 &&files.map((file, index) => (
                                <File key={index} fileName={file.NAME} fileType={file.NAME.split('.').pop()} />
                            ))}
                        </div>
                        <input type="file" onChange={handleFileUpload}></input>
                        <button>добавить</button>
                    </div>
                    <div className='taskSidebar-content-comments'>
                        <div className='taskSidebar-content-title'>Комментарии:</div>
                        <div className='taskSidebar-comments'>
                        {comments && comments.map((comment, index) => (
                                <Comment 
                                    key={index} 
                                    author={comment.AUTHOR_NAME} 
                                    message={comment.POST_MESSAGE} 
                                    postDate={comment.POST_DATE} 
                                />
                            ))}
                        </div>
                        <div>
                            <input
                            type="text"
                            value={Newcomment}
                            onChange={handleChangeComment}
                            onKeyDown={handleKeyDownNewComment}
                            placeholder="Введите текст"
                            maxLength={200}>
                            
                            </input>
                            <button>

                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskSidebar;
