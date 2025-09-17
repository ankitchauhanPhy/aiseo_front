import axiosClient from "./axiosClient";


export const rankedQuery = async (queryId: number) => {
    const response = await axiosClient.get(`/final_ranked/${queryId}`);
    return response;
}

export const dummyRankedQuery = async() => {
    const response = await axiosClient.get(`/final_ranked`);
    return response;
}

  export const productMatrices = async (queryId: number, productName: string) => {
    const response = await axiosClient.get(`/product-metrics`, {
      params: {
        query_id: queryId,
        product_name: productName,
      },
    });
    return response;
  };


