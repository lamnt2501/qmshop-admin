import { Avatar, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { fetchCustomers } from "../../apis/customerApi";
import { BASE_COL_DEF } from "../../configs/dataGridConfig";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import useTitle from "../../hooks/useTitle";

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
  useTitle("Customer Dashboard");
  const { customers } = useLoaderData();
  const naviagte = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
    limit: 20,
  });
  const [pagingModel, setPagingModel] = useState({ page: 0, pageSize: 20 });
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
          sx={{
            "& .MuiDataGrid-row:hover": {
              cursor: "pointer",
            },
          }}
          rowCount={100}
          pageSizeOptions={[20, 50, 100]}
          paginationMode="server"
          paginationModel={pagingModel}
          onPaginationModelChange={(model) => {
            setPagingModel(model);
            setSearchParams((m) => ({
              ...m,
              page: model.page + 1,
              limit: model.pageSize,
            }));
          }}
          onRowClick={(params) => naviagte(`/customers/${params.id}`)}
        />
      </Box>
    </div>
  );
}

export async function loader({ request }) {
  const customers = await fetchCustomers(request.url.split("?")[1]);

  if (customers.error) throw new Response(customers.error.message);
  return { customers };
}
export default CustomerDashboard;
