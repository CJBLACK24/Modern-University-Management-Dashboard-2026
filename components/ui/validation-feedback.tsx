"use client";

import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export type ValidationStatus = "success" | "error" | "warning" | "info";

interface ValidationFeedbackProps {
  status: ValidationStatus;
  message: string;
  className?: string;
}

const statusConfig = {
  success: {
    icon: CheckCircle2,
    className: "text-success border-success/20 bg-success/10",
  },
  error: {
    icon: AlertCircle,
    className: "text-destructive border-destructive/20 bg-destructive/10",
  },
  warning: {
    icon: AlertTriangle,
    className: "text-warning border-warning/20 bg-warning/10",
  },
  info: {
    icon: Info,
    className: "text-info border-info/20 bg-info/10",
  },
};

export function ValidationFeedback({
  status,
  message,
  className,
}: ValidationFeedbackProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex items-start gap-2 rounded-md border p-3 text-sm animate-in fade-in slide-in-from-top-1 duration-200",
        config.className,
        className
      )}
      role="alert"
    >
      <Icon className="h-4 w-4 mt-0.5 shrink-0" />
      <p className="flex-1">{message}</p>
    </div>
  );
}

interface InlineValidationProps {
  status?: ValidationStatus;
  message?: string;
}

export function InlineValidation({ status, message }: InlineValidationProps) {
  if (!status || !message) return null;

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 text-xs mt-1.5 animate-in fade-in slide-in-from-top-1 duration-200",
        status === "success" && "text-success",
        status === "error" && "text-destructive",
        status === "warning" && "text-warning",
        status === "info" && "text-info"
      )}
      role="alert"
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}