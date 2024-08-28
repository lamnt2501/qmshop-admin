import { Avatar, Box, Chip, Rating } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useLoaderData, useNavigate } from "react-router-dom";

import { fetchProducts } from "../../apis/productApi";
import { BASE_COL_DEF } from "../../configs/dataGridConfig";
import { formatDate } from "../../utils/utils";

const columns = [
  {
    ...BASE_COL_DEF,
    field: "id",
    headerName: "Product ID",
    width: 90,
  },
  {
    ...BASE_COL_DEF,
    align: "left",
    field: "name",
    // flex: 1,
    minWidth: 400,
    headerName: "Product Name",
    renderCell: ({ value }) => {
      return (
        <div className="flex h-full w-full items-center space-x-4">
          <Avatar src={value.image} variant="rounded"></Avatar>
          <p className="font-medium">{value.name}</p>
        </div>
      );
    },
  },

  {
    ...BASE_COL_DEF,
    field: "brand",
    headerName: "Brand",
    resizable: false,
  },
  {
    ...BASE_COL_DEF,
    field: "rating",
    type: "number",
    headerName: "Rating",
    renderCell: ({ value }) => {
      return <Rating name="read-only" value={value} readOnly />;
    },
  },
  {
    ...BASE_COL_DEF,
    width: 200,
    field: "category",
    flex: 1,
    headerName: "Category",
    renderCell: ({ value }) => {
      return (
        <div className="space-x-2">
          {value.map((value) => (
            <Chip
              label={`${value}`}
              key={value}
              size="small"

              //   className="w-[150px]"
              //   variant="outlined"
            />
          ))}
        </div>
      );
    },
  },
  {
    ...BASE_COL_DEF,
    type: "date",
    field: "date",
    headerName: "Published",
    valueFormatter: (value) => {
      return formatDate(value, { dateStyle: "full" }, "en");
    },
  },
];

const buildRows = (products) =>
  products.map((p) => ({
    name: { name: p.name, image: p.images[0].url },
    id: p.id,
    date: new Date(p.createdAt),
    brand: p.brand,
    rating: Math.floor(Math.random() * 6),
    // p.avgRatings,
    category: p.categories,
  }));
function getRowId(row) {
  return row.id;
}

function ProductDashboard() {
  const { products } = useLoaderData();
  const navigate = useNavigate();
  return (
    <Box width="100%" height="500px" sx={{ backgroundColor: "white" }}>
      <DataGrid
        columns={columns}
        density="comfortable"
        rows={buildRows(products)}
        getRowId={getRowId}
        hideFooter
        disableColumnSelector
        columnVisibilityModel={{
          id: false,
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: "date", sort: "desc" }],
          },
        }}
        onRowClick={({ id }) => {
          navigate(`/products/${id}`);
        }}
      />
    </Box>
  );
}

export async function loader() {
  const products = await fetchProducts();
  console.log(products[0]);
  if (products.error) throw new Response(products.error, { status: 400 });
  return { products };
}

export default ProductDashboard;
