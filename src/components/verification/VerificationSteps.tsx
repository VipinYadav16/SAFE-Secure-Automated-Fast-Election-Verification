
import React from "react";
import { motion } from "framer-motion";
import { User, Fingerprint, Camera, CheckCircle } from "lucide-react";
import { useVerification } from "@/context/VerificationContext";

const VerificationSteps = () => {
  const { currentStep, biometricSuccess, facialSuccess, finalVerificationStatus } = useVerification();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {[
          { key: "identity", label: "Identity", icon: User, completed: currentStep !== "idle" },
          { key: "biometric", label: "Biometric", icon: Fingerprint, completed: currentStep === "completed" || currentStep === "failed" || biometricSuccess },
          { key: "facial", label: "Facial", icon: Camera, completed: currentStep === "completed" || currentStep === "failed" || facialSuccess },
          { key: "verified", label: "Verified", icon: CheckCircle, completed: currentStep === "completed" && finalVerificationStatus === "success" }
        ].map((step, index, steps) => (
          <React.Fragment key={step.key}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col items-center ${
                currentStep === step.key ? "text-safe-primary" : step.completed ? "text-green-500" : "text-slate-400"
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep === step.key 
                  ? "bg-safe-primary text-white" 
                  : step.completed 
                  ? "bg-green-100 text-green-500" 
                  : "bg-slate-100"
              }`}>
                <step.icon className="w-5 h-5" />
              </div>
              <span className="text-xs mt-2">{step.label}</span>
            </motion.div>
            
            {index < steps.length - 1 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.05 }}
                className={`flex-1 h-0.5 mx-2 ${
                  steps[index + 1].completed 
                    ? "bg-green-500" 
                    : "bg-slate-200"
                }`}
              ></motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default VerificationSteps;
