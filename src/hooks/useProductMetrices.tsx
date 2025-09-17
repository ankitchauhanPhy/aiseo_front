import { useEffect, useState } from 'react';
import { OptimizationAPI } from "@/api";
import { useAuth } from "@/authContext/useAuth";

export const useProductMatrices = () => {
  const { queryID, competitorProductName, setProductMatricesCompetitor } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    if (!queryID || !competitorProductName) {
      setIsLoading(false);
      setIsDataReady(true); // Consider it ready if no data to load
      return;
    }

    async function loadProductMatrices() {
      try {
        setIsLoading(true);
        setError(null);
        
        const response:any = await OptimizationAPI.productMatrices(queryID, competitorProductName);
        console.log("API Response comparsion:", response);

        if (response.statusText) {
          setProductMatricesCompetitor?.(response.data);
          setIsDataReady(true);
        }
      } catch (err: unknown) {
        console.error("API Error:", err);
        const message = err instanceof Error ? err.message : "Something went wrong!";
        setError(message);
        console.log("message mainhistory error", message);
      } finally {
        setIsLoading(false);
      }
    }

    loadProductMatrices();
  }, [queryID, competitorProductName, setProductMatricesCompetitor]);

  return { isLoading, error, isDataReady };
};
