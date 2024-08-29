import { useLayoutEffect } from "react";

export default function useTitle(title) {
  useLayoutEffect(() => {
    document.title = title;
  }, [title]);
}
