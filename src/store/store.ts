import {configureStore} from '@reduxjs/toolkit';
import parentReducer from './parentReducer';
import {useDispatch} from 'react-redux';

const store = configureStore({
    reducer: parentReducer
})

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store