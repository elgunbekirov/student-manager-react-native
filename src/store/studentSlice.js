import { createSlice } from '@reduxjs/toolkit';

const studentSlice = createSlice({
  name: 'students',
  initialState: [
    { id: 1, name: 'John Doe', age: 18 },
    { id: 2, name: 'Jane Smith', age: 20 },
  ],
  reducers: {
    addStudent: (state, action) => {
      state.push(action.payload);
    },
    updateStudent: (state, action) => {
      const index = state.findIndex(student => student.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addStudent, updateStudent } = studentSlice.actions;
export default studentSlice.reducer;