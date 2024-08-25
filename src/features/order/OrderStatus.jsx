import { Chip } from "@mui/material";
import PropTypes from "prop-types";
export default function OrderStatus({ status }) {
  const p = (status === "WAITING" && {
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
      color={p.color}
      className="w-[130px] space-x-1"
      variant="outlined"
      icon={p.icon}
    />
  );
}

OrderStatus.propTypes = { status: PropTypes.string };
