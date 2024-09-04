import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { createBrand, fetchBrands, updateBrand } from "../../apis/brandApi";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DataGrid, useGridApiContext } from "@mui/x-data-grid";
import { BASE_COL_DEF } from "../../configs/dataGridConfig";
import { useState } from "react";
import PropTypes from "prop-types";

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
  },
  {
    ...BASE_COL_DEF,
    field: "description",
    headerName: "Description",
    editable: true,
    flex: 1,
  },
  {
    ...BASE_COL_DEF,
    field: "image",
    headerName: "",
    editable: true,
    flex: 1,
    renderCell: ({ value }) => {
      return (
        <div className="h-full">
          <img src={value} alt="Brand Image" className="h-full" />
        </div>
      );
    },
    renderEditCell: function RenderEditCell(params) {
      return <EditCell params={params} />;
    },
  },
];

const buildRows = (brands) =>
  brands.map((b) => ({
    id: b.id,
    name: b.name,
    description: b.description,
    image: b.imgUrl,
  }));

function BrandDashboard() {
  const { brands } = useLoaderData();
  const [updateArgs, setUpdateArgs] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const handleUpdate = async () => {
    const { newRow, oldRow, resolve, reject } = updateArgs;
    try {
      resolve(
        await updateBrand({
          id: newRow.id,
          name: newRow.name,
          description: newRow.description,
          image: newRow.image,
        }),
      );
      navigate(0);
    } catch (error) {
      reject(oldRow);
    } finally {
      setUpdateArgs(null);
    }
  };

  const handleCancel = () => {
    const { resolve, oldRow } = updateArgs;
    resolve(oldRow);
    setUpdateArgs(null);
  };

  const renderConfirmDialog = () => {
    if (!updateArgs) return;

    return (
      <Dialog open={!!updateArgs}>
        <DialogTitle>Are you sure to update?</DialogTitle>
        <DialogActions>
          <div className="flex justify-start space-x-4">
            <button
              className="rounded-md bg-green-600 px-4 py-3 text-white"
              onClick={handleUpdate}
            >
              Confirm
            </button>
            <button
              className="rounded-md bg-red-600 px-4 py-3 text-white"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <button
          className="rounded-md bg-main px-4 py-3 text-white"
          onClick={() => setOpen(true)}
        >
          New Brand
        </button>
        <Dialog open={open}>
          <DialogTitle>New Brand</DialogTitle>
          <DialogContent>
            <Form
              className="space-y-4"
              onSubmit={async (e) => {
                const res = await createBrand(new FormData(e.target));
                if (res.error) throw new Error(res.error.message);
                navigate(0);
                e.preventDefault();
              }}
              method="post"
            >
              <TextField label="Name" name="name" fullWidth required />
              <TextField label="Description" name="description" fullWidth />
              <div className="flex justify-between">
                <TextField
                  inputProps={{ accept: ".png, .jpeg, .jpg" }}
                  onChange={(e) => {
                    const reader = new FileReader();
                    reader.onload = (e) => setImage(e.target.result);
                    reader.readAsDataURL(e.target.files[0]);
                  }}
                  type="file"
                  name="image"
                  required
                />
                {image && (
                  <img src={image} alt="Brand Image" className="max-h-[52px]" />
                )}
              </div>
              <div>
                <button className="rounded-md bg-green-600 px-4 py-3 text-white">
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-red-600 px-4 py-3 text-white"
                >
                  Cancel
                </button>
              </div>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      {renderConfirmDialog()}
      <Box width="100%" height={500} sx={{ backgroundColor: "white" }}>
        <DataGrid
          columns={columns}
          rows={buildRows(brands)}
          processRowUpdate={(newRow, oldRow) => {
            if (
              newRow.name === oldRow.name &&
              newRow.description === oldRow.description &&
              newRow.imgUrl === oldRow.imgUrl
            )
              return oldRow;
            return new Promise((resolve, reject) => {
              setUpdateArgs({ newRow, oldRow, resolve, reject });
            });
          }}
          onProcessRowUpdateError={(error) => console.log(error.message)}
        />
      </Box>
    </div>
  );
}

function EditCell({ params }) {
  const { value, id, field } = params;
  const [img, setImg] = useState(value);
  const apiRef = useGridApiContext();

  return (
    <div className="flex">
      <input
        type="file"
        accept=".jpeg, .png, .jpg"
        onChange={(e) => {
          const reader = new FileReader();
          reader.onload = function (e) {
            setImg(e.target.result);
            apiRef.current.setEditCellValue({
              id,
              field,
              value: e.target.result,
            });
          };
          reader.readAsDataURL(e.target.files[0]);
        }}
      />
      <img src={img} alt="brand image" />
    </div>
  );
}

EditCell.propTypes = {
  params: PropTypes.object,
};

export async function loader() {
  const brands = await fetchBrands();
  if (brands.error) throw new Response(brands, brands.error.message);
  return { brands };
}

export default BrandDashboard;
