import debounce from "lodash.debounce";
import { useEffect, useState } from "react";

export const useDebouncedValue = (value: string, delay = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = debounce(() => setDebouncedValue(value), delay);

    handler();
    return () => {
      handler.cancel();
    };
  }, [value, delay]);

  return debouncedValue;
};
