import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const sliceState:{token:string|null, isAuthenticated:boolean} = {token: null, isAuthenticated: false }

const homeSlice = createSlice({
    name:'auth',
    initialState: sliceState,
    reducers: {
        authenticateUser: (state, {payload}:PayloadAction<string>)=>{
            state.token = payload
            state.isAuthenticated = true
        },
        setAuthenticate:(state, {payload}:PayloadAction<boolean>)=>{ 
            state.isAuthenticated = payload
        },
        setToken: (state, {payload}:PayloadAction<string>)=>{ 
            state.token = payload
        }
    }
})

export const {authenticateUser, setAuthenticate, setToken} = homeSlice.actions;

export default homeSlice.reducer;