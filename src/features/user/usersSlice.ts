import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Users} from '../../interfaces/user.interface';

const users = createSlice({
    name: 'users',
    initialState: null as Users | null,
    reducers: {
        setUsers(state, { payload }: PayloadAction<Users | null>) {
            return state = (payload != null) ? payload : null;
        },
    },
});
export const { setUsers } = users.actions;
export default users.reducer;
