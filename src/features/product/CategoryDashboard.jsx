import { Form, useLoaderData } from "react-router-dom";
import { categoryApi, fetchCategories } from "../../apis/categoryApi";
import { BASE_COL_DEF } from "../../configs/dataGridConfig";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

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
    editable: true,
    flex: 1,
  },
  {
    ...BASE_COL_DEF,
    field: "slug",
    headerName: "Slug",
    editable: true,
    flex: 1,
  },
  {
    ...BASE_COL_DEF,
    field: "description",
    headerName: "Description",
    editable: true,
    flex: 1,
  },
];

const buildRows = (categories) =>
  categories.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description,
  }));

function CategoryDashboard() {
  const { categories } = useLoaderData();
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-4">
      <div>
        <button
          className="rounded-md bg-main px-4 py-3 text-white"
          onClick={() => setOpen(true)}
        >
          New Category
        </button>
        <Dialog open={open}>
          <DialogTitle>New Category</DialogTitle>
          <DialogContent>
            <Form className="space-y-4" method="post">
              <TextField name="name" label="Name" fullWidth />
              <TextField name="description" label="Description" fullWidth />
              <div className="space-x-4">
                <button
                  className="rounded-md bg-green-600 px-4 py-3 text-white"
                  onClick={() => setOpen(false)}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="rounded-md bg-red-600 px-4 py-3 text-white"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <Box
        width="100%"
        height={500}
        sx={{
          backgroundColor: "white",
        }}
      >
        <DataGrid columns={columns} rows={buildRows(categories)} />
      </Box>
    </div>
  );
}

export async function loader() {
  const categories = await fetchCategories();
  if (categories.error) throw new Response(categories.error.message);
  return { categories };
}

export async function action({ request }) {
  const res = await categoryApi(
    "post",
    "/categories",
    await request.formData(),
  );
  console.log(res);
  if (res.error) throw new Response(res.error.message);
  return null;
}

export default CategoryDashboard;
