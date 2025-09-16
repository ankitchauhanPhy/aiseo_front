import React from "react";
import VisibilityChart from "./comparisoncomponent/VisibilityChart";
import { RankingsTable } from "./comparisoncomponent/RankingTable";
import MentionsBar from "./comparisoncomponent/MentionBar";

const ComparisonView: React.FC = () => {

  return (
    <div className="h-[calc(100vh-75px)] text-black flex flex-col lg:flex-row px-4 py-2">

      {/* 1st column */}
      <div className="w-full lg:w-1/3 flex flex-row lg:flex-col gap-2 p-2">
        <VisibilityChart />
        <MentionsBar />
      </div>

      {/* 2nd Column */}
      <div className="w-full lg:w-2/3 p-2">
        <RankingsTable />
      </div>

      {/* 3rd Column */}
      <div className="w-full lg:w-1/3 flex flex-row lg:flex-col gap-2 p-2">
        <VisibilityChart />
        <MentionsBar />
      </div>
    </div>
  );
};

export default ComparisonView;
