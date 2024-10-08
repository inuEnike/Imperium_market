// hooks/context/context.tsx
import React, { createContext, useContext, useState } from "react";

interface AppContextType {
  openOverlaySignup: boolean;
  handleOverLaySignup: () => void;
  openOverlaySignin: boolean;
  handleOverLaySignin: () => void;
  handleCloseOverLay: () => void;
  token: string;
  setToken: (value: string) => void; // Updated setToken type
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openOverlaySignup, setOpenOverlaySignup] = useState(false);
  const [openOverlaySignin, setOpenOverlaySignin] = useState(false);
  const [token, setToken] = useState("");
  console.log(token);

  const handleOverLaySignup = () => {
    setOpenOverlaySignup((prev) => !prev);
  };

  const handleOverLaySignin = () => {
    setOpenOverlaySignin((prev) => !prev);
  };

  const handleCloseOverLay = () => {
    setOpenOverlaySignin(false);
    setOpenOverlaySignup(false);
  };

  const contextValue: AppContextType = {
    openOverlaySignup,
    openOverlaySignin,
    handleOverLaySignup,
    handleOverLaySignin,
    handleCloseOverLay,
    token,
    setToken, // No changes here
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
