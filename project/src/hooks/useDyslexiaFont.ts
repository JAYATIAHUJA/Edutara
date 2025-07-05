import { useState, useEffect, useCallback } from 'react';

interface FontOption {
  id: string;
  name: string;
  description: string;
  fontFamily: string;
}

const defaultFont: FontOption = {
  id: 'normal',
  name: 'Normal Font',
  description: 'Standard reading font (Lexend)',
  fontFamily: 'Lexend, Inter, -apple-system, BlinkMacSystemFont, sans-serif'
};

const dyslexiaFont: FontOption = {
  id: 'dyslexia',
  name: 'Dyslexie Font',
  description: 'Specially designed for dyslexia',
  fontFamily: 'Dyslexie, OpenDyslexic, Arial, sans-serif'
};

export const useDyslexiaFont = () => {
  const [currentFont, setCurrentFont] = useState<FontOption>(defaultFont);

  useEffect(() => {
    // Load font from localStorage on mount
    const savedFontId = localStorage.getItem('dyslexiaFont');
    if (savedFontId === 'dyslexia') {
      setCurrentFont(dyslexiaFont);
      applyFont(dyslexiaFont);
    } else {
      setCurrentFont(defaultFont);
      applyFont(defaultFont);
    }
  }, []);

  const applyFont = useCallback((font: FontOption) => {
    // Apply font to CSS custom property
    document.documentElement.style.setProperty('--font-family', font.fontFamily);
    
    // Apply font to body
    document.body.style.fontFamily = font.fontFamily;
    
    // Apply dyslexia-friendly styling
    const style = document.createElement('style');
    
    if (font.id === 'dyslexia') {
      style.textContent = `
        * {
          font-family: ${font.fontFamily} !important;
          font-weight: 400 !important;
        }
        
        body {
          letter-spacing: 0.08em !important;
          word-spacing: 0.12em !important;
          line-height: 1.7 !important;
          font-weight: 400 !important;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-weight: 700 !important;
          line-height: 1.5 !important;
          margin-bottom: 0.8em !important;
          letter-spacing: 0.05em !important;
        }
        
        p, div, span, button, input, textarea, label {
          letter-spacing: 0.06em !important;
          word-spacing: 0.1em !important;
          font-weight: 400 !important;
        }
        
        button {
          font-weight: 600 !important;
          letter-spacing: 0.04em !important;
        }
        
        /* Improve readability for small text */
        .text-sm, .text-xs {
          font-size: 1rem !important;
          letter-spacing: 0.08em !important;
          font-weight: 400 !important;
        }
        
        /* Make text more rounded and friendly */
        .text-xl, .text-2xl, .text-3xl, .text-4xl, .text-5xl {
          font-weight: 700 !important;
          letter-spacing: 0.03em !important;
        }
        
        /* Improve input readability */
        input, textarea {
          font-size: 1.1rem !important;
          padding: 0.75rem !important;
          letter-spacing: 0.05em !important;
        }
      `;
    } else {
      style.textContent = `
        * {
          font-family: ${font.fontFamily} !important;
        }
        
        body {
          letter-spacing: normal !important;
          word-spacing: normal !important;
          line-height: 1.6 !important;
        }
        
        h1, h2, h3, h4, h5, h6 {
          line-height: 1.2 !important;
        }
        
        p, div, span, button, input, textarea, label {
          letter-spacing: normal !important;
          word-spacing: normal !important;
        }
      `;
    }
    
    // Remove any existing dyslexia font styles
    const existingStyle = document.getElementById('dyslexia-font-style');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    style.id = 'dyslexia-font-style';
    document.head.appendChild(style);
  }, []);

  const updateFont = useCallback((font: FontOption) => {
    setCurrentFont(font);
    localStorage.setItem('dyslexiaFont', font.id);
    applyFont(font);
  }, [applyFont]);

  const isDyslexiaFont = currentFont.id === 'dyslexia';

  return {
    currentFont,
    updateFont,
    isDyslexiaFont
  };
};