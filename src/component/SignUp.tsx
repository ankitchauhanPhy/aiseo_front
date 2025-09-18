import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { RiArrowLeftSLine } from "react-icons/ri";
import SignupRocketBg from "../assets/login/LoginRocketBg2.jpg";
import SignupRocket from "../assets/login/LoginRocket.png";
import { AuthAPI } from "@/api";
import type { SignUpForm } from "@/type/signup/signupType";
import { useAuth } from "@/authContext/useAuth";

import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import TermPopup from "@/component/termPopUp/TermPopup";


const SignUpPopup = () => {

  const [isOpen, setIsOpen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  // Context Provider Value
  const { setShowSignup, setShowLoginup } = useAuth();

  //SignUp Form Data
  const [formData, setFormData] = useState<SignUpForm>({
    first_name: "",
    last_name: "",
    username: "",
    company_name: "",
    job_role: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTC: false,
    subscribe: false,
    create: true
  });

  const handleClose = () => {
    setIsOpen(false);
    setShowSignup(false);
  }

  const openTermPage = () => {
    setShowPopup(true);
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  //Signup Validation
  const validateForm = () => {
    if (!formData.first_name.trim()) {
      toast.error("First name is required");
      return false;
    }

    if (!formData.last_name.trim()) {
      toast.error("Last name is required");
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }

    // Email regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    // ✅ Domain check (extend list as needed)
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

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    if (!formData.agreeTC) {
      toast.error("You must agree to Terms & Conditions");
      return false;
    }

    return true;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Run validation first
    if (!validateForm()) return;

    // Perform signup logic here
    console.log(formData, "formData");
    try {
      // formData.username = formData.firstName + formData.familyName;
      const data = await AuthAPI.signup(formData);
      console.log("Signup Success", data);
      if (data.create) {
        toast.success("Accound Created!");
        setShowSignup(false);
        setShowLoginup(true);
      }
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.detail);
      } else {
        toast.error("Unknown Error : ", error.message);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="flex items-center justify-center min-h-screen ">
      {/* Overlay with blur */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

      <div className="relative flex lg:w-[800px] font-sans rounded-lg shadow-xl bg-[#140b26] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(124,59,237,0.6)]">
        {/* Close button */}
        <RxCrossCircled
          className="absolute  right-[-0%] hover:text-purple-400 text-2xl cursor-pointer z-10"
          style={{
            stroke: "white",
            fill: "black",
          }}
          onClick={handleClose}
        />

        {/* Left Panel */}
        <div
          className="hidden md:flex flex-col justify-center items-start w-1/2 text-white p-10 bg-cover bg-center rounded-l-lg"
          style={{ backgroundImage: `url(${SignupRocketBg})` }}
        >
          <div className="bg-[#7C3BED] text-white text-xs px-4 py-1 rounded-full mb-6">
            ✨ Organic Growth, Reinvented
          </div>
          <img src={SignupRocket} alt="Rocket" className="w-40 h-40 mb-6" />
          <h2 className="text-4xl font-bold leading-snug text-left">
            Turn AI search into your next growth channel.
          </h2>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white text-black px-8 py-5  md:rounded-r-lg ">
          <div className="w-full max-w-md">
            <button
              type="button"
              className="flex items-center gap-1 text-sm text-[#7C3BED] hover:text-purple-400 mb-4"
              onClick={() => { setShowSignup(false); setShowLoginup(true); }}
            >
              <RiArrowLeftSLine className="text-lg" />
              Back to Login
            </button>


            <h2 className="text-xl font-bold mb-2 text-center md:whitespace-nowrap">Start Your <br /> Free Trial Today</h2>
            <p
              className="text-center font-normal text-[16px] leading-[150%] tracking-[-0.03em] font-inter text-black mb-6"
            >
              No credit card required. Get instant access in under 2 minutes
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-purple-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-purple-500"
                  required
                />
              </div>

              <input
                type="text"
                placeholder="Company Name"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-purple-500"
              />

              <input
                type="text"
                placeholder="Job Role (eg: Marketing Manager, Business Analyst, etc)"
                name="job_role"
                value={formData.job_role}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-purple-500"
              />

              <input
                type="email"
                placeholder="Work Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-purple-500"
                required
              />

              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-purple-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={(() => setShowPassword(!showPassword))}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="relative w-full">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Pass"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-purple-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

              </div>

              <div className="flex flex-col justify-between items-start sm:items-center mt-2 gap-4">
                {/* Left side (checkboxes stacked) */}
                <div className="flex flex-col gap-2 text-sm text-black">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="agreeTC"
                      checked={formData.agreeTC}
                      onChange={handleChange}
                      className="accent-purple-500 mr-5"
                    />
                    <span>
                      I agree to the <span className="text-purple-400 cursor-pointer" onClick={()=>{openTermPage();}}>Terms & Conditions </span> and the <span className="text-purple-400 cursor-pointer" onClick={()=>{openTermPage();}}>Privacy Policy</span>
                    </span>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[#7C3BED] hover:bg-purple-700 py-2 rounded-md font-semibold mt-4 transition text-white"
              >
                Create Free Account
              </button>
            </form>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50">
          <TermPopup onClose={() => { setShowPopup(false) }} />
        </div>
      )}

    </div>
  );
}

export default SignUpPopup;
