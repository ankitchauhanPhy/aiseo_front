
import { useEffect, useState } from "react";
import myLogo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';

import { useAuth } from "@/authContext/useAuth";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  afterLogin?: boolean; // optional, defaults to false
}

const Navbar: React.FC<NavbarProps> = ({ afterLogin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [fullname, setFullname] = useState("");

  const nav = useNavigate();

  // get context values
  const { setShowLoginup, loginType, setLoginType, comparisonView, setComparisonView, setUser_id} = useAuth();

  useEffect(() => {
    if (loginType) {
      const fullName = localStorage.getItem("Name");
      
      if (fullName) {
        setFullname(fullName);
      }
    }
  }, [loginType])

  useEffect(()=>{
    const userid = localStorage.getItem("use_iD");
    if(userid){
  setUser_id(Number(userid));
  }
  },[])



  function removeLoginToken() {
    localStorage.removeItem("login");
    localStorage.removeItem("use_iD");
    setLoginType(false);
    setOpen(false);
    nav("/");
  }

  return (
    <>
      <div className={`absolute fixed py-6 ${afterLogin ? "top-[-25px] w-[100%]" : "top-[25px] w-[90%] left-[5%] px-6 py-4"}  z-20`}>
        {
          !afterLogin ? (

            <nav className={`bg-[#2c0c5c] h-[75px] text-white px-6 py-3 flex items-center justify-between ${isOpen ? "rounded-t-md" : "rounded-[30px]"} relative`}>
              {/* Left Logo */}
              <div className="flex items-center gap-2 pl-2">
                <img src={myLogo} alt="logo" className="h-10 w-auto" />
              </div>

              {/* Desktop Links (only from lg breakpoint) */}
              <div className="hidden lg:flex gap-8 text-md font-semibold">
                <a href="#" className="hover:text-purple-200">How it works</a>
                <a href="#" className="hover:text-purple-200">Features</a>
                <a href="#" className="hover:text-purple-200">Use cases</a>
                <a href="#" className="hover:text-purple-200">About Us</a>
                <a href="#" className="hover:text-purple-200">Pricing</a>
              </div>

              {/* Right Button (only from lg breakpoint) */}
              <div className="hidden lg:block">
                <button className="bg-purple-500 hover:bg-purple-600 px-6 py-2 rounded-md font-semibold text-white"
                  onClick={() => setShowLoginup(true)}
                >
                  Login
                </button>
              </div>

              {/* Mobile / Tablet Menu Button */}
              <div className="lg:hidden flex items-center">
                <button onClick={() => setIsOpen(!isOpen)}>
                  {/* Hamburger / Close Icon */}
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>

              {/* Mobile / Tablet Dropdown */}
              {isOpen && (
                <div className="absolute top-full left-0 w-full bg-[#2c0c5c] flex flex-col items-center gap-4 py-4 rounded-b-[20px] shadow-lg lg:hidden z-50">
                  <a href="#" className="hover:text-purple-200">How it works</a>
                  <a href="#" className="hover:text-purple-200">Features</a>
                  <a href="#" className="hover:text-purple-200">Use cases</a>
                  <a href="#" className="hover:text-purple-200">About Us</a>
                  <a href="#" className="hover:text-purple-200">Pricing</a>
                  <button className="bg-purple-500 hover:bg-purple-600 px-6 py-2 rounded-md font-medium text-white mt-2">
                    Login
                  </button>
                </div>
              )}
            </nav>
          ) : (
            <nav className={` w-full bg-[#7C3BED] h-[75px] text-white px-6 py-6 flex items-center justify-between ${isOpen ? "rounded-t-md" : ""} relative`}>
              {/* Left Logo with Triangle and Text */}
              <div className="flex items-center gap-2 pl-2">
                <img src={myLogo} alt="logo" className="h-8 w-auto" />
              </div>

              {/* Desktop Links (centered) */}
              <div className="hidden lg:flex gap-8 text-sm font-medium">
                {comparisonView ? (
                  <>
                    <div className="flex flex-col gap-2">
                      <h1 className="font-bold">Comparison View</h1>
                      <div className="flex items-center gap-2 cursor-pointer hover:text-purple-200"
                        onClick={() => {
                          setComparisonView(false)
                          nav("/optimization")
                        }}
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Analysis</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Link to="/" >Home</Link>
                    {/* <a href="#" className="hover:text-purple-200">Dashboard</a> */}
                    <Link to="/optimization" >Optimization</Link>
                    {/* <a href="#" className="hover:text-purple-200">Settings</a> */}
                  </>
                )}

              </div>

              {/* Right User Avatar */}
              <div className="hidden lg:block relative">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setOpen(!open)}>
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm font-medium text-white">
                    {fullname ? fullname[0] : ""}
                  </div>
                  <svg
                    className={`w-4 h-4 text-white transition-transform ${open ? "rotate-180" : "rotate-0"
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {/* Dropdown Menu */}
                {open && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
                    <button
                      onClick={() => removeLoginToken()}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile / Tablet Menu Button */}
              <div className="lg:hidden flex items-center">
                <button onClick={() => setIsOpen(!isOpen)}>
                  {/* Hamburger / Close Icon */}
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>

              {/* Mobile / Tablet Dropdown */}
              {isOpen && (
                <div className="absolute top-full left-0 w-full bg-[#7C3BED] flex flex-col items-center gap-4 py-4 rounded-b-[20px] shadow-lg lg:hidden z-50">
                  <a href="#" className="hover:text-purple-200">Home</a>
                  <a href="#" className="hover:text-purple-200">Dashboard</a>
                  <a href="#" className="hover:text-purple-200">Settings</a>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm font-medium">
                      AV
                    </div>
                    <span className="text-sm">Profile</span>
                  </div>
                </div>
              )}
            </nav>
          )
        }
      </div>
    </>
  );
};

export default Navbar;

