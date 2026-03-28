import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Badge } from '../components/ui/badge';
import { isBackendConfigured, supabase } from '../../lib/supabase';
import { 
  Server, 
  Database, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';
import { BackendSetupChecklist } from '../components/BackendSetupChecklist';
import { ConnectionDebugger } from '../components/ConnectionDebugger';

export function BackendStatus() {
  const [testing, setTesting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'connected' | 'error'>('unknown');
  const [tableStats, setTableStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isBackendConfigured) {
      testConnection();
    }
  }, []);

  const testConnection = async () => {
    setTesting(true);
    setError(null);

    try {
      // Test basic connection
      const { data, error: dbError } = await supabase.from('profiles').select('count');
      
      if (dbError) throw dbError;

      setConnectionStatus('connected');

      // Get table counts
      const stats = await Promise.all([
        supabase.from('profiles').select('count'),
        supabase.from('resources').select('count'),
        supabase.from('support_groups').select('count'),
        supabase.from('events').select('count'),
        supabase.from('forum_topics').select('count'),
      ]);

      setTableStats({
        profiles: stats[0].count || 0,
        resources: stats[1].count || 0,
        supportGroups: stats[2].count || 0,
        events: stats[3].count || 0,
        forumTopics: stats[4].count || 0,
      });
    } catch (err: any) {
      console.error('Connection test failed:', err);
      setConnectionStatus('error');
      setError(err.message);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-1/2 -right-1/4 w-full h-full bg-white/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl mb-4 font-bold">Backend Status</h1>
            <p className="text-xl text-purple-100">
              Monitor your MindSpace backend connection and database
            </p>
          </motion.div>
        </div>
      </section>

      {/* Status Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Connection Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5" />
                  Backend Connection
                </CardTitle>
                <CardDescription>Current backend configuration and status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Mode:</span>
                  <Badge
                    variant={isBackendConfigured ? "default" : "outline"}
                    className={isBackendConfigured ? "bg-green-600" : "bg-blue-600 text-white"}
                  >
                    {isBackendConfigured ? "Backend" : "Demo"}
                  </Badge>
                </div>

                {isBackendConfigured && (
                  <>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Status:</span>
                      <div className="flex items-center gap-2">
                        {connectionStatus === 'connected' && (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <span className="text-green-600 font-medium">Connected</span>
                          </>
                        )}
                        {connectionStatus === 'error' && (
                          <>
                            <XCircle className="w-4 h-4 text-red-600" />
                            <span className="text-red-600 font-medium">Error</span>
                          </>
                        )}
                        {connectionStatus === 'unknown' && (
                          <>
                            <AlertCircle className="w-4 h-4 text-gray-600" />
                            <span className="text-gray-600 font-medium">Unknown</span>
                          </>
                        )}
                      </div>
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button
                      onClick={testConnection}
                      disabled={testing}
                      className="w-full"
                      variant="outline"
                    >
                      <RefreshCw className={`w-4 h-4 mr-2 ${testing ? 'animate-spin' : ''}`} />
                      {testing ? 'Testing...' : 'Test Connection'}
                    </Button>
                  </>
                )}

                {!isBackendConfigured && (
                  <Alert className="bg-blue-50 border-blue-200">
                    <Database className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      Running in demo mode. All data is stored locally in your browser.
                      <br />
                      <span className="mt-2 inline-block">
                        To enable persistent data storage, connect your Supabase database.
                      </span>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Database Statistics Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Database Statistics
                </CardTitle>
                <CardDescription>Current data stored in your backend</CardDescription>
              </CardHeader>
              <CardContent>
                {isBackendConfigured && tableStats ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                      <span className="font-medium">Profiles</span>
                      <Badge variant="outline">{tableStats.profiles}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                      <span className="font-medium">Resources</span>
                      <Badge variant="outline">{tableStats.resources}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                      <span className="font-medium">Support Groups</span>
                      <Badge variant="outline">{tableStats.supportGroups}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                      <span className="font-medium">Events</span>
                      <Badge variant="outline">{tableStats.events}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                      <span className="font-medium">Forum Topics</span>
                      <Badge variant="outline">{tableStats.forumTopics}</Badge>
                    </div>
                  </div>
                ) : isBackendConfigured ? (
                  <div className="text-center py-8 text-gray-500">
                    <Database className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>Click "Test Connection" to load statistics</p>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Database className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>Database statistics available in backend mode</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Setup Checklist */}
        {!isBackendConfigured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6"
          >
            <BackendSetupChecklist />
          </motion.div>
        )}

        {/* Connection Debugger - Always show when backend is configured */}
        {isBackendConfigured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6"
          >
            <ConnectionDebugger />
          </motion.div>
        )}

        {/* Setup Instructions Card */}
        {!isBackendConfigured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6"
          >
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="text-xl">How to Connect Your Supabase Backend</CardTitle>
                <CardDescription>Your MindSpace platform is ready for persistent data storage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Status */}
                <Alert className="bg-blue-50 border-blue-300">
                  <Database className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-900">
                    <strong>Current Mode: Demo Mode</strong>
                    <br />
                    All features work perfectly, but data resets on page refresh. Connect Supabase for permanent storage.
                  </AlertDescription>
                </Alert>

                {/* Option 1: Figma Make Integration */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Badge className="bg-purple-600">Option 1</Badge>
                    Using Figma Make (Recommended)
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    If you're using Figma Make, Supabase credentials are automatically injected when you connect your organization's Supabase project.
                  </p>
                  <div className="bg-white rounded-lg p-4 border-2 border-purple-200 space-y-2">
                    <p className="text-sm font-medium text-gray-900">Steps:</p>
                    <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                      <li>Click the Supabase icon in Figma Make toolbar</li>
                      <li>Connect your organization's Supabase project</li>
                      <li>Credentials are automatically configured</li>
                      <li>Refresh this page to see "Backend Mode"</li>
                    </ol>
                  </div>
                </div>

                {/* Option 2: Manual Setup */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Badge className="bg-purple-600">Option 2</Badge>
                    Manual Configuration
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    For local development or custom deployments, you can manually configure Supabase.
                  </p>
                  <div className="bg-white rounded-lg p-4 border-2 border-purple-200 space-y-3">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-900">1. Create Supabase Project</p>
                      <p className="text-xs text-gray-600">
                        Sign up at{' '}
                        <a 
                          href="https://supabase.com" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-purple-600 underline font-medium"
                        >
                          supabase.com
                        </a>
                        {' '}and create a new project
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-900">2. Run Database Schema</p>
                      <p className="text-xs text-gray-600">
                        Copy the SQL from <code className="bg-gray-100 px-1 rounded">/supabase/schema.sql</code> and run it in Supabase SQL Editor
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-900">3. Add Environment Variables</p>
                      <p className="text-xs text-gray-600 mb-2">
                        Create a <code className="bg-gray-100 px-1 rounded">.env.local</code> file:
                      </p>
                      <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here`}
                      </pre>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-900">4. Restart Development Server</p>
                      <p className="text-xs text-gray-600">
                        Restart your app and refresh this page
                      </p>
                    </div>
                  </div>
                </div>

                {/* Database Schema Info */}
                <Alert className="bg-purple-50 border-purple-300">
                  <Database className="h-4 w-4 text-purple-600" />
                  <AlertDescription className="text-purple-900">
                    <strong>Database Schema:</strong> Your project includes complete SQL schemas in the <code className="bg-white px-1 rounded">/supabase/</code> folder with all tables, RLS policies, and sample data ready to deploy.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </section>
    </div>
  );
}