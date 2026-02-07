import { createContext, useContext,useState, useEffect } from "react";
import { themes } from "./themeConfig";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [color, setColor] = useState(() => localStorage.getItem("theme-color") || "yellow");
  const [mode, setMode] = useState(() => localStorage.getItem("theme-mode") || "dark");

  useEffect(() => {
    const themeVars = themes[color]?.[mode] || themes.yellow.dark;
    const root = document.documentElement;

    Object.entries(themeVars).forEach(([key, value]) => {
      if (key === "--bg-primary") {
        // Background gradient needs special handling
        document.body.style.background = value;
      } else {
        root.style.setProperty(key, value);
      }
    });

    localStorage.setItem("theme-color", color);
    localStorage.setItem("theme-mode", mode);
  }, [color, mode]);

  const toggleMode = () => setMode((m) => (m === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ color, setColor, mode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);  