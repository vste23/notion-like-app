import { configureStore } from '@reduxjs/toolkit';
import blocksReducer from './reducers/blocksReducer';

export const store = configureStore({
    reducer: {
        blocks: blocksReducer
    },
});

