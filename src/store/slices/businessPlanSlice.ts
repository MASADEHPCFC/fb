import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BusinessPlanData, BusinessPlanState } from '../../interfaces/businessPlan.interface';

const initialState: BusinessPlanState = {
  currentPlan: null,
  isGenerating: false,
  error: null,
};

const businessPlanSlice = createSlice({
  name: 'businessPlan',
  initialState,
  reducers: {
    initializeBusinessPlan: (state, action: PayloadAction<Partial<BusinessPlanData>>) => {
      state.currentPlan = {
        companyName: '',
        missionStatement: '',
        vision: '',
        executiveSummary: '',
        businessDescription: {
          industry: '',
          businessModel: '',
          legalStructure: '',
          location: '',
        },
        marketAnalysis: {
          targetMarket: '',
          marketSize: '',
          competitors: [],
          competitiveAdvantage: '',
        },
        organizationManagement: {
          teamMembers: [],
          advisors: [],
        },
        productService: {
          description: '',
          features: [],
          benefits: [],
          developmentStage: '',
        },
        marketingStrategy: {
          marketingChannels: [],
          promotionalStrategy: '',
          salesProcess: '',
          pricingStrategy: '',
        },
        fundingRequirements: {
          startupCosts: 0,
          operationalCosts: 0,
          fundingSources: [],
          useOfFunds: '',
        },
        financialProjections: {
          startupCosts: 0,
          monthlyExpenses: 0,
          projectedRevenue: 0,
          breakEvenPoint: 0,
          projectedProfitMargin: 0,
        },
        timeline: [],
        ...action.payload,
      } as BusinessPlanData;
      state.error = null;
    },
    updateBusinessPlan: (state, action: PayloadAction<Partial<BusinessPlanData>>) => {
      if (state.currentPlan) {
        state.currentPlan = {
          ...state.currentPlan,
          ...action.payload,
        };
      }
    },
    setGenerating: (state, action: PayloadAction<boolean>) => {
      state.isGenerating = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearCurrentPlan: (state) => {
      state.currentPlan = null;
      state.error = null;
      state.isGenerating = false;
    },
  },
});

export const {
  initializeBusinessPlan,
  updateBusinessPlan,
  setGenerating,
  setError,
  clearCurrentPlan,
} = businessPlanSlice.actions;

export default businessPlanSlice.reducer;
export type BusinessPlanState = ReturnType<typeof businessPlanSlice.reducer>;
