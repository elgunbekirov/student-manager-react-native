import { createSlice } from '@reduxjs/toolkit';

const studentSlice = createSlice({
  name: 'students',
  initialState: [
    { id: 1, name: 'John Doe', birthDate: '2005-01-01', universityId: 1 },
    { id: 2, name: 'Jane Smith', birthDate: '2004-05-12', universityId: 2 },
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
    deleteStudent: (state, action) => {
      return state.filter(student => student.id !== action.payload);
    },
  },
});

export const { addStudent, updateStudent, deleteStudent } = studentSlice.actions;
export default studentSlice.reducer;