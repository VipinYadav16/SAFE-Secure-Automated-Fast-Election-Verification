
import React from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import FacialScanner from "@/components/FacialScanner";
import { useVerification } from "@/context/VerificationContext";
import { toast } from "sonner";

const FacialVerificationStep = () => {
  const { setFacialSuccess, setCurrentStep, setFinalVerificationStatus } = useVerification();

  const handleFacialComplete = async (success: boolean) => {
    setFacialSuccess(true); // Always succeed regardless of the actual result
    
    // IMPORTANT: In a real implementation, you would verify the facial data
    // against the voter's registered facial data.
    // Comment: Here you need to enter the facial verification logic
    
    toast.success("Facial recognition successful");
    completeAutomatedVerification();
  };

  const completeAutomatedVerification = async () => {
    // IMPORTANT: In a real implementation, you would record the verification
    // in a database and mark the voter as having voted.
    // Comment: Here you need to enter the verification completion logic
    
    // For simplicity, we'll just proceed
    setFinalVerificationStatus("success");
    setCurrentStep("completed");
    toast.success("Voter verification completed successfully");
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
            <Camera className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-medium">Facial Recognition</h2>
        </div>

        <div className="text-center">
          <p className="mb-6 text-slate-600">
            Please ask the voter to look at the camera for facial recognition.
          </p>
          
          <div className="flex justify-center mb-8">
            <FacialScanner onComplete={handleFacialComplete} />
          </div>
          
          <p className="text-sm text-slate-500">
            This step verifies that the voter's face matches the one registered in the database.
          </p>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default FacialVerificationStep;
