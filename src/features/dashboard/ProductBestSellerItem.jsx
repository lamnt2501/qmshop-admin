import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { formatNumber } from "../../utils/utils";

function ProductBestSellerItem({ divider, product }) {
  return (
    <>
      <Link to="/products">
        <ListItem className="flex rounded-md hover:bg-slate-50">
          <ListItemAvatar>
            <Avatar
              variant="rounded"
              src={product.imageUrl}
              alt={`${product.name} image`}
            />
          </ListItemAvatar>
          <ListItemText
            primary={product.name}
            secondary={`${formatNumber(product.price)} VND`}
          />
          <ListItemText
            secondary={`${formatNumber(product.sold)} sold`}
            sx={{ textAlign: "end" }}
          />
        </ListItem>
      </Link>
      {divider && <Divider />}
    </>
  );
}

export default ProductBestSellerItem;
