import { useLayoutEffect } from "react";

export default function useTitle(title) {
  useLayoutEffect(() => {
    document.title = title;

    return () => (document.title = "QM Shop");
  }, [title]);
}
