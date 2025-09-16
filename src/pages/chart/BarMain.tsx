
import BarChart from "./BarChart";
interface VisibilityProps {
  setOpenVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setVisibilityData: React.Dispatch<React.SetStateAction<string>>;
}

const  BarMain:React.FC<VisibilityProps> =({ setOpenVisibility, setVisibilityData })=> {
  // const labels = ["Perplexity", "OpenAI", "Gemini"];
  // const values = [10, 25, 30];
  // const colors = ["#2262D0", "#BE3BED", "#FF6600"];

  return (
    // <div style={{ display: "flex", alignItems: "center", margin: "50px auto", width: "650px" }}>
    //   {/* Left icons */}
    //   <div className="flex flex-col justify-around py-4 h-[200px]">
    //     {icons.map((icon, i) => (
    //       // <div key={i} className="h-[50px] flex items-center">{icon}</div>
    //       <div key={i} className="flex items-center justify-center h-full">
    //         {icon}
    //         </div>
    //     ))}
    //   </div>

    //   {/* Chart */}
    //   <div style={{ flex: 1 }}>
    //     <h2 className="text-xl font-bold mb-4">My Bar Chart</h2>
    //     <BarChart labels={labels} values={values} colors={colors} />
    //   </div>
    // </div>

    //  <div className="flex flex-col md:flex-row items-center md:items-start  w-full">
    //   {/* Chart */}
    //   <div className="flex-1 w-full">
       
        <>
         {/* <h2 className="text-lg md:text-xl font-bold mb-4">My Bar Chart</h2> */}
        <BarChart  setOpenVisibility={setOpenVisibility} setVisibilityData={setVisibilityData}/>
        </>
    //   </div>
    // </div>
  );
}

export default BarMain;

