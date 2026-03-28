import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { CheckCircle2, Circle, AlertCircle, ExternalLink, Copy, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface SetupStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'inprogress' | 'complete' | 'error';
  action?: () => void;
  actionLabel?: string;
  details?: string;
}

export function BackendSetupChecklist() {
  const [steps, setSteps] = useState<SetupStep[]>([
    {
      id: 'env',
      title: 'Environment Variables',
      description: '.env file created with Supabase credentials',
      status: 'complete',
      details: 'VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are configured'
    },
    {
      id: 'database',
      title: 'Database Schema',
      description: 'Run complete-init.sql in Supabase SQL Editor',
      status: 'pending',
      actionLabel: 'Open SQL File',
      details: 'Creates all 15 tables, indexes, RLS policies, and functions'
    },
    {
      id: 'seed',
      title: 'Sample Data (Optional)',
      description: 'Run seed.sql to populate with sample content',
      status: 'pending',
      actionLabel: 'View Seed File',
      details: 'Adds sample resources, events, and assessments'
    },
    {
      id: 'test',
      title: 'Test Connection',
      description: 'Verify backend is working correctly',
      status: 'pending',
      actionLabel: 'Test Now',
      details: 'Tests API endpoints and database connectivity'
    }
  ]);

  const [copied, setCopied] = useState<string | null>(null);

  const projectId = 'pvmnhwbtkzlnigiuxvzf';
  const sqlEditorUrl = `https://supabase.com/dashboard/project/${projectId}/sql`;

  // Auto-check database status on mount
  useEffect(() => {
    checkDatabaseStatus();
  }, []);

  const checkDatabaseStatus = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-1e942b60/test-db`);
      const data = await response.json();

      if (data.success) {
        setSteps(prev => prev.map(s => 
          s.id === 'database' ? { ...s, status: 'complete' as const } : s
        ));
      }
    } catch (error) {
      console.log('Database not yet initialized');
    }
  };

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const testBackend = async () => {
    setSteps(prev => prev.map(s => 
      s.id === 'test' ? { ...s, status: 'inprogress' as const } : s
    ));

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-1e942b60/health`);
      const data = await response.json();

      if (data.status === 'ok') {
        setSteps(prev => prev.map(s => 
          s.id === 'test' ? { ...s, status: 'complete' as const } : s
        ));
      } else {
        throw new Error('Health check failed');
      }
    } catch (error) {
      setSteps(prev => prev.map(s => 
        s.id === 'test' ? { ...s, status: 'error' as const } : s
      ));
    }
  };

  const getStatusIcon = (status: SetupStep['status']) => {
    switch (status) {
      case 'complete':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'inprogress':
        return <Circle className="w-5 h-5 text-blue-600 animate-pulse" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: SetupStep['status']) => {
    switch (status) {
      case 'complete':
        return <Badge className="bg-green-600">Complete</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      case 'inprogress':
        return <Badge className="bg-blue-600">In Progress</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          🚀 Backend Setup Checklist
        </CardTitle>
        <p className="text-sm text-gray-600 mt-2">
          Follow these steps to activate your MindSpace backend
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`p-4 rounded-lg border-2 ${
              step.status === 'complete' 
                ? 'bg-green-50 border-green-200' 
                : step.status === 'error'
                ? 'bg-red-50 border-red-200'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(step.status)}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">
                    {index + 1}. {step.title}
                  </h3>
                  {getStatusBadge(step.status)}
                </div>
                <p className="text-sm text-gray-700">{step.description}</p>
                {step.details && (
                  <p className="text-xs text-gray-600 italic">{step.details}</p>
                )}
                {step.id === 'database' && (
                  <div className="space-y-2 pt-2">
                    <Button
                      size="sm"
                      onClick={() => window.open(sqlEditorUrl, '_blank')}
                      className="w-full sm:w-auto"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open Supabase SQL Editor
                    </Button>
                    <p className="text-xs text-gray-600">
                      Then copy and run the content from: <code className="bg-gray-200 px-1 rounded">/supabase/complete-init.sql</code>
                    </p>
                  </div>
                )}
                {step.id === 'test' && (
                  <Button
                    size="sm"
                    onClick={testBackend}
                    disabled={step.status === 'inprogress'}
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    {step.status === 'inprogress' ? 'Testing...' : 'Test Connection'}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Quick Links */}
        <div className="mt-6 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
          <h4 className="font-semibold text-gray-900 mb-3">📚 Quick Links</h4>
          <div className="space-y-2">
            <a 
              href={sqlEditorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-purple-700 hover:text-purple-900 hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              Supabase SQL Editor
            </a>
            <a 
              href={`https://supabase.com/dashboard/project/${projectId}/database/tables`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-purple-700 hover:text-purple-900 hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              View Database Tables
            </a>
            <a 
              href={`https://supabase.com/dashboard/project/${projectId}/logs/edge-functions`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-purple-700 hover:text-purple-900 hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              Edge Function Logs
            </a>
          </div>
        </div>

        {/* SQL Commands to Run */}
        <div className="mt-4 p-4 bg-gray-900 rounded-lg text-white">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-mono text-sm font-semibold">SQL to Run:</h4>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-gray-800 h-6"
              onClick={() => handleCopy('/supabase/complete-init.sql', 'sql')}
            >
              {copied === 'sql' ? (
                <>
                  <Check className="w-3 h-3 mr-1" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 mr-1" />
                  Copy Path
                </>
              )}
            </Button>
          </div>
          <pre className="text-xs font-mono text-gray-300 overflow-x-auto">
            {`-- Open this file in your project:\n/supabase/complete-init.sql\n\n-- Then paste its contents in Supabase SQL Editor`}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}