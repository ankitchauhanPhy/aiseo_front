"use client";
import React, { createContext, useContext, useState } from "react";
import Joyride, { Step } from "react-joyride";

interface OnboardingContextType {
  startTour: (steps: Step[]) => void;
  stopTour: () => void;
}

const OnboardingContext = createContext<OnboardingContextType>({
  startTour: () => { },
  stopTour: () => { },
});

export const useOnboarding = () => useContext(OnboardingContext);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [run, setRun] = useState(false);

  const startTour = (newSteps: Step[]) => {
    setSteps(newSteps);
    setRun(true);
  };

  const stopTour = () => {
    setRun(false);
    setSteps([]);
  };

  const joyrideStyles = {
    options: {
      primaryColor: "#6C5CE7",
      textColor: "#333",
      backgroundColor: "#ffffff",
      overlayColor: "rgba(0, 0, 0, 0.7)", // Darker overlay
      arrowColor: "#ffffff",
      zIndex: 10000,
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)", // Darker overlay
    },
    tooltip: {
      borderRadius: "12px", // Rounded corners
      padding: "8px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
      fontSize: "14px",
      maxWidth: "320px",
    },
    tooltipContainer: {
      textAlign: "left" as const,
    },
    tooltipTitle: {
      fontSize: "16px",
      fontWeight: "600",
      marginBottom: "8px",
      color: "#1a1a1a",
    },
    tooltipContent: {
      fontSize: "14px",
      lineHeight: "1.5",
      color: "#4a4a4a",
      marginBottom: "16px",
    },
    tooltipFooter: {
      marginTop: "16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    buttonNext: {
      backgroundColor: "#6C5CE7",
      color: "#ffffff",
      border: "none",
      borderRadius: "8px",
      padding: "8px 16px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
    },
    buttonBack: {
      backgroundColor: "transparent",
      color: "#6C5CE7",
      border: "1px solid #6C5CE7",
      borderRadius: "8px",
      padding: "8px 8px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s ease",
      marginRight: "8px",
    },
    buttonSkip: {
      backgroundColor: "transparent",
      color: "#888",
      border: "none",
      fontSize: "14px",
      cursor: "pointer",
      textDecoration: "underline",
    },
    buttonClose: {
      backgroundColor: "transparent",
      border: "none",
      color: "#888",
      cursor: "pointer",
      fontSize: "18px",
      position: "absolute" as const,
      right: "0px",
      top: "0px",
      width: "12px",
      height: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      transition: "background-color 0.2s ease",
    },
    spotlight: {
      borderRadius: "8px",
    },
    beacon: {
      borderRadius: "50%",
    },
  };

  return (
    <OnboardingContext.Provider value={{ startTour, stopTour }}>
      <Joyride
        steps={steps}
        run={run}
        continuous
        showSkipButton
        locale={{
          back: 'Back',
          close: 'Close',
          last: 'Ok', 
          next: 'Next',
          skip: 'Skip'
        }}
        showProgress
        disableOverlayClose
        spotlightClicks
        // beaconComponent
        styles={joyrideStyles}
        callback={(data) => {
          // Stop tour automatically if finished
          if (["finished", "skipped"].includes(data.status)) {
            stopTour();
          }
        }}
      />
      {children}
    </OnboardingContext.Provider>
  );
};