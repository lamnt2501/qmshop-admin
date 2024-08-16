import { Breadcrumbs, Link } from "@mui/material";
import { useHref } from "react-router-dom";
import { upperCaseFirstLetter } from "../utils/utils.js";
function BreadcrumbsCustom() {
  const href = useHref();
  const links = [];
  href
    .slice(1)
    .split("/")
    .forEach((v, i) => {
      if (i === 0) links.push("/" + v);
      else links.push(links[i - 1] + "/" + "v");
    });

  return (
    <Breadcrumbs aria-label="breadcrumbs" className="max-w-[fit-content]">
      {links.map((l) => (
        <Link
          className="hover:text-amber-300"
          href={l}
          color="rgb(0,0,0,0.9)"
          underline="none"
          key={l}
        >
          {upperCaseFirstLetter(l.slice(l.lastIndexOf("/") + 1))}
        </Link>
      ))}
    </Breadcrumbs>
  );
}

export default BreadcrumbsCustom;
