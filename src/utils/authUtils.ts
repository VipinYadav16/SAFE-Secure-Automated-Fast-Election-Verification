
import { pollingOfficers } from "./mockData";

// Simulating officer authentication
export const authenticateOfficer = (fingerprintData: string): Promise<{ success: boolean; officerId?: string }> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const officer = pollingOfficers.find(
        (officer) => officer.fingerprint === fingerprintData
      );
      
      if (officer) {
        resolve({ success: true, officerId: officer.id });
      } else {
        resolve({ success: false });
      }
    }, 1500);
  });
};

// Simulating voter verification
export const verifyVoterIdentity = (
  identityNumber: string,
  pollingStationId: string,
  isAadhaar: boolean
): Promise<{
  success: boolean;
  voter?: any;
  error?: string;
}> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Import is inside to avoid circular dependencies
      const { findVoterByEpic, findVoterByAadhaar } = require("./mockData");
      
      const voter = isAadhaar
        ? findVoterByAadhaar(identityNumber)
        : findVoterByEpic(identityNumber);
      
      if (!voter) {
        resolve({
          success: false,
          error: "Voter not found in the database",
        });
        return;
      }
      
      if (voter.pollingStationId !== pollingStationId) {
        resolve({
          success: false,
          error: "Voter is not registered at this polling station",
        });
        return;
      }
      
      if (voter.hasVoted) {
        resolve({
          success: false,
          error: "Voter has already cast their vote",
        });
        return;
      }
      
      resolve({
        success: true,
        voter,
      });
    }, 1500);
  });
};

// Simulating biometric verification
export const verifyBiometric = (
  voterId: string,
  fingerprintData: string
): Promise<{ success: boolean; error?: string }> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Import is inside to avoid circular dependencies
      const { voters } = require("./mockData");
      
      const voter = voters.find((v) => v.id === voterId);
      
      if (!voter) {
        resolve({
          success: false,
          error: "Voter not found",
        });
        return;
      }
      
      // Simulate a 90% success rate for biometric verification
      const isSuccess = Math.random() < 0.9;
      
      resolve({
        success: isSuccess,
        error: isSuccess ? undefined : "Fingerprint does not match",
      });
    }, 2000);
  });
};

// Simulating facial recognition
export const verifyFacialRecognition = (
  voterId: string,
  faceImageData: string
): Promise<{ success: boolean; error?: string }> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Import is inside to avoid circular dependencies
      const { voters } = require("./mockData");
      
      const voter = voters.find((v) => v.id === voterId);
      
      if (!voter) {
        resolve({
          success: false,
          error: "Voter not found",
        });
        return;
      }
      
      // Simulate a 85% success rate for facial recognition
      const isSuccess = Math.random() < 0.85;
      
      resolve({
        success: isSuccess,
        error: isSuccess ? undefined : "Facial recognition failed",
      });
    }, 2500);
  });
};

// Complete the verification process and log it
export const completeVerification = (
  voterId: string,
  pollingStationId: string,
  officerId: string,
  verificationMethod: "biometric" | "facial" | "manual",
  notes: string = ""
): Promise<{ success: boolean; error?: string }> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Import is inside to avoid circular dependencies
      const { addVerificationLog, markVoterAsVoted } = require("./mockData");
      
      try {
        // Mark voter as voted
        const marked = markVoterAsVoted(voterId);
        
        if (!marked) {
          resolve({
            success: false,
            error: "Failed to mark voter as voted",
          });
          return;
        }
        
        // Add verification log
        addVerificationLog({
          voterId,
          pollingStationId,
          officerId,
          timestamp: new Date().toISOString(),
          status: verificationMethod === "manual" ? "manual" : "success",
          verificationMethod,
          notes,
        });
        
        resolve({
          success: true,
        });
      } catch (error) {
        resolve({
          success: false,
          error: "Failed to complete verification process",
        });
      }
    }, 1000);
  });
};
