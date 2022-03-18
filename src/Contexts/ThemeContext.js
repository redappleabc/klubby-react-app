import React from "react";

export const initialThemeState = {
  theme: "dark",
  color: "color_0",
  setTheme: () => null,
  setColor: () => null
};

const ThemeContext = React.createContext(initialThemeState);
export default ThemeContext;
