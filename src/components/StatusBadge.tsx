
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, X, AlertCircle, Clock } from "lucide-react";

type StatusType = "success" | "error" | "warning" | "pending" | "info";

interface StatusBadgeProps {
  status: StatusType;
  text: string;
  className?: string;
}

const StatusBadge = ({ status, text, className }: StatusBadgeProps) => {
  const getStatusDetails = () => {
    switch (status) {
      case "success":
        return {
          bgColor: "bg-green-100",
          textColor: "text-green-800",
          icon: <Check className="w-4 h-4" />,
        };
      case "error":
        return {
          bgColor: "bg-red-100",
          textColor: "text-red-800",
          icon: <X className="w-4 h-4" />,
        };
      case "warning":
        return {
          bgColor: "bg-amber-100",
          textColor: "text-amber-800",
          icon: <AlertCircle className="w-4 h-4" />,
        };
      case "pending":
        return {
          bgColor: "bg-blue-100",
          textColor: "text-blue-800",
          icon: <Clock className="w-4 h-4" />,
        };
      case "info":
      default:
        return {
          bgColor: "bg-slate-100",
          textColor: "text-slate-800",
          icon: <AlertCircle className="w-4 h-4" />,
        };
    }
  };

  const { bgColor, textColor, icon } = getStatusDetails();

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        bgColor,
        textColor,
        className
      )}
    >
      <span className="mr-1">{icon}</span>
      {text}
    </motion.span>
  );
};

export default StatusBadge;
