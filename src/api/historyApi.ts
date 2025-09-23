import axiosClient from "./axiosClient";


export const getAllhistory = async (userId: number, page:number, limit:number) => {
    const response = await axiosClient.get(`/conversations/all`, {
        params: {
            user_id: userId,
            page: page,
            limit: limit,
        }
    });
    return response;
}

export const getSinglehistory = async (userId: number,conversationID: number) => {
    const response = await axiosClient.get(`/conversations`, {
        params: {
            conversation_id: conversationID,
            user_id: userId
        }
    });
    return response;
}


