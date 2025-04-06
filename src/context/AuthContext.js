import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial render
  useEffect(() => {
    const checkLoggedIn = () => {
      const userData = localStorage.getItem('histopedia_user');
      if (userData) {
        const user = JSON.parse(userData);
        setCurrentUser(user);
        setIsAdmin(user.role === 'admin');
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  // Login function
  const login = (userData, isAdmin = false) => {
    // Add login time
    const user = {
      ...userData,
      isLoggedIn: true,
      loginTime: new Date().toISOString(),
      role: isAdmin ? 'admin' : 'user'
    };
    
    // Save to localStorage
    localStorage.setItem('histopedia_user', JSON.stringify(user));
    
    // Update state
    setCurrentUser(user);
    setIsAdmin(isAdmin);
    
    return user;
  };

  // Google login function
  const googleLogin = (googleUserData) => {
    // Extract relevant info from Google response
    const user = {
      username: googleUserData.displayName || googleUserData.name,
      email: googleUserData.email,
      profilePic: googleUserData.photoURL || googleUserData.picture,
      googleId: googleUserData.uid || googleUserData.sub,
      isLoggedIn: true,
      loginTime: new Date().toISOString(),
      role: 'user'
    };
    
    // Save to localStorage
    localStorage.setItem('histopedia_user', JSON.stringify(user));
    
    // Update state
    setCurrentUser(user);
    
    return user;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('histopedia_user');
    setCurrentUser(null);
    setIsAdmin(false);
  };

  // Value object to be provided to consumers
  const value = {
    currentUser,
    isAdmin,
    loading,
    login,
    googleLogin,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 