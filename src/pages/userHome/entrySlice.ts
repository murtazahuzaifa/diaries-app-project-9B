import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Entry } from '../../interfaces/entry.interface';

const sliceState: { entryList: Entry[] } = { entryList: [] }

export const entrySlice = createSlice({
    name: 'auth',
    initialState: sliceState,
    reducers: {
        addEntry: (state, { payload }: PayloadAction<Entry>) => {
            state.entryList.push(payload);
        },
        updateEnteries: (state, { payload }: PayloadAction<Entry[]>) => {
            state.entryList = payload
        },
        removeEnteries: (state ) => {
            state.entryList = []
        },
    }
})

export const { updateEnteries, removeEnteries, addEntry } = entrySlice.actions;

export default entrySlice.reducer;