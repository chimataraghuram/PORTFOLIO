import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  const icons = {
    success: <CheckCircle2 size={16} className="text-green-400 shrink-0" />,
    error:   <XCircle     size={16} className="text-red-400 shrink-0" />,
    info:    <Info        size={16} className="text-blue-400 shrink-0" />,
  };

  const borders = {
    success: 'border-green-500/40',
    error:   'border-red-500/40',
    info:    'border-blue-500/40',
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-20 right-4 z-[999] flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl border ${borders[toast.type]} bg-slate-900/95 backdrop-blur-xl shadow-2xl text-sm font-bold text-white pointer-events-auto animate-liquid-drop`}
            style={{ minWidth: '200px', maxWidth: '300px' }}
          >
            {icons[toast.type]}
            <span className="flex-1 text-xs tracking-wide">{toast.message}</span>
            <button
              onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
              className="text-gray-500 hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
