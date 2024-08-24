import {
  Form,
  Link,
  useLoaderData,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import { fetchOrder, updateOrderStatus } from "../../apis/orderApi";
import { DataGrid } from "@mui/x-data-grid";
import { BASE_COL_DEF } from "../../configs/dataGridConfig";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Input,
  MenuItem,
  Select,
  Step,
  StepIcon,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import { formatDate, formatNumber } from "../../utils/utils";
import { useState } from "react";

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
  const order = useLoaderData();
  const subTotal = order.items.reduce(
    (pre, cur) => pre + cur.price * cur.quantity,
    0,
  );
  console.log(order.tracking);
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
                <span>Sub Total: </span>
                <span>{formatNumber(subTotal)} VND</span>
              </p>
              <p className="flex justify-between py-4 font-medium">
                <span>Discount: </span>
                <span>- {0} VND</span>
              </p>
              <Divider />
              <p className="flex justify-between pt-4 font-medium">
                <span>Total: </span>
                <span>{formatNumber(subTotal)} VND</span>
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-md bg-white p-4">
          <div className="flex justify-between">
            <div className="flex items-center space-x-4 font-semibold">
              <span>Order Status</span>{" "}
              {/* <span>
                <OrderStatus status={order.status} />
              </span> */}
            </div>
            <UpdateStatusForm curStatus={order.status} />
          </div>
          <Stepper activeStep={order.tracking.length} alternativeLabel>
            {order.tracking.map((t) => {
              const props = (t.status === "WAITING" && {
                color: "warning",
                icon: <i className="fa-regular fa-clock"></i>,
              }) ||
                (t.status === "APPROVED" && {
                  color: "info",
                  icon: <i className="fa-solid fa-check-double"></i>,
                }) ||
                (t.status === "SHIPPING" && {
                  color: "secondary",
                  icon: <i className="fa-solid fa-truck-fast"></i>,
                }) ||
                (t.status === "SUCCEEDED" && {
                  color: "success",
                  icon: <i className="fa-regular fa-circle-check"></i>,
                }) || {
                  color: "error",
                  icon: <i className="fa-solid fa-ban"></i>,
                };

              return (
                <Step key={t.status}>
                  <StepLabel>{t.status}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>
      </div>
      <div>2</div>
    </div>
  );
}

function getRowId(row) {
  return row.id;
}

function UpdateStatusForm() {
  const { status, id } = useRouteLoaderData("orderDetails");
  const [message, setMessage] = useState("");
  const [newStatus, setNewStatus] = useState(status);

  const renderOptions =
    status !== "SUCCEEDED" && status !== "CANCEL"
      ? valueOptions.slice(valueOptions.indexOf(status))
      : [status];

  return (
    <Form className="flex items-center space-x-4" method="patch">
      <p className="font-medium">Update Status</p>
      <Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
        {renderOptions.map((s) => (
          <MenuItem value={s} key={s}>
            <OrderStatus status={s} />
          </MenuItem>
        ))}
      </Select>
      <input type="hidden" name="status" value={newStatus} />
      <input type="hidden" name="message" value={message} />
      {newStatus !== status && (
        <>
          <TextField
            variant="standard"
            label="Message"
            onChange={(e) => setMessage(e.target.value)}
            required={newStatus === "CANCEL"}
          />
          <button
            name="type"
            value="status"
            className="rounded-md bg-main p-2 font-medium uppercase text-white"
          >
            Update
          </button>
        </>
      )}
    </Form>
  );
}

function OrderStatus({ status }) {
  const props = (status === "WAITING" && {
    color: "warning",
    icon: <i className="fa-regular fa-clock"></i>,
  }) ||
    (status === "APPROVED" && {
      color: "info",
      icon: <i className="fa-solid fa-check-double"></i>,
    }) ||
    (status === "SHIPPING" && {
      color: "secondary",
      icon: <i className="fa-solid fa-truck-fast"></i>,
    }) ||
    (status === "SUCCEEDED" && {
      color: "success",
      icon: <i className="fa-regular fa-circle-check"></i>,
    }) || {
      color: "error",
      icon: <i className="fa-solid fa-ban"></i>,
    };

  return (
    <Chip
      label={`${status}`}
      color={props.color}
      className="w-[130px] space-x-1"
      variant="outlined"
      icon={props.icon}
    />
  );
}

export async function loader({ params: { id } }) {
  const res = await fetchOrder(id);

  if (res.error) throw res.error;
  return res;
}

export async function action({ request, params: { id } }) {
  const data = Object.fromEntries(await request.formData());
  console.log(data);
  if (data.type === "status") {
    // await updateOrderStatus(id, data.status);
  }
  return null;
}
export default OrderDetails;
