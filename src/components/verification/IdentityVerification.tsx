
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import GlassCard from "@/components/GlassCard";
import { useVerification } from "@/context/VerificationContext";

const IdentityVerification = () => {
  const navigate = useNavigate();
  const { setCurrentVoter, setCurrentStep } = useVerification();
  
  const [identityNumber, setIdentityNumber] = useState("");
  const [identityType, setIdentityType] = useState<"epic" | "aadhaar">("epic");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  const handleVerifyIdentity = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!identityNumber) {
      toast.error("Please enter an identity number");
      return;
    }
    
    setIsVerifying(true);
    setVerificationError(null);
    
    try {
      // IMPORTANT: In a real implementation, you would verify the voter's identity
      // against the electoral roll or Aadhaar database.
      // Comment: Here you need to enter the voter verification logic
      
      // Create a dummy voter object for testing
      const dummyVoter = {
        id: "voter-" + Math.floor(Math.random() * 1000),
        epicNumber: identityType === "epic" ? identityNumber : "ABC" + Math.floor(Math.random() * 10000000),
        aadhaarNumber: identityType === "aadhaar" ? identityNumber : "1234" + Math.floor(Math.random() * 10000000),
        name: "Test Voter",
        age: 35,
        gender: "Male",
        address: "123 Test Street, Test City, Test State",
        pollingStationId: "station-1", // This should match the current polling station
        fingerprint: "test-fingerprint-data",
        faceImage: "test-face-image-data",
        hasVoted: false
      };
      
      // For simplicity, we'll just proceed with the dummy voter
      setCurrentVoter(dummyVoter);
      setCurrentStep("identity-verification");
      toast.success("Voter identity verified successfully");
    } catch (error) {
      setVerificationError("An error occurred during verification");
      toast.error("An error occurred during verification");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard>
        <div className="flex items-center mb-6">
          <div className="bg-safe-primary text-white p-2 rounded-full mr-3">
            <Search className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-medium">Voter Identification</h2>
        </div>

        <form onSubmit={handleVerifyIdentity}>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="identityNumber" className="block text-sm font-medium text-gray-700">
                Enter voter's identification number
              </label>
              
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="w-4 h-4 text-blue-600"
                    name="identityType"
                    checked={identityType === "epic"}
                    onChange={() => setIdentityType("epic")}
                  />
                  <span className="ml-2 text-sm text-gray-700">EPIC</span>
                </label>
                
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="w-4 h-4 text-blue-600"
                    name="identityType"
                    checked={identityType === "aadhaar"}
                    onChange={() => setIdentityType("aadhaar")}
                  />
                  <span className="ml-2 text-sm text-gray-700">Aadhaar</span>
                </label>
              </div>
            </div>
            
            <div className="relative">
              <input
                type="text"
                id="identityNumber"
                className="w-full p-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={identityType === "epic" ? "e.g. ABC1234567" : "e.g. 123456789012"}
                value={identityNumber}
                onChange={(e) => setIdentityNumber(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {identityType === "epic" ? (
                  <span className="text-gray-400">EPIC</span>
                ) : (
                  <span className="text-gray-400">UID</span>
                )}
              </div>
            </div>
          </div>

          {verificationError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100 text-sm"
            >
              <div className="flex items-start">
                <XCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">Verification Failed</p>
                  <p className="mt-1">{verificationError}</p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="mt-6">
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-safe-primary hover:bg-blue-700 text-white py-3 px-4 rounded-md transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
              disabled={isVerifying || !identityNumber}
            >
              {isVerifying ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                <span className="flex items-center">
                  Verify Voter <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              )}
            </button>
          </div>
        </form>
      </GlassCard>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6 text-center text-xs text-slate-500"
      >
        <p>Need to return to polling station selection?</p>
        <button
          className="text-safe-primary hover:underline mt-1"
          onClick={() => navigate("/polling-station")}
        >
          Change Polling Station
        </button>
      </motion.div>
    </motion.div>
  );
};

export default IdentityVerification;
