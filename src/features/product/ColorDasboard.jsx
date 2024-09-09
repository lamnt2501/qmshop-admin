import { Form, useLoaderData } from "react-router-dom";
import { createcolor, fetchColors, updateColor } from "../../apis/colorApi";
import { BASE_COL_DEF } from "../../configs/dataGridConfig";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DataGrid, useGridApiContext, useGridApiRef } from "@mui/x-data-grid";
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
    field: "hex",
    headerName: "Hex",
    editable: true,
    flex: 1,
    renderCell: ({ value }) => {
      return <input type="color" value={value} disabled />;
    },
    renderEditCell: function RenderEditCell(params) {
      const apiRef = useGridApiContext();
      return (
        <input
          type="color"
          defaultValue={params.row.hex}
          onChange={(e) => {
            apiRef.current.setEditCellValue({
              id: params.id,
              field: "hex",
              value: e.target.value,
            });
          }}
        ></input>
      );
    },
  },
];

const buildRows = (colors) =>
  colors.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    hex: c.hex,
  }));

function ColorDasboard() {
  useTitle("Color Dashborad");
  const apiRef = useGridApiRef();
  const { colors } = useLoaderData();
  const [open, setOpen] = useState(false);
  function handleClose() {
    setOpen(false);
  }
  return (
    <div className="space-y-4">
      <div>
        <button
          className="rounded-md bg-main px-4 py-3 text-white"
          onClick={() => setOpen(true)}
        >
          New Color
        </button>
        <Dialog open={open}>
          <DialogTitle>New Color</DialogTitle>
          <DialogContent>
            <Form
              method="post"
              className="space-y-4"
              onSubmit={() => {
                handleClose();
              }}
            >
              <TextField name="name" label="name" fullWidth required />
              <TextField
                name="hex"
                label="hex"
                type="color"
                fullWidth
                required
              />
              <div className="space-x-4">
                <button className="rounded-md bg-green-600 px-4 py-3 text-white">
                  Submit
                </button>
                <button
                  className="rounded-md bg-red-600 px-4 py-3 text-white"
                  onClick={handleClose}
                  type="button"
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
          rows={buildRows(colors)}
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
              newRow.name === oldRow.name &&
              newRow.slug === oldRow.slug &&
              newRow.hex === oldRow.hex
            )
              return oldRow;
            const res = await updateColor({
              id: newRow.id,
              name: newRow.name,
              slug: newRow.slug,
              hex: newRow.hex,
            });

            if (res.error) throw new Error(res.error.message);

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
  const colors = await fetchColors();
  if (colors.error) throw new Response(colors.error.message);
  return { colors };
}

export async function action({ request }) {
  const data = Object.fromEntries(await request.formData());
  await createcolor({ name: data.name, hex: data.hex });
  return null;
}
export default ColorDasboard;
