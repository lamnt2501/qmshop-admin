import { Avatar, Badge, Chip, LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import formatNumber from "../../utils/formatNumber";
import { useRouteLoaderData } from "react-router-dom";

function CustomerRank() {
  const { topCustomer } = useRouteLoaderData("dashboard");

  return (
    <div className="h-fit rounded-md bg-white p-4">
      <div className="mb-20 text-lg font-semibold xl:text-[24px]">
        Top Customer
      </div>
      <div>
        <div className="relative grid grid-cols-3 gap-4">
          <TopCustomerCard
            type="card"
            level={2}
            className="relative rounded-md bg-[#f2f0fe] p-6 pt-10 text-center"
            avtSize={56}
            customer={topCustomer?.[1]}
            ring={true}
          />
          <TopCustomerCard
            type="card"
            level={1}
            className="relative -translate-y-6 rounded-md bg-[#dcfce7] p-6 pt-10 text-center"
            avtSize={56}
            ring={true}
            customer={topCustomer?.[0]}
            crown={true}
          />
          <TopCustomerCard
            type="card"
            level={3}
            className="relative rounded-md bg-[#f2f0fe] p-6 pt-10 text-center"
            avtSize={56}
            customer={topCustomer?.[2]}
            ring={true}
          />
        </div>
        <div className="mt-10 space-y-4">
          {(topCustomer || []).slice(3).map((customer, i) => (
            <TopCustomerCard
              level={i + 4}
              key={i}
              customer={customer}
              className="relative flex items-center justify-between px-4"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const color = ["error", "warning", "secondary", "primary", "info", "success"];
const rank = [2000000, 5000000, 10000000, 20000000, 50000000];
const getProgressColor = (percent) => {
  if (percent >= 90) return "success";
  if (percent >= 80) return "info";
  if (percent >= 70) return "primary";
  if (percent >= 60) return "secondary";
  if (percent >= 50) return "warning";
  return "error";
};
const getRankColor = (rank, type) => {
  if (rank === "Diamond") {
    if (type === "ring") return `ring-cyan-300`;
    if (type === "text") return `text-cyan-300`;
  }
  if (rank === "Emerald") {
    if (type === "ring") return `ring-emerald-200`;
    if (type === "text") return `text-emerald-200`;
  }
  if (rank === "Golden") {
    if (type === "ring") return `ring-yellow-400`;
    if (type === "text") return `text-yellow-400`;
  }
  if (rank === "Silver") {
    if (type === "ring") return `ring-slate-400`;
    if (type === "text") return `text-slate-400`;
  }
  if (rank === "Bronze") {
    if (type === "ring") return `ring-amber-700`;
    if (type === "text") return `text-amber-700`;
  }

  return "";
};

function TopCustomerCard({
  className,
  level,
  crown = false,
  type = "row",
  ring = false,
  avtSize = 48,
  customer,
}) {
  const percent = Math.floor(
    (customer?.spend * 100) / rank.filter((v) => v > customer?.spend)[0],
  );
  let ringColor = getRankColor(customer?.memberShipClass, "ring");

  return (
    <div className={className}>
      <div
        className={`${type === "card" ? "absolute left-1/2 top-[-20%] -translate-x-1/2" : "flex items-center gap-4"} `}
      >
        <Badge
          badgeContent={level}
          color="warning"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          overlap="circular"
        >
          <Avatar
            src={`${customer?.avtUrl}`}
            //  avt sample "https://dash-tail.vercel.app/_next/static/media/avatar-6.513b01f7.jpg"
            alt="Customer Avt"
            sx={{
              width: avtSize,
              height: avtSize,
            }}
            className={`${customer?.memberShipClass && `ring ${ringColor}`}`}
          >
            {customer?.name.split(" ").at(-1)[0].toUpperCase()}
          </Avatar>
        </Badge>
        {customer?.memberShipClass && (
          <div className="absolute left-1/2 top-0 -translate-x-[50%] -translate-y-full">
            <i
              className={`fa-solid fa-crown ${customer?.memberShipClass && getRankColor(customer?.memberShipClass, "text")}`}
            ></i>
          </div>
        )}
        {type === "row" && <p className="font-semibold">{customer?.name}</p>}
      </div>
      {type === "card" && <p className="font-semibold">{customer?.name}</p>}
      <Chip
        label={`${formatNumber(customer?.spend)} VND`}
        size="small"
        color="secondary"
        className="my-2 opacity-50"
      />
      <div className={`${type === "row" && "basis-1/3"}`}>
        <p className="flex justify-between text-sm">
          <span>Score</span>
          <span>{`${Math.floor(percent)}%`}</span>
        </p>

        <LinearProgress
          value={percent}
          variant="determinate"
          className="rounded-md"
          color={getProgressColor(percent)}
          sx={{
            height: 8,
            // borderColor: "red",
          }}
        />
      </div>
    </div>
  );
}

export default CustomerRank;
