"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ToastNotification, ToastState } from "@/components/ui/ToastNotification";

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState<ToastState>({
    show: false,
    type: "success",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ show: true, type, message });
    window.setTimeout(() => {
      setToast((t) => ({ ...t, show: false }));
    }, 4500);
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Please enter a subject";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        showToast("success", "Message sent successfully! I'll get back to you soon.");

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setErrors({});
      } else {
        showToast("error", "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      showToast("error", "Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <ToastNotification
        toast={toast}
        onDismiss={() => setToast((t) => ({ ...t, show: false }))}
      />

      <form
        onSubmit={handleSubmit}
        noValidate
        className="group relative bg-white dark:bg-white/[0.03] rounded-xl border border-slate-200/80 dark:border-white/[0.08] p-6 sm:p-8 space-y-6 overflow-hidden shadow-[0_2px_12px_rgba(15,23,42,0.07)] dark:shadow-none"
      >
        {/* Background Effect */}
        <div className="absolute inset-0 pointer-events-none rounded-xl bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5" />

        {/* Name & Email */}
        <div className="relative z-10 grid sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2"
            >
              Name
            </label>

            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                errors.name
                  ? "border-red-400 dark:border-red-600 focus:ring-red-500"
                  : "border-slate-300 dark:border-zinc-700 focus:ring-blue-500"
              }`}
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2"
            >
              Email
            </label>

            <input
              type="text"
              id="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                errors.email
                  ? "border-red-400 dark:border-red-600 focus:ring-red-500"
                  : "border-slate-300 dark:border-zinc-700 focus:ring-blue-500"
              }`}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Subject */}
        <div className="relative z-10">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2"
          >
            Subject
          </label>

          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={(e) => {
              setFormData({ ...formData, subject: e.target.value });
              if (errors.subject) setErrors({ ...errors, subject: undefined });
            }}
            className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
              errors.subject
                ? "border-red-400 dark:border-red-600 focus:ring-red-500"
                : "border-slate-300 dark:border-zinc-700 focus:ring-blue-500"
            }`}
            placeholder="Project Inquiry"
          />
          {errors.subject && (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>
          )}
        </div>

        {/* Message */}
        <div className="relative z-10">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2"
          >
            Message (Optional)
          </label>

          <textarea
            id="message"
            rows={6}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full min-h-[160px] px-4 py-3 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Tell me about your project..."
          />
        </div>

        {/* Submit Button */}
        <div className="relative z-20">
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.01 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="group relative w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl
                   bg-gradient-to-b from-zinc-800 to-zinc-950
                   dark:from-zinc-100 dark:to-white
                   text-white dark:text-zinc-900
                   font-semibold text-base tracking-wide
                   border border-white/10 dark:border-black/5
                   shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_8px_24px_-8px_rgba(0,0,0,0.5)]
                   dark:shadow-[0_1px_0_0_rgba(255,255,255,0.6)_inset,0_8px_24px_-8px_rgba(0,0,0,0.25)]
                   overflow-hidden
                   transition-shadow duration-300
                   hover:shadow-[0_1px_0_0_rgba(255,255,255,0.2)_inset,0_12px_32px_-8px_rgba(79,70,229,0.45)]
                   disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {/* Shine sweep on hover */}
            <span
              className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full
                       transition-transform duration-700 ease-out
                       bg-gradient-to-r from-transparent via-white/10 to-transparent
                       dark:via-black/10 skew-x-12"
            />

            {loading ? (
              <>
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                  <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
                <span className="relative">Sending...</span>
              </>
            ) : (
              <>
                <span className="relative">Send Message</span>
                <svg
                  className="relative w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 12h15" />
                </svg>
              </>
            )}
          </motion.button>
        </div>
      </form>
    </>
  );
}
