import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Download, Upload, HardDrive, Trash2, AlertCircle, Check, Database } from 'lucide-react';
import localStorageService from '../utils/localStorage';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';

export function BackupSettings() {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const storageUsage = localStorageService.getStorageUsage();
  const lastBackup = localStorageService.getLastBackupTime();

  const handleExportData = () => {
    setIsExporting(true);
    try {
      const data = localStorageService.exportAllData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `mindspace-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setMessage({ type: 'success', text: 'Data exported successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to export data. Please try again.' });
    } finally {
      setIsExporting(false);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = async (e) => {
      setIsImporting(true);
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        setIsImporting(false);
        return;
      }

      try {
        const text = await file.text();
        const success = localStorageService.importAllData(text);
        
        if (success) {
          setMessage({ type: 'success', text: 'Data imported successfully! Refreshing page...' });
          setTimeout(() => window.location.reload(), 2000);
        } else {
          setMessage({ type: 'error', text: 'Failed to import data. Please check the file format.' });
        }
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to import data. Invalid file format.' });
      } finally {
        setIsImporting(false);
        setTimeout(() => setMessage(null), 5000);
      }
    };

    input.click();
  };

  const handleClearAllData = () => {
    if (!showClearConfirm) {
      setShowClearConfirm(true);
      return;
    }

    try {
      const success = localStorageService.clearAllData();
      if (success) {
        setMessage({ type: 'success', text: 'All data cleared successfully! Refreshing page...' });
        setTimeout(() => window.location.reload(), 2000);
      } else {
        setMessage({ type: 'error', text: 'Failed to clear data. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to clear data. Please try again.' });
    } finally {
      setShowClearConfirm(false);
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle>Local Backup System</CardTitle>
              <CardDescription>
                Your data is stored securely in your browser
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Storage Usage */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-purple-600" />
                <span className="font-medium">Storage Usage</span>
              </div>
              <Badge variant={storageUsage.percentage > 80 ? 'destructive' : 'secondary'}>
                {storageUsage.percentage.toFixed(1)}% used
              </Badge>
            </div>
            <Progress value={storageUsage.percentage} className="h-2" />
            <p className="text-sm text-gray-600">
              {formatBytes(storageUsage.used)} of {formatBytes(storageUsage.available)} used
            </p>
          </div>

          {/* Last Backup */}
          <div className="flex items-center justify-between p-4 bg-white/60 rounded-lg">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Last Backup</span>
            </div>
            <span className="text-sm text-gray-600">{formatDate(lastBackup)}</span>
          </div>

          {/* Message Alert */}
          {message && (
            <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
              {message.type === 'success' ? (
                <Check className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="grid gap-3">
            <Button
              onClick={handleExportData}
              disabled={isExporting}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Download className="w-4 h-4 mr-2" />
              {isExporting ? 'Exporting...' : 'Export Backup'}
            </Button>

            <Button
              onClick={handleImportData}
              disabled={isImporting}
              variant="outline"
              className="w-full border-purple-300 hover:bg-purple-50"
            >
              <Upload className="w-4 h-4 mr-2" />
              {isImporting ? 'Importing...' : 'Import Backup'}
            </Button>

            {showClearConfirm ? (
              <div className="space-y-2">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Are you sure? This will delete ALL your local data permanently!
                  </AlertDescription>
                </Alert>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={handleClearAllData}
                    variant="destructive"
                    className="w-full"
                  >
                    Yes, Clear All
                  </Button>
                  <Button
                    onClick={() => setShowClearConfirm(false)}
                    variant="outline"
                    className="w-full"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => setShowClearConfirm(true)}
                variant="outline"
                className="w-full border-red-300 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All Data
              </Button>
            )}
          </div>

          {/* Info */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-blue-900">About Local Storage</p>
                <ul className="space-y-1 list-disc list-inside text-gray-600">
                  <li>Data is stored only on this device and browser</li>
                  <li>Clearing browser data will delete your information</li>
                  <li>Export backups regularly to keep your data safe</li>
                  <li>Import backups to restore or transfer data between devices</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
