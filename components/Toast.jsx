import { useEffect } from "react";

export default function Toast({ message, show, onClose }) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => onClose && onClose(), 2200);
    return () => clearTimeout(t);
  }, [show, onClose]);

  if (!show) return null;
  return (
    <div className="fixed right-6 bottom-6 bg-slate-900 text-white px-4 py-2 rounded-md shadow-lg toast z-50">
      {message}
    </div>
  );
}
