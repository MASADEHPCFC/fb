import { configureStore } from '@reduxjs/toolkit';

import companySetupReducer from './slices/companySetupSlice';
import businessPlanReducer from './slices/businessPlanSlice';

export const store = configureStore({
  reducer: {
    companySetup: companySetupReducer,
    businessPlan: businessPlanReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type { BusinessPlanState } from './slices/businessPlanSlice';
export type AppDispatch = typeof store.dispatch; 