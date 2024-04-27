export const addProject = (id, name) => ({
    type: 'ADD_PROJECT',
    payload: {
      id,
      name,
    },
  });
  
  export const updateProjectStates = (projectId, states) => ({
    type: 'UPDATE_PROJECT_STATES',
    payload: {
      projectId,
      states,
    },
  });
  
  export const deleteProject = (projectId) => ({
    type: 'DELETE_PROJECT',
    payload: projectId,
  });
  
  const initialState = {
    projects: [],
  };
  export const deleteAllProjects = () => ({
    type: 'DELETE_ALL_PROJECTS',
  });
  const projectReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_PROJECT':
        return {
          ...state,
          projects: [...state.projects, action.payload],
        };
      case 'UPDATE_PROJECT_STATES':
        return {
          ...state,
          projects: state.projects.map(project => {
            if (project.id === action.payload.projectId) {
              return {
                ...project,
                states: action.payload.states,
              };
            }
            return project;
          }),
        };
      case 'DELETE_PROJECT':
        return {
          ...state,
          projects: state.projects.filter(project => project.id !== action.payload),
        };
        case 'DELETE_ALL_PROJECTS':
            return {
              ...state,
              projects: [],
            };
          default:
            return state;
        
        
    }
    
  };
  
  export default projectReducer;
  