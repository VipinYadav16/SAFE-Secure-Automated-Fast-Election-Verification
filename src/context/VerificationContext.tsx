
import React, { createContext, useContext, useState, ReactNode } from "react";

type Voter = {
  id: string;
  epicNumber: string;
  aadhaarNumber: string;
  name: string;
  age: number;
  gender: string;
  address: string;
  pollingStationId: string;
  fingerprint: string;
  faceImage: string;
  hasVoted: boolean;
};

type VerificationStep = 
  | "idle" 
  | "identity-verification" 
  | "biometric-verification" 
  | "facial-verification" 
  | "manual-verification" 
  | "completed" 
  | "failed";

type VerificationContextType = {
  currentVoter: Voter | null;
  setCurrentVoter: (voter: Voter | null) => void;
  currentStep: VerificationStep;
  setCurrentStep: (step: VerificationStep) => void;
  biometricSuccess: boolean | null;
  setBiometricSuccess: (success: boolean | null) => void;
  facialSuccess: boolean | null;
  setFacialSuccess: (success: boolean | null) => void;
  manualVerificationReason: string;
  setManualVerificationReason: (reason: string) => void;
  finalVerificationStatus: "success" | "failed" | null;
  setFinalVerificationStatus: (status: "success" | "failed" | null) => void;
  resetVerification: () => void;
};

const VerificationContext = createContext<VerificationContextType | undefined>(undefined);

export const VerificationProvider = ({ children }: { children: ReactNode }) => {
  const [currentVoter, setCurrentVoter] = useState<Voter | null>(null);
  const [currentStep, setCurrentStep] = useState<VerificationStep>("idle");
  const [biometricSuccess, setBiometricSuccess] = useState<boolean | null>(null);
  const [facialSuccess, setFacialSuccess] = useState<boolean | null>(null);
  const [manualVerificationReason, setManualVerificationReason] = useState<string>("");
  const [finalVerificationStatus, setFinalVerificationStatus] = useState<"success" | "failed" | null>(null);

  const resetVerification = () => {
    setCurrentVoter(null);
    setCurrentStep("idle");
    setBiometricSuccess(null);
    setFacialSuccess(null);
    setManualVerificationReason("");
    setFinalVerificationStatus(null);
  };

  return (
    <VerificationContext.Provider
      value={{
        currentVoter,
        setCurrentVoter,
        currentStep,
        setCurrentStep,
        biometricSuccess,
        setBiometricSuccess,
        facialSuccess,
        setFacialSuccess,
        manualVerificationReason,
        setManualVerificationReason,
        finalVerificationStatus,
        setFinalVerificationStatus,
        resetVerification,
      }}
    >
      {children}
    </VerificationContext.Provider>
  );
};

export const useVerification = () => {
  const context = useContext(VerificationContext);
  if (context === undefined) {
    throw new Error("useVerification must be used within a VerificationProvider");
  }
  return context;
};
