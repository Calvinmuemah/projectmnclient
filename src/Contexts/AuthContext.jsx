import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

const CURRENT_USER_KEY = 'project_hub_current_user';
const AUTH_TOKEN_KEY = 'project_hub_token';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    try {
      if (storedUser && storedUser !== 'undefined') {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Error parsing stored user:', error);
      localStorage.removeItem(CURRENT_USER_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const interceptor = axios.interceptors.request.use((config) => {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    return () => axios.interceptors.request.eject(interceptor);
  }, []);

  const register = async (name, email, password) => {
    try {
      const res = await axios.post('https://projectmnbackend.vercel.app/api/auth/register', {
        name,
        email,
        password,
      });

      const { user, token } = res.data;

      setUser(user);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      localStorage.setItem(AUTH_TOKEN_KEY, token);

      toast.success('Registration successful');
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(message);
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post('https://projectmnbackend.vercel.app/api/auth/login', {
        email,
        password,
      });

      const { user, token } = res.data;
      setUser(user);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      localStorage.setItem(AUTH_TOKEN_KEY, token);

      toast.success('Login successful');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    toast.info('Logged out');
  };

  const updateProfile = async (updatedUserData) => {
    try {
      const res = await axios.put(
        'https://projectmnbackend.vercel.app/api/auth/update-profile',
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`,
          },
        }
      );

      setUser(res.data);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(res.data));
      toast.success('Profile updated successfully');
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      const message = error.response?.data?.message || 'Failed to update profile';
      toast.error(message);
      return false;
    }
  };

  const requestPasswordReset = async (email) => {
    try {
      await axios.post('https://projectmnbackend.vercel.app/api/auth/forgotPassword', { email });
      toast.success('Reset link sent to your email');
      return true;
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error(error.response?.data?.message || 'Failed to send reset email');
      return false;
    }
  };

  const verifyResetToken = async (token) => {
    try {
      const res = await axios.get(`https://projectmnbackend.vercel.app/api/auth/verify-reset-token/${token}`);
      return res.data.valid;
    } catch (error) {
      console.error('Token verification error:', error);
      return false;
    }
  };

  const resetPassword = async (token, Password) => {
    try {
      await axios.post('https://projectmnbackend.vercel.app/api/auth/reset_password', {
        token,
        password: Password,
      });
      toast.success('Password reset successful');
      return true;
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error(error.response?.data?.message || 'Failed to reset password');
      return false;
    }
  };
  // console.log("Request Body:", request.body);


  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    requestPasswordReset,
    verifyResetToken,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};