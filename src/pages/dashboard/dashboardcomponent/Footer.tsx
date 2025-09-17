import {  FaArrowRight } from "react-icons/fa";
import { ArrowUpRight } from 'lucide-react';

import BgImageFooter from "../../../assets/Footer.png";

const Footer = () => {
    return (
        <footer className="bg-white text-gray-800">
            {/* Newsletter Section */}
            <div className="text-white px-6 py-10 flex flex-col md:flex-row items-center justify-center lg:gap-[260px] gap-6 h-[178px]"
                style={{ backgroundImage: `url(${BgImageFooter})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <h2 className=" font-Poppins text-lg font-semibold">
                    Subscribe to our newsletter to get latest <br></br>news on your inbox.
                </h2>
                <div className="flex items-center w-full md:w-auto ">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="px-4 py-2 mr-5 bg-white rounded-lg w-full md:w-80 text-gray-900 focus:outline-none"
                    />
                    <button className="bg-[#360A70] hover:bg-purple-700 px-7 py-3 rounded-lg flex items-center gap-12 text-[14px]">
                        Subscribe <FaArrowRight />
                    </button>
                </div>
            </div>

            {/* Footer Links */}
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-3 gap-6 border-b border-gray-600 lg:pt-[150px] lg:pb-[10%]">
                <div>
                    <ul className="space-y-2 text-sm text-[#666666] font-Poppins">
                        <li className="hover:text-purple-600 cursor-pointer">Features</li>
                        <li className="hover:text-purple-600 cursor-pointer">Blog</li>
                        <li className="hover:text-purple-600 cursor-pointer flex items-center gap-2">
                            Resources
                            <span className="w-[46px] h-[22px] px-[10px] py-[2px] border border-[#311267] bg-[#311267] text-white text-xs flex items-center justify-center rounded-[4px]">
                                New
                            </span>

                        </li>
                        <li className="hover:text-purple-600 cursor-pointer">Testimonials</li>
                        <li className="hover:text-purple-600 cursor-pointer">Contact Us</li>
                        <li className="hover:text-purple-600 cursor-pointer">Newsletter</li>
                    </ul>
                </div>

                <div>
                    <ul className="space-y-2 font-inter font-normal text-[14px] leading-[130%] tracking-[-0.03em] text-[#666666]">
                        <li className="hover:text-purple-600 cursor-pointer">Quantum Computing</li>
                        <li className="hover:text-purple-600 cursor-pointer">AI Ethics</li>
                        <li className="hover:text-purple-600 cursor-pointer">Space Exploration</li>
                        <li className="hover:text-purple-600 cursor-pointer flex items-center gap-2">
                            Biotechnology
                            <span className="w-[46px] h-[22px] px-[10px] py-[2px] border border-[#311267] bg-[#311267] text-white text-xs flex items-center justify-center rounded-[4px]">
                                New
                            </span>
                        </li>
                        <li className="hover:text-purple-600 cursor-pointer">Renewable Energy</li>
                        <li className="hover:text-purple-600 cursor-pointer">Blockchain</li>
                    </ul>
                </div>

                <div className=" flex flex-col gap-4">
                    <button className="w-fit bg-[#311267] border-[#262626]  text-white px-4 py-2 rounded-lg flex justify-between items-center">
                        Whitepapers <ArrowUpRight className="ml-2" />
                    </button>
                    <button className="w-fit bg-[#311267] border-[#262626] text-white px-4 py-2 rounded-lg flex justify-between items-center">
                        Ebooks <ArrowUpRight className="ml-2" />
                    </button>
                    <button className="w-fit bg-[#311267] border-[#262626] text-white px-4 py-2 rounded-lg flex justify-between items-center">
                        Reports <ArrowUpRight className="ml-2" />
                    </button>
                    <button className="w-fit bg-[#311267] border-[#262626] text-white  px-4 py-2 rounded-lg flex justify-between items-center">
                        Research Papers <ArrowUpRight className="ml-2" />
                    </button>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 lg:py-[3%]">
                <div className="flex space-x-4">
                    <span className="hover:text-purple-600 cursor-pointer">Terms & Conditions</span>
                     <span className="text-gray-400">|</span>
                    <span className="hover:text-purple-600 cursor-pointer">Privacy Policy</span>
                </div>
                <p className="mt-4 md:mt-0">&copy; 2024 PharynxAI. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
