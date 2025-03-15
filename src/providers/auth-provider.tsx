'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Define the Auth types
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

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
});

// Cookie configuration
const TOKEN_COOKIE_NAME = 'session_token';
const USER_COOKIE_NAME = 'user_data';
const COOKIE_EXPIRES = 7; // days

// Provider component that wraps your app and makes auth available
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        // Check for session token in cookies
        const token = Cookies.get(TOKEN_COOKIE_NAME);
        const userDataCookie = Cookies.get(USER_COOKIE_NAME);

        if (token && userDataCookie) {
          // Parse the user data
          const userData = JSON.parse(userDataCookie);
          setUser(userData);

          // Optionally validate token with the server here
          // const isValid = await validateToken(token);
          // if (!isValid) {
          //   handleLogout();
          //   return;
          // }
        }
      } catch (error) {
        console.error('Authentication error:', error);
        // Clear potentially corrupted data
        handleLogout(false);
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Use the specific API endpoint you provided
      const apiUrl = 'https://api.cryptoarchitect.nl/api/v1/users/login';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Important for cookies
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      // Check the content type of the response
      const contentType = response.headers.get('content-type');

      // If the response is JSON, parse it
      if (contentType && contentType.includes('application/json')) {
        // Parse the API response
        const data = await response.json();

        // Extract token and user data from response
        if (data.token || data.access_token) {
          const token = data.token || data.access_token;

          // Store token in cookie
          Cookies.set(TOKEN_COOKIE_NAME, token, {
            expires: COOKIE_EXPIRES,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
          });

          // Extract user data from response or create minimal user object
          const userData = data.user || data.userData || { email };

          // Store user data
          Cookies.set(USER_COOKIE_NAME, JSON.stringify(userData), {
            expires: COOKIE_EXPIRES,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
          });

          // Update state
          setUser(userData);
          return true;
        }
      } else {
        // If response is not JSON (e.g., just text like "Done"), create minimal data
        const userData = { email };

        // Generate a simple token based on email and timestamp
        const simpleToken = btoa(`${email}:${Date.now()}`);

        // Store in cookies
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

        // Update state
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

  // Logout function
  const handleLogout = async (redirect = true) => {
    try {
      // Get token from cookie
      const token = Cookies.get(TOKEN_COOKIE_NAME);

      if (token) {
        // Call logout API
        const response = await fetch('https://api.cryptoarchitect.nl/api/v1/users/logout', {
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook that shorthands the context value
export const useAuth = () => useContext(AuthContext);
