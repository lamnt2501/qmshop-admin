import { MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { Form, useRouteLoaderData } from "react-router-dom";
import OrderStatus from "./OrderStatus";
const valueOptions = ["WAITING", "APPROVED", "SHIPPING", "SUCCEEDED", "CANCEL"];

export default function UpdateStatusForm() {
  const {
    order: { status },
  } = useRouteLoaderData("orderDetails");
  const [message, setMessage] = useState("");
  const [newStatus, setNewStatus] = useState(status);

  const renderOptions =
    status !== "SUCCEEDED" && status !== "CANCEL"
      ? valueOptions.slice(valueOptions.indexOf(status))
      : [status];

  return (
    <Form className="flex items-center space-x-4" method="patch">
      <p className="font-medium">Update Status</p>
      <Select
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
        variant="standard"
        disableUnderline
      >
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
