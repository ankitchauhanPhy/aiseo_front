// // import React, { useEffect, useRef } from "react";
// // import {
// //   Chart,
// //   ChartData,
// //   ChartOptions,
// //   registerables,
// // } from "chart.js";
// // import ChartDataLabels from "chartjs-plugin-datalabels";

// // Chart.register(...registerables, ChartDataLabels);

// // interface BarChartProps {
// //   labels: string[];        // e.g., ["Jan", "Feb", "Mar"]
// //   values: number[];        // e.g., [10, 25, 15]
// //   colors?: string[];       // optional: bar colors
// // }

// // const BarChart: React.FC<BarChartProps> = ({
// //   labels,
// //   values,
// //   colors,

// // }) => {
// //   const chartRef = useRef<HTMLCanvasElement>(null);
// //   const chartInstanceRef = useRef<Chart | null>(null);



// //   useEffect(() => {
// //     if (chartRef.current) {
// //       if (chartInstanceRef.current) chartInstanceRef.current.destroy();

// //       const data: ChartData<"bar"> = {
// //         labels,
// //         datasets: [
// //           {
// //             label: "Values",
// //             data: values,
// //             backgroundColor: colors || ["#8b5cf6", "#ec4899", "#f59e0b", "#10b981"],
// //             borderRadius: 10,
// //             borderSkipped: false,
// //             maxBarThickness: 50
// //           },
// //         ],
// //       };

// //       const options: ChartOptions<"bar"> = {
// //         indexAxis: "y", // horizontal bars
// //         responsive: true,
// //         plugins: {
// //           legend: { display: false },
// //           datalabels: {
// //             anchor: "center",  // label left side of bar
// //             align: "center",
// //             color: "white",
// //             font: { weight: "bold", size: 15 },
// //             formatter: (value) => value.toString(),
// //           },
// //         },
// //         scales: {
// //           x: {
// //             grid: { color: "#BC95FF", drawTicks: false, }, // vertical lines only
// //             border: {
// //               display: false,
// //             },
// //             ticks: {
// //               color: "#AEB9E1",
// //               font: {
// //                 size: 14,
// //               }
// //             }
// //           },
// //           y: {
// //             grid: { display: false },
// //             ticks: {
// //               display: false
// //             }
// //           },
// //         },
// //         animation: {
// //           duration: 1000,
// //           easing: "easeInOutQuart" as const,
// //         },
// //       };



// //       chartInstanceRef.current = new Chart(chartRef.current, {
// //         type: "bar",
// //         data,
// //         options,
// //       });
// //     }

// //     return () => {
// //       if (chartInstanceRef.current) chartInstanceRef.current.destroy();
// //     };
// //   }, [labels, values, colors]);

// //   return <canvas ref={chartRef}></canvas>;
// // };

// // export default BarChart;


// //  plugins: [
// //         {
// //           id: "iconPlugin",
// //           afterDraw: (chart) => {
// //             const ctx = chart.ctx
// //             const meta = chart.getDatasetMeta(0)

// //             const iconPaths = [`${MainHistoryVisibilityLogo1}`, `${MainHistoryVisibilityLogo2}`, `${MainHistoryVisibilityLogo4}`]

// //             meta.data.forEach((bar, index) => {
// //               const y = bar.y
// //               const img = new Image()
// //               img.onload = () => {
// //                 ctx.drawImage(img, 20, y - 20, 45, 45)
// //               }
// //               img.src = iconPaths[index]
// //             })
// //           },
// //         },
// //       ],







// import { useEffect, useRef } from "react"
// import { Chart, registerables } from "chart.js"
// import ChartDataLabels from "chartjs-plugin-datalabels";

// Chart.register(...registerables, ChartDataLabels)

// interface VisibilityProps {
//   setOpenVisibility: React.Dispatch<React.SetStateAction<boolean>>;
//   setVisibilityData: React.Dispatch<React.SetStateAction<string>>;
// }

// import MainHistoryVisibilityLogo1 from "../../assets/mainHistory/MainHistoryVisibilityLogo1.svg";
// import MainHistoryVisibilityLogo2 from "../../assets/mainHistory/MainHistoryVisibilityLogo2.svg"
// import MainHistoryVisibilityLogo4 from "../../assets/mainHistory/MainHistoryVisibilityLogo4.svg"
// import { useAuth } from "@/authContext/useAuth";

// // Register Chart.js components
// Chart.register(...registerables)

// const BarChartUpdated: React.FC<VisibilityProps> = ({ setOpenVisibility, setVisibilityData }) => {
//   const chartRef = useRef<HTMLCanvasElement>(null)
//   const chartInstance = useRef<Chart | null>(null)
//   const labels = ["Perplexity", "OpenAI", "Gemini"]
//   const dataValues = [0, 0, 0]

