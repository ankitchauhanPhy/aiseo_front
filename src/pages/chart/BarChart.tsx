// import React, { useEffect, useRef } from "react";
// import {
//   Chart,
//   ChartData,
//   ChartOptions,
//   registerables,
// } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";

// Chart.register(...registerables, ChartDataLabels);

// interface BarChartProps {
//   labels: string[];        // e.g., ["Jan", "Feb", "Mar"]
//   values: number[];        // e.g., [10, 25, 15]
//   colors?: string[];       // optional: bar colors
// }

// const BarChart: React.FC<BarChartProps> = ({
//   labels,
//   values,
//   colors,

// }) => {
//   const chartRef = useRef<HTMLCanvasElement>(null);
//   const chartInstanceRef = useRef<Chart | null>(null);



//   useEffect(() => {
//     if (chartRef.current) {
//       if (chartInstanceRef.current) chartInstanceRef.current.destroy();

//       const data: ChartData<"bar"> = {
//         labels,
//         datasets: [
//           {
//             label: "Values",
//             data: values,
//             backgroundColor: colors || ["#8b5cf6", "#ec4899", "#f59e0b", "#10b981"],
//             borderRadius: 10,
//             borderSkipped: false,
//             maxBarThickness: 50
//           },
//         ],
//       };

//       const options: ChartOptions<"bar"> = {
//         indexAxis: "y", // horizontal bars
//         responsive: true,
//         plugins: {
//           legend: { display: false },
//           datalabels: {
//             anchor: "center",  // label left side of bar
//             align: "center",
//             color: "white",
//             font: { weight: "bold", size: 15 },
//             formatter: (value) => value.toString(),
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
//                 size: 14,
//               }
//             }
//           },
//           y: {
//             grid: { display: false },
//             ticks: {
//               display: false
//             }
//           },
//         },
//         animation: {
//           duration: 1000,
//           easing: "easeInOutQuart" as const,
//         },
//       };



//       chartInstanceRef.current = new Chart(chartRef.current, {
//         type: "bar",
//         data,
//         options,
//       });
//     }

//     return () => {
//       if (chartInstanceRef.current) chartInstanceRef.current.destroy();
//     };
//   }, [labels, values, colors]);

//   return <canvas ref={chartRef}></canvas>;
// };

// export default BarChart;


//  plugins: [
//         {
//           id: "iconPlugin",
//           afterDraw: (chart) => {
//             const ctx = chart.ctx
//             const meta = chart.getDatasetMeta(0)

//             const iconPaths = [`${MainHistoryVisibilityLogo1}`, `${MainHistoryVisibilityLogo2}`, `${MainHistoryVisibilityLogo4}`]

//             meta.data.forEach((bar, index) => {
//               const y = bar.y
//               const img = new Image()
//               img.onload = () => {
//                 ctx.drawImage(img, 20, y - 20, 45, 45)
//               }
//               img.src = iconPaths[index]
//             })
//           },
//         },
//       ],







import { useEffect, useRef } from "react"
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

// Register Chart.js components
Chart.register(...registerables)

const   BarChart: React.FC<VisibilityProps> = ({ setOpenVisibility, setVisibilityData }) => {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const labels = ["Perplexity", "OpenAI", "Gemini"]
  const dataValues = [0, 0, 0]

  const { productMatricesData } = useAuth();
  console.log("productMatricesData in barchart", productMatricesData);
  useEffect(() => {
    if (productMatricesData.length > 0) {
      labels.map((items, i) => {
        const item = items.toLowerCase();
        if (item === "perplexity") {
          const data = productMatricesData[0].mentions_by_platform?.[item]
          dataValues[i] = data;
        }
        else if (item === "openai") {
          const data = productMatricesData[0].mentions_by_platform?.[item]
          dataValues[i] = data;
        }
        else if (item === "gemini") {
          const data = productMatricesData[0].mentions_by_platform?.[item]
          dataValues[i] = data;
        }
      })
    }
  }, [productMatricesData])

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            data: dataValues,
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
            anchor: "center",  // label left side of bar
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
            grid: { color: "#BC95FF", drawTicks: false, }, // vertical lines only
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
        onClick: (_,activeEls) => {
          console.log("activeEls", activeEls);
          if (activeEls.length > 0) {
            const index = activeEls[0].index
            setOpenVisibility(true)
            setVisibilityData(labels[index])
          }
        }
      },
      plugins: [
        {
          id: "iconPlugin",
          afterDraw: (chart) => {
            const ctx = chart.ctx
            const meta = chart.getDatasetMeta(0)

            const iconPaths = [
              `${MainHistoryVisibilityLogo1}`,
              `${MainHistoryVisibilityLogo2}`,
              `${MainHistoryVisibilityLogo4}`,
            ]

            // Cache images
            if (!(chart as any)._cachedImages) {
              (chart as any)._cachedImages = iconPaths.map((src) => {
                const img = new Image()
                img.src = src
                return img
              })
            }

            const images = (chart as any)._cachedImages

            meta.data.forEach((bar, index) => {
              const y = bar.y
              const img = images[index]

              // Only draw if the image is loaded
              if (img.complete) {
                ctx.drawImage(img, 20, y - 20, 45, 45)
              } else {
                img.onload = () => {
                  ctx.drawImage(img, 20, y - 20, 45, 45)
                }
              }
            })
          },
        },
      ],

    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [setOpenVisibility, setVisibilityData, productMatricesData])

  return (
    <div className="relative h-64 pt-10">
      <canvas ref={chartRef} />
    </div>
  )
}


export default BarChart;








