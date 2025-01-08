import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './studentSlice';
import universityReducer from './universitySlice';

export const store = configureStore({
  reducer: {
    students: studentReducer,
    universities: universityReducer,
  },
});