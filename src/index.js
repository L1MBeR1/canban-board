import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'; // Импорт функции configureStore из пакета @reduxjs/toolkit
import rootReducer from './reducers/rootReducer'; // Ваш корневой редюсер

// Создание хранилища с помощью функции configureStore
const store = configureStore({
  reducer: rootReducer
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
