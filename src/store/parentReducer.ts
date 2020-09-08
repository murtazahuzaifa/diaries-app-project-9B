import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../pages/auth/authSlice';
import appReducer from '../app/appSlice';

const parentReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
})

export type RootStateType = ReturnType<typeof parentReducer>

export default parentReducer;