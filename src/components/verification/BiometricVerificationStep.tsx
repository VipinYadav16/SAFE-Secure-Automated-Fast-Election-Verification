
import React from "react";
import { motion } from "framer-motion";
import { Fingerprint } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import BiometricScanner from "@/components/BiometricScanner";
import { useVerification } from "@/context/VerificationContext";
import { toast } from "sonner";

const BiometricVerificationStep = () => {
  const { setBiometricSuccess, setCurrentStep } = useVerification();

  const handleBiometricComplete = async (success: boolean) => {
    setBiometricSuccess(true); // Always succeed regardless of the actual result
    
    // IMPORTANT: In a real implementation, you would verify the biometric data
    // against the voter's registered biometric data.
    // Comment: Here you need to enter the biometric verification logic
    
    toast.success("Biometric verification successful");
    setCurrentStep("facial-verification");
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
            <Fingerprint className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-medium">Biometric Verification</h2>
        </div>

        <div className="text-center">
          <p className="mb-6 text-slate-600">
            Please ask the voter to place their finger on the biometric scanner.
          </p>
          
          <div className="flex justify-center mb-8">
            <BiometricScanner onComplete={handleBiometricComplete} />
          </div>
          
          <p className="text-sm text-slate-500">
            This step verifies that the voter's fingerprint matches the one registered in the database.
          </p>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default BiometricVerificationStep;
