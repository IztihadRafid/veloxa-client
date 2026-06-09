import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ReactApexChart from "react-apexcharts";

const RiderDashboardHome = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
  const { data: riderDeliveryStats, isLoading } = useQuery({
    queryKey: ["rider-delivery-status-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders/delivery-per-day?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email, 
  });

  console.log(riderDeliveryStats);
  // sort by date ascending for line chart
  const sortedStats = [...(riderDeliveryStats || [])].sort((a, b) => {
    const [ad, am, ay] = a._id.split("-");
    const [bd, bm, by] = b._id.split("-");
    return new Date(`${ay}-${am}-${ad}`) - new Date(`${by}-${bm}-${bd}`);
  });

  const dates = sortedStats.map((item) => item._id);
  const counts = sortedStats.map((item) => item.deliveryCount);

  // Pie chart — total deliveries per day as slices
  const pieOptions = {
    chart: { type: "pie" },
    labels: dates,
    colors: ["#f15d73", "#8f88f7", "#00a63e", "#f7a400", "#8a70df", "#33b2df", "#ff6e57"],
    legend: { position: "bottom" },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: { width: "100%" },
          legend: { position: "bottom", fontSize: "11px" },
        },
      },
    ],
  };

  // Line chart — deliveries over time
  const lineOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ["#00a63e"],
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 5,
      colors: ["#00a63e"],
      strokeColors: "#fff",
      strokeWidth: 2,
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: dates,
      labels: {
        rotate: -45,
        style: { fontSize: "11px" },
      },
    },
    yaxis: {
      title: { text: "Deliveries" },
      min: 0,
      tickAmount: 4,
      labels: {
        formatter: (val) => Math.round(val),
      },
    },
    tooltip: {
      x: { show: true },
      y: { formatter: (val) => `${val} deliveries` },
    },
    title: {
      text: "",
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          xaxis: {
            labels: { rotate: -60, style: { fontSize: "10px" } },
          },
          markers: { size: 4 },
        },
      },
    ],
  };

  const lineSeries = [{ name: "Deliveries", data: counts }];
    return (
         <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Rider Dashboard</h1>

      {isLoading ? (
        <p className="text-gray-400">Loading stats...</p>
      ) : !riderDeliveryStats?.length ? (
        <p className="text-gray-400">No delivery data found.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Pie Chart */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 w-full">
            <h2 className="text-base font-semibold text-gray-700 mb-2">
              Deliveries by Day
            </h2>
            <ReactApexChart
              options={pieOptions}
              series={counts}
              type="pie"
              width="100%"
            />
          </div>

          {/* Line Chart */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 w-full">
            <h2 className="text-base font-semibold text-gray-700 mb-2">
              Delivery Trend
            </h2>
            <ReactApexChart
              options={lineOptions}
              series={lineSeries}
              type="line"
              height={350}
              width="100%"
            />
          </div>

        </div>
      )}
    </div>
    );
};

export default RiderDashboardHome;