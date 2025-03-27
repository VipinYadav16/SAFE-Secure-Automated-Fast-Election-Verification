
import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, XCircle, CheckCircle } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { useVerification } from "@/context/VerificationContext";
import { toast } from "sonner";

const ManualVerificationStep = () => {
  const { 
    manualVerificationReason, 
    setManualVerificationReason,
    setFinalVerificationStatus,
    setCurrentStep
  } = useVerification();

  const handleManualVerification = async (approved: boolean) => {
    if (!approved) {
      setFinalVerificationStatus("failed");
      setCurrentStep("failed");
      toast.error("Voter verification rejected manually");
      return;
    }
    
    if (!manualVerificationReason) {
      toast.error("Please provide a reason for manual verification");
      return;
    }
    
    try {
      // IMPORTANT: In a real implementation, you would record the manual verification
      // in a database and mark the voter as having voted.
      // Comment: Here you need to enter the manual verification logic
      
      // For simplicity, we'll just proceed
      setFinalVerificationStatus("success");
      setCurrentStep("completed");
      toast.success("Manual verification completed successfully");
    } catch (error) {
      setFinalVerificationStatus("failed");
      setCurrentStep("failed");
      toast.error("An error occurred while completing manual verification");
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
          <div className="bg-amber-500 text-white p-2 rounded-full mr-3">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-medium">Manual Verification Required</h2>
        </div>

        <div className="p-4 bg-amber-50 text-amber-800 rounded-lg border border-amber-100 mb-6">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
            <div>
              <p className="font-medium">Automatic verification failed</p>
              <p className="mt-1">Please verify the voter's identity manually using their physical ID documents.</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="manualReason" className="block text-sm font-medium text-gray-700 mb-1">
            Reason for manual verification
          </label>
          <textarea
            id="manualReason"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            placeholder="Please provide a detailed reason for manual verification (e.g., biometric failure, poor fingerprint quality, etc.)"
            value={manualVerificationReason}
            onChange={(e) => setManualVerificationReason(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="flex justify-end gap-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors flex items-center"
            onClick={() => handleManualVerification(false)}
          >
            Reject Voter <XCircle className="ml-2 w-4 h-4" />
          </button>
          
          <button
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors flex items-center"
            onClick={() => handleManualVerification(true)}
            disabled={!manualVerificationReason}
          >
            Approve Voter <CheckCircle className="ml-2 w-4 h-4" />
          </button>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default ManualVerificationStep;
