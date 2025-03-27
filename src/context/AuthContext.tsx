
import React, { createContext, useContext, useState, ReactNode } from "react";

type Officer = {
  id: string;
  name: string;
  designation: string;
};

type PollingStation = {
  id: string;
  name: string;
  address: string;
  constituency: string;
  district: string;
  state: string;
};

type AuthContextType = {
  officer: Officer | null;
  pollingStation: PollingStation | null;
  setOfficer: (officer: Officer | null) => void;
  setPollingStation: (station: PollingStation | null) => void;
  isAuthenticated: boolean;
  isStationSelected: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [officer, setOfficer] = useState<Officer | null>(null);
  const [pollingStation, setPollingStation] = useState<PollingStation | null>(null);

  const isAuthenticated = !!officer;
  const isStationSelected = !!pollingStation;

  const logout = () => {
    setOfficer(null);
    setPollingStation(null);
  };

  return (
    <AuthContext.Provider
      value={{
        officer,
        pollingStation,
        setOfficer,
        setPollingStation,
        isAuthenticated,
        isStationSelected,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
