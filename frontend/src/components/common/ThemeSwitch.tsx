import * as React from 'react';

export interface IThemeSwitchProps {}

export function ThemeSwitch(props: IThemeSwitchProps) {
  const [isDark, setIsDark] = React.useState(localStorage.getItem('theme') === 'dark');
  document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'light');
  const handleCheckboxChange = () => {
    setIsDark(!isDark);
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'light');
  };
  return (
    <div className="flex items-center justify-center">
      🌞<input type="checkbox" defaultChecked={isDark} onChange={handleCheckboxChange} className="toggle"></input>🌚
    </div>
  );
}
