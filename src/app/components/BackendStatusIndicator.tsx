import { useEffect, useState } from 'react';
import { isBackendConfigured } from '../../lib/supabase';
import { Database, Server } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function BackendStatusIndicator() {
  const [show, setShow] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem('backend_status_dismissed');
    if (isDismissed) {
      setDismissed(true);
      setShow(false);
    } else {
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('backend_status_dismissed', 'true');
    setDismissed(true);
    setShow(false);
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4 z-50 max-w-sm"
        >
          <div
            className={`rounded-lg shadow-xl border-2 p-4 backdrop-blur-md ${
              isBackendConfigured
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
                : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-300'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-lg ${
                  isBackendConfigured ? 'bg-green-100' : 'bg-blue-100'
                }`}
              >
                {isBackendConfigured ? (
                  <Server className="w-5 h-5 text-green-600" />
                ) : (
                  <Database className="w-5 h-5 text-blue-600" />
                )}
              </div>
              <div className="flex-1">
                <h3
                  className={`font-semibold mb-1 ${
                    isBackendConfigured ? 'text-green-900' : 'text-blue-900'
                  }`}
                >
                  {isBackendConfigured ? 'Backend Connected' : 'Demo Mode'}
                </h3>
                <p
                  className={`text-sm ${
                    isBackendConfigured ? 'text-green-800' : 'text-blue-800'
                  }`}
                >
                  {isBackendConfigured
                    ? 'Connected to Supabase. All data is synced to the cloud.'
                    : 'Using local storage. Data is saved in your browser only.'}
                </p>
                {!isBackendConfigured && (
                  <a
                    href="/BACKEND_SETUP.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-700 underline mt-1 inline-block font-medium"
                  >
                    Setup Supabase backend →
                  </a>
                )}
              </div>
              <button
                onClick={handleDismiss}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Dismiss"
              >
                ×
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
