import { Alert, Snackbar } from "@mui/material";
import PropTypes from "prop-types";
function Message({
  children,
  onClose,
  open = false,
  autoHideDuration = 2000,
  severity = "success",
  variant = "filled",
}) {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Alert
        severity={severity}
        variant={variant}
        onClose={onClose}
        sx={{ width: "100%" }}
      >
        {children}
      </Alert>
    </Snackbar>
  );
}

Message.propTypes = {
  children: PropTypes.any,
  onClose: PropTypes.func,
  autoHideDuration: PropTypes.number,
  open: PropTypes.bool,
  severity: PropTypes.string,
  variant: PropTypes.string,
};
export default Message;
