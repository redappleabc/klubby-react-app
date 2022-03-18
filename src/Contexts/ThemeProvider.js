import React, { useState, useEffect } from "react";
import ThemeContext, { initialThemeState } from "./ThemeContext";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(initialThemeState.theme);
  const [color, setColor] = useState(initialThemeState.color);

  const localStorage = window.localStorage;

  useEffect(() => {
    const savedThemeLocal = localStorage.getItem("globalTheme");
    const savedColorLocal = localStorage.getItem("globalColor");

    if (!!savedThemeLocal) {
      setTheme(savedThemeLocal);
    }
    
    if (!!savedColorLocal) {
      setColor(savedColorLocal);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("globalTheme", theme);
    localStorage.setItem("globalColor", color);
  }, [theme, color]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, color, setColor }}>
      <div className={`theme--${theme} color--${color}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
