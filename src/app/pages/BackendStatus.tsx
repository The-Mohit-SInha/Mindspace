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
                      <a
                        href="/BACKEND_SETUP.md"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline font-medium mt-2 inline-flex items-center gap-1 hover:text-blue-900"
                      >
                        Setup Supabase backend
                        <ExternalLink className="w-3 h-3" />
                      </a>
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
                <CardTitle className="text-xl">Ready to Connect Your Backend?</CardTitle>
                <CardDescription>Follow these simple steps to enable Supabase</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex gap-3">
                    <Badge className="bg-purple-600">1</Badge>
                    <span>Create a free account at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline font-medium">supabase.com</a></span>
                  </li>
                  <li className="flex gap-3">
                    <Badge className="bg-purple-600">2</Badge>
                    <span>Create a new project and copy your API credentials</span>
                  </li>
                  <li className="flex gap-3">
                    <Badge className="bg-purple-600">3</Badge>
                    <span>Create a <code className="bg-white px-2 py-1 rounded">.env</code> file with your credentials</span>
                  </li>
                  <li className="flex gap-3">
                    <Badge className="bg-purple-600">4</Badge>
                    <span>Run the database setup SQL from our guide</span>
                  </li>
                  <li className="flex gap-3">
                    <Badge className="bg-purple-600">5</Badge>
                    <span>Restart your app - you're done! 🎉</span>
                  </li>
                </ol>

                <Button
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  asChild
                >
                  <a href="/BACKEND_SETUP.md" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Full Setup Guide
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </section>
    </div>
  );
}
