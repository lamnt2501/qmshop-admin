import {
  Box,
  Chip,
  Dialog,
  DialogTitle,
  MenuItem,
  Select,
  Snackbar,
  Stack,
} from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  useGridApiContext,
  useGridApiRef,
} from "@mui/x-data-grid";
import { faker } from "@faker-js/faker";
import { formatDate } from "../../utils/utils";
import { formatNumber } from "chart.js/helpers";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const baseColumnDef = { headerAlign: "center", align: "center", minWidth: 150 };
const columns = [
  {
    ...baseColumnDef,
    field: "id",
    headerName: "Order ID",
    renderCell: ({ value }) => {
      return <Link to={`/orders/${value}`}>{value}</Link>;
    },
    width: 90,
  },
  {
    ...baseColumnDef,
    align: "left",
    field: "customerName",
    headerName: "Customer Name",
  },
  {
    ...baseColumnDef,
    field: "date",
    type: "date",
    headerName: "Date",
    valueFormatter: (value) => {
      return formatDate(
        value,
        { day: "2-digit", month: "2-digit", year: "numeric" },
        "vn",
      );
    },
  },

  {
    ...baseColumnDef,
    field: "status",
    type: "singleSelect",
    resizable: false,
    valueOptions: ["WAITING", "APPROVED", "SHIPPING", "SUCCESS", "CANCEL"],
    headerName: "Order Status",
    renderCell: function ({ value }) {
      return renderOrderStatusCell(value);
    },
    renderEditCell: (params) => {
      return RenderOrderStatusEditCell(params);
    },
    editable: true,
  },
  {
    ...baseColumnDef,
    field: "amount",
    type: "number",
    headerName: "Amount",
    valueFormatter: (value) => {
      return `${formatNumber(value, "vn")} VND`;
    },
  },
  {
    ...baseColumnDef,
    width: 200,
    field: "paymentStatus",
    resizable: false,
    headerName: "Payment Status",
    renderCell: ({ value }) => {
      const props = (value === "UNPAID" && {
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
          color={props.color}
          className="w-[150px]"
          icon={props.icon}
          variant="outlined"
        />
      );
    },
  },
];

const rows = "0"
  .repeat(100)
  .split("")
  .map((_, i) => {
    return {
      id: i + 1,
      customerName: faker.person.fullName(),
      date: faker.date.between({
        from: "2024-01-01T00:00:00.000Z",
        to: new Date().toUTCString(),
      }),
      amount: Math.floor(Math.random() * 1000000) + 100000,
      status: ["WAITING", "APPROVED", "SHIPPING", "SUCCESS", "CANCEL"][
        Math.floor(Math.random() * 5)
      ],
      paymentStatus: ["PAID", "UNPAID", "PROCESSING", "CANCEL"][
        Math.floor(Math.random() * 4)
      ],
    };
  });

function OrderDashboard() {
  const apiRef = useGridApiRef();
  const navigate = useNavigate();
  return (
    <div className="space-y-4">
      <Box sx={{ height: "500px", width: "100%", backgroundColor: "white" }}>
        <DataGrid
          apiRef={apiRef}
          rows={rows}
          columns={columns}
          disableColumnFilter
          density="comfortable"
          disableColumnSelector
          disableRowSelectionOnClick
          disableDensitySelector
          onCellClick={(params) => {
            if (params.colDef.editable && params.cellMode === "view")
              apiRef.current.startCellEditMode({
                id: params.id,
                field: params.field,
              });
          }}
          processRowUpdate={(newRow, oldRow) => {
            return newRow;
          }}
          onProcessRowUpdateError={(err) => {
            console.log(err ? "yes" : "no");
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          initialState={{
            sorting: { sortModel: [{ field: "date", sort: "desc" }] },
          }}
        />
      </Box>
    </div>
  );
}

function renderOrderStatusCell(value) {
  const props = (value === "WAITING" && {
    color: "warning",
    icon: <i className="fa-regular fa-clock"></i>,
  }) ||
    (value === "APPROVED" && {
      color: "info",
      icon: <i className="fa-solid fa-check-double"></i>,
    }) ||
    (value === "SHIPPING" && {
      color: "secondary",
      icon: <i className="fa-solid fa-truck-fast"></i>,
    }) ||
    (value === "SUCCESS" && {
      color: "success",
      icon: <i className="fa-regular fa-circle-check"></i>,
    }) || {
      color: "error",
      icon: <i className="fa-solid fa-ban"></i>,
    };

  return (
    <Chip
      label={`${value}`}
      color={props.color}
      className="w-[130px] space-x-1"
      variant="outlined"
      icon={props.icon}
    />
  );
}

function RenderOrderStatusEditCell({
  id,
  value,
  field,
  colDef: { valueOptions },
}) {
  const apiRef = useGridApiContext();
  const renderOptions =
    value !== "SUCCESS" && value !== "CANCEL"
      ? valueOptions.slice(valueOptions.indexOf(value))
      : [value];
  function handleChange(e) {
    apiRef.current.setEditCellValue({ id, value: e.target.value, field });
    apiRef.current.stopCellEditMode({ id, field });
  }
  return (
    <Select defaultOpen={true} value={value} onChange={handleChange}>
      {renderOptions.map((v, i) => (
        <MenuItem value={v} disabled={value === v} key={v}>
          {renderOrderStatusCell(v)}
        </MenuItem>
      ))}
    </Select>
  );
}

export default OrderDashboard;
