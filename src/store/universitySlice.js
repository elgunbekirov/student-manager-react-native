import { createSlice } from '@reduxjs/toolkit';

const universitySlice = createSlice({
  name: 'universities',
  initialState: [
    { id: 1, name: 'Harvard University' },
    { id: 2, name: 'Stanford University' },
    { id: 3, name: 'MIT' },
  ],
  reducers: {
    addUniversity: (state, action) => {
      state.push(action.payload);
    },
    updateUniversity: (state, action) => {
      const index = state.findIndex(university => university.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteUniversity: (state, action) => {
      return state.filter(university => university.id !== action.payload);
    },
  },
});

export const { addUniversity, updateUniversity, deleteUniversity } = universitySlice.actions;
export default universitySlice.reducer;