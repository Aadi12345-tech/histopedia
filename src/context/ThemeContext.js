import React, { createContext, useState, useEffect, useContext } from 'react';

export const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return {
    isDarkMode: context.darkMode,
    toggleTheme: context.toggleTheme
  };
};

export const ThemeProvider = ({ children }) => {
  // Check if user had a preference saved in localStorage
  const savedTheme = localStorage.getItem('theme');
  const [darkMode, setDarkMode] = useState(savedTheme === 'dark');

  // Toggle theme function
  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Update localStorage and apply theme class to body when theme changes
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    
    // Apply or remove the dark-mode class from the body
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 