import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Diary } from '../../interfaces/diary.interface';
import {findObjectInArray} from '../../utils';

const sliceState: { diaryList: Diary[] } = { diaryList: [] }

export const diarySlice = createSlice({
    name: 'auth',
    initialState: sliceState,
    reducers: {
        addDiary: (state, { payload }: PayloadAction<Diary>) => {
            state.diaryList.push(payload)
        },
        updateDiary: (state, { payload }: PayloadAction<Diary>) => {
            const diaryId = findObjectInArray(state.diaryList, payload.id, 'id' )
            if (diaryId!==undefined){
                state.diaryList[diaryId] = payload
            }
        },
        updateDiaries: (state, { payload }: PayloadAction<Diary[]>) => {
            state.diaryList = payload
        },
        removeDiaries: (state) => {
            state.diaryList = []
        },
    }
})

export const { updateDiaries, removeDiaries, addDiary, updateDiary } = diarySlice.actions;

export default diarySlice.reducer;