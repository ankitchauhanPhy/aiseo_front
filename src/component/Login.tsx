import { FaGoogle, FaFacebook } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";

import LoginRocket from "../assets/login/LoginRocket.png";
import LoginRocketBg from "../assets/login/LoginRocketBg2.jpg";
import type { LoginForm } from "@/type/login/loginType";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "@/api";
import { useState } from "react";
import { useAuth } from "@/authContext/useAuth";

const LoginPopup = () => {
  // const LoginPopup: React.FC<LoginProps> = () => {
  const nav = useNavigate();

  //get Context Value
  const { setShowSignup, setShowLoginup, setLoginType, firstChatText, showLoginup} = useAuth();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Perform signup logic here
    try {
      const data = await AuthAPI.login(formData);
      console.log("Login Success", data);
      if (data.access_token) {
        localStorage.setItem("login", "true");
        localStorage.setItem("company_name", data.user.company_name);
        localStorage.setItem("use_iD", data.user.id);
        localStorage.setItem("Name", data.user.username);

        alert("Login Successfull!")
        setShowLoginup(false);
        setLoginType(true);
        if(!firstChatText){
        nav('/');
        } else if(firstChatText){
          nav("/chathistory");
        }
      } else {
        console.log("Login not success");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Signup error:", error.message);
        alert(`Login failed: ${error.message}`);
      } else {
        console.error("Unknown error:", error);
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
            ✨ The Future of Search
          </div>
          <img src={LoginRocket} alt="Rocket" className="w-40 h-40 mb-6" />
          <h2 className="text-4xl font-bold leading-snug text-left">
            The New <br /> Frontier for <br /> Organic Growth
          </h2>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white text-black px-8 rounded-r-lg">
          <div className="w-full max-w-md">
            <h2 className="text-[28px] font-bold mb-2 text-center">Login</h2>
            <p className="text-center text-[#333333] font-normal mb-8">
              <span className="text-[#7C3BED] font-bold">Welcome back!</span> <br /> Let’s quickly start ranking our product
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

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-purple-500"
                />
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

              {/* Separator text */}
              {/* <p className="my-3 text-center text-[#BFBFBF] text-[16px]">
                Didn’t have an account?
              </p> */}

              <button
                type="button"
                className="w-full border border-gray-400 py-2 rounded-md font-semibold text-[14px] hover:bg-white hover:text-black transition"
                onClick={() => { setShowSignup(true); setShowLoginup(false) }}
              >
                Create an Account
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center justify-center my-6">
              <span className="px-3 text-[#1A1A1A] text-[14px]">Login using</span>
            </div>

            {/* Social Login */}
            <div className="flex justify-center gap-6 mb-5">
              <button className="w-12 h-12 bg-[#CAC7FF] border border-gray-600 flex items-center justify-center rounded-lg hover:bg-gray-800">
                <FaGoogle className="text-red-500" size={22} />
              </button>
              <button className="w-12 h-12 bg-[#CAC7FF] border border-gray-600 flex items-center justify-center rounded-lg hover:bg-gray-800">
                <FaFacebook className="text-blue-500" size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default LoginPopup;