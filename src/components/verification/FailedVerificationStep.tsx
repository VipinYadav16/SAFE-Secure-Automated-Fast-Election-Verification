
import React from "react";
import { motion } from "framer-motion";
import { XCircle, ArrowRight } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { useVerification } from "@/context/VerificationContext";

const FailedVerificationStep = () => {
  const { currentVoter, resetVerification } = useVerification();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard className="text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-500 text-white p-4 rounded-full">
            <XCircle className="w-8 h-8" />
          </div>
        </div>
        
        <h2 className="text-2xl font-medium mb-2">Verification Failed</h2>
        <p className="text-slate-600 mb-6">
          The voter could not be verified and cannot proceed to vote.
        </p>
        
        {currentVoter && (
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 text-left mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500">Name</p>
                <p className="font-medium">{currentVoter.name}</p>
              </div>
              <div>
                <p className="text-slate-500">EPIC Number</p>
                <p className="font-medium">{currentVoter.epicNumber}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-center gap-4">
          <button
            className="bg-safe-primary hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors flex items-center"
            onClick={resetVerification}
          >
            New Verification <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default FailedVerificationStep;
