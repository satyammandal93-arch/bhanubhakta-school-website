"use client";

import { useEffect, useState } from "react";

export function Toast({ message, tone, onClose }: { message: string; tone: "success" | "error"; onClose: () => void }) {
  useEffect(() => { const timer = setTimeout(onClose, 5000); return () => clearTimeout(timer); }, [onClose]);
  return <div className={`toast ${tone}`} role="status">{message}<button onClick={onClose} aria-label="Close notification">×</button></div>;
}

export function useToast() { const [toast, setToast] = useState<{message: string; tone: "success" | "error"} | null>(null); return { toast, showToast: (message: string, tone: "success" | "error") => setToast({message, tone}), closeToast: () => setToast(null) }; }
