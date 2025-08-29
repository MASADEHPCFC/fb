import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import companySetupReducer from './slices/companySetupSlice';
import businessPlanReducer from './slices/businessPlanSlice';


export const store = configureStore({
  reducer: {
    companySetup: companySetupReducer,
    businessPlan: businessPlanReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); 