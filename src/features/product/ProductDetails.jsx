import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Form, useLoaderData } from "react-router-dom";
import {
  Chip,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import {
  activeProductById,
  fetchProductyId,
  updateProductById,
} from "../../apis/productApi";
import { fetchRatingsByProductId } from "../../apis/ratingApi";
import { VITE_TINY_MCE_API_KEY } from "../../configs/envConfig";
import useUnload from "../../hooks/useUnload";
import { fetchBrands } from "../../apis/brandApi";
import { fetchCategories } from "../../apis/categoryApi";
import { BASE_COL_DEF } from "../../configs/dataGridConfig";
import { DataGrid } from "@mui/x-data-grid";
import formatNumber from "../../utils/formatNumber";
import useTitle from "../../hooks/useTitle";

const columns = [
  {
    ...BASE_COL_DEF,
    field: "sku",
    headerName: "SKU",
    width: 90,
  },

  {
    ...BASE_COL_DEF,
    field: "color",
    headerName: "Color",
  },

  {
    ...BASE_COL_DEF,
    field: "size",
    type: "Size",
  },
  {
    ...BASE_COL_DEF,
    field: "quantity",
    type: "number",
    headerName: "Quantity",
  },
  {
    ...BASE_COL_DEF,
    field: "price",
    type: "number",
    headerName: "Price",
    // editable: true,
    valueFormatter: (value) => formatNumber(value, "vn") + " VND",
  },
];

const buildRows = (options) =>
  options.map((o) => ({
    sku: o.sku,
    price: o.price,
    quantity: o.quantity,
    color: o.color,
    size: o.size,
  }));

function ProductDetails() {
  const editorRef = useRef(null);
  const { product, ratings, brands, categories } = useLoaderData();
  const [name, setName] = useState(product.name);
  const [active, setActive] = useState(product.active);
  const [categoryId, setCategoryId] = useState(
    categories
      .filter((c) => product.categories.includes(c.name))
      .map((c) => c.id),
  );

  const [editModeOn, setEditModeOn] = useState(false);
  useUnload(editModeOn);
  useTitle(product.name);

  const html = product.description.replace(/(<? *script)/gi, "illegalscript");

  function handlerReset() {
    setName(product.name);
    setCategoryId(
      categories
        .filter((c) => product.categories.includes(c.name))
        .map((c) => c.id),
    );
    setEditModeOn(false);
  }

  function handlerEdit(e) {
    if (!product.active) e.preventDefault();

    if (editModeOn) {
      window.location.href = window.location.href + "";
    }

    setEditModeOn((o) => !o);
  }

  return (
    <div>
      <div className="space-y-4 lg:grid lg:grid-cols-[60%_40%] lg:space-x-4 lg:space-y-0">
        <div className="space-y-4">
          <Form method="patch">
            <div className="space-y-4 rounded-md bg-white p-4">
              <div className="flex justify-end space-x-4">
                <button
                  className="rounded-md bg-main px-4 py-2 text-white"
                  name="edit"
                  value={!editModeOn}
                  onClick={handlerEdit}
                >
                  <i className="fa-regular fa-pen-to-square"></i>
                  <span> Edit</span>
                </button>
                {editModeOn && (
                  <>
                    <button
                      className="space-x-2 rounded-md bg-green-500 px-4 py-2 text-white"
                      name="type"
                      value="update"
                    >
                      <i className="fa-regular fa-floppy-disk"></i>
                      <span>Save</span>
                    </button>
                    <button
                      type="button"
                      className="space-x-2 rounded-md bg-red-500 px-4 py-2 text-white"
                      onClick={handlerReset}
                    >
                      <i className="fa-solid fa-arrow-rotate-left"></i>
                      <span>Reset</span>
                    </button>
                  </>
                )}
              </div>
              <div className="flex justify-between">
                {editModeOn ? (
                  <TextField
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  <p className="flex items-center text-lg font-medium">
                    {product.name}
                  </p>
                )}
                <div>
                  <div>
                    <Switch
                      title="123"
                      value={active}
                      checked={active}
                      onClick={() => setActive(!active)}
                      name="active"
                      type="submit"
                    />
                    <span>{active ? "Public" : "Hidden"}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold">Description: </p>
                {editModeOn ? (
                  <Editor
                    textareaName="description"
                    apiKey={VITE_TINY_MCE_API_KEY}
                    onInit={(_evt, editor) => (editorRef.current = editor)}
                    init={{
                      plugins:
                        "anchor autolink autoresize charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
                      toolbar:
                        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                      tinycomments_mode: "embedded",
                      tinycomments_author: "Author name",
                      mergetags_list: [
                        { value: "First.Name", title: "First Name" },
                        { value: "Email", title: "Email" },
                      ],
                      ai_request: (request, respondWith) =>
                        respondWith.string(() =>
                          Promise.reject("See docs to implement AI Assistant"),
                        ),
                    }}
                    initialValue={html}
                  />
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: html }}></div>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-lg font-medium">Brand:</p>
                {editModeOn ? (
                  <select
                    name="brandId"
                    defaultValue={
                      brands.filter((b) => b.name === product.brand)[0].id
                    }
                  >
                    {brands.map((b) => (
                      <option value={b.id} key={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>{product.brand}</p>
                )}
              </div>
              <div>
                <p className="text-lg font-medium">Category:</p>
                <div className="flex flex-col items-center justify-center space-y-4">
                  {editModeOn && (
                    <>
                      <input
                        type="hidden"
                        value={JSON.stringify(categoryId)}
                        name="categoryId"
                      />
                      <div className="space-x-4">
                        <label>More Category:</label>
                        <Select
                          sx={{
                            width: 60,
                          }}
                        >
                          {categories
                            .filter((c) => !categoryId.includes(c.id))
                            .map((c) => {
                              return (
                                <MenuItem
                                  key={c.id}
                                  value={c.id}
                                  onClick={() =>
                                    setCategoryId((cur) => [...cur, c.id])
                                  }
                                >
                                  {c.name}
                                </MenuItem>
                              );
                            })}
                        </Select>
                      </div>
                    </>
                  )}
                  <Paper
                    sx={{
                      display: "flex",
                      justifyContent: "center",

                      flexWrap: "wrap",
                      width: "fit-content",
                      boxShadow: "none",
                      backgroundColor: "#f3f4f6",
                    }}
                    className="min-h-[56px] min-w-[200px] space-x-4 px-3 pb-3 pt-1"
                    component="div"
                  >
                    {categoryId.map((c) =>
                      editModeOn ? (
                        <Chip
                          sx={{ mt: 1 }}
                          key={c}
                          label={categories.find((v) => v.id === c).name}
                          onDelete={() => {
                            setCategoryId(categoryId.filter((v) => v !== c));
                          }}
                        />
                      ) : (
                        <Chip
                          sx={{ mt: 1 }}
                          key={c}
                          label={categories.find((v) => v.id === c).name}
                        />
                      ),
                    )}
                  </Paper>
                </div>
              </div>
            </div>
          </Form>
          <div className="space-y-4 rounded-md bg-white p-4">
            <p className="text-center font-medium">Product Variants</p>
            <DataGrid
              columns={columns}
              hideFooter
              rows={buildRows(product.options)}
              getRowId={(r) => r.sku}
            />
          </div>
        </div>

        {/* <div className="rounded-md bg-white p-4">{ratings.map(() => {})}</div> */}
      </div>
    </div>
  );
}

export async function loader({ params: { id } }) {
  const product = await fetchProductyId(id);
  const ratings = await fetchRatingsByProductId(id);
  const brands = await fetchBrands();
  const categories = await fetchCategories();

  // console.log(ratings);
  return { product, ratings, brands, categories };
}

export async function action({ request, params: { id } }) {
  const data = Object.fromEntries(await request.formData());
  console.log(data);
  if (data.active) activeProductById(id, data.active);
  if (data.edit) activeProductById(id, false);
  if (data.type === "update")
    updateProductById(id, {
      description: data.description,
      brandId: data.brandId,
      categoryId: JSON.parse(data.categoryId),
      name: data.name,
    });
  return null;
}
export default ProductDetails;
