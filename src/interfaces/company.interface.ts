export type BusinessType = 'new' | 'existing';

export interface BusinessCategory {
    id: number;
    name: string;
    description?: string;
}

export interface TradeName {
    hasReservedName: boolean;
    reservedNameDocument?: File;
    suggestedNames: string[];
    nameValidationResults?: {
        [index: number]: {
            results: boolean;
            remarks?: string;
        };
    };
}

export interface Shareholder {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    sharePercentage: number;
    isUaeResident?: boolean;
    emiratesId?: string;
    passportNumber?: string;
    countryCode?: string;
    passportCopyFile?: File;
}

export interface Manager {
    name: string;
    email: string;
    phone: string;
    isUaeResident: boolean;
    emiratesId?: string;
    passportNumber?: string;
    passportExpiry?: string;
    countryCode?: string;
    passportCopyFileList?: any[];
}

export interface Activity {
    code: string;
    isc4Code?: string | null;
    description: string;
    description_Arabic: string;
}

export interface CompanySetupData {
    businessType: BusinessType | null;
    businessCategory: BusinessCategory | null;
    activity: Activity[];
    tradeName: TradeName;
    numberOfShareholders: number;
    businessLocation?: string;
    shareholders: Shareholder[];
    manager: Manager | null;
    costs: {
        baseCost: number;
        activityCost: number;
        shareholderCost: number;
        tradeNameCost: number;
        locationCost: number;
        totalCost: number;
    };
    currentStep?: number;
    progress?: number;
    documents?: {
        id: string;
        type: string;
        name: string;
        status: "pending" | "uploaded" | "approved" | "rejected";
        url?: string;
    }[];
    stepData?: {
        [key: number]: {
            data: any;
            isValid: boolean;
            isVisited: boolean;
        };
    };
    createdAt?: string;
    updatedAt?: string;
    submittedAt?: string;
} 