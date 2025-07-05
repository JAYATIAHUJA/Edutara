import { useState, useEffect, useCallback } from 'react';

interface ColorTheme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
  };
}

const defaultTheme: ColorTheme = {
  id: 'normal',
  name: 'Normal',
  description: 'Standard colors',
  colors: {
    primary: 'blue',
    secondary: 'green',
    accent: 'purple',
    success: 'green',
    warning: 'yellow',
    error: 'red'
  }
};

export const useColorTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>(defaultTheme);

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedThemeId = localStorage.getItem('colorTheme');
    if (savedThemeId) {
      // In a real app, you'd fetch the theme by ID
      // For now, we'll just set the ID
      setCurrentTheme(prev => ({ ...prev, id: savedThemeId }));
    }
  }, []);

  const updateTheme = useCallback((theme: ColorTheme) => {
    setCurrentTheme(theme);
    localStorage.setItem('colorTheme', theme.id);
    
    // Apply CSS custom properties for the theme
    const root = document.documentElement;
    root.style.setProperty('--color-primary', getColorValue(theme.colors.primary));
    root.style.setProperty('--color-secondary', getColorValue(theme.colors.secondary));
    root.style.setProperty('--color-accent', getColorValue(theme.colors.accent));
    root.style.setProperty('--color-success', getColorValue(theme.colors.success));
    root.style.setProperty('--color-warning', getColorValue(theme.colors.warning));
    root.style.setProperty('--color-error', getColorValue(theme.colors.error));
  }, []);

  const getColorValue = (colorName: string): string => {
    const colorMap: Record<string, string> = {
      blue: '#3B82F6',
      green: '#10B981',
      purple: '#8B5CF6',
      red: '#EF4444',
      yellow: '#F59E0B',
      orange: '#F97316',
      teal: '#14B8A6',
      indigo: '#6366F1',
      pink: '#EC4899'
    };
    return colorMap[colorName] || '#3B82F6';
  };

  const getThemeClasses = (baseColor: string) => {
    const themeColor = currentTheme.colors[baseColor as keyof typeof currentTheme.colors] || baseColor;
    
    return {
      bg: `bg-${themeColor}-500`,
      bgLight: `bg-${themeColor}-100`,
      bgDark: `bg-${themeColor}-600`,
      text: `text-${themeColor}-600`,
      textLight: `text-${themeColor}-500`,
      textDark: `text-${themeColor}-700`,
      border: `border-${themeColor}-300`,
      borderLight: `border-${themeColor}-200`,
      borderDark: `border-${themeColor}-400`,
      gradient: `from-${themeColor}-400 to-${themeColor}-500`,
      gradientHover: `hover:from-${themeColor}-500 hover:to-${themeColor}-600`
    };
  };

  return {
    currentTheme,
    updateTheme,
    getThemeClasses,
    getColorValue
  };
};