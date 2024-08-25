import { Link, useLoaderData } from "react-router-dom";
import { fetchOrder, updateOrderStatus } from "../../apis/orderApi";
import { DataGrid } from "@mui/x-data-grid";
import { BASE_COL_DEF } from "../../configs/dataGridConfig";
import { Avatar, Box, Chip, Divider, Stepper } from "@mui/material";
import PropTypes from "prop-types";
import { formatNumber } from "../../utils/utils";
import UpdateStatusForm from "./UpdateStatusForm";
import OrderStatusTrackingStep from "./OrderStatusTrackingstep";
import { fetchCustomerByEmail } from "../../apis/customerApi";
const buildRows = (items) =>
  items?.map((item) => {
    return {
      id: item.sku,
      item,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
    };
  });

const renderCell = (value) => {
  return <div className="flex h-full items-center justify-center">{value}</div>;
};

const columns = [
  {
    ...BASE_COL_DEF,
    align: "left",
    field: "item",
    headerName: "Product Details",
    flex: 1,
    headerAlign: "left",

    renderCell: (params) => {
      const { value: item } = params;
      return (
        <div className="flex h-full w-full items-center space-x-4 py-2">
          <Avatar
            src={item.imgUrl}
            sx={{
              width: 64,
              height: 64,
            }}
            variant="rounded"
          />
          <div className="space-y-3">
            <Link className="font-semibold text-[#86b1c5] hover:text-[#638fa4]">
              {item.name}
            </Link>
            <div>
              <p className="font-thin text-stone-400">
                Color: <span className="text-stone-600">{item.color}</span>
              </p>
              <p className="font-thin text-stone-400">
                Size: <span className="text-stone-600"> {item.size}</span>
              </p>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    ...BASE_COL_DEF,
    field: "price",
    type: "number",
    headerName: "Product Price",
    renderCell: ({ value }) => renderCell(formatNumber(value, "vn") + " VND"),
  },

  {
    ...BASE_COL_DEF,
    type: "number",
    field: "quantity",
    headerName: "Quantity",
    renderCell: ({ value }) => renderCell(value),
  },
  {
    ...BASE_COL_DEF,
    type: "number",
    field: "total",
    headerName: "Total Amount",
    renderCell: ({ value }) => renderCell(formatNumber(value, "vn") + " VND"),
  },
];

const valueOptions = ["WAITING", "APPROVED", "SHIPPING", "SUCCEEDED", "CANCEL"];

function OrderDetails() {
  const { order, customer } = useLoaderData();
  const [specificAddress, ward, district, city] =
    order?.address.split(", ") || [];
  const subTotal = order.items.reduce(
    (pre, cur) => pre + cur.price * cur.quantity,
    0,
  );

  return (
    <div className="grid grid-cols-[70%_30%] space-x-4 rounded-md">
      <div className="space-y-4">
        <div className="rounded-md bg-white">
          <div>
            <div className="flex items-center justify-between p-4">
              <span className="font-semibold">Order #{order.orderId}</span>
              <button className="rounded-md bg-main p-2 text-white">
                Invoice <i className="fa-solid fa-download"></i>
              </button>
            </div>
          </div>
          <Box sx={{ width: "100%" }}>
            <DataGrid
              columns={columns}
              rows={buildRows(order.items)}
              autoHeight
              density="comfortable"
              getRowId={getRowId}
              disableColumnSelector
              disableRowSelectionOnClick
              disableDensitySelector
              hideFooter={true}
              getRowHeight={() => "auto"}
              sx={{
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "white",
                  borderRadius: "8px",
                },
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: "#f2f6f9",
                },
                borderRadius: 0,
                border: "1px solid rgba(0,0,0,0.1)",
                // borderTop: "1px solid rgba(0,0,0,0.1)",
              }}
            />
          </Box>
          <div className="flex justify-end p-4">
            <div className="w-1/3 text-slate-500">
              <p className="flex justify-between font-medium">
                <span>Sub Total : </span>
                <span>{formatNumber(subTotal)} VND</span>
              </p>
              <p className="flex justify-between py-4 font-medium">
                <span>Discount : </span>
                <span>- {0} VND</span>
              </p>
              <Divider />
              <p className="flex justify-between pt-4 font-medium">
                <span>Total : </span>
                <span>{formatNumber(subTotal)} VND</span>
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-md bg-white p-4">
          <div className="flex justify-between">
            <div className="flex items-center space-x-4 font-semibold">
              <span>Order Status</span>{" "}
            </div>
            <UpdateStatusForm curStatus={order.status} />
          </div>
          <hr className="my-4" />
          <div className="px-4">
            <Stepper orientation="vertical">
              {order.tracking.map((t) => (
                // <Step key={t.status}>
                //   <StepLabel
                //     StepIconComponent={() => {
                //       const icon = (t.status === "APPROVED" && (
                //         <i className="fa-solid fa-check-double"></i>
                //       )) ||
                //         (t.status === "SHIPPING" && (
                //           <i className="fa-solid fa-truck-fast"></i>
                //         )) ||
                //         (t.status === "SUCCEEDED" && (
                //           <i className="fa-regular fa-circle-check"></i>
                //         )) || <i className="fa-solid fa-ban"></i>;

                //       return (
                //         <Avatar
                //           sx={{
                //             backgroundColor:
                //               t.status !== "CALCEL" ? "#68db7f" : "red",
                //           }}
                //         >
                //           {icon}
                //         </Avatar>
                //       );
                //     }}
                //   >
                //     <div>
                //       <p>{labelMap[t.status]}</p>
                //     </div>
                //   </StepLabel>
                // </Step>
                <OrderStatusTrackingStep
                  key={t.status}
                  completed={true}
                  tracking={t}
                />
              ))}
              {valueOptions.indexOf(order.status) < 3 &&
                valueOptions
                  .slice(valueOptions.indexOf(order.status) + 1, 4)
                  .map((s) => {
                    return (
                      <OrderStatusTrackingStep
                        key={s}
                        tracking={{ status: s }}
                      />
                    );
                  })}
            </Stepper>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="rounded-md bg-white px-4">
          <div className="flex justify-between py-4">
            <p className="space-x-2 font-medium">
              <i className="fa-regular fa-user"></i>
              <span>Customer Detail</span>
            </p>
            <Link className="text-blue-400">View Profile</Link>
          </div>
          <Divider />
          <div className="py-4">
            <div className="flex space-x-4">
              <Avatar
                src={`${customer?.avtUrl}`}
                alt="Customer Avt"
                sx={{
                  width: 50,
                  height: 50,
                  backgroundColor: [
                    "orangered",
                    "pink",
                    "green",
                    "blue",
                    "cyan",
                  ][Math.floor(Math.random() * 5)],
                }}
                variant="rounded"
              >
                {customer?.name.split(" ").at(-1)[0].toUpperCase()}
              </Avatar>
              <div>
                <p className="text-[16px] font-medium">{customer.name}</p>
                <p className="font-light text-slate-400">Customer</p>
              </div>
            </div>
            <div className="mt-4 space-y-4">
              <p className="space-x-4">
                <i className="fa-regular fa-envelope"></i>
                <span>{customer.email}</span>
              </p>
              <p className="space-x-4">
                <i className="fa-solid fa-phone"></i>
                <span>{customer.phone}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-md bg-white px-4">
          <div className="flex justify-between py-4">
            <p className="space-x-2 font-medium">
              <i className="fa-solid fa-location-dot"></i>
              <span>Shipping Information</span>
            </p>
          </div>
          <Divider />
          <div className="py-4">
            <p className="space-x-4">
              <span className="font-medium">Receiver Name :</span>
              <span>{order.receiverName}</span>
            </p>
            <p className="space-x-4">
              <span className="font-medium">Receiver Phone :</span>
              <span>{order.phoneNumber}</span>
            </p>
            <p className="space-x-4">
              <span className="font-medium">Specific Address :</span>
              <span>{specificAddress}</span>
            </p>
            <p className="space-x-4">
              <span className="font-medium">Ward :</span>
              <span>{ward}</span>
            </p>
            <p className="space-x-4">
              <span className="font-medium">District :</span>
              <span>{district}</span>
            </p>
            <p className="space-x-4">
              <span className="font-medium">City :</span>
              <span>{city}</span>
            </p>
          </div>
        </div>
        <div className="rounded-md bg-white px-4">
          <div className="flex justify-between py-4">
            <p className="space-x-2 font-medium">
              <i className="fa-regular fa-credit-card"></i>
              <span>Payment Detail</span>
            </p>
          </div>
          <Divider />
          <div className="py-4">
            <div className="space-y-4">
              <p className="space-x-4">
                <span className="font-medium">Payment Method :</span>
                <span>{order.paymentMethod.name}</span>
              </p>
              <p className="space-x-4">
                <span className="font-medium">Payment Provider :</span>
                <span>{order.paymentMethod.provider}</span>
              </p>
              <p className="space-x-4">
                <span className="font-medium">Amount :</span>
                <span>{formatNumber(order.total, "vn")} VND</span>
              </p>
              <div className="space-x-4">
                <span className="font-medium">Payment Status :</span>
                <span>
                  <PaymentStatus value={order.paymentStatus} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentStatus({ value }) {
  const p = (value === "UNPAID" && {
    color: "warning",
    icon: <i className="fa-solid fa-sack-xmark"></i>,
  }) ||
    (value === "PROCESSING" && {
      color: "info",
      icon: <i className="fa-regular fa-clock"></i>,
    }) ||
    (value === "PAID" && {
      color: "success",
      icon: <i className="fa-solid fa-money-bill"></i>,
    }) || { color: "error", icon: <i className="fa-solid fa-xmark"></i> };

  return (
    <Chip
      label={`${value}`}
      color={p.color}
      className="w-[150px]"
      icon={p.icon}
      variant="outlined"
    />
  );
}

PaymentStatus.propTypes = {
  value: PropTypes.string,
};

function getRowId(row) {
  return row.id;
}

export async function loader({ params: { id } }) {
  const res = {};
  res.order = await fetchOrder(id);
  res.customer = await fetchCustomerByEmail(res.order.email);
  console.log(res.customer);
  if (res.order.error || res.customer.error) new Response(res.error);
  return res;
}

export async function action({ request, params: { id } }) {
  const data = Object.fromEntries(await request.formData());
  if (data.type === "status") {
    await updateOrderStatus(id, data.status);
  }
  return null;
}
export default OrderDetails;
