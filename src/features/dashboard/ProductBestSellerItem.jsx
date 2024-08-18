import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

function ProductBestSellerItem({ divider, item }) {
  return (
    <>
      <Link to="/products">
        <ListItem className="flex rounded-md hover:bg-slate-50">
          <ListItemAvatar>
            <Avatar
              variant="rounded"
              src="https://dash-tail.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimg-4.78071470.png&w=96&q=75"
              alt="Avatar"
            />
          </ListItemAvatar>
          <ListItemText primary="Apple Watch" secondary="$120" />
          <ListItemText secondary="342 sales" sx={{ textAlign: "end" }} />
        </ListItem>
      </Link>
      {divider && <Divider />}
    </>
  );
}

export default ProductBestSellerItem;
