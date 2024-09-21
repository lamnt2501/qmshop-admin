import { Box, Chip } from "@mui/material";
import { DataGrid, GridToolbar, useGridApiRef } from "@mui/x-data-grid";
import { formatDate } from "../../utils/utils";
import { formatNumber } from "chart.js/helpers";
import { useMemo, useState } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { countOrderByStatus, fetchOrders } from "../../apis/orderApi";
import { BASE_COL_DEF } from "../../configs/dataGridConfig";
import { fetchOrderSummary } from "../../apis/dashboardApi";
import useTitle from "../../hooks/useTitle";

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
  const {
    orders,
    orderSummary,
    waitingCount,
    approvedCount,
    shippingCount,
    succeededCount,
    cancelCount,
  } = useLoaderData();
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

  useTitle("Order Dashboard");
  const rowCount = (() => {
    switch (searchParams.get("status")) {
      case "WAITING":
        return waitingCount;
      case "APPROVED":
        return approvedCount;
      case "SHIPPING":
        return shippingCount;
      case "SUCCEEDED":
        return succeededCount;
      case "CANCEL":
        return cancelCount;
      default:
        return orderSummary.totalOrder;
    }
  })();

  return (
    <div className="space-y-4">
      <div className="rounded-md">
        <button
          className="min-w-[100px] space-x-1 rounded-l-md border border-l-gray-100 bg-white px-3 py-2 font-medium hover:scale-[1.1]"
          onClick={() => {
            setSearchParams((s) => {
              s.delete("status", s.get("status"));
              return s;
            });
          }}
        >
          <span>All</span>
          <span>({orderSummary.totalOrder})</span>
        </button>
        <button
          className="min-w-[100px] space-x-1 border border-l-gray-100 bg-white px-3 py-2 font-medium text-yellow-600 hover:scale-[1.1]"
          onClick={() => {
            setSearchParams((s) => {
              s.set("status", "WAITING");
              return s;
            });
          }}
        >
          <span>Pending</span>
          <span>({waitingCount})</span>
        </button>
        <button
          className="min-w-[100px] space-x-1 border border-l-gray-100 bg-white px-3 py-2 font-medium text-blue-600 hover:scale-[1.1]"
          onClick={() => {
            setSearchParams((s) => {
              s.set("status", "APPROVED");
              return s;
            });
          }}
        >
          <span>Approved</span>
          <span>({approvedCount})</span>
        </button>
        <button
          className="min-w-[100px] space-x-1 border border-l-gray-100 bg-white px-3 py-2 font-medium text-purple-600 hover:scale-[1.1]"
          onClick={() => {
            setSearchParams((s) => {
              s.set("status", "SHIPPING");
              return s;
            });
          }}
        >
          <span>Shipping</span>
          <span>({shippingCount})</span>
        </button>
        <button
          className="min-w-[100px] space-x-1 border border-l-gray-100 bg-white px-3 py-2 font-medium text-green-600 hover:scale-[1.1]"
          onClick={() => {
            setSearchParams((s) => {
              s.set("status", "SUCCEEDED");
              return s;
            });
          }}
        >
          <span>Succeed</span>
          <span>({succeededCount})</span>
        </button>
        <button
          className="min-w-[100px] space-x-1 rounded-r-md bg-white px-3 py-2 font-medium text-red-600 hover:scale-[1.1]"
          onClick={() => {
            setSearchParams((s) => {
              s.set("status", "CANCEL");
              return s;
            });
          }}
        >
          <span>Cancel</span>
          <span>({cancelCount})</span>
        </button>
      </div>
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
          rowCount={rowCount}
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
  const waitingCount = (await countOrderByStatus("WAITING")).data;
  const approvedCount = (await countOrderByStatus("APPROVED")).data;
  const shippingCount = (await countOrderByStatus("SHIPPING")).data;
  const succeededCount = (await countOrderByStatus("SUCCEEDED")).data;
  const cancelCount = (await countOrderByStatus("CANCEL")).data;
  console.log(
    waitingCount,
    approvedCount,
    shippingCount,
    succeededCount,
    cancelCount,
  );
  if (orders.error || orderSummary.error)
    throw new Response("Some thing went wrong!", { status: 400 });
  return {
    orders,
    orderSummary,
    waitingCount,
    approvedCount,
    shippingCount,
    succeededCount,
    cancelCount,
  };
}

export default OrderDashboard;
