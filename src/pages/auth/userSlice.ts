import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../interfaces/user.interface';

// let sliceState:User|null = null

export const userSlice = createSlice({
    name: 'user',
    initialState: null as User | null,
    reducers: {
        setUser: (state, { payload }: PayloadAction<User>) => {
            return (state = payload);
        },
        unSetUser: (state) => {
            return (state = null);
        },
    }
})

export const { setUser, unSetUser } = userSlice.actions;

export default userSlice.reducer;