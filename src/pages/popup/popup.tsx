"use client";
import { WelcomePopup } from '@/component/WelcomePopup';
import React from 'react';

 

 

 
// Example usage
export default function Popup() {
  const [showPopup, setShowPopup] = React.useState(true);
 
  const handleGoToDashboard = () => {
    console.log('Redirecting to dashboard...');
    setShowPopup(false);
  };
 
  const handleClose = () => {
    setShowPopup(false);
  };
 
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {/* Demo content */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Login Successful!</h1>
        {!showPopup && (
          <button
            onClick={() => setShowPopup(true)}
            className="bg-[#7C3BED] text-white px-4 py-2 rounded-lg"
          >
            Show Welcome Popup
          </button>
        )}
      </div>
 
      {/* Popup */}
      {showPopup && (
        <WelcomePopup
          onGoToDashboard={handleGoToDashboard}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
 