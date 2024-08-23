import { Avatar, Badge, Chip, LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import formatNumber from "../../utils/formatNumber";

function CustomerRank() {
  const { topCustomer } = useSelector((s) => s.dashboard);

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
            customer={topCustomer[1]}
            ring={true}
          />
          <TopCustomerCard
            type="card"
            level={1}
            className="relative -translate-y-6 rounded-md bg-[#dcfce7] p-6 pt-10 text-center"
            avtSize={56}
            ring={true}
            customer={topCustomer[0]}
            crown={true}
          />
          <TopCustomerCard
            type="card"
            level={3}
            className="relative rounded-md bg-[#f2f0fe] p-6 pt-10 text-center"
            avtSize={56}
            customer={topCustomer[2]}
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
  if (percent >= 90) return "info";
  if (percent >= 90) return "primary";
  if (percent >= 90) return "secondary";
  if (percent >= 90) return "warning";
  return "error";
};
const getRankColor = (rank) => {
  if (rank === "Diamond") return "cyan-300";
  if (rank === "Emerald") return "emerald-200";
  if (rank === "Golden") return "yellow-400";
  if (rank === "Silver") return "slate-400";
  if (rank === "Bronze") return "amber-700";
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
            className={`${customer?.memberShipClass && "ring " + ("ring-" + getRankColor(customer?.memberShipClass))}`}
          >
            {customer?.name.split(" ").at(-1)[0].toUpperCase()}
          </Avatar>
        </Badge>
        {customer?.memberShipClass && (
          <div className="absolute left-1/2 top-0 -translate-x-[50%] -translate-y-full">
            <i
              className={`fa-solid fa-crown ${customer?.memberShipClass && "text-" + getRankColor(customer?.memberShipClass)}`}
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
