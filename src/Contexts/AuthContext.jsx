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
      const res = await axios.post('http://localhost:4000/api/auth/register', {
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
      const response = await axios.post('http://localhost:4000/api/auth/login', {
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
      const res = await axios.put('http://localhost:5000/api/auth/update-profile', updatedUserData, {
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





// import { createContext, useContext, useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'

// // Create context
// const AuthContext = createContext(null)

// // Local storage keys
// const USERS_STORAGE_KEY = 'project_hub_users'
// const CURRENT_USER_KEY = 'project_hub_current_user'

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const navigate = useNavigate()

//   // Initialize users and check for logged in user
//   useEffect(() => {
//     const initializeUsers = () => {
//       const storedUsers = localStorage.getItem(USERS_STORAGE_KEY)
//       if (!storedUsers) {
//         const defaultUsers = [
//           {
//             id: 1,
//             name: 'Admin User',
//             email: 'admin@example.com',
//             password: 'password123', // In real apps, hash this
//             role: 'admin',
//             avatar: 'https://i.pravatar.cc/150?img=1'
//           }
//         ]
//         localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers))
//       }
//     }

//     const loadCurrentUser = () => {
//       const currentUser = localStorage.getItem(CURRENT_USER_KEY)
//       if (currentUser) {
//         setUser(JSON.parse(currentUser))
//       }
//     }

//     initializeUsers()
//     loadCurrentUser()
//     setIsLoading(false)
//   }, [])

//   // Register a new user
//   const register = (name, email, password) => {
//     try {
//       const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]')

//       if (users.some(u => u.email === email)) {
//         toast.error('User with this email already exists')
//         return false
//       }

//       const newUser = {
//         id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
//         name,
//         email,
//         password,
//         role: 'user',
//         avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
//       }

//       const updatedUsers = [...users, newUser]
//       localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers))
//       setUser(newUser)
//       localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser))

//       toast.success('Registration successful')
//       return true
//     } catch (error) {
//       console.error('Registration error:', error)
//       toast.error('Registration failed. Please try again.')
//       return false
//     }
//   }

//   // Login user
//   const login = (email, password) => {
//     try {
//       const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]')
//       const foundUser = users.find(u => u.email === email && u.password === password)

//       if (foundUser) {
//         setUser(foundUser)
//         localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser))
//         toast.success('Login successful')
//         return true
//       } else {
//         toast.error('Invalid email or password')
//         return false
//       }
//     } catch (error) {
//       console.error('Login error:', error)
//       toast.error('Login failed. Please try again.')
//       return false
//     }
//   }

//   // Logout user
//   const logout = () => {
//     setUser(null)
//     localStorage.removeItem(CURRENT_USER_KEY)
//     toast.info('You have been logged out')
//     navigate('/login')
//   }

//   // Request password reset
//   const requestPasswordReset = (email) => {
//     try {
//       const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]')
//       const foundUser = users.find(u => u.email === email)

//       if (foundUser) {
//         toast.success('Password reset link sent (demo only)')
//         return true
//       } else {
//         toast.error('No user found with this email')
//         return false
//       }
//     } catch (error) {
//       console.error('Password reset request error:', error)
//       toast.error('Request failed. Please try again.')
//       return false
//     }
//   }

//   // Reset password
//   const resetPassword = (email, newPassword) => {
//     try {
//       const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]')
//       const userIndex = users.findIndex(u => u.email === email)

//       if (userIndex !== -1) {
//         users[userIndex].password = newPassword
//         localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
//         toast.success('Password reset successfully')
//         return true
//       } else {
//         toast.error('User not found')
//         return false
//       }
//     } catch (error) {
//       console.error('Password reset error:', error)
//       toast.error('Password reset failed. Please try again.')
//       return false
//     }
//   }

//   // Update user profile
//   const updateProfile = (updatedUserData) => {
//     try {
//       const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]')
//       const userIndex = users.findIndex(u => u.id === user.id)

//       if (userIndex !== -1) {
//         const updatedUser = { ...users[userIndex], ...updatedUserData }
//         users[userIndex] = updatedUser

//         localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
//         localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser))
//         setUser(updatedUser)

//         toast.success('Profile updated successfully')
//         return true
//       } else {
//         toast.error('User not found')
//         return false
//       }
//     } catch (error) {
//       console.error('Profile update error:', error)
//       toast.error('Failed to update profile')
//       return false
//     }
//   }

//   const value = {
//     user,
//     isLoading,
//     login,
//     register,
//     logout,
//     requestPasswordReset,
//     resetPassword,
//     updateProfile
//   }

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// }

// // Custom hook to use auth context
// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider')
//   }
//   return context
// }
