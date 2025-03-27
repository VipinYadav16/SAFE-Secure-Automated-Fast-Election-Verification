
import React from "react";
import { motion } from "framer-motion";
import { User, ArrowRight } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import StatusBadge from "@/components/StatusBadge";
import { useVerification } from "@/context/VerificationContext";

const VoterDetails = () => {
  const { currentVoter, setCurrentStep } = useVerification();

  if (!currentVoter) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard>
        <div className="flex items-center mb-6">
          <div className="bg-safe-primary text-white p-2 rounded-full mr-3">
            <User className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-medium">Voter Details</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-slate-500 mb-1">Name</p>
            <p className="font-medium">{currentVoter.name}</p>
          </div>
          
          <div>
            <p className="text-sm text-slate-500 mb-1">Age / Gender</p>
            <p className="font-medium">{currentVoter.age} years / {currentVoter.gender}</p>
          </div>
          
          <div className="md:col-span-2">
            <p className="text-sm text-slate-500 mb-1">Address</p>
            <p className="font-medium">{currentVoter.address}</p>
          </div>
          
          <div>
            <p className="text-sm text-slate-500 mb-1">EPIC Number</p>
            <p className="font-medium">{currentVoter.epicNumber}</p>
          </div>
          
          <div>
            <p className="text-sm text-slate-500 mb-1">Aadhaar Number</p>
            <p className="font-medium">{currentVoter.aadhaarNumber.replace(/(\d{4})(\d{4})(\d{4})/, "$1-$2-$3")}</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="flex justify-between items-center">
            <StatusBadge status="success" text="Identity Verified" />
            
            <button
              className="bg-safe-primary hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors flex items-center"
              onClick={() => setCurrentStep("biometric-verification")}
            >
              Next: Biometric Verification <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default VoterDetails;
