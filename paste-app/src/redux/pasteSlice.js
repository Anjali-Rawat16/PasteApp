import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
export const pastesSlice = createSlice({
  name: 'pastes',

  initialState: {
    pastes: (() => {
      const stored = localStorage.getItem("pastes");
      try {
        return stored ? JSON.parse(stored) : [];
      } catch (err) {
        localStorage.removeItem("pastes");
        return [];
      }
    })()
  },

  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;   // ✅ FIX

      state.pastes.push(paste);       // ✅ now works

      localStorage.setItem(
        "pastes",
        JSON.stringify(state.pastes)
      );

      toast.success("Paste created successfully");
    },

    UpdateToPastes: (state, action) => {
      const UpdatedPaste = action.payload;

      const index = state.pastes.findIndex(
        p => p._id === UpdatedPaste._id
      );


      if (index !== -1) {
        state.pastes[index] = UpdatedPaste;
        localStorage.setItem(
          "pastes",
          JSON.stringify(state.pastes)
        );
        toast.success("Paste Updated successfully");
      }
    },

    removeFromPastes: (state, action) => {
      const id = action.payload;

      const existingPaste = state.pastes.find(
        paste => paste._id === id
      );

      if (!existingPaste) {
        toast.error("Paste not found");
        return;
      }

      state.pastes = state.pastes.filter(
        paste => paste._id !== id
      );

      localStorage.setItem(
        "pastes",
        JSON.stringify(state.pastes)
      );

      toast.success("Paste deleted successfully 🗑️");
    },


    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All pastes cleared");
    }
  }
})

export const {
  addToPastes,
  UpdateToPastes,

  removeFromPastes,
  resetAllPastes
} = pastesSlice.actions

export default pastesSlice.reducer

