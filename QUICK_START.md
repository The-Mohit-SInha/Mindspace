# Quick Backend Connection Guide

## 🚀 Get Your MindSpace Backend Running in 5 Minutes

### Step 1: Create Supabase Project
1. Go to https://supabase.com and sign up (free)
2. Click "New Project"
3. Fill in:
   - **Name**: mindspace (or your choice)
   - **Database Password**: (create a strong password - save it!)
   - **Region**: Choose closest to you
4. Click "Create new project" (takes ~2 minutes)

### Step 2: Get Your Credentials
1. In your Supabase dashboard, click "Settings" (gear icon)
2. Click "API" in the sidebar
3. You'll see:
   - **Project URL**: Copy this
   - **anon public key**: Copy this (under "Project API keys")

### Step 3: Create .env File
In your project root folder, create a file named `.env` (exact name, starts with a dot):

```env
VITE_SUPABASE_URL=paste_your_project_url_here
VITE_SUPABASE_ANON_KEY=paste_your_anon_key_here
```

**Example:**
```env
VITE_SUPABASE_URL=https://abcdefghijk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk2MDY0NjAsImV4cCI6MjAwNTE4MjQ2MH0.abcd1234
```

### Step 4: Setup Database
1. In Supabase dashboard, click "SQL Editor"
2. Click "New query"
3. Copy ALL the SQL from [BACKEND_SETUP.md](./BACKEND_SETUP.md) "Step 2" section
4. Paste it into the SQL editor
5. Click "Run" (bottom right)
6. Wait for "Success" message

### Step 5: Enable Authentication
1. In Supabase, click "Authentication" in sidebar
2. Click "Providers"
3. Find "Email" and toggle it ON
4. Save

### Step 6: Restart Your App
```bash
# Stop your dev server (Ctrl+C)
# Then start it again:
npm run dev
```

## ✅ Verify It's Working

1. Visit http://localhost:5173 (or your dev URL)
2. Look for the green "Backend Connected" badge at bottom-right
3. Sign up for a new account
4. Go to `/backend-status` page to see connection details

## 🎉 You're Done!

Your MindSpace is now:
- ✅ Connected to cloud database
- ✅ Syncing across devices
- ✅ Using real authentication
- ✅ Storing data permanently

## 🐛 Troubleshooting

**"Failed to connect"**
- Double-check your .env file has correct URL and key
- Make sure .env file is in the project root (same folder as package.json)
- Restart dev server after creating .env

**"Permission denied"**
- Make sure you ran the SQL setup script completely
- Check Supabase dashboard > Database > Tables - you should see 14 tables

**"Table not found"**
- Run the SQL setup script again
- Make sure there were no errors in the SQL execution

**Need more help?**
- Check the full guide: [BACKEND_SETUP.md](./BACKEND_SETUP.md)
- Visit `/backend-status` page in your app
- Check browser console (F12) for detailed errors

## 💡 Tips

- **Never commit .env to git** - it's already in .gitignore
- Keep your database password safe
- Your anon key is safe to expose in frontend (it's public)
- Use Supabase's free tier - it's generous for learning/development

## 🔄 Want to Switch Back to Demo Mode?

Just rename `.env` to `.env.backup` and restart the server. Your app will work with local storage again!
