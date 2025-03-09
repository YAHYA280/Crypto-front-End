'use client';

import { useEffect } from 'react';

export default function UseThemeFromCookie() {
  useEffect(() => {
    const theme = 'dark';
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  return null;
}
