import { configureStore } from "@reduxjs/toolkit"

import authReducer from './index'

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {}

const store = configureStore({
    reducer:{
        auth: authReducer
    },
    preloadedState: persistedState,
})

window.addEventListener('beforeunload', () => {
    const state = store.getState();
    localStorage.setItem('reduxState', JSON.stringify(state));
})

export default store