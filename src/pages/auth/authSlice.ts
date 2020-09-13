import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const sliceState:{token?:string, isAuthenticated:boolean} = {isAuthenticated: false }

export const authSlice = createSlice({
    name:'auth',
    initialState: sliceState,
    reducers: {
        authenticateUser: (state, {payload}:PayloadAction<string>)=>{
            state.token = payload
            state.isAuthenticated = true
        },
        unAuthenticateUser: (state)=>{
            state.token = undefined
            state.isAuthenticated = false
        },
    }
})

export const {authenticateUser, unAuthenticateUser } = authSlice.actions;

export default authSlice.reducer;