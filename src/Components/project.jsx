import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Column from './column';


const Project = (props) => {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchStages = async () => {
    try {
      const response = await axios.get(`https://b24-g6zt20.bitrix24.ru/rest/1/l9n2br54u6w01qyc/task.stages.get.json?entityid=${props.id}`);
      const stagesData = response.data.result;
      const stagesArray = Array.isArray(stagesData) ? stagesData : Object.values(stagesData);
      console.log(stagesArray)
      setStages(stagesArray);
      setLoading(false);
    } catch (error) {
      console.error('Ошибка при получении стадий проекта:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStages();
  }, [props.id]);
  const handleAddColumn = () => {
    
  };
  return (
    <div className='project'>
      <div className='project-name'>{props.name}</div>
      <div className='project-columns'>
        {loading ? (
          <div className='project-loadings'>Идет загрузка...</div>
        ) : (
          stages.map(stage => (
            <Column key={stage.ID} id={stage.ID} name={stage.TITLE} color={"#"+stage.COLOR} />
          ))
        )}
        <div className='project-button'>
        {/* <button className='column-add' onClick={handleAddColumn}>+ Добавить колонку</button> */}
        </div>
        
      </div>
    </div>
  );
};

export default Project;
