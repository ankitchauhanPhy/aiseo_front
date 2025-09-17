import React, { useState } from "react";
import { AuthContext, type ProductData } from "./AuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLoginup, setShowLoginup] = useState(false);
  const [loginType, setLoginType] = useState(false);
  const [firstChatText, setFirstChatText] = useState("");
  const [comparisonView, setComparisonView] = useState(false);
  const [productMatricesData, setProductMatricesData] = useState<ProductData[]>([]);
  const [yourProductName, setYourProductName] = useState<string>("");
  const [competitorProductName, setCompetitorProductName] = useState<any>("");
  const [ competitorProductVisible, setCompetitorProductVisible] = useState<boolean>(false);

  const [queryID, setQueryID] = useState(0);
 

  return (
    <AuthContext.Provider value={{ showSignup, setShowSignup, showLoginup, 
                                   setShowLoginup, setLoginType, loginType,
                                   firstChatText, setFirstChatText,
                                   comparisonView, setComparisonView ,
                                   productMatricesData, setProductMatricesData,
                                   queryID, setQueryID,yourProductName,setYourProductName,
                                   competitorProductName,setCompetitorProductName,competitorProductVisible,setCompetitorProductVisible
                                   }}>
      {children}
    </AuthContext.Provider>
  );
};
