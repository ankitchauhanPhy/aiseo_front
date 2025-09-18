import  { useState } from "react";
import Popup from "./popup";

export default function TermPopup() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="p-6">
      <button
        onClick={() => setShowPopup(true)}
        className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700"
      >
        Open Popup
      </button>

      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
    </div>
  );
}
