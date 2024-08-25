import { useRouteLoaderData } from "react-router-dom";
import TopCustomerCard from "./TopCustomerCard";

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

// const color = ["error", "warning", "secondary", "primary", "info", "success"];

export default CustomerRank;
