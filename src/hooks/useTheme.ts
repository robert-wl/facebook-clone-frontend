import { useContext } from "react";
import { ThemeContext } from "@/components/context/ThemeContextProvider.tsx";

export default function useTheme() {
  return useContext(ThemeContext);
}
