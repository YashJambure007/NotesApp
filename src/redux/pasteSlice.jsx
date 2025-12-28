import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;

      if (!paste.title || !paste.title.trim()) {
        toast.error(" Paste title cannot be empty", {
          style: {
            background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
            color: "white",
            border: "none",
            borderRadius: "12px",
          },
        });
        return;
      }

      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        toast.error(" Paste with this ID already exists", {
          style: {
            background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            color: "white",
            border: "none",
            borderRadius: "12px",
          },
        });
        return;
      }

      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
    },

    updatePastes: (state, action) => {
      const paste = action.payload;

      if (!paste.title || !paste.title.trim()) {
        toast.error(" Paste title cannot be empty", {
          style: {
            background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
            color: "white",
            border: "none",
            borderRadius: "12px",
          },
        });
        return;
      }

      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
      } else {
        toast.error(" Paste not found", {
          style: {
            background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
            color: "white",
            border: "none",
            borderRadius: "12px",
          },
        });
      }
    },

    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
      } else {
        toast.error(" Paste not found", {
          style: {
            background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
            color: "white",
            border: "none",
            borderRadius: "12px",
          },
        });
      }
    },

    resetPaste: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success(" All pastes cleared", {
        style: {
          background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
          color: "white",
          border: "none",
          borderRadius: "12px",
        },
      });
    },
  },
});

export const { addToPastes, removeFromPastes, updatePastes, resetPaste } =
  pasteSlice.actions;

export default pasteSlice.reducer;
