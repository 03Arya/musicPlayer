import { useState, useEffect } from 'react';

export default function useDarkMode() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    if (theme === 'light') {
      window.localStorage.setItem('theme', 'dark');
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      setTheme('dark');
    } else {
      window.localStorage.setItem('theme', 'light');
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      setTheme('light');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme) {
      document.body.classList.remove('light')
      document.body.classList.remove('dark')
      document.body.classList.add(localTheme);
      setTheme(localTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark');
      setTheme('dark');
    } else {
      document.body.classList.add('light');
      setTheme('light');
    }
  }, []);

  return [theme, toggleTheme];
}