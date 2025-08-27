import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CompanySetupData, Manager } from "../../interfaces/company.interface";

interface CompanySetupState {
  currentCompany: CompanySetupData | null;
  loading: boolean;
  error: string | null;
  stepValidation: {
    [key: number]: boolean;
  };
  totalSteps: number;
  quickEstimate?: any;
}

const initialState: CompanySetupState = {
  currentCompany: null,
  loading: false,
  error: null,
  stepValidation: {},
  totalSteps: 5, // Adjust based on your total number of steps
  quickEstimate: undefined,
};

const companySetupSlice = createSlice({
  name: "companySetup",
  initialState,
  reducers: {
    // Initialize new company setup
    initializeCompany: (
      state,
      action: PayloadAction<Partial<CompanySetupData>>
    ) => {
      state.currentCompany = {
        businessType: null,
        businessCategory: null,
        activity: [],
        tradeName: {
          hasReservedName: false,
          suggestedNames: [],
        },
        numberOfShareholders: 0,
        shareholders: [],
        manager: null,
        businessLocation: '',
        costs: {
          baseCost: 5000,
          activityCost: 0,
          shareholderCost: 0,
          tradeNameCost: 0,
          locationCost: 0,
          totalCost: 5000,
        },
        ...action.payload,
      };
    },

    // Update current company details
    updateCompanyDetails: (
      state,
      action: PayloadAction<Partial<CompanySetupData>>
    ) => {
      if (state.currentCompany) {
        state.currentCompany = {
          ...state.currentCompany,
          ...action.payload,
        };
      }
    },

    // Update step data
    updateStepData: (
      state,
      action: PayloadAction<{ step: number; data: any; isValid: boolean }>
    ) => {
      if (state.currentCompany) {
        const { step, data, isValid } = action.payload;
        if (!state.currentCompany.stepData) state.currentCompany.stepData = {};
        state.currentCompany.stepData[step] = {
          data,
          isValid,
          isVisited: true,
        };
      }
    },

    // Navigate to step
    navigateToStep: (state, action: PayloadAction<number>) => {
      if (
        state.currentCompany &&
        action.payload >= 1 &&
        action.payload <= state.totalSteps
      ) {
        state.currentCompany.currentStep = action.payload;
      }
    },

    // Move to next step
    nextStep: (state) => {
      if (state.currentCompany && (state.currentCompany.currentStep ?? 0) < state.totalSteps) {
        state.currentCompany.currentStep = (state.currentCompany.currentStep ?? 0) + 1;
      }
    },

    // Move to previous step
    previousStep: (state) => {
      if (state.currentCompany && (state.currentCompany.currentStep ?? 0) > 1) {
        state.currentCompany.currentStep = (state.currentCompany.currentStep ?? 0) - 1;
      }
    },

    // Add or update shareholder
    updateShareholder: (
      state,
      action: PayloadAction<{
        id?: number;
        shareholder: CompanySetupData["shareholders"][0];
      }>
    ) => {
      if (state.currentCompany) {
        const { id, shareholder } = action.payload;
        if (id) {
          const index = state.currentCompany.shareholders.findIndex(
            (s) => s.id === id
          );
          if (index !== -1) {
            state.currentCompany.shareholders[index] = { ...shareholder, id };
          }
        } else {
          state.currentCompany.shareholders.push({
            ...shareholder,
            id: Date.now(),
          });
        }
      }
    },

    // Remove shareholder
    removeShareholder: (state, action: PayloadAction<number>) => {
      if (state.currentCompany) {
        state.currentCompany.shareholders =
          state.currentCompany.shareholders.filter(
            (s) => s.id !== action.payload
          );
      }
    },

    // Update document status
    updateDocumentStatus: (
      state,
      action: PayloadAction<{
        id: string;
        status: "pending" | "uploaded" | "approved" | "rejected";
        url?: string;
      }>
    ) => {
      if (state.currentCompany && state.currentCompany.documents) {
        const { id, status, url } = action.payload;
        const doc = state.currentCompany.documents?.find((d) => d.id === id);
        if (doc) {
          doc.status = status;
          if (url) doc.url = url;
        }
      }
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Set error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Clear current company
    clearCurrentCompany: (state) => {
      state.currentCompany = null;
    },

    // Set quick estimate data
    setQuickEstimate: (state, action: PayloadAction<any>) => {
      state.quickEstimate = action.payload;
    },
  },
});

// Add selectors
export const selectStepData = (state: RootState, step: number) =>
  (state.companySetup.currentCompany?.stepData?.[step]?.data) || null;

export const selectIsStepValid = (state: RootState, step: number) =>
  (state.companySetup.currentCompany?.stepData?.[step]?.isValid) || false;

export const {
  initializeCompany,
  updateCompanyDetails,
  updateStepData,
  navigateToStep,
  nextStep,
  previousStep,
  updateShareholder,
  removeShareholder,
  updateDocumentStatus,
  setLoading,
  setError,
  clearCurrentCompany,
  setQuickEstimate,
} = companySetupSlice.actions;

export default companySetupSlice.reducer;
