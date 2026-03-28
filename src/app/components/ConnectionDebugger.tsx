import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { CheckCircle2, XCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { isBackendConfigured, supabase } from '../../lib/supabase';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export function ConnectionDebugger() {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [testing, setTesting] = useState(false);

  const runTests = async () => {
    setTesting(true);
    const results: any[] = [];

    // Test 1: Check if credentials exist
    results.push({
      test: 'Credentials Loaded',
      status: projectId && publicAnonKey ? 'pass' : 'fail',
      details: `Project ID: ${projectId?.substring(0, 10)}..., Key exists: ${!!publicAnonKey}`
    });

    // Test 2: Check isBackendConfigured flag
    results.push({
      test: 'Backend Configured Flag',
      status: isBackendConfigured ? 'pass' : 'fail',
      details: `isBackendConfigured = ${isBackendConfigured}`
    });

    // Test 3: Test API health endpoint
    try {
      const healthResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-1e942b60/health`);
      const healthData = await healthResponse.json();
      results.push({
        test: 'API Health Check',
        status: healthData.status === 'ok' ? 'pass' : 'fail',
        details: JSON.stringify(healthData)
      });
    } catch (error: any) {
      results.push({
        test: 'API Health Check',
        status: 'fail',
        details: error.message
      });
    }

    // Test 4: Test database connection
    try {
      const dbResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-1e942b60/test-db`);
      const dbData = await dbResponse.json();
      results.push({
        test: 'Database Connection',
        status: dbData.success ? 'pass' : 'fail',
        details: JSON.stringify(dbData)
      });
    } catch (error: any) {
      results.push({
        test: 'Database Connection',
        status: 'fail',
        details: error.message
      });
    }

    // Test 5: Test Supabase client
    try {
      const { data, error } = await supabase.from('profiles').select('count');
      results.push({
        test: 'Supabase Client Query',
        status: !error ? 'pass' : 'fail',
        details: error ? error.message : 'Query successful'
      });
    } catch (error: any) {
      results.push({
        test: 'Supabase Client Query',
        status: 'fail',
        details: error.message
      });
    }

    setTestResults(results);
    setTesting(false);
  };

  useEffect(() => {
    runTests();
  }, []);

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-2 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>🔧 Connection Debugger</span>
          <Badge variant={isBackendConfigured ? 'default' : 'destructive'} className={isBackendConfigured ? 'bg-green-600' : ''}>
            {isBackendConfigured ? 'CONNECTED' : 'DEMO MODE'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {testResults.map((result, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 mt-0.5">
                {result.status === 'pass' ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : result.status === 'fail' ? (
                  <XCircle className="w-5 h-5 text-red-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-gray-900">{result.test}</div>
                <div className="text-xs text-gray-600 break-all">{result.details}</div>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={runTests}
          disabled={testing}
          variant="outline"
          className="w-full"
          size="sm"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${testing ? 'animate-spin' : ''}`} />
          {testing ? 'Testing...' : 'Run Tests Again'}
        </Button>

        <div className="p-3 bg-blue-50 rounded-lg text-xs text-blue-900">
          <div><strong>Project ID:</strong> {projectId}</div>
          <div><strong>Supabase URL:</strong> https://{projectId}.supabase.co</div>
          <div><strong>Anon Key Length:</strong> {publicAnonKey?.length || 0} chars</div>
        </div>
      </CardContent>
    </Card>
  );
}