//   const { productMatricesCompetitor } = useAuth();
//   console.log("productMatricesCompetitor in barchart", productMatricesCompetitor);
//   useEffect(() => {
//     if (productMatricesCompetitor.length > 0) {
//       labels.map((items, i) => {
//         const item = items.toLowerCase();
//         if (item === "perplexity") {
//           const data = productMatricesCompetitor[0].mentions_by_platform?.[item]
//           dataValues[i] = data;
//         }
//         else if (item === "openai") {
//           const data = productMatricesCompetitor[0].mentions_by_platform?.[item]
//           dataValues[i] = data;
//         }
//         else if (item === "gemini") {
//           const data = productMatricesCompetitor[0].mentions_by_platform?.[item]
//           dataValues[i] = data;
//         }
//       })
//     }
//   }, [])

//   useEffect(() => {
//     if (!chartRef.current) return

//     // Destroy existing chart if it exists
//     if (chartInstance.current) {
//       chartInstance.current.destroy()
//     }

//     const ctx = chartRef.current.getContext("2d")
//     if (!ctx) return

//     chartInstance.current = new Chart(ctx, {
//       type: "bar",
//       data: {
//         labels,
//         datasets: [
//           {
//             data: dataValues,
//             backgroundColor: ["#3B82F6", "#A855F7", "#F97316"], // blue, purple, orange
//             borderRadius: 10,
//             barThickness: 35,
//           },
//         ],
//       },
//       options: {
//         indexAxis: "y", // Make bars horizontal
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//           legend: { display: false },
//           datalabels: {
//             anchor: "center",  // label left side of bar
//             align: "center",
//             color: "white",
//             font: { weight: "bold", size: 15 },
//             formatter: (value) => value.toString(),
//           },
//           tooltip: {
//             enabled: true,
//           },
//         },
//         scales: {
//           x: {
//             grid: { color: "#BC95FF", drawTicks: false, }, // vertical lines only
//             border: {
//               display: false,
//             },
//             ticks: {
//               color: "#AEB9E1",
//               font: {
//                 weight: "bold",
//                 size: 15,
//               }
//             }
//           },
//           y: {
//             grid: {
//               display: false,
//             },
//             ticks: {
//               display: false, // Hide y-axis labels since we'll show icons
//             },
//           },
//         },
//         layout: {
//           padding: {
//             left: 50, // Make room for icons
//           },
//         },
//         animation: {
//           duration: 1000,
//         },
//         onClick: (evt, activeEls) => {
//           console.log("activeEls", activeEls);
//           if (activeEls.length > 0) {
//             const index = activeEls[0].index
//             setOpenVisibility(true)
//             setVisibilityData(labels[index])
//           }
//         }
//       },
//       plugins: [
//         {
//           id: "iconPlugin",
//           afterDraw: (chart) => {
//             const ctx = chart.ctx
//             const meta = chart.getDatasetMeta(0)

//             const iconPaths = [
//               `${MainHistoryVisibilityLogo1}`,
//               `${MainHistoryVisibilityLogo2}`,
//               `${MainHistoryVisibilityLogo4}`,
//             ]

//             // Cache images
//             if (!(chart as any)._cachedImages) {
//               (chart as any)._cachedImages = iconPaths.map((src) => {
//                 const img = new Image()
//                 img.src = src
//                 return img
//               })
//             }

//             const images = (chart as any)._cachedImages

//             meta.data.forEach((bar, index) => {
//               const y = bar.y
//               const img = images[index]

//               // Only draw if the image is loaded
//               if (img.complete) {
//                 ctx.drawImage(img, 20, y - 20, 45, 45)
//               } else {
//                 img.onload = () => {
//                   ctx.drawImage(img, 20, y - 20, 45, 45)
//                 }
//               }
//             })
//           },
//         },
//       ],

//     })

//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy()
//       }
//     }
//   }, [setOpenVisibility, setVisibilityData])

//   return (
//     <div className="relative h-64 pt-10">
//       <canvas ref={chartRef} />
//     </div>
//   )
// }


// export default BarChartUpdated;


import { useEffect, useRef, useState } from "react"
import { Chart, registerables } from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(...registerables, ChartDataLabels)

interface VisibilityProps {
  setOpenVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setVisibilityData: React.Dispatch<React.SetStateAction<string>>;
}

import MainHistoryVisibilityLogo1 from "../../assets/mainHistory/MainHistoryVisibilityLogo1.svg";
import MainHistoryVisibilityLogo2 from "../../assets/mainHistory/MainHistoryVisibilityLogo2.svg"
import MainHistoryVisibilityLogo4 from "../../assets/mainHistory/MainHistoryVisibilityLogo4.svg"
import { useAuth } from "@/authContext/useAuth";
import { OptimizationAPI } from "@/api";

