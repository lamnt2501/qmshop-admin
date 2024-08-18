import { Divider, List } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import formatDate from "../utils/formatDate";
import ProductBestSellerItem from "./ProductBestSellerItem";

function ProductBestSellerList() {
  const [date, setDate] = useState(null);
  return (
    <div className="rounded-md bg-white">
      <div className="px-4 py-4 xl:flex xl:items-center xl:justify-between">
        <p className="mb-4 text-center text-lg font-semibold xl:mb-0 xl:text-[24px]">
          <span>Best Seller</span>{" "}
          <span className="text-sm text-stone-400 xl:block">
            {date
              ? `Of ${formatDate(date, { month: "long", year: "numeric" })}`
              : "Of All Time"}
          </span>
        </p>
        <div className="text-center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              disableFuture
              views={["year", "month"]}
              value={date}
              onChange={(e) => {
                setDate(e);
              }}
              label="Pick a year and a month"
              slotProps={{
                field: {
                  clearable: true,
                },
              }}
            />
          </LocalizationProvider>
        </div>
      </div>
      <Divider />
      <List disablePadding>
        {[0, 0, 0, 0, 0, 0, 0, 0].map((_, i, arr) => (
          <ProductBestSellerItem key={i} divider={i < arr.length - 1} />
        ))}
      </List>
    </div>
  );
}

export default ProductBestSellerList;
