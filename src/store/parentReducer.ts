import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../pages/auth/userSlice';
import authReducer from '../pages/auth/authSlice';
import diariesReducer from '../pages/userHome/diarySlice';
import entriesReducer from '../pages/userHome/entrySlice';
import appReducer from '../app/appSlice';

const parentReducer = combineReducers({
    app: appReducer,
    user: userReducer,
    auth: authReducer,
    diaries: diariesReducer,
    entries: entriesReducer,
})

export type RootStateType = ReturnType<typeof parentReducer>

export default parentReducer;