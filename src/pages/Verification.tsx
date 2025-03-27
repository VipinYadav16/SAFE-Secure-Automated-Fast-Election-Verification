
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useVerification } from "@/context/VerificationContext";
import AppLayout from "@/components/AppLayout";
import VerificationSteps from "@/components/verification/VerificationSteps";
import IdentityVerification from "@/components/verification/IdentityVerification";
import VoterDetails from "@/components/verification/VoterDetails";
import BiometricVerificationStep from "@/components/verification/BiometricVerificationStep";
import FacialVerificationStep from "@/components/verification/FacialVerificationStep";
import ManualVerificationStep from "@/components/verification/ManualVerificationStep";
import CompletedVerificationStep from "@/components/verification/CompletedVerificationStep";
import FailedVerificationStep from "@/components/verification/FailedVerificationStep";

const Verification = () => {
  const navigate = useNavigate();
  const { officer, pollingStation, logout } = useAuth();
  const { 
    currentStep, 
    resetVerification
  } = useVerification();

  if (!officer || !pollingStation) {
    navigate("/");
    return null;
  }

  const handleStartNew = () => {
    resetVerification();
  };

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Voter Verification</h1>
          <p className="text-slate-500">
            {pollingStation.name}, {pollingStation.constituency}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {currentStep !== "idle" && (
            <button
              className="text-blue-500 hover:text-blue-700 text-sm"
              onClick={handleStartNew}
            >
              New Verification
            </button>
          )}
          
          <button
            className="text-red-500 hover:text-red-700 text-sm"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Step indicator */}
      <VerificationSteps />

      {/* Content area */}
      <div className="max-w-3xl mx-auto">
        {currentStep === "idle" && <IdentityVerification />}
        {currentStep === "identity-verification" && <VoterDetails />}
        {currentStep === "biometric-verification" && <BiometricVerificationStep />}
        {currentStep === "facial-verification" && <FacialVerificationStep />}
        {currentStep === "manual-verification" && <ManualVerificationStep />}
        {currentStep === "completed" && <CompletedVerificationStep />}
        {currentStep === "failed" && <FailedVerificationStep />}
      </div>
    </AppLayout>
  );
};

export default Verification;
