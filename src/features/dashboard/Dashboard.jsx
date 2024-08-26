import { buildChartData } from "../../configs/charjsConfig";
import ProductBestSellerList from "./ProductBestSellerList";
// import BarChart from "../../ui/chart/BarChart";
import CustomerRank from "./CustomerRank";
import DoughnutChart from "../../ui/chart/DoughnutChart";
import StatisticCard from "./StatisticCard";
import { getDashBoardData } from "../../apis/dashboardApi";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { dataLoaded } from "../../states/slices/dashboardSlice";
import { formatNumber } from "../../utils/utils";
import LineChart from "../../ui/chart/LineChart";

function revenueChartData(revenue, type) {
  console.log(type);
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const renderLabels = labels.slice(
    0,
    labels.indexOf(labels[new Date().getMonth()]) + 1,
  );

  const values = renderLabels.map((l) => revenue?.[l.toUpperCase()] || 0);
  return buildChartData(values, renderLabels, "Revenue");
}

function dognutChartData(paymentStatistic = {}) {
  const keys = Object.keys(paymentStatistic);
  const total = Object.values(paymentStatistic)?.reduce(
    (pre, cur) => pre + cur,
    0,
  );
  return buildChartData(
    keys.map((k) => Math.round((paymentStatistic[k] * 100) / total)),
    keys,
  );
}

function Dashboard() {
  const dispatch = useDispatch();
  const loaderData = useLoaderData();
  const { orderSummary, paymentStatistic, revenue, error } = loaderData;

  useEffect(() => {
    if (!error) dispatch(dataLoaded(loaderData));
  }, [loaderData]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 rounded-md bg-white p-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatisticCard
          themeColors={{
            iconBackgroundColor: "rgb(134, 109, 251)",
            backgroundColor: "rgb(205,196,253)",
            lightEffectColor: "rgb(191, 179, 251)",
            darkEffectColor: "rgb(169, 151, 250)",
          }}
          title={"Total Orders"}
          data={orderSummary?.totalOrder}
          status="up"
          icon={<i className="fa-solid fa-cart-shopping"></i>}
        />
        <StatisticCard
          themeColors={{
            iconBackgroundColor: "rgb(254, 112, 18)",
            backgroundColor: "rgb(255, 246, 237)",
            lightEffectColor: "rgb(255, 238, 210)",
            darkEffectColor: "rgb(254, 216, 171)",
          }}
          icon={<i className="fa-solid fa-receipt"></i>}
          title={"Today Orders"}
          data={orderSummary?.todayOrder}
          status="down"
        />
        <StatisticCard
          themeColors={{
            iconBackgroundColor: "rgb(35, 196, 90)",
            backgroundColor: "rgb(240, 253, 244)",
            lightEffectColor: "rgb(220, 252, 231)",
            darkEffectColor: "rgb(187, 247, 209)",
          }}
          title={"Completed Order"}
          data={orderSummary?.successfulOrder}
          status="up"
          icon={<i className="fa-regular fa-circle-check"></i>}
        />
        <StatisticCard
          themeColors={{
            iconBackgroundColor: "rgb(237, 68, 71)",
            backgroundColor: "rgb(254, 242, 242)",
            lightEffectColor: "rgb(254, 226, 225)",
            darkEffectColor: "rgb(254, 203, 202)",
          }}
          title={"Pending Orders"}
          data={orderSummary?.pendingOrder}
          isRise={false}
          icon={<i className="fa-solid fa-exclamation"></i>}
        />
      </div>
      <div className="lg:grid lg:grid-cols-[70%_30%] lg:space-x-4">
        <div className="px rounded-md bg-white p-3">
          {/* <BarChart
            data={data}
            className="w-full"
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Revenue in 2024",
                },
                legend: {
                  display: false,
                },
                responsive: true,
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      return `${formatNumber(context.parsed.y)} VND`;
                    },
                  },
                },
              },
            }}
          /> */}
          <LineChart
            data={revenueChartData(revenue, "year")}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Revenue in 2024",
                },
                legend: {
                  display: false,
                },
                responsive: true,
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      return `${formatNumber(context.parsed.y)} VND`;
                    },
                  },
                },
              },
            }}
          />
        </div>
        <div className="mt-4 flex items-center justify-center rounded-md bg-white lg:mt-0">
          <div className="flex items-center rounded-md p-4">
            <DoughnutChart
              data={dognutChartData(paymentStatistic)}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Payment gateway usage rate",
                  },
                  legend: {
                    display: true,
                    position: "bottom",
                  },
                  responsive: true,
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return `${context.parsed}%`;
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
      <div className="space-y-4 lg:grid lg:grid-cols-[40%_60%] lg:space-x-4 lg:space-y-0">
        <ProductBestSellerList />
        <CustomerRank />
      </div>
    </div>
  );
}

export async function loader() {
  const data = await getDashBoardData();

  return data;
}

export default Dashboard;
