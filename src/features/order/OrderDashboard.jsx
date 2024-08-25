import { Box, Chip } from "@mui/material";
import { DataGrid, GridToolbar, useGridApiRef } from "@mui/x-data-grid";
import { formatDate } from "../../utils/utils";
import { formatNumber } from "chart.js/helpers";
import { useEffect, useMemo } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { fetchOrders } from "../../apis/orderApi";
import { useDispatch } from "react-redux";
import { dataLoaded } from "../../states/slices/orderSlice";
import { BASE_COL_DEF } from "../../configs/dataGridConfig";

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
  const data = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const paginationModel = useMemo(() => {
    return { page: 0, pageSize: 10 };
  }, []);

  const initialDataGridState = useMemo(() => {
    return {
      sorting: { sortModel: [{ field: "date", sort: "desc" }] },
    };
  }, []);

  useEffect(() => {
    if (data && !data?.error) dispatch(dataLoaded());
  }, [data]);

  return (
    <div className="space-y-4">
      <Box sx={{ height: "500px", width: "100%", backgroundColor: "white" }}>
        <DataGrid
          apiRef={apiRef}
          rows={buildRows(data)}
          columns={columns}
          disableColumnFilter
          density="comfortable"
          disableColumnSelector
          disableRowSelectionOnClick
          disableDensitySelector
          paginationModel={paginationModel}
          initialState={initialDataGridState}
          pageSizeOptions={[10, 20]}
          // onCellClick={(params) => {
          //   if (params.colDef.editable && params.cellMode === "view")
          //     apiRef.current.startCellEditMode({
          //       id: params.id,
          //       field: params.field,
          //     });
          // }}
          // processRowUpdate={async (newRow, oldRow) => {
          //   if (newRow.status === oldRow.status) return oldRow;
          //   const res = await updateOrderStatus(newRow.id, newRow.status);
          //   setSnackBarSate((s) => {
          //     return { ...s, open: true, content: "Order Update Success!" };
          //   });
          //   if (res.error) throw new Error(res.error.response?.data?.message);
          //   return newRow;
          // }}
          // onProcessRowUpdateError={(err) => {
          //   setSnackBarSate((s) => {
          //     return { ...s, open: true, content: err.message };
          //   });
          // }}
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

export async function loader() {
  const res = await fetchOrders();
  if (res.error) throw res.error;
  return res;
}

export default OrderDashboard;
