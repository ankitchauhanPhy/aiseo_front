import ChooseUs from "./dashboardcomponent/ChooseUs";
import Footer from "./dashboardcomponent/Footer";
import Hero from "./dashboardcomponent/Hero";
import HowInsightfulWorks from "./dashboardcomponent/HowInsightfulWorks";
import Testimonials from "./dashboardcomponent/Testimonials";
import WhatWeDo from "./dashboardcomponent/WhatWeDo";


function Dashboard(){
 return (
    <div>
        <Hero/>
        <ChooseUs/>
        <WhatWeDo/>
        <HowInsightfulWorks/>
        <Testimonials/>
        <Footer/>
    </div>
 )   
}

export default Dashboard;