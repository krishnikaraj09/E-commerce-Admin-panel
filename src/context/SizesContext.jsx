import { createContext, useEffect, useState } from "react";
import { sizeGroup as defaultSizes } from "../Utils/size";

const SizesContext = createContext({
  sizes: defaultSizes,
  setSizes: () => {}
});

export const SizesProvider = ({ children }) => {
  const [sizes, setSizes] = useState(() => {
    try {
      const raw = localStorage.getItem("app_size_group");
      return raw ? JSON.parse(raw) : defaultSizes;
    } catch (e) {
      console.warn("Failed to load sizes from localStorage, using defaults.", e);
      return defaultSizes;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("app_size_group", JSON.stringify(sizes));
    } catch (e) {
      console.warn("Failed to save sizes to localStorage", e);
    }
  }, [sizes]);

  return (
    <SizesContext.Provider value={{ sizes, setSizes }}>
      {children}
    </SizesContext.Provider>
  );
};

export default SizesContext;
