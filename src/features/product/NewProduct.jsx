import { Form, useLoaderData } from "react-router-dom";
import { Chip, MenuItem, Paper, Select, TextField } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { VITE_TINY_MCE_API_KEY } from "../../configs/envConfig";
import { useMemo, useRef, useState } from "react";
import useTitle from "../../hooks/useTitle";
import { fetchBrands } from "../../apis/brandApi";
import { fetchCategories } from "../../apis/categoryApi";
import useUnload from "../../hooks/useUnload";
import Message from "../../ui/Message";
import { createProduct } from "../../apis/productApi";

function NewProduct() {
  const editorRef = useRef(null);
  const [categoryId, setCategoryId] = useState([]);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [brandId, setBrandId] = useState(-1);
  const { brands, categories } = useLoaderData();
  const unSelectedCategory = categories.filter(
    (c) => !categoryId.includes(c.id),
  );
  const defaultSelect = useMemo(() => [-1], []);
  useUnload();
  useTitle("New Product");

  function handleSubmit(e) {
    const name = e.target.name.value;
    const description = e.target.description.value;
    const brandId = e.target.brandId.value;
    const categoryId = JSON.parse(e.target.categoryId.value);
    if (name && description && brandId && categoryId.length) return;
    e.preventDefault();
    setIsError(true);
    if (!name) {
      setMessage("Product name is required");
      return;
    }
    if (!description) {
      setMessage("Product description is required");
      return;
    }
    if (brandId * 1 === -1) {
      setMessage("Product brand is required");
      return;
    }
    if (!categoryId.length) {
      setMessage("Product category is required");
      return;
    }
  }

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <Message
        open={message !== ""}
        severity={isError ? "error" : "info"}
        onClose={() => {
          setMessage("");
          setIsError(false);
        }}
      >
        {message}
      </Message>
      <div className="grid grid-cols-[70%_30%] space-x-4">
        <div className="space-y-4 rounded-md bg-white p-4">
          <div className="space-y-2">
            <p className="font-medium">New Product</p>
            <TextField
              // required
              type="text"
              fullWidth={true}
              label="Product Name"
              name="name"
            />
          </div>
          <div className="space-y-2">
            <p className="font-medium">Product Description</p>
            <Editor
              textareaName="description"
              apiKey={VITE_TINY_MCE_API_KEY}
              onInit={(_evt, editor) => (editorRef.current = editor)}
              init={{
                plugins:
                  "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
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
                height: 600,
              }}
            />
          </div>
        </div>
        <div className="space-y-4 bg-white p-4">
          <div className="flex items-center space-x-4">
            <p className="font-medium">Brand</p>
            <Select
              required
              name="brandId"
              value={brandId}
              sx={{ width: "100%" }}
              onChange={(e) => setBrandId(e.target.value)}
            >
              <MenuItem value={-1} disabled>
                Pick the brand!
              </MenuItem>
              {brands.map((b) => (
                <MenuItem value={b.id} key={b.id}>
                  <div className="flex space-x-4">
                    <p>{b.name}</p>
                    <img src={b.imgUrl} alt={b.name} width={24} />
                  </div>
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <p className="font-medium">Category</p>
              <Select
                required
                multiple={true}
                sx={{
                  width: "100%",
                }}
                value={defaultSelect}
              >
                <MenuItem value={-1} disabled={true}>
                  Let&apos;s pick some category
                </MenuItem>
                {unSelectedCategory.map((c) => {
                  return (
                    <MenuItem
                      key={c.id}
                      value={c.id}
                      onClick={() => setCategoryId((cur) => [...cur, c.id])}
                    >
                      {c.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4">
              <input
                type="hidden"
                value={JSON.stringify(categoryId)}
                required
                name="categoryId"
              />
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
                {categoryId.map((c) => (
                  <Chip
                    sx={{ mt: 1 }}
                    key={c}
                    label={categories.find((v) => v.id === c).name}
                    onDelete={() => {
                      setCategoryId(categoryId.filter((v) => v !== c));
                    }}
                  />
                ))}
              </Paper>
            </div>
            <button className="rounded-md bg-main p-4 text-white">
              Submit
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
}

export async function loader() {
  const brands = await fetchBrands();
  const categories = await fetchCategories();
  if (brands.error || categories.error)
    throw new Response("Something went wrong");
  return { brands, categories };
}

export async function action({ request }) {
  const data = Object.fromEntries(await request.formData());
  data.categoryId = JSON.parse(data.categoryId);
  await createProduct(data);
  return null;
}
export default NewProduct;
