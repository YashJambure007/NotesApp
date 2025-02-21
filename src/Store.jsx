import { configureStore } from '@reduxjs/toolkit'
import PasteReducer from './Redux/pasteSlice'

export const store = configureStore({
  reducer:  {
    Paste: PasteReducer,
  },

})