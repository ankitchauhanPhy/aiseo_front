import React, { useEffect, useState } from "react";
import { Outlet, useLocation} from "react-router-dom";
import Navbar from "@/component/Navbar";

const Layout: React.FC = () => {
  const [afterLogin, setAfterLogin] = useState<boolean>(false);
  const location =  useLocation();

  useEffect(()=>{
    const islogin = localStorage.getItem("login");
    console.log("isLogin layout", islogin);
    if(islogin === "true"){
      setAfterLogin(true);
    }else{
      setAfterLogin(false);
    }
  },[location.key])
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar always on top */}
      <Navbar afterLogin={afterLogin}/>

      {/* Main content area */}
      <main className={`flex-1 ${afterLogin ? "pt-[75px]" : "pt-0"}`}>
        {/* Outlet will render the nested routes */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
