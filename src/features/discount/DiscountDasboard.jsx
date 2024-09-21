import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { fetchDiscounts } from "../../apis/discountApi";
import { useLoaderData, useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
const columns = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    align: "left",
    field: "code",
    headerName: "Code",
    flex: 1,
  },
  {
    field: "type",
    headerName: "Type",
    flex: 1,
  },
  {
    field: "value",
    type: "Value",
    headerName: "Value",
    flex: 1,
    renderCell: ({ row, value }) => {
      if (row.type === "percent") return value + "%";
      return value + " VND";
    },
  },
  {
    field: "maxUsage",
    headerName: "Max Usage",
    flex: 1,
  },
  {
    type: "date",
    field: "endDate",
    headerName: "End Date",
    flex: 1,
  },
  {
    type: "date",
    field: "startDate",
    headerName: "Start Date",
    flex: 1,
  },
  {
    field: "active",
    headerName: "Active",
    flex: 1,
  },
];

const buildRows = (discounts) =>
  discounts.map((d) => ({
    id: d.id,
    code: d.name,
    value: d.value,
    type: d.type,
    startDate: new Date(d.startAt),
    endDate: new Date(d.endAt),
    active: true,
    maxUsage: d.maxUsage,
  }));
function DiscountDasboard() {
  useTitle("Discount Dashboard");
  const { discounts } = useLoaderData();
  const navigate = useNavigate();
  console.log(discounts);
  return (
    <div className="space-y-4">
      <div>
        <button
          className="rounded-md bg-main px-4 py-2 text-white"
          onClick={() => navigate("new")}
        >
          New Discount
        </button>
      </div>
      <Box
        width="100%"
        height={500}
        sx={{
          backgroundColor: "white",
        }}
      >
        <DataGrid
          columns={columns}
          rows={buildRows(discounts)}
          columnVisibilityModel={{ id: false }}
        />
      </Box>
    </div>
  );
}

export async function loader() {
  const discounts = await fetchDiscounts();
  if (discounts.error) throw new Response(discounts.error.message);
  return { discounts };
}
export default DiscountDasboard;
