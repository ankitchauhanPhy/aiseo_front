import { createContext } from "react";

export interface ChartVisibilityData {
  name: string;
  value: number;
  displayValue: string;
  color: string;
  icon: string;
  width: string;
}

export interface ProductData {
  product_name: string;
  final_rank: number;
  total_mentions: number;
  mentions_by_platform: Record<string, number>;
  gap_to_leader: number;
  sources: string[];
  citations: Record<string, string[]>;
  categories: string[];
}

export interface AuthContextType {
  showSignup: boolean;
  setShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
  showLoginup: boolean;
  setShowLoginup: React.Dispatch<React.SetStateAction<boolean>>;
  loginType: boolean;
  setLoginType: React.Dispatch<React.SetStateAction<boolean>>;
  firstChatText: string;
  setFirstChatText: React.Dispatch<React.SetStateAction<string>>;
  comparisonView: boolean;
  setComparisonView: React.Dispatch<React.SetStateAction<boolean>>;
  //  chartVisibilityData: ChartVisibilityData;
  // setChartVisibilityData: React.Dispatch<React.SetStateAction<ChartVisibilityData>>;
  queryID: number;
  setQueryID: React.Dispatch<React.SetStateAction<number>>;
  productMatricesData: ProductData[];
  setProductMatricesData: React.Dispatch<React.SetStateAction<ProductData[]>>;
}

// Just the context (no component here)
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
