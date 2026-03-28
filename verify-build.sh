#!/bin/bash
# Build verification script

echo "Checking project structure..."

# Check if all required files exist
echo "✓ Checking App.tsx..."
[ -f "src/app/App.tsx" ] && echo "  Found App.tsx" || echo "  ERROR: App.tsx missing!"

echo "✓ Checking routes.tsx..."
[ -f "src/app/routes.tsx" ] && echo "  Found routes.tsx" || echo "  ERROR: routes.tsx missing!"

echo "✓ Checking AuthContext..."
[ -f "src/app/contexts/AuthContext.tsx" ] && echo "  Found AuthContext.tsx" || echo "  ERROR: AuthContext.tsx missing!"

echo "✓ Checking localStorage service..."
[ -f "src/app/utils/localStorage.ts" ] && echo "  Found localStorage.ts" || echo "  ERROR: localStorage.ts missing!"

echo ""
echo "✓ Checking page components..."
for page in Home Resources Assessment Crisis Profile SignIn SignUp; do
  [ -f "src/app/pages/${page}.tsx" ] && echo "  Found ${page}.tsx" || echo "  ERROR: ${page}.tsx missing!"
done

echo ""
echo "✓ Checking layout components..."
[ -f "src/app/components/Layout.tsx" ] && echo "  Found Layout.tsx" || echo "  ERROR: Layout.tsx missing!"
[ -f "src/app/components/BackupSettings.tsx" ] && echo "  Found BackupSettings.tsx" || echo "  ERROR: BackupSettings.tsx missing!"
[ -f "src/app/components/LocalBackupIndicator.tsx" ] && echo "  Found LocalBackupIndicator.tsx" || echo "  ERROR: LocalBackupIndicator.tsx missing!"

echo ""
echo "Project structure verification complete!"
