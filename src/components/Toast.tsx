'use client';

import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  visible: boolean;
  onDone: () => void;
}

export default function Toast({ message, visible, onDone }: ToastProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (visible) {
      setExiting(false);
      const timer = setTimeout(() => {
        setExiting(true);
        setTimeout(onDone, 200);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [visible, onDone]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div
        className={`
          px-5 py-3 rounded-2xl
          bg-bg-card/95 backdrop-blur-xl border border-border-hover
          shadow-[0_8px_32px_rgba(0,0,0,0.4)]
          flex items-center gap-2.5
          ${exiting ? 'toast-exit' : 'toast-enter'}
        `}
      >
        <span className="text-accent text-lg">✓</span>
        <span className="text-text-primary text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}
