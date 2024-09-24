import { MenuItem, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Form, useLoaderData } from "react-router-dom";
import useUnload from "../../hooks/useUnload";
import useTitle from "../../hooks/useTitle";
import { fetchProducts } from "../../apis/productApi";
import { useState } from "react";
import { createDiscount } from "../../apis/discountApi";
function NewDiscount() {
  useUnload(true);
  useTitle("New Discount");
  const { products } = useLoaderData();
  const [productList, setProductList] = useState(products);
  const [search, setSearch] = useState("");
  const [productIds, setProductIds] = useState([101]);

  return (
    <div className="grid grid-cols-2 space-x-4">
      <Form method="post">
        <div className="space-y-4 rounded-md bg-white p-4">
          <div>
            <p>New Discount</p>
          </div>
          <TextField required name="name" label="Code" fullWidth />
          <TextField
            required
            select
            label="Type"
            name="type"
            fullWidth
            defaultValue="percent"
          >
            <MenuItem value="percent">Percent</MenuItem>
            <MenuItem value="fixed">Fixed</MenuItem>
          </TextField>
          <TextField
            required
            name="value"
            label="Value"
            type="number"
            fullWidth
            InputProps={{
              inputProps: { min: 0, max: 100 },
            }}
          />
          <TextField
            required
            name="maxUsage"
            type="number"
            InputProps={{
              inputProps: { min: 1 },
            }}
            label="Max Usage"
            fullWidth
          />
          <div className="flex justify-between">
            <DesktopDatePicker
              disablePast
              name="startAt"
              label="Start Date"
              slotProps={{
                field: {
                  clearable: true,
                },
              }}
            />
            <DesktopDatePicker
              disablePast
              name="endAt"
              label="End Date"
              slotProps={{
                field: {
                  clearable: true,
                },
              }}
            />
          </div>
          <input
            type="hidden"
            name="productIds"
            value={JSON.stringify(productIds)}
          />
          <button className="rounded-md bg-green-600 p-4 text-white">
            Submit
          </button>
        </div>
      </Form>
      <div className="space-y-4 rounded-md bg-white p-4">
        <div className="">
          <Form
            className="flex"
            onSubmit={async (e) => {
              e.preventDefault();
              const res = await fetchProducts(`name=${search}`);
              if (res.error) throw new Error(res.error.message);
              setProductList(res);
            }}
          >
            <TextField
              label="Search"
              name="name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
              required
            />
            <button className="bg-gray-100 px-6 py-3">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </Form>
        </div>
        <div className="max-h-[500px] space-y-4 overflow-scroll">
          {productList.map((p) => (
            <div key={p.id} className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={productIds.includes(p.id)}
                onChange={(e) => {
                  if (e.target.checked) setProductIds((pi) => [...pi, p.id]);
                  else setProductIds((pi) => pi.filter((i) => p.id != i));
                }}
              />
              <div>
                <img
                  width={48}
                  src={p.images[0].url}
                  alt={p.name}
                  className="border border-gray-300"
                />
              </div>
              <div>
                <p>{p.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function loader() {
  const products = await fetchProducts();
  if (products.error) throw new Response(products.error.message);
  return { products };
}

export async function action({ request }) {
  const data = Object.fromEntries(await request.formData());
  data.productIds = JSON.parse(data.productIds);
  data.startAt = new Date(data.startAt);
  data.endAt = new Date(data.endAt);
  await createDiscount(data);

  return null;
}
export default NewDiscount;
