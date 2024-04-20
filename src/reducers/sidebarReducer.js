const initialState = {
    isOpen: false // Начальное состояние - панель закрыта
  };
  
  const sidebarReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'OPEN_SIDEBAR':
        return {
          ...state,
          isOpen: true // Установка состояния - панель открыта
        };
      case 'CLOSE_SIDEBAR':
        return {
          ...state,
          isOpen: false // Установка состояния - панель закрыта
        };
      default:
        return state;
    }
  };
  
  export default sidebarReducer;