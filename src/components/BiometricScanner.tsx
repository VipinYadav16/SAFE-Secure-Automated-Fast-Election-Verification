
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Fingerprint } from "lucide-react";

type BiometricScannerProps = {
  onComplete: (success: boolean) => void;
  autoStart?: boolean;
  simulatedResult?: boolean;
};

const BiometricScanner = ({ 
  onComplete, 
  autoStart = false,
  simulatedResult = true 
}: BiometricScannerProps) => {
  const [scanning, setScanning] = useState(autoStart);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (scanning) {
      timer = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            clearInterval(timer);
            setScanning(false);
            onComplete(simulatedResult);
            return 100;
          }
          return newProgress;
        });
      }, 50);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [scanning, onComplete, simulatedResult]);

  const handleStartScan = () => {
    setProgress(0);
    setScanning(true);
  };

  return (
    <div className="relative">
      <div className="flex flex-col items-center justify-center">
        <motion.div
          className="relative w-24 h-24 sm:w-32 sm:h-32 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Fingerprint
            className={`w-12 h-12 sm:w-16 sm:h-16 ${scanning ? "text-blue-500 animate-pulse" : "text-slate-400"}`}
          />
          {scanning && (
            <div className="scan-line"></div>
          )}
        </motion.div>
        
        {scanning ? (
          <div className="mt-4 w-full max-w-xs">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Scanning fingerprint</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <motion.div
                className="bg-blue-500 h-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              ></motion.div>
            </div>
            <p className="text-xs text-center mt-2 text-slate-500">
              Please keep your finger on the scanner
            </p>
          </div>
        ) : (
          <button
            className="mt-4 px-4 py-2 bg-safe-primary text-white rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
            onClick={handleStartScan}
          >
            {progress === 100 ? "Scan Again" : "Start Scan"}
          </button>
        )}
      </div>
    </div>
  );
};

export default BiometricScanner;
