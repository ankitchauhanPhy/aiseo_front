import React, { useState } from "react";
import { AuthContext, type ConversationsResponse, type ProductData } from "./AuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLoginup, setShowLoginup] = useState(false);
  const [loginType, setLoginType] = useState(false);
  const [firstChatText, setFirstChatText] = useState("");
  const [comparisonView, setComparisonView] = useState(false);
  const [productMatricesData, setProductMatricesData] = useState<ProductData[]>([]);
  const [queryID, setQueryID] = useState(0);

  const [conversationData, setConversationData] = useState<ConversationsResponse | null>(null);

  const [yourProductName, setYourProductName] = useState<string>("");
  const [competitorProductName, setCompetitorProductName] = useState<string>("");
  const [competitorProductVisible, setCompetitorProductVisible] = useState<boolean>(false);
  const [freeTrialPopup, setFreeTrialPopup] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isComparison, setIsComparison] = useState<boolean>(false);
  const [productMatricesCompetitor, setProductMatricesCompetitor] = useState<ProductData[]>([]);


  return (
    <AuthContext.Provider value={{
      showSignup, setShowSignup, showLoginup,
      setShowLoginup, setLoginType, loginType,
      firstChatText, setFirstChatText,
      comparisonView, setComparisonView,
      productMatricesData, setProductMatricesData,
      conversationData, setConversationData,
      queryID, setQueryID, yourProductName, setYourProductName,
      competitorProductName, setCompetitorProductName, competitorProductVisible, setCompetitorProductVisible,
      freeTrialPopup, setFreeTrialPopup,
      isVisible, setIsVisible,
      isComparison, setIsComparison,
      productMatricesCompetitor, setProductMatricesCompetitor
    }}>
      {children}
    </AuthContext.Provider>
  );
};
