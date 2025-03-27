
// Mock data for demonstration purposes

// Polling officers
export const pollingOfficers = [
  {
    id: "PO001",
    name: "Rajesh Kumar",
    designation: "Presiding Officer",
    fingerprint: "fingerprint-data-1",
  },
  {
    id: "PO002",
    name: "Sunita Sharma",
    designation: "Assistant Presiding Officer",
    fingerprint: "fingerprint-data-2",
  },
  {
    id: "PO003",
    name: "Anand Patel",
    designation: "Polling Officer",
    fingerprint: "fingerprint-data-3",
  },
];

// Polling stations
export const pollingStations = [
  {
    id: "PS001",
    name: "Municipal School No. 1",
    address: "Sector 10, New Delhi",
    constituency: "New Delhi",
    district: "Central Delhi",
    state: "Delhi",
  },
  {
    id: "PS002",
    name: "Government College",
    address: "MG Road, Bangalore",
    constituency: "Bangalore Central",
    district: "Bangalore Urban",
    state: "Karnataka",
  },
  {
    id: "PS003",
    name: "Public Library Hall",
    address: "Park Street, Kolkata",
    constituency: "Kolkata South",
    district: "Kolkata",
    state: "West Bengal",
  },
];

// Mock voter database
export const voters = [
  {
    id: "V001",
    epicNumber: "ABC1234567",
    aadhaarNumber: "123456789012",
    name: "Amit Sharma",
    age: 32,
    gender: "Male",
    address: "123, Sector 10, New Delhi",
    pollingStationId: "PS001",
    fingerprint: "fingerprint-data-v1",
    faceImage: "face-image-v1",
    hasVoted: false,
  },
  {
    id: "V002",
    epicNumber: "DEF2345678",
    aadhaarNumber: "234567890123",
    name: "Priya Singh",
    age: 28,
    gender: "Female",
    address: "456, MG Road, Bangalore",
    pollingStationId: "PS002",
    fingerprint: "fingerprint-data-v2",
    faceImage: "face-image-v2",
    hasVoted: false,
  },
  {
    id: "V003",
    epicNumber: "GHI3456789",
    aadhaarNumber: "345678901234",
    name: "Rahul Gupta",
    age: 45,
    gender: "Male",
    address: "789, Park Street, Kolkata",
    pollingStationId: "PS003",
    fingerprint: "fingerprint-data-v3",
    faceImage: "face-image-v3",
    hasVoted: false,
  },
  {
    id: "V004",
    epicNumber: "JKL4567890",
    aadhaarNumber: "456789012345",
    name: "Neha Patel",
    age: 31,
    gender: "Female",
    address: "567, Sector 15, New Delhi",
    pollingStationId: "PS001",
    fingerprint: "fingerprint-data-v4",
    faceImage: "face-image-v4",
    hasVoted: false,
  },
  {
    id: "V005",
    epicNumber: "MNO5678901",
    aadhaarNumber: "567890123456",
    name: "Sunil Verma",
    age: 56,
    gender: "Male",
    address: "890, Church Street, Bangalore",
    pollingStationId: "PS002",
    fingerprint: "fingerprint-data-v5",
    faceImage: "face-image-v5",
    hasVoted: true,
  },
];

// Mock verification logs
export const verificationLogs = [
  {
    id: "L001",
    voterId: "V001",
    pollingStationId: "PS001",
    officerId: "PO001",
    timestamp: "2023-05-01T09:15:30Z",
    status: "success",
    verificationMethod: "biometric",
    notes: "",
  },
  {
    id: "L002",
    voterId: "V002",
    pollingStationId: "PS002",
    officerId: "PO002",
    timestamp: "2023-05-01T10:20:45Z",
    status: "success",
    verificationMethod: "biometric",
    notes: "",
  },
  {
    id: "L003",
    voterId: "V003",
    pollingStationId: "PS003",
    officerId: "PO003",
    timestamp: "2023-05-01T11:30:15Z",
    status: "manual",
    verificationMethod: "manual",
    notes: "Fingerprint not readable due to manual labor",
  },
  {
    id: "L004",
    voterId: "V005",
    pollingStationId: "PS002",
    officerId: "PO002",
    timestamp: "2023-05-01T13:45:20Z",
    status: "success",
    verificationMethod: "biometric",
    notes: "",
  },
];

// Helper functions for mock data
export const findVoterByEpic = (epicNumber: string) => {
  return voters.find((voter) => voter.epicNumber === epicNumber);
};

export const findVoterByAadhaar = (aadhaarNumber: string) => {
  return voters.find((voter) => voter.aadhaarNumber === aadhaarNumber);
};

export const findPollingStation = (stationId: string) => {
  return pollingStations.find((station) => station.id === stationId);
};

export const findPollingOfficer = (officerId: string) => {
  return pollingOfficers.find((officer) => officer.id === officerId);
};

export const addVerificationLog = (log: Omit<typeof verificationLogs[0], "id">) => {
  const newLog = {
    ...log,
    id: `L${verificationLogs.length + 1}`.padStart(4, "0"),
  };
  verificationLogs.push(newLog);
  return newLog;
};

export const markVoterAsVoted = (voterId: string) => {
  const voterIndex = voters.findIndex((voter) => voter.id === voterId);
  if (voterIndex !== -1) {
    voters[voterIndex].hasVoted = true;
    return true;
  }
  return false;
};
