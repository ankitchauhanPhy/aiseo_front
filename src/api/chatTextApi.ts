import axiosClient from "./axiosClient";

export const sendCheckQuery = async (inputValue: string,user_id:number) => {
    const response = await axiosClient.post("/check_prompt", { queries: [inputValue], temperature: 0.9, max_tokens: 5000, user_id: user_id});
    return response;
}

export const sendPipelineQuery = async (inputValue: string, user_id:number) => {
    const response = await axiosClient.post("/pipeline", { query: inputValue, user_id: user_id });
    return response;
}

export const getQueryStatus = async (queryId: number) => {
    const response = await axiosClient.get(`/status/${queryId}`);
    return response;
}


