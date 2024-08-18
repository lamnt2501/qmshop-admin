import { buildChartData } from "../../configs/charjsConfig";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import StatisticCard from "./StatisticCard";

const data = buildChartData(
  [0, 0, 0, 0, 0, 0, 0].map(() => Math.random() * 2000000),
  ["January", "Febuary", "March", "April", "May", "June", "July"],
  "Revenue",
);

function Dashboard() {
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
          data={"4123"}
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
          data={"14"}
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
          data={"356"}
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
          data={"4"}
          isRise={false}
          icon={<i className="fa-solid fa-exclamation"></i>}
        />
      </div>
      <div className="gap-4 lg:grid lg:grid-cols-[70%_30%]">
        <div className="px rounded-md bg-white p-3">
          <BarChart
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
              },
            }}
          />
        </div>
        <div className="mt-4 flex items-center justify-center rounded-md bg-white lg:mt-0">
          <div className="flex items-center rounded-md p-4">
            <PieChart data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
