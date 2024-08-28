import { useCallback, useEffect } from "react";

export default function useUnload(bool = true) {
  const onUnload = useCallback(
    (e) => {
      if (bool) e.preventDefault();
    },
    [bool],
  );

  useEffect(() => {
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, [onUnload]);
}
