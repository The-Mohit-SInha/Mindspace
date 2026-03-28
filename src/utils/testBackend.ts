/**
 * Backend Connection Test Utility
 * Run this in browser console to test MindSpace backend connectivity
 */

export async function testBackendConnection() {
  const projectId = 'pvmnhwbtkzlnigiuxvzf';
  const baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-1e942b60`;
  
  console.log('🧪 Testing MindSpace Backend Connection...\n');
  
  const tests = [
    {
      name: 'Health Check',
      url: `${baseUrl}/health`,
      method: 'GET'
    },
    {
      name: 'Database Connection',
      url: `${baseUrl}/test-db`,
      method: 'GET'
    }
  ];
  
  const results = [];
  
  for (const test of tests) {
    try {
      console.log(`Testing: ${test.name}...`);
      const response = await fetch(test.url, {
        method: test.method,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      const success = response.ok && (data.status === 'ok' || data.success === true);
      
      results.push({
        test: test.name,
        status: success ? '✅ PASS' : '❌ FAIL',
        response: data,
        httpStatus: response.status
      });
      
      console.log(`  ${success ? '✅' : '❌'} ${test.name}:`, data);
    } catch (error) {
      results.push({
        test: test.name,
        status: '❌ ERROR',
        error: error.message
      });
      console.error(`  ❌ ${test.name} Error:`, error);
    }
  }
  
  console.log('\n📊 Test Summary:');
  console.table(results);
  
  const allPassed = results.every(r => r.status === '✅ PASS');
  
  if (allPassed) {
    console.log('\n✅ All tests passed! Backend is connected and ready.');
  } else {
    console.log('\n❌ Some tests failed. Check the results above.');
    console.log('\n💡 Troubleshooting:');
    console.log('  1. Make sure you ran /supabase/complete-init.sql in Supabase SQL Editor');
    console.log('  2. Check that the kv_store_1e942b60 table exists');
    console.log('  3. Verify environment variables are set correctly');
    console.log('  4. Check Supabase Edge Function logs');
  }
  
  return results;
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
  console.log('💡 Run testBackendConnection() to check backend status');
}
