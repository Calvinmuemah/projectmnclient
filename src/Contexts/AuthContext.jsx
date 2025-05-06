import { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const AuthContext = createContext(null);

const CURRENT_USER_KEY = 'project_hub_current_user';
const AUTH_TOKEN_KEY = 'project_hub_token';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    try {
      if (storedUser && storedUser !== "undefined") {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Error parsing stored user:", error);
      localStorage.removeItem(CURRENT_USER_KEY);
    } finally {
      setIsLoading(false); // ✅ Ensure loading is false only after trying to parse user
    }
  }, []);

  // ✅ Add axios interceptor only once and clean up
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
  
      // Set user data in state
      setUser(user);
  
      // Store the user and token in localStorage
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user)); // Store user info
      localStorage.setItem(AUTH_TOKEN_KEY, token); // Store token
  
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
      const response = await axios.post('https://projectmnbackend.vercel.app/api/auth/login', {
        email,
        password,
      });
  
      if (response.status === 200) {
        toast.success('Login successful');
        
        // Destructure user and token from the response
        const { user, token } = response.data;
  
        // Set user and token in state
        setUser(user); 
  
        // Store user and token in localStorage
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));  
        localStorage.setItem(AUTH_TOKEN_KEY, token);  
  
        return true;
      } else {
        toast.error('Login failed');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error.response || error.message || error);
      toast.error('Login failed. Please try again.');
      return false;
    }
  };
  
  

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    toast.info('Logged out');
    // navigate('/login');
  };

  const updateProfile = async (updatedUserData) => {
    try {
      const res = await axios.put('https://projectmnbackend.vercel.app/auth/update-profile', updatedUserData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`,
        },
      });

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

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
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