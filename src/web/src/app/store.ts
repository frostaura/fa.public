import { configureStore } from '@reduxjs/toolkit';

import { submissionsApi } from './api/submissionsApi';
import formsReducer from '../features/forms/formsSlice';
import siteReducer from '../features/site/siteSlice';

export const store = configureStore({
  reducer: {
    forms: formsReducer,
    site: siteReducer,
    [submissionsApi.reducerPath]: submissionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(submissionsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
