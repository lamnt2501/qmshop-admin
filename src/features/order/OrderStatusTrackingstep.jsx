import { Avatar, Step, StepLabel } from "@mui/material";
import formatDate from "../../utils/formatDate";
import PropTypes from "prop-types";
const labelMap = {
  WAITING: "Order Placed",
  APPROVED: "Processed",
  SHIPPING: "Shipping",
  SUCCEEDED: "Delivered",
  CANCEL: "Cancel",
};
export default function OrderStatusTrackingStep({ tracking, completed }) {
  const iconStyle = completed
    ? {
        backgroundColor: tracking.status !== "CALCEL" ? "#68db7f" : "red",
      }
    : {
        color: "#68db7f",
        backgroundColor: "#f1f6fa",
      };
  return (
    <Step>
      <StepLabel
        StepIconComponent={() => {
          const icon = (tracking.status === "WAITING" && (
            <i className="fa-regular fa-clock"></i>
          )) ||
            (tracking.status === "APPROVED" && (
              <i className="fa-solid fa-check-double"></i>
            )) ||
            (tracking.status === "SHIPPING" && (
              <i className="fa-solid fa-truck-fast"></i>
            )) ||
            (tracking.status === "SUCCEEDED" && (
              <i className="fa-regular fa-circle-check"></i>
            )) || <i className="fa-solid fa-ban"></i>;

          return (
            <Avatar
              sx={{
                fontSize: "16px",
                ...iconStyle,
              }}
            >
              {icon}
            </Avatar>
          );
        }}
      >
        <div className="space-y-2">
          <p className="space-x-4">
            <span className="font-semibold text-slate-500">
              {labelMap[tracking.status]}
            </span>
            {completed && (
              <span>
                {formatDate(
                  new Date(tracking.time),
                  {
                    dateStyle: "long",
                  },
                  "en-Us",
                )}
              </span>
            )}
          </p>
          {completed && <p>{tracking.message}</p>}
        </div>
      </StepLabel>
    </Step>
  );
}

OrderStatusTrackingStep.propTypes = {
  tracking: PropTypes.object,
  completed: PropTypes.bool,
};
