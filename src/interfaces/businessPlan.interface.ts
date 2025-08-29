export interface BusinessPlanData {
  // Executive Summary
  companyName: string;
  missionStatement: string;
  vision: string;
  executiveSummary: string;

  // Business Description
  businessDescription: {
    industry: string;
    businessModel: string;
    legalStructure: string;
    location: string;
  };

  // Market Analysis
  marketAnalysis: {
    targetMarket: string;
    marketSize: string;
    competitors: Array<{
      name: string;
      strengths: string;
      weaknesses: string;
    }>;
    competitiveAdvantage: string;
  };

  // Organization & Management
  organizationManagement: {
    teamMembers: Array<{
      name: string;
      role: string;
      responsibilities: string;
      experience: string;
    }>;
    advisors: Array<{
      name: string;
      expertise: string;
    }>;
  };

  // Service or Product Line
  productService: {
    description: string;
    features: string[];
    benefits: string[];
    developmentStage: string;
    intellectualProperty?: string;
  };

  // Marketing & Sales Strategy
  marketingStrategy: {
    marketingChannels: string[];
    promotionalStrategy: string;
    salesProcess: string;
    pricingStrategy: string;
  };

  // Funding Requirements
  fundingRequirements: {
    startupCosts: number;
    operationalCosts: number;
    fundingSources: string[];
    useOfFunds: string;
  };

  // Financial Projections
  financialProjections: {
    startupCosts: number;
    monthlyExpenses: number;
    projectedRevenue: number;
    breakEvenPoint: number;
    projectedProfitMargin: number;
  };

  // Implementation Timeline
  timeline: Array<{
    milestone: string;
    date: string;
    description: string;
  }>;
}

export interface BusinessPlanState {
  currentPlan: BusinessPlanData | null;
  isGenerating: boolean;
  error: string | null;
}
