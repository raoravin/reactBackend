import React, { createContext, useState } from 'react';

const PasswordContext = createContext();

const PasswordProvider = ({ children }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <PasswordContext.Provider value={{ showPassword, togglePasswordVisibility }}>
      {children}
    </PasswordContext.Provider>
  );
};

export { PasswordProvider, PasswordContext };