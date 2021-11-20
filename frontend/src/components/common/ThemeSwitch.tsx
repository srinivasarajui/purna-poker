import * as React from 'react';

export interface IThemeSwitchProps {}

const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';
export function ThemeSwitch(props: IThemeSwitchProps) {
  const [isDark, setIsDark] = React.useState(localStorage.getItem('theme') === DARK_THEME);
  document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || LIGHT_THEME);
  const handleCheckboxChange = () => {
    setIsDark(!isDark);
    localStorage.setItem('theme', isDark ? LIGHT_THEME : DARK_THEME);
    document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || LIGHT_THEME);
  };
  return (
    <div className="flex items-center justify-center">
      🌞
      <input
        type="checkbox"
        defaultChecked={isDark}
        onChange={handleCheckboxChange}
        className="toggle"
        aria-label="Switch between Light and dark modes"
      ></input>
      🌚
    </div>
  );
}
