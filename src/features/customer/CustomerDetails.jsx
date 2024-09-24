import { Form, useLoaderData, useNavigate } from "react-router-dom";
import {
  fetchCustomerById,
  fetchTopCustomerById,
} from "../../apis/customerApi";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, TextField } from "@mui/material";
import { formatDate, formatNumber } from "../../utils/utils";
import { fetchOrderByCustomerId } from "../../apis/orderApi";
import OrderStatus from "../order/OrderStatus";
import useTitle from "../../hooks/useTitle";

const columns = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "date",
    headerName: "Order Date",
    align: "left",
    flex: 1,
    valueGetter: (value) => {
      return formatDate(new Date(value), { dateStyle: "medium" }, "en");
    },
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: ({ value }) => <OrderStatus status={value} />,
  },
  {
    field: "total",
    headerName: "Total",
    flex: 1,
    align: "left",
    headerAlign: "left",
    type: "number",
    valueGetter: (value) => formatNumber(value) + " VND",
  },
];

const buildRows = (orders) =>
  orders.map((o) => ({
    id: o.orderId,
    status: o.status,
    total: o.total,
    date: o.createdAt,
  }));

function CustomerDetails() {
  const { customer, memberShip, orders } = useLoaderData();
  const navigate = useNavigate();
  useTitle("Customer Details - " + customer.name);
  return (
    <div className="grid grid-cols-2 space-x-4">
      <div className="space-y-4">
        <div className="grid grid-cols-2 space-x-4">
          <div className="space-y-4 rounded-md bg-white p-4">
            <div className="flex items-center space-x-4">
              <Avatar src={`${customer?.avtUrl}`} alt="Customer Avt">
                {customer?.name.split(" ").at(-1)[0].toUpperCase()}
              </Avatar>
              <p className="font-medium">{customer.name}</p>
            </div>
            <p className="space-x-4">
              <span className="font-semibold">Membership Class:</span>
              <span>{memberShip.memberShipClass || "Unranked"}</span>
            </p>
            <p className="space-x-4">
              <span className="font-semibold">Spended:</span>
              <span>{memberShip.spend} VND</span>
            </p>
          </div>
          <div className="flex flex-col justify-center space-y-4 rounded-md bg-white p-4">
            <p className="space-x-4">
              <span className="font-medium">Email:</span>
              <span>{customer.email}</span>
            </p>
            <p className="space-x-4">
              <span className="font-medium">Phone:</span>
              <span>{customer.phone}</span>
            </p>
            <p className="space-x-4">
              <span className="font-medium">Gender:</span>
              {/* <span>{customer.gender}</span> */}
              <span
                className={`${customer.gender === "MALE" ? "text-blue-600" : "text-pink-500"}`}
              >
                <i
                  className={`fa-solid fa-${customer.gender === "MALE" ? "mars" : "venus"}`}
                ></i>
              </span>
            </p>
            <p className="space-x-4">
              <span className="font-medium">Birthday:</span>
              <span>
                {formatDate(new Date(customer.birthday), {
                  dateStyle: "long",
                })}
              </span>
            </p>
          </div>
        </div>
        <div className="rounded-md bg-white p-4">
          <h1 className="mb-4 font-semibold">Order History</h1>
          {!orders.length ? (
            <div className="text-center font-medium">Empty 😳</div>
          ) : (
            <div className="h-[500px] w-full">
              <DataGrid
                columns={columns}
                rows={buildRows(orders)}
                onRowClick={(r) => navigate(`/orders/${r.id}`)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="h-fit rounded-md bg-white p-4">
        <div className="grid h-[600px] grid-rows-[90%_10%] rounded-md border border-gray-50 p-4">
          <div></div>
          <div>
            <Form className="flex items-center">
              <TextField fullWidth placeholder="Type Message Here" />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function loader({ params: { id } }) {
  const customer = await fetchCustomerById(id);
  if (customer.error) throw new Response(customer.error.message);
  const memberShip = await fetchTopCustomerById(id);
  if (memberShip.error) throw new Response(memberShip.error.message);
  const orders = await fetchOrderByCustomerId(id);
  if (orders.error) throw new Response(orders.error.message);
  return { customer, memberShip, orders };
}
export default CustomerDetails;