const BarChartUpdated: React.FC<VisibilityProps> = ({ setOpenVisibility, setVisibilityData }) => {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  
  // Component's own state for data
  const [chartData, setChartData] = useState<number[]>([0, 0, 0])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const labels = ["Perplexity", "OpenAI", "Gemini"]
  const { queryID, competitorProductName, setProductMatricesCompetitor } = useAuth();

  // API call directly in the component
  useEffect(() => {
    console.log('🎯 BarChartUpdated: Checking for API call', { queryID, competitorProductName });
    
    if (!queryID || !competitorProductName) {
      console.log('❌ Missing queryID or competitorProductName');
      return;
    }

    async function loadChartData() {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('🚀 BarChartUpdated: Making API call');
        const response = await OptimizationAPI.productMatrices(queryID, competitorProductName);
        console.log('📡 BarChartUpdated: API Response', response);

        if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
          const productData = response.data[0];
          setProductMatricesCompetitor?.(response.data)
          const mentionsByPlatform = productData.mentions_by_platform;
          
          console.log('📊 BarChartUpdated: Processing data', mentionsByPlatform);

          // Extract data for each platform
          const newDataValues = [
            mentionsByPlatform?.perplexity || 0,
            mentionsByPlatform?.openai || 0,
            mentionsByPlatform?.gemini || 0
          ];

          console.log('✅ BarChartUpdated: Data processed', newDataValues);
          setChartData(newDataValues);
        } else {
          console.log('⚠️ BarChartUpdated: Unexpected data format', response.data);
          setError('Unexpected data format received');
        }
      } catch (err) {
        console.error('❌ BarChartUpdated: API Error', err);
        const message = err instanceof Error ? err.message : "Failed to load chart data";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    loadChartData();
  }, [queryID, competitorProductName]); // Re-run when these change

  // Chart rendering effect - only runs when chartData changes
  useEffect(() => {
    console.log('🎨 BarChartUpdated: Rendering chart with data', chartData);
    
    if (!chartRef.current) return;

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            data: chartData, // Use the state data
            backgroundColor: ["#3B82F6", "#A855F7", "#F97316"], // blue, purple, orange
            borderRadius: 10,
            barThickness: 35,
          },
        ],
      },
      options: {
        indexAxis: "y", // Make bars horizontal
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          datalabels: {
            anchor: "center",
            align: "center",
            color: "white",
            font: { weight: "bold", size: 15 },
            formatter: (value) => value.toString(),
          },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          x: {
            grid: { color: "#BC95FF", drawTicks: false },
            border: {
              display: false,
            },
            ticks: {
              color: "#AEB9E1",
              font: {
                weight: "bold",
                size: 15,
              }
            }
          },
          y: {
            grid: {
              display: false,
            },
            ticks: {
              display: false, // Hide y-axis labels since we'll show icons
            },
          },
        },
        layout: {
          padding: {
            left: 50, // Make room for icons
          },
        },
        animation: {
          duration: 1000,
        },
        onClick: (evt, activeEls) => {
          console.log("Chart clicked", activeEls);
          if (activeEls.length > 0) {
            const index = activeEls[0].index;
            setOpenVisibility(true);
            setVisibilityData(labels[index]);
          }
        }
      },
      plugins: [
        {
          id: "iconPlugin",
          afterDraw: (chart) => {
            const ctx = chart.ctx;
            const meta = chart.getDatasetMeta(0);

            const iconPaths = [
              `${MainHistoryVisibilityLogo1}`,
              `${MainHistoryVisibilityLogo2}`,
              `${MainHistoryVisibilityLogo4}`,
            ];

            // Cache images
            if (!(chart as any)._cachedImages) {
              (chart as any)._cachedImages = iconPaths.map((src) => {
                const img = new Image();
                img.src = src;
                return img;
              });
            }

            const images = (chart as any)._cachedImages;

            meta.data.forEach((bar, index) => {
              const y = bar.y;
              const img = images[index];

              // Only draw if the image is loaded
              if (img.complete) {
                ctx.drawImage(img, 20, y - 20, 45, 45);
              } else {
                img.onload = () => {
                  ctx.drawImage(img, 20, y - 20, 45, 45);
                };
              }
            });
          },
        },
      ],
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData, setOpenVisibility, setVisibilityData]); // Re-render when chartData changes

  // Show loading state
  if (isLoading) {
    return (
      <div className="relative h-64 pt-10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Loading chart data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="relative h-64 pt-10 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="mb-2">Error loading chart:</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // Show chart
  return (
    <div className="relative h-64 pt-10">
      <canvas ref={chartRef} />
      {/* Debug info - remove in production */}
      <div className="absolute top-0 right-0 text-xs text-gray-500 bg-gray-100 p-1 rounded">
        Data: [{chartData.join(', ')}]
      </div>
    </div>
  );
};

export default BarChartUpdated;





