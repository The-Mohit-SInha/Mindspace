import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, Check, AlertCircle } from 'lucide-react';
import localStorageService from '../utils/localStorage';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export function LocalBackupIndicator() {
  const [storageUsage, setStorageUsage] = useState({ used: 0, available: 0, percentage: 0 });
  const [lastBackup, setLastBackup] = useState<string | null>(null);
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    // Update storage usage
    const updateUsage = () => {
      const usage = localStorageService.getStorageUsage();
      setStorageUsage(usage);
      
      const backup = localStorageService.getLastBackupTime();
      setLastBackup(backup);
    };

    updateUsage();

    // Update every 10 seconds
    const interval = setInterval(updateUsage, 10000);
    return () => clearInterval(interval);
  }, []);

  // Listen for storage events
  useEffect(() => {
    const handleStorageChange = () => {
      setShowPulse(true);
      setTimeout(() => setShowPulse(false), 1000);
      
      const usage = localStorageService.getStorageUsage();
      setStorageUsage(usage);
      setLastBackup(localStorageService.getLastBackupTime());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 KB';
    const k = 1024;
    const mb = bytes / (k * k);
    if (mb > 1) return `${mb.toFixed(1)} MB`;
    return `${(bytes / k).toFixed(0)} KB`;
  };

  const getStatusColor = () => {
    if (storageUsage.percentage > 80) return 'text-red-600';
    if (storageUsage.percentage > 50) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getStatusIcon = () => {
    if (storageUsage.percentage > 80) return AlertCircle;
    return Check;
  };

  const StatusIcon = getStatusIcon();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100/80 backdrop-blur-sm border border-gray-200 cursor-pointer hover:bg-gray-200/80 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence>
              {showPulse && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-green-400/30"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </AnimatePresence>
            
            <Database className={`w-4 h-4 ${getStatusColor()}`} />
            <StatusIcon className={`w-3 h-3 ${getStatusColor()}`} />
            
            <span className="text-xs font-medium text-gray-700">
              {formatBytes(storageUsage.used)}
            </span>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-white border-gray-200 shadow-xl">
          <div className="space-y-2 p-2">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-purple-600" />
              <span className="font-semibold text-sm">Local Backup Active</span>
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <div className="flex justify-between gap-4">
                <span>Storage Used:</span>
                <span className="font-medium">{formatBytes(storageUsage.used)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Available:</span>
                <span className="font-medium">{formatBytes(storageUsage.available)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Usage:</span>
                <span className={`font-medium ${getStatusColor()}`}>
                  {storageUsage.percentage.toFixed(1)}%
                </span>
              </div>
              {lastBackup && (
                <div className="pt-1 mt-1 border-t border-gray-200">
                  <span className="text-gray-500">
                    Last backup: {new Date(lastBackup).toLocaleTimeString()}
                  </span>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 pt-1 border-t border-gray-200">
              Your data is stored locally in your browser
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
