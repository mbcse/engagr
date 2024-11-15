"use client";
import React, { createContext, useContext, useState } from "react";
import Theme from "@/constants/colors/colors";

interface ThemeContextProps {
  theme: keyof typeof Theme;
  toggleTheme: VoidFunction;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "Neon_Style",
  toggleTheme: () => {},
});

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<keyof typeof Theme>("Neon_Style");

  function toggleTheme() {
    const newTheme: keyof typeof Theme =
      theme === "General" ? "Neon_Style" : "General";
    const root = document.getElementById("theme_container");
    if (root) {
      root.classList.add(newTheme);
      root.classList.remove(theme);
    }
    setTheme(newTheme);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main id={"theme_container"} className={theme}>
        {children}
      </main>
    </ThemeContext.Provider>
  );
};

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a Theme Provider");
  }
  return context;
}

export { ThemeProvider, useTheme };
