import { Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Dashboard from "./pages/dashboard/Dashboard";
import MainHistory from "./pages/mainhistory/MainHistory";
import ChatHistory from "./pages/chatHistory/chatHistory";
import ProtectedRoute from "./component/ProtectedRoute";
import HeroSection from "./pages/dashboard/dashboardcomponent/Hero";

import {ToastContainer}  from "react-toastify";
import Loader from "./pages/test/Loader";




function App() {

  return (
    <>
     <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // can be "light" | "dark" | "colored"
      />

    <Routes>
      {/* Wrap all pages that need Navbar in Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/loader" element={<Loader/>} />
        <Route path="/index" element={
          <ProtectedRoute>
            <HeroSection />
          </ProtectedRoute>} />

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
    </>
  );
}

export default App;





