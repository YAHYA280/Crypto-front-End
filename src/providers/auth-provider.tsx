'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type User = {
  id?: string;
  name?: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
});

const TOKEN_COOKIE_NAME = 'session_token';
const USER_COOKIE_NAME = 'user_data';
const COOKIE_EXPIRES = 7; // days

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/users/login`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();

        if (data.token || data.access_token) {
          const token = data.token || data.access_token;

          Cookies.set(TOKEN_COOKIE_NAME, token, {
            expires: COOKIE_EXPIRES,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
          });

          const userData = data.user || data.userData || { email };

          Cookies.set(USER_COOKIE_NAME, JSON.stringify(userData), {
            expires: COOKIE_EXPIRES,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
          });

          setUser(userData);
          return true;
        }
      } else {
        const userData = { email };

        const simpleToken = btoa(`${email}:${Date.now()}`);

        Cookies.set(TOKEN_COOKIE_NAME, simpleToken, {
          expires: COOKIE_EXPIRES,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Lax',
        });

        Cookies.set(USER_COOKIE_NAME, JSON.stringify(userData), {
          expires: COOKIE_EXPIRES,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Lax',
        });

        setUser(userData);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async (redirect = true) => {
    try {
      // Get token from cookie
      const token = Cookies.get(TOKEN_COOKIE_NAME);

      if (token) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        });

        // We don't need to parse the response here, just check if it was successful
        console.log('Logout response status:', response.status);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Remove cookies regardless of API success
      Cookies.remove(TOKEN_COOKIE_NAME);
      Cookies.remove(USER_COOKIE_NAME);

      // Clear state
      setUser(null);

      // Redirect if needed
      if (redirect) {
        // Extract current locale from URL path
        const pathname = window.location.pathname;
        const localeMatch = pathname.match(/^\/([^\/]+)\//);
        const currentLocale = localeMatch ? localeMatch[1] : 'nl'; // default to 'nl' if not found

        // Redirect to login with the current locale
        router.push(`/${currentLocale}/login`);
      }
    }
  };

  const value = {
    user,
    loading,
    login,
    logout: handleLogout,
    isAuthenticated: !!user,
  };

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const token = Cookies.get(TOKEN_COOKIE_NAME);
        const userDataCookie = Cookies.get(USER_COOKIE_NAME);

        if (token && userDataCookie) {
          const userData = JSON.parse(userDataCookie);
          setUser(userData);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        handleLogout(false);
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
