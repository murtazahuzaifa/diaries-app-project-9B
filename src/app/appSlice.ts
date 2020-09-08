import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootStateType} from '../store/parentReducer';

type StateType = {
    isLessThan1080: boolean,
    isLessThan420: boolean,
}
const sliceState: StateType = { isLessThan1080: window.innerWidth <= 1080, isLessThan420: window.innerWidth <= 420 }

const appSlice = createSlice({
    name: 'app',
    initialState: sliceState,
    reducers: {
        setLessThan1080: (state, { payload }: PayloadAction<boolean>) => {
            state.isLessThan1080 = payload
        },
        setLessThan420: (state, { payload }: PayloadAction<boolean>) => {
            state.isLessThan420 = payload
        },
        checkWindowWidth: (state)=>{
            const {isLessThan1080, isLessThan420} = state
            if (window.innerWidth <= 1080 && !isLessThan1080){
                state.isLessThan1080 = true 
            }
            else if (window.innerWidth <= 420 && !isLessThan420){
                state.isLessThan420 = true 
            }
            else if (window.innerWidth >= 420 && isLessThan420){
                state.isLessThan420 = false 
            }
            else if( (window.innerWidth >= 1080 && isLessThan1080) ){
                state.isLessThan1080 = false 
            }
        }
    }
})

export const { setLessThan1080, setLessThan420, checkWindowWidth } = appSlice.actions;
export const isLessThan1080 = (state:RootStateType)=> state.app.isLessThan1080;
export const isLessThan420 = (state:RootStateType)=> state.app.isLessThan420 ;

export default appSlice.reducer;