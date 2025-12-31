import { useTheme } from '../contexts/ThemeContext';

export function useChartColors() {
  const { isDark } = useTheme();

  if (isDark) {
    return {
      primary: '#60a5fa',      // Azul mais claro para dark mode
      secondary: '#34d399',     // Verde mais claro
      accent: '#f472b6',        // Rosa para destaque
      background: '#1e293b',     // Background dos cards
      text: '#f1f5f9',          // Texto principal
      grid: '#475569',          // Linhas do grid
      bar: '#3b82f6',           // Cor das barras
      line: '#60a5fa',          // Cor das linhas
    };
  }

  return {
    primary: '#2563eb',         // Azul padrão
    secondary: '#10b981',       // Verde padrão
    accent: '#ef4444',          // Vermelho para destaque
    background: '#ffffff',      // Background dos cards
    text: '#1f2937',            // Texto principal
    grid: '#e5e7eb',            // Linhas do grid
    bar: '#2563eb',             // Cor das barras
    line: '#2563eb',            // Cor das linhas
  };
}

