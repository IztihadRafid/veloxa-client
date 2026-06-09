import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ReactApexChart from "react-apexcharts";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { data: deliveryStats, isLoading } = useQuery({
    queryKey: ["delivery-status-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/delivery-status/stats");
      return res.data;
    },
  });

  const cleanStats = deliveryStats?.filter((item) => item._id !== null) || [];

  const series = cleanStats.map((item) => item.count);
  const labels = cleanStats.map((item) => item._id.replace(/_/g, " "));

  const getPieChartData = {
    chart: { type: "pie" },
    labels,
    colors: ["#f15d73", "#8f88f7", "#00a63e", "#f7a400", "#8a70df"],
    legend: { position: "bottom" },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: { width: "100%" },
          legend: { position: "bottom" },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: { width: "100%" },
          legend: { position: "bottom", fontSize: "11px" },
        },
      },
    ],
  };

  const barChartSeries = [
    { name: "Parcels", data: cleanStats.map((item) => item.count) },
  ];

  const barChartOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    colors: ["#00a63e"],
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: { position: "top" },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => val,
      offsetY: -20,
      style: { fontSize: "12px", colors: ["#304758"] },
    },
    xaxis: {
      categories: cleanStats.map((item) => item._id.replace(/_/g, " ")),
      position: "top",
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        rotate: 0,       
        trim: true,       
        maxHeight: 60,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: { enabled: true },
    },
    yaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { show: false },
    },
   
    title: { text: "" },
  };

  return (
    <div className="p-6 w-[90%] mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {isLoading ? (
        <p className="text-gray-400">Loading stats...</p>
      ) : (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cleanStats.map((stat) => (
              <div
                key={stat._id}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm flex flex-col gap-1"
              >
                <p className="text-sm text-gray-500 capitalize">
                  {stat._id.replace(/_/g, " ")}
                </p>
                <p className="text-3xl font-bold text-gray-800">{stat.count}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

            {/* Pie Chart */}
            {series.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <h2 className="text-base font-semibold text-gray-700 mb-2">
                  Status Distribution
                </h2>
                <ReactApexChart
                  options={getPieChartData}
                  series={series}
                  type="pie"
                  width="100%"
                />
              </div>
            )}

            {/* Bar Chart */}
            {cleanStats.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 ">
                <h2 className="text-base font-semibold text-gray-700 mb-4">
                  Parcels by Delivery Status
                </h2>
                <ReactApexChart
                  options={barChartOptions}
                  series={barChartSeries}
                  type="bar"
                  height={500}
                  width="80%"
                  margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboardHome;