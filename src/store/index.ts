import { configureStore } from '@reduxjs/toolkit';
import layersReducer from './slices/layersSlice';
import kpisReducer from './slices/kpisSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    layers: layersReducer,
    kpis: kpisReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;