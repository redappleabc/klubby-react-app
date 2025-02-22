import React, { useState, useEffect } from "react";
import ThemeContext, { initialThemeState } from "./ThemeContext";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(initialThemeState.theme);
  const [color, setColor] = useState(initialThemeState.color);

  

  useEffect(() => {
    const localStorage = window.localStorage;
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
    const localStorage = window.localStorage;
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
