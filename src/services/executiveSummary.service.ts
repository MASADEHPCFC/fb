import axios from "axios";
import tokenService from "./token.service";

const apiUrl = "http://localhost:8000/executivesummary";

export interface ExecutiveSummaryPayload {
    messages: string[];
    thread_id: string;
}

export interface ExecutiveSummaryResponse {
    summary: string;
    vision_analysis: string;
    mission_analysis: string;
}

export const executiveSummaryService = {
    generate: async (vision: string, mission: string): Promise<ExecutiveSummaryResponse> => {
        const payload: ExecutiveSummaryPayload = {
            messages: [
                `Vision: ${vision}`,
                `Mission: ${mission}`
            ],
            thread_id: tokenService.getToken() || "guest-session"
        };
        
        console.log(["payload", payload]);
        const response = await axios.post(`${apiUrl}`, payload);
        console.log(["response data", response.data]);
        console.log(["response", response]);
        return response.data;
    }
}
