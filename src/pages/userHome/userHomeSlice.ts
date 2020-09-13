import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Diary } from '../../interfaces/diary.interface';

const sliceState: { diaryList: Diary[] } = { diaryList: [] }

export const userHomeSlice = createSlice({
    name: 'auth',
    initialState: sliceState,
    reducers: {
        updateDiaries: (state, { payload }: PayloadAction<Diary[]>) => {
            state.diaryList = payload
        },
        removeDiaries: (state) => {
            state.diaryList = []
        },
    }
})

export const { updateDiaries, removeDiaries } = userHomeSlice.actions;

export default userHomeSlice.reducer;