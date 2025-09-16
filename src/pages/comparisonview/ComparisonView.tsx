import React, { useEffect } from "react";
import VisibilityChart from "./comparisoncomponent/VisibilityChart";
import VisibilityChartUpdated from "./comparisoncomponent/VisibilityChartUpdated";

import  RankingTable  from "./comparisoncomponent/RankingTable";
import MentionsBar from "./comparisoncomponent/MentionBar";
import MentionsBarUpdated from "./comparisoncomponent/MentionBarUpdated";

import { OptimizationAPI } from "@/api";
import { useAuth } from "@/authContext/useAuth";

interface ComparisonViewProps {
  optimizationRank: any; // replace 'any' with your actual type
  productVisible: boolean;
  productMatrices: (queryID: number, productName: string) => void;
  setProductVisible: (val: boolean) => void; 
  setOpenVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setVisibilityData: React.Dispatch<React.SetStateAction<string>>;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({
  optimizationRank,
  productVisible,
  productMatrices,
   setProductVisible,
   setOpenVisibility,
   setVisibilityData
   
}) => {
    const { yourProductName, queryID, setProductMatricesData, competitorProductName, setProductMatricesCompetitor,productMatricesCompetitor} = useAuth();
  
  
      useEffect(() => {
        if (!queryID) return;
    
       async function productMetrices(queryID: number, competitorProductName: string) {
      try {
        const response = await OptimizationAPI.productMatrices(queryID, competitorProductName);
        console.log("API Response:", response);
  
        if (response.statusText) {
          setProductMatricesCompetitor?.(response.data);
  
        }
  
      } catch (err: unknown) {
        console.error("API Error:", err);
        const message = err instanceof Error ? err.message : "Something went wrong!";
        console.log("message mainhistory error", message);
      }
    }
    productMetrices(queryID, competitorProductName);
      }, [])

  return (
    <div className="h-[calc(100vh-75px)] text-black flex flex-col lg:flex-row px-4 py-2">
      {/* 1st column */}
      <div className="w-full lg:w-1/3 flex flex-row lg:flex-col gap-2 p-2">
        <VisibilityChart setOpenVisibility={setOpenVisibility} setVisibilityData={setVisibilityData}/>
        <MentionsBar />
      </div>

      {/* 2nd Column */}
      <div className="w-full lg:w-2/3 p-2">
        <RankingTable
          optimizationRank={optimizationRank}
          productVisible={productVisible}
          productMatrices={productMatrices}
          setProductVisible={setProductVisible}
        />
      </div>

      {/* 3rd Column */}
      <div className="w-full lg:w-1/3 flex flex-row lg:flex-col gap-2 p-2">
        <VisibilityChart setOpenVisibility={setOpenVisibility} setVisibilityData={setVisibilityData}/>
        <MentionsBar />
      </div>
    </div>
  );
};

export default ComparisonView;


