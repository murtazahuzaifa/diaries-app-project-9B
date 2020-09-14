import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Entry } from '../../interfaces/entry.interface';
import {findObjectInArray} from '../../utils';

const sliceState: { entryList: Entry[] } = { entryList: [] }

export const entrySlice = createSlice({
    name: 'auth',
    initialState: sliceState,
    reducers: {
        addEntry: (state, { payload }: PayloadAction<Entry>) => {
            state.entryList.push(payload);
        },
        updateEntry: (state, { payload }: PayloadAction<Entry>) => {
            const entryId = findObjectInArray(state.entryList, payload.id, 'id' )
            if (entryId!==undefined){
                state.entryList[entryId] = payload
            }
        },
        updateEntries: (state, { payload }: PayloadAction<Entry[]>) => {
            state.entryList = payload
        },
        removeEntries: (state ) => {
            state.entryList = []
        },
    }
})

export const { updateEntries, removeEntries, addEntry, updateEntry } = entrySlice.actions;

export default entrySlice.reducer;