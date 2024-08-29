import { Box, Chip } from "@mui/material";
import { DataGrid, GridToolbar, useGridApiRef } from "@mui/x-data-grid";
import { formatDate } from "../../utils/utils";
import { formatNumber } from "chart.js/helpers";
import { useMemo, useState } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { fetchOrders } from "../../apis/orderApi";
import { BASE_COL_DEF } from "../../configs/dataGridConfig";
import { fetchOrderSummary } from "../../apis/dashboardApi";

const columns = [
  {
    ...BASE_COL_DEF,
    field: "id",
    headerName: "Order ID",
    width: 90,
  },
  {
    ...BASE_COL_DEF,
    align: "left",
    field: "customerName",
    headerName: "Customer Name",
  },
  {
    ...BASE_COL_DEF,
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
    ...BASE_COL_DEF,
    field: "status",
    type: "singleSelect",
    resizable: false,
    valueOptions: ["WAITING", "APPROVED", "SHIPPING", "SUCCEEDED", "CANCEL"],
    headerName: "Order Status",
    renderCell: function ({ value }) {
      return renderOrderStatusCell(value);
    },
    // renderEditCell: (params) => {
    //   return RenderOrderStatusEditCell(params);
    // },
    // editable: true,
  },
  {
    ...BASE_COL_DEF,
    field: "amount",
    type: "number",
    headerName: "Amount",
    valueFormatter: (value) => {
      return `${formatNumber(value, "vn")} VND`;
    },
  },
  {
    ...BASE_COL_DEF,
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

const buildRows = (data) =>
  data?.map((order) => {
    return {
      id: order.orderId,
      customerName: order.customerName,
      date: new Date(order.createdAt),
      amount: order.total,
      status: order.status,
      paymentStatus: order.paymentStatus,
    };
  });

function OrderDashboard() {
  const apiRef = useGridApiRef();
  const { orders, orderSummary } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  const initialDataGridState = useMemo(() => {
    return {
      sorting: { sortModel: [{ field: "date", sort: "desc" }] },
    };
  }, []);
  console.log(orderSummary.totalOrder);
  return (
    <div className="space-y-4">
      <div className=""></div>
      <Box sx={{ height: "500px", width: "100%", backgroundColor: "white" }}>
        <DataGrid
          apiRef={apiRef}
          rows={buildRows(orders)}
          columns={columns}
          disableColumnFilter
          density="comfortable"
          disableColumnSelector
          disableRowSelectionOnClick
          disableDensitySelector
          initialState={initialDataGridState}
          onRowClick={({ row: { id } }) => navigate(`/orders/${id}`)}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          sx={{
            "& .MuiDataGrid-row:hover": {
              cursor: "pointer",
            },
          }}
          rowCount={orderSummary.totalOrder}
          onRowCountChange={(rc) => apiRef.current.setRowCount(rc)}
          pageSizeOptions={[10, 20, 30, 50, 100]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={(params) => {
            setPaginationModel(params);
            setSearchParams((s) => {
              s.set("page", params.page + 1);
              s.set("limit", params.pageSize);
              return s;
            });
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
    (value === "SUCCEEDED" && {
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

// function RenderOrderStatusEditCell({
//   id,
//   value,
//   field,
//   colDef: { valueOptions },
// }) {
//   const apiRef = useGridApiContext();
//   const renderOptions =
//     value !== "SUCCEEDED" && value !== "CANCEL"
//       ? valueOptions.slice(valueOptions.indexOf(value))
//       : [value];
//   function handleChange(e) {
//     apiRef.current.setEditCellValue({ id, value: e.target.value, field });
//     apiRef.current.stopCellEditMode({ id, field });
//   }
//   return (
//     <Select defaultOpen={true} value={value} onChange={handleChange}>
//       {renderOptions.map((v, i) => (
//         <MenuItem value={v} disabled={value === v} key={v}>
//           {renderOrderStatusCell(v)}
//         </MenuItem>
//       ))}
//     </Select>
//   );
// }

export async function loader({ request }) {
  const orders = await fetchOrders(request.url.split("?")[1]);
  const orderSummary = await fetchOrderSummary();

  if (orders.error || orderSummary.error)
    throw new Response("Some thing went wrong!", { status: 400 });
  return { orders, orderSummary };
}

export default OrderDashboard;
