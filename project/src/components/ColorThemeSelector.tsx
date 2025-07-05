import React, { useState, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';

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

const colorThemes: ColorTheme[] = [
  {
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
  },
  {
    id: 'protanopia',
    name: 'Protanopia',
    description: 'Red-blind friendly',
    colors: {
      primary: 'blue',
      secondary: 'teal',
      accent: 'indigo',
      success: 'blue',
      warning: 'orange',
      error: 'orange'
    }
  },
  {
    id: 'deuteranopia',
    name: 'Deuteranopia',
    description: 'Green-blind friendly',
    colors: {
      primary: 'blue',
      secondary: 'purple',
      accent: 'pink',
      success: 'blue',
      warning: 'orange',
      error: 'orange'
    }
  },
  {
    id: 'tritanopia',
    name: 'Tritanopia',
    description: 'Blue-blind friendly',
    colors: {
      primary: 'green',
      secondary: 'red',
      accent: 'orange',
      success: 'green',
      warning: 'red',
      error: 'red'
    }
  }
];

interface ColorThemeSelectorProps {
  onThemeChange: (theme: ColorTheme) => void;
}

const ColorThemeSelector: React.FC<ColorThemeSelectorProps> = ({ onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ColorTheme>(colorThemes[0]);

  useEffect(() => {
    // Load saved theme from localStorage
    const savedThemeId = localStorage.getItem('colorTheme');
    if (savedThemeId) {
      const theme = colorThemes.find(t => t.id === savedThemeId) || colorThemes[0];
      setSelectedTheme(theme);
      onThemeChange(theme);
    }
  }, [onThemeChange]);

  const handleThemeSelect = (theme: ColorTheme) => {
    setSelectedTheme(theme);
    setIsOpen(false);
    localStorage.setItem('colorTheme', theme.id);
    onThemeChange(theme);
    
    // Apply theme to document root for CSS variables
    document.documentElement.setAttribute('data-theme', theme.id);
  };

  const getThemePreviewColors = (theme: ColorTheme) => {
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

    return [
      colorMap[theme.colors.primary] || '#3B82F6',
      colorMap[theme.colors.secondary] || '#10B981',
      colorMap[theme.colors.accent] || '#8B5CF6'
    ];
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white p-3 rounded-full shadow-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 group"
          title="Color Theme Options"
        >
          <Palette className="w-6 h-6 text-gray-600 group-hover:text-gray-800" />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 mb-1">Color Accessibility</h3>
              <p className="text-sm text-gray-600">Choose colors that work best for you</p>
            </div>
            
            <div className="p-2">
              {colorThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme)}
                  className={`w-full p-3 rounded-xl transition-all duration-200 flex items-center space-x-3 ${
                    selectedTheme.id === theme.id
                      ? 'bg-blue-50 border-2 border-blue-300'
                      : 'hover:bg-gray-50 border-2 border-transparent'
                  }`}
                >
                  {/* Color Preview */}
                  <div className="flex space-x-1">
                    {getThemePreviewColors(theme).map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  
                  {/* Theme Info */}
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-800">{theme.name}</div>
                    <div className="text-xs text-gray-600">{theme.description}</div>
                  </div>
                  
                  {/* Selected Indicator */}
                  {selectedTheme.id === theme.id && (
                    <Check className="w-5 h-5 text-blue-600" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-600 text-center">
                These color themes help students with different types of color vision
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorThemeSelector;
export type { ColorTheme };