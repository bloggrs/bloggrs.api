import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWebSocket } from '../services/websocket';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (data: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { sendMessage, lastMessage } = useWebSocket();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Handle auth messages
    if (lastMessage?.type === 'auth') {
      const { token, user } = lastMessage.data;
      setToken(token);
      setUser(user);
      localStorage.setItem('auth_token', token);
    }
  }, [lastMessage]);

  useEffect(() => {
    // Check for stored token on mount
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      sendMessage({
        type: 'auth',
        data: {
          type: 'verify',
          token: storedToken
        }
      });
    }
  }, []);

  const login = (email: string, password: string) => {
    sendMessage({
      type: 'auth',
      data: {
        type: 'login',
        email,
        password
      }
    });
  };

  const register = (data: any) => {
    sendMessage({
      type: 'auth',
      data: {
        type: 'register',
        ...data
      }
    });
  };

  const logout = () => {
    sendMessage({
      type: 'auth',
      data: {
        type: 'logout',
        token
      }
    });
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!user,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 