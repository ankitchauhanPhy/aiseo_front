import { useState } from "react";

import { RxCrossCircled } from "react-icons/rx";
import { Eye, EyeOff } from "lucide-react";

import LoginRocket from "../assets/login/LoginRocket.png";
import LoginRocketBg from "../assets/login/LoginRocketBg2.jpg";
import type { LoginForm } from "@/type/login/loginType";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "@/api";
import { useAuth } from "@/authContext/useAuth";

import {toast}  from "react-toastify";
import Loader from "./loader/Loader";

const LoginPopup = () => {
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  //get Context Value
  const { setShowSignup, setShowLoginup, setFreeTrialPopup } = useAuth();

  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
    create: true
  });

  function handleClose() {
    setShowLoginup(false);
    nav('/');
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ Validation logic
const validateForm = () => {
  if (!formData.email.trim()) {
    toast.error("Email is required");
    return false;
  }

  // Basic format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    toast.error("Please enter a valid email address");
    return false;
  }

  // ✅ Allowed domains
  const allowedDomains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "protonmail.com"
  ];

  const domain = formData.email.split("@")[1];
  if (!allowedDomains.includes(domain)) {
    toast.error(`Email domain '${domain}' is not supported`);
    return false;
  }

  if (!formData.password.trim()) {
    toast.error("Password is required");
    return false;
  }
  if (formData.password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Run validation first
    if (!validateForm()) return;
    setLoading(true);
    // Perform signup logic here
    try {
      const data = await AuthAPI.login(formData);
      console.log("Login Success", data);
      if (data.access_token) {
        localStorage.setItem("login", "true");
        localStorage.setItem("company_name", data.user.company_name);
        localStorage.setItem("use_iD", data.user.id);
        localStorage.setItem("Name", `${data.user.first_name} ${data.user.last_name}`);
        toast.success("Log in Sucess!");
        setLoading(false);
        setShowLoginup(false);
        setFreeTrialPopup(true);
      }
    } catch (error:any) {
      setLoading(false);
      if (error.response) {
        console.error("login Error", error);
        toast.error(`${error.response.data.detail}`);
      } else {
        toast.error("Unknown Error:", error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* Overlay with blur */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

      {/* Outer container with dark background */}
      <div className="relative flex md:w-[757px] h-[615px] font-sans rounded-xl shadow-xl bg-[#140b26]   transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(124,59,237,0.6)]">
        <RxCrossCircled className="absolute right-[-0%] hover:text-purple-400 text-2xl cursor-pointer z-10"
          style={{
            stroke: "white",
            fill: "black",
          }}
          onClick={handleClose}
        />

        {/* Left Panel */}
        <div
          className="hidden md:flex flex-col justify-center items-left w-1/2 text-white p-10 bg-cover bg-center rounded-l-lg"
          style={{
            backgroundImage: `url(${LoginRocketBg})`,
          }}
        >
          <div className="bg-[#7C3BED] w-fit text-white text-xs px-4 py-1 rounded-full mb-6">
            ✨ Back to Growth
          </div>
          <img src={LoginRocket} alt="Rocket" className="w-40 h-40 mb-6" />
          <h2 className="text-4xl font-bold leading-snug text-left">
            Log in and continue your <br />AI SEO journey.
          </h2>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white text-black px-8 rounded-r-lg">
          <div className="w-full max-w-md">
            <h2 className="text-[28px] font-bold mb-2 text-center">Login</h2>
            <p className="text-center text-[#333333] font-normal mb-8">
              <span className="text-[#7C3BED] font-bold">Welcome back!</span> <br /> Secure access to your AI SEO dashboard.
            </p>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-purple-500"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-gray-400 hover:text-purple-400"
                >
                  Forget Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white hover:bg-purple-700 py-2 rounded-md font-semibold"
              >
                Login
              </button>

              <button
                type="button"
                className="w-full border border-gray-400 py-2 rounded-md font-semibold text-[14px] bg-white  hover:bg-purple-700 text-black hover:text-white transition"
                onClick={() => { setShowSignup(true); setShowLoginup(false) }}
              >
                Create an Account
              </button>
            </form>
          </div>
        </div>
      </div>
      {loading && (
        <div className="fixed inset-0 z-50">
          <Loader/>
        </div>
      )}
    </div>
  );
}


export default LoginPopup;