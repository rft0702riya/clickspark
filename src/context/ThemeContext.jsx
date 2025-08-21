import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    // Check localStorage for saved theme preference
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true; // Default to dark theme
  });

  // Theme configurations
  const themes = {
    dark: {
      name: 'Dark',
      background: 'linear-gradient(135deg, #000000 0%, #111111 25%, #1a1a1a 50%, #111111 75%, #000000 100%)',
      navbarBackground: 'linear-gradient(135deg, #000000 0%, #1a1a1a 25%, #2d2d2d 50%, #1a1a1a 75%, #000000 100%)',
      textPrimary: '#ffffff',
      textSecondary: '#e2e8f0',
      textMuted: '#94a3b8',
      backgroundPrimary: '#000000',
      backgroundSecondary: '#111111',
      backgroundTertiary: '#1a1a1a',
      borderColor: '#333333',
      accentColor: '#fbbf24',
      starColor: '#ffffff',
      cardBackground: 'rgba(0, 0, 0, 0.8)',
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      glassBackground: 'rgba(255, 255, 255, 0.05)'
    },
    light: {
      name: 'Light',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #e2e8f0 75%, #f8fafc 100%)',
      navbarBackground: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #e2e8f0 75%, #f8fafc 100%)',
      textPrimary: '#1e293b',
      textSecondary: '#475569',
      textMuted: '#64748b',
      backgroundPrimary: '#ffffff',
      backgroundSecondary: '#f8fafc',
      backgroundTertiary: '#e2e8f0',
      borderColor: '#cbd5e1',
      accentColor: '#f59e0b',
      starColor: '#64748b',
      cardBackground: 'rgba(255, 255, 255, 0.9)',
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      glassBackground: 'rgba(0, 0, 0, 0.05)'
    }
  };

  const currentTheme = themes[isDarkTheme ? 'dark' : 'light'];

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    
    // Apply theme to document body
    document.body.style.setProperty('--theme-background', currentTheme.background);
    document.body.style.setProperty('--theme-text-primary', currentTheme.textPrimary);
    document.body.style.setProperty('--theme-text-secondary', currentTheme.textSecondary);
    document.body.style.setProperty('--theme-text-muted', currentTheme.textMuted);
    document.body.style.setProperty('--theme-background-primary', currentTheme.backgroundPrimary);
    document.body.style.setProperty('--theme-background-secondary', currentTheme.backgroundSecondary);
    document.body.style.setProperty('--theme-background-tertiary', currentTheme.backgroundTertiary);
    document.body.style.setProperty('--theme-border-color', currentTheme.borderColor);
    document.body.style.setProperty('--theme-accent-color', currentTheme.accentColor);
    document.body.style.setProperty('--theme-card-background', currentTheme.cardBackground);
    document.body.style.setProperty('--theme-shadow-color', currentTheme.shadowColor);
    document.body.style.setProperty('--theme-glass-background', currentTheme.glassBackground);
    
    // Set body class for additional styling
    document.body.className = isDarkTheme ? 'dark-theme' : 'light-theme';
  }, [isDarkTheme, currentTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const value = {
    isDarkTheme,
    currentTheme,
    themes,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
