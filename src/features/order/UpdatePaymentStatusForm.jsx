import { Chip, MenuItem, Select, TextField } from "@mui/material";
import { Form, useLoaderData } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";

const paymentStatus = ["UNPAID", "PAID", "CANCEL"];

function UpdatePaymentStatusForm() {
  const { order } = useLoaderData("orderDetails");
  const [newStatus, setNewStatus] = useState(order.paymentStatus);
  const open = newStatus !== order.paymentStatus;
  return (
    <Form
      className={`${open ? "mx-auto mt-4 flex max-w-[50%] flex-col justify-center space-y-4" : "ml-4 inline-block"}`}
      method="post"
    >
      {order.paymentStatus !== "UNPAID" ? (
        <PaymentStatus value={order.paymentStatus} />
      ) : (
        <Select
          value={newStatus}
          variant="standard"
          disableUnderline
          name="status"
          onChange={(e) => {
            setNewStatus(e.target.value);
          }}
        >
          {paymentStatus.map((s) => (
            <MenuItem key={s} value={s}>
              <PaymentStatus value={s} />
            </MenuItem>
          ))}
        </Select>
      )}
      {open && (
        <>
          <TextField variant="standard" required label="Message" />
          <div className="flex space-x-4">
            <button
              className="rounded-md bg-main px-4 py-2 text-white"
              name="type"
              value={"Payment Status"}
            >
              Update
            </button>
            <button
              className="rounded-md bg-red-600 px-4 py-2 text-white"
              onClick={(e) => {
                e.preventDefault();
                setNewStatus(order.paymentStatus);
              }}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </Form>
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

export default UpdatePaymentStatusForm;
