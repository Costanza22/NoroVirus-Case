import { useTheme } from '../contexts/ThemeContext';

export default function Header() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-content">
        <div>
          <h1>Norovírus no Brasil</h1>
          <p>
            Visualização exploratória de surtos de gastroenterite associados a
            norovírus, com base em dados públicos e boletins oficiais.
          </p>
        </div>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Alternar tema">
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
