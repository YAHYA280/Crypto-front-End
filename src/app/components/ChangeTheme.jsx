'use client';

import { getCookie } from 'cookies-next';
import { useEffect } from 'react';

export default function UseThemeFromCookie() {
  useEffect(() => {
    // const theme = getCookie("theme") || "dark";
    const theme = 'dark';
    localStorage.setItem('theme', theme); // Store in localStorage
    document.documentElement.setAttribute('data-theme', theme); // Optional: Apply theme
  }, []);

  return null;
}
