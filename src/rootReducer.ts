import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import usersReducer from './features/user/usersSlice';

const rootReducer = combineReducers({
    user: userReducer,
    users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
