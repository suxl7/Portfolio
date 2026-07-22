"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, X } from "lucide-react";

export interface ToastState {
  show: boolean;
  type: "success" | "error";
  message: string;
}

interface ToastNotificationProps {
  toast: ToastState;
  onDismiss: () => void;
}

export function ToastNotification({ toast, onDismiss }: ToastNotificationProps) {
  return (
    <AnimatePresence>
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: -24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[999] w-[92%] max-w-md"
        >
          <div
            className={`flex items-start gap-3 rounded-xl border p-4 shadow-2xl backdrop-blur-md ${
              toast.type === "success"
                ? "bg-emerald-50/95 dark:bg-emerald-950/90 border-emerald-200 dark:border-emerald-800"
                : "bg-red-50/95 dark:bg-red-950/90 border-red-200 dark:border-red-800"
            }`}
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                toast.type === "success"
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                  : "bg-red-500/15 text-red-600 dark:text-red-400"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
            </div>
            <div className="flex-1 pt-0.5">
              <p
                className={`text-sm font-semibold ${
                  toast.type === "success"
                    ? "text-emerald-800 dark:text-emerald-200"
                    : "text-red-800 dark:text-red-200"
                }`}
              >
                {toast.type === "success" ? "Message Sent" : "Something Went Wrong"}
              </p>
              <p
                className={`text-sm mt-0.5 ${
                  toast.type === "success"
                    ? "text-emerald-700/90 dark:text-emerald-300/90"
                    : "text-red-700/90 dark:text-red-300/90"
                }`}
              >
                {toast.message}
              </p>
            </div>
            <button
              type="button"
              onClick={onDismiss}
              className="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
