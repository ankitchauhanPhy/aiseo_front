import axiosClient from "./axiosClient";

export const sendCheckQuery = async (inputValue: string) => {
    const response = await axiosClient.post("/check_prompt", { queries: [inputValue], temperature: 0.9, max_tokens: 512, user_id: 1 });
    return response;
}

export const sendPipelineQuery = async (inputValue: string) => {
    const response = await axiosClient.post("/pipeline", { query: inputValue, user_id: 1 });
    return response;
}

export const getQueryStatus = async (queryId: number) => {
    const response = await axiosClient.get(`/status/${queryId}`);
    return response;
}


