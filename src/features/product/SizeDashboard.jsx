import { Form, useLoaderData } from "react-router-dom";
import { createSize, fetchSizes, updateSize } from "../../apis/sizeApi";
import { BASE_COL_DEF } from "../../configs/dataGridConfig";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { useState } from "react";

const columns = [
  {
    ...BASE_COL_DEF,
    field: "id",
    headerName: "ID",
  },
  {
    ...BASE_COL_DEF,
    field: "size",
    headerName: "Size",
    align: "left",
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

const buildRows = (sizes) =>
  sizes.map((s) => ({
    id: s.id,
    size: s.size,
    description: s.description,
  }));

function SizeDashboard() {
  const { sizes } = useLoaderData();
  const apiRef = useGridApiRef();
  const [open, setOpen] = useState(false);

  function handleClose() {
    setOpen(false);
  }
  return (
    <div className="space-y-4">
      <div className="">
        <button
          className="rounded-md bg-main px-4 py-3 text-white"
          onClick={() => setOpen(true)}
        >
          New Size
        </button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Size</DialogTitle>
          <DialogContent>
            <Form className="space-y-4" method="post">
              <TextField name="size" label="Size" fullWidth required />
              <TextField name="description" label="Description" fullWidth />
              <div className="space-x-4">
                <button
                  className="rounded-md bg-green-600 px-4 py-3 text-white"
                  onClick={handleClose}
                >
                  Submit
                </button>
                <button
                  className="rounded-md bg-red-600 px-4 py-3 text-white"
                  type="button"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <Box width="100%" height={500} sx={{ backgroundColor: "white" }}>
        <DataGrid
          apiRef={apiRef}
          columns={columns}
          rows={buildRows(sizes)}
          onCellClick={(params) => {
            if (params.colDef.editable && params.cellMode === "view") {
              apiRef.current.startCellEditMode({
                id: params.id,
                field: params.field,
              });
            }
          }}
          processRowUpdate={async (newRow, oldRow) => {
            if (
              newRow.size === oldRow.size &&
              newRow.description === oldRow.description
            )
              return oldRow;

            const res = await updateSize(
              newRow.id,
              newRow.size,
              newRow.description,
            );

            if (res.error) {
              throw new Error(res.error.message);
            }

            return newRow;
          }}
          onProcessRowUpdateError={(error) => {
            console.log(error);
          }}
        />
      </Box>
    </div>
  );
}

export async function loader() {
  const sizes = await fetchSizes();
  if (sizes.error) throw new Response(sizes.error.message);
  return { sizes };
}

export async function action({ request }) {
  const data = Object.fromEntries(await request.formData());
  const size = await createSize(data.size, data.description);
  if (size.error) throw new Response(size.error.message);
  return size;
}
export default SizeDashboard;
