import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { RiArrowLeftSLine } from "react-icons/ri";
import SignupRocketBg from "../assets/login/LoginRocketBg2.jpg"; // you can use the same bg
import SignupRocket from "../assets/login/LoginRocket.png"; // rocket image
import { AuthAPI } from "@/api";
import type { SignUpForm } from "@/type/signup/signupType";
import { useAuth } from "@/authContext/useAuth";


const SignUpPopup = () => {
  //const SignUpPopup: React.FC<SignUpProps> = () => {

  const [isOpen, setIsOpen] = useState(true);

  //get Context Value
  const { setShowSignup, setShowLoginup } = useAuth();

  const [formData, setFormData] = useState<SignUpForm>({
    firstName: "",
    familyName: "",
    companyName: "",
    jobRole: "",
    workEmail: "",
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Perform signup logic here
    console.log(formData);
    try {
      const data = await AuthAPI.signup(formData);
      console.log("Signup Success", data);
      if (data.create) {
        alert("Account created!");
        setShowSignup(false);
        setShowLoginup(true);
      } else {
        console.log("Data for Signupo not Create");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Signup error:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="flex items-center justify-center min-h-screen ">
      {/* Overlay with blur */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

      <div className="relative flex lg:w-[780px] font-sans rounded-lg shadow-xl bg-[#140b26] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(124,59,237,0.6)]">
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
            ✨ The Future of Search
          </div>
          <img src={SignupRocket} alt="Rocket" className="w-40 h-40 mb-6" />
          <h2 className="text-4xl font-bold leading-snug text-left">
            The New <br /> Frontier for <br /> Organic Growth
          </h2>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white text-black px-8 py-5  md:rounded-r-lg ">
          <div className="w-full max-w-md">
            <button
              type="button"
              className="flex items-center gap-1 text-sm text-[#7C3BED] hover:text-purple-400 mb-4"
              onClick={() => alert("Back to Login")}
            >
              <RiArrowLeftSLine className="text-lg" />
              Back to Login
            </button>


            <h2 className="text-3xl font-bold mb-2 text-center md:whitespace-nowrap">Sign Up</h2>
            <p
              className="text-center font-normal text-[16px] leading-[150%] tracking-[-0.03em] font-inter text-black mb-6"
            >
              Let’s Start the Journey to Growth together!
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-purple-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Family Name"
                  name="familyName"
                  value={formData.familyName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-purple-500"
                  required
                />
              </div>

              <input
                type="text"
                placeholder="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-purple-500"
              />

              <input
                type="text"
                placeholder="Job Role (eg: Marketing Manager, Business Analyst, etc)"
                name="jobRole"
                value={formData.jobRole}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-purple-500"
              />

              <input
                type="email"
                placeholder="Work Email"
                name="workEmail"
                value={formData.workEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-purple-500"
                required
              />

              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-purple-500"
                  required
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-purple-500"
                  required
                />
              </div>

              <div className="flex flex-col justify-between items-start sm:items-center mt-2 gap-4">
                {/* Left side (checkboxes stacked) */}
                <div className="flex flex-col gap-2 text-sm text-black">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="agreeTC"
                      checked={formData.agreeTC}
                      onChange={handleChange}
                      className="accent-purple-500"
                    />
                    I’ve read and agreed to{" "}
                    <span className="text-purple-400 cursor-pointer">T&C</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="subscribe"
                      checked={formData.subscribe}
                      onChange={handleChange}
                      className="accent-purple-500"
                    />
                    I want to subscribe to the newsletter
                  </label>
                </div>

                {/* Right side (forget password) */}
                <button
                  type="button"
                  className="text-sm text-gray-400 hover:text-purple-400"
                  onClick={() => alert("Redirect to Forget Password")}
                >
                  Forget Password?
                </button>
              </div>


              <button
                type="submit"
                className="w-full bg-[#7C3BED] hover:bg-purple-700 py-2 rounded-md font-semibold mt-4 transition text-white"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPopup;
