import { Avatar, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { fetchCustomers } from "../../apis/customerApi";
import { BASE_COL_DEF } from "../../configs/dataGridConfig";
import { useLoaderData, useNavigate } from "react-router-dom";

const columns = [
  {
    ...BASE_COL_DEF,
    field: "id",
    headerName: "ID",
  },
  {
    ...BASE_COL_DEF,
    field: "name",
    headerName: "Name",
    align: "left",
    // editable: true,
    flex: 1,
    renderCell: ({ value }) => {
      return (
        <div className="flex items-center space-x-4">
          <Avatar
            src={value.avt}
            sx={{
              backgroundColor: ["orangered", "pink", "green", "blue", "maroon"][
                Math.floor(Math.random() * 5)
              ],
            }}
          >
            {value.name.split(" ").at(-1)[0]}
          </Avatar>
          <p>{value.name}</p>
        </div>
      );
    },
  },
  {
    ...BASE_COL_DEF,
    field: "email",
    headerName: "Email",
    // editable: true,
    flex: 1,
  },
  {
    ...BASE_COL_DEF,
    field: "phone",
    headerName: "Phone",
    // editable: true,
    flex: 1,
  },
];

const buildRows = (customers) =>
  customers.map((c) => ({
    id: c.id,
    name: { name: c.name, avt: c.avtUrl },
    email: c.email,
    phone: c.phone,
  }));

function CustomerDashboard() {
  const { customers } = useLoaderData();
  const naviagte = useNavigate();
  return (
    <div>
      <Box
        width="100%"
        height={500}
        sx={{
          backgroundColor: "white",
        }}
      >
        <DataGrid
          columns={columns}
          rows={buildRows(customers)}
          onRowClick={(params) => naviagte(`/customers/${params.id}`)}
        />
      </Box>
    </div>
  );
}

export async function loader() {
  const customers = await fetchCustomers();

  if (customers.error) throw new Response(customers.error.message);
  return { customers };
}
export default CustomerDashboard;
