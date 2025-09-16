import { Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Dashboard from "./pages/dashboard/Dashboard";
// import LoginPopUp from "./component/Login";
// import SignUpPopup from "./component/SignUp";
import MainHistory from "./pages/mainhistory/MainHistory";
import ChatHistory from "./pages/chatHistory/chatHistory";
// import VisibilityChart from "./pages/mainhistory/mainhistorycomponent/VisibilityChart";
// import ComparisonView from "./pages/comparisonview/ComparisonView";
// import ExampleVisibilityDetails from "./component/VisibilityDetails";
import ProtectedRoute from "./component/ProtectedRoute";
// import BarMain from "./pages/chart/BarMain";
import { ToastProvider } from "@/components/ui/use-toast"

function App() {

  return (
     <ToastProvider>
    <Routes>
      {/* Wrap all pages that need Navbar in Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        {/* <Route path="/chart" element={<BarMain />} /> */}
        <Route path="optimization" element={
          <ProtectedRoute>
            <MainHistory />
          </ProtectedRoute>} />

        <Route path="chathistory" element={
          <ProtectedRoute>
            <ChatHistory />
          </ProtectedRoute>} />
      </Route>
    </Routes>
    </ToastProvider>
  );
}

export default App;





