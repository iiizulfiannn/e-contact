import { configureStore } from '@reduxjs/toolkit';
import { contactModel } from 'entities/contact';

export const store = configureStore({
  reducer: {
    contact: contactModel.reducer,
  },
  // middleware: getDefaultMiddleware => getDefaultMiddleware(),
});
