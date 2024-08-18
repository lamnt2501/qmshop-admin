import { Avatar, Badge, Chip, LinearProgress } from "@mui/material";

function CustomerRank() {
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
            ring={true}
          />
          <TopCustomerCard
            type="card"
            level={1}
            className="relative -translate-y-6 rounded-md bg-[#dcfce7] p-6 pt-10 text-center"
            avtSize={56}
            ring={true}
            crown={true}
          />
          <TopCustomerCard
            type="card"
            level={3}
            className="relative rounded-md bg-[#f2f0fe] p-6 pt-10 text-center"
            avtSize={56}
            ring={true}
          />
        </div>
        <div className="mt-10 space-y-4">
          {[4, 5, 6, 7, 8].map((v) => (
            <TopCustomerCard
              level={v}
              key={v}
              className="relative flex items-center justify-between px-4"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TopCustomerCard({
  className,
  level,
  crown = false,
  type = "row",
  ring = false,
  avtSize = 48,
}) {
  const color = ["primary", "secondary", "error", "info", "success", "warning"];
  return (
    <div className={className}>
      <div
        className={`${type === "card" ? "absolute left-1/2 top-[-20%] -translate-x-1/2" : "flex items-center gap-4"}`}
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
            src="https://dash-tail.vercel.app/_next/static/media/avatar-6.513b01f7.jpg"
            alt="Customer Avt"
            sx={{
              width: avtSize,
              height: avtSize,
            }}
            className={`${ring && "ring ring-yellow-400"}`}
          />
        </Badge>
        {crown && (
          <div className="absolute left-1/2 top-0 -translate-x-[50%] -translate-y-full text-yellow-400">
            <i className="fa-solid fa-crown"></i>
          </div>
        )}
        {type === "row" && <p className="font-semibold">Customer 1</p>}
      </div>
      {type === "card" && <p className="font-semibold">Customer 1</p>}
      <Chip
        label="$7000"
        size="small"
        color="secondary"
        className="my-2 opacity-50"
      />
      <div className={`${type === "row" && "basis-1/3"}`}>
        <p className="flex justify-between text-sm">
          <span>Score</span>
          <span>80%</span>
        </p>

        <LinearProgress
          value={10}
          variant="determinate"
          className="rounded-md"
          color={color[Math.floor(Math.random() * color.length)]}
          sx={{
            height: 8,
            borderColor: "red",
          }}
        />
      </div>
    </div>
  );
}

export default CustomerRank;
