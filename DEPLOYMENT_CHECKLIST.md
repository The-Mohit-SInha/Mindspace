# MindSpace Backend Deployment Checklist

Use this checklist to ensure your backend is properly configured before deploying to production.

## Pre-Deployment Checklist

### 🔐 Security

- [ ] Environment variables are set in production (not committed to Git)
- [ ] `.env` file is in `.gitignore`
- [ ] Service role key is never used in frontend code
- [ ] Row Level Security (RLS) policies are enabled on all sensitive tables
- [ ] RLS policies have been reviewed and tested
- [ ] Email confirmation is enabled (optional for development)
- [ ] Password requirements meet security standards
- [ ] Rate limiting is configured in Supabase
- [ ] CORS policies are properly configured

### 🗄️ Database

- [ ] Schema is deployed (`schema.sql` executed)
- [ ] Functions are deployed (`functions.sql` executed)
- [ ] Seed data is loaded (optional, `seed.sql`)
- [ ] Indexes are created for performance
- [ ] Database backups are configured
- [ ] Database is using appropriate tier for traffic

### 🔑 Authentication

- [ ] Email authentication is configured
- [ ] Email templates are customized
- [ ] Redirect URLs are configured for production domain
- [ ] Password reset flow is tested
- [ ] Session timeout is configured appropriately

### 📊 Monitoring

- [ ] Supabase logs are being reviewed
- [ ] Error tracking is set up (optional: Sentry, LogRocket)
- [ ] Performance monitoring is configured
- [ ] Alert notifications are set up for critical errors

### 🚀 Performance

- [ ] Appropriate indexes are created
- [ ] Query performance is tested with production data volumes
- [ ] Real-time subscriptions are optimized
- [ ] Image optimization is configured (if using storage)
- [ ] CDN is configured for static assets

### 🧪 Testing

- [ ] All authentication flows tested
- [ ] CRUD operations tested for all features
- [ ] Real-time subscriptions tested
- [ ] Error handling tested
- [ ] Edge cases tested (empty states, max capacity, etc.)
- [ ] Mobile responsiveness tested
- [ ] Cross-browser compatibility tested

### 📱 Features

- [ ] User can sign up and sign in
- [ ] User can update profile
- [ ] Anonymous mode works correctly
- [ ] Resources load and display correctly
- [ ] Assessments can be completed and results saved
- [ ] Mood tracking works with chart display
- [ ] Support groups show correct member counts
- [ ] Forum topics and replies work
- [ ] Events can be created and users can register
- [ ] Crisis resources display correctly
- [ ] Real-time chat works

### 🌐 Production Environment

- [ ] Production Supabase project created
- [ ] Production environment variables configured
- [ ] Frontend build tested with production backend
- [ ] SSL/HTTPS is enabled
- [ ] Domain is configured correctly
- [ ] API calls use production URLs

## Post-Deployment

### Immediate (Day 1)

- [ ] Monitor error logs for critical issues
- [ ] Test all critical user flows in production
- [ ] Verify email delivery is working
- [ ] Check database connection pooling
- [ ] Monitor API response times

### Week 1

- [ ] Review user feedback and bug reports
- [ ] Analyze usage patterns
- [ ] Check database performance
- [ ] Review and optimize slow queries
- [ ] Verify backup restoration process

### Ongoing

- [ ] Regular security audits
- [ ] Database maintenance and optimization
- [ ] Review and update RLS policies as needed
- [ ] Monitor costs and optimize resources
- [ ] Keep Supabase client libraries updated
- [ ] Regular backups verification

## Common Issues and Solutions

### Users can't sign up
- ✅ Check email confirmation settings
- ✅ Verify RLS policies on profiles table
- ✅ Check for database constraints violations

### Data not loading
- ✅ Verify RLS policies allow access
- ✅ Check authentication token is valid
- ✅ Review Supabase logs for errors

### Real-time not working
- ✅ Verify Realtime is enabled in project settings
- ✅ Check subscription code is correct
- ✅ Ensure RLS policies allow SELECT access

### Performance issues
- ✅ Add indexes to frequently queried columns
- ✅ Implement pagination for large datasets
- ✅ Use connection pooling
- ✅ Optimize queries (avoid N+1 queries)

## Environment Variables Reference

### Required for Production

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Optional

```env
VITE_APP_URL=https://yourdomain.com
VITE_SENTRY_DSN=your-sentry-dsn
```

## Supabase Dashboard URLs

- **Project Dashboard**: https://supabase.com/dashboard/project/[project-id]
- **Database**: https://supabase.com/dashboard/project/[project-id]/database/tables
- **Authentication**: https://supabase.com/dashboard/project/[project-id]/auth/users
- **Storage**: https://supabase.com/dashboard/project/[project-id]/storage/buckets
- **Logs**: https://supabase.com/dashboard/project/[project-id]/logs/explorer
- **SQL Editor**: https://supabase.com/dashboard/project/[project-id]/sql

## Support Resources

- **Supabase Status**: https://status.supabase.com/
- **Supabase Docs**: https://supabase.com/docs
- **Community Discord**: https://discord.supabase.com/
- **GitHub Issues**: https://github.com/supabase/supabase/issues

## Rollback Plan

In case of critical issues:

1. **Database Issues**
   - Restore from most recent backup
   - Revert problematic migrations
   - Check Supabase dashboard for point-in-time recovery

2. **Frontend Issues**
   - Revert to previous deployment
   - Check environment variables
   - Verify API endpoints

3. **Authentication Issues**
   - Check email provider status
   - Verify redirect URLs
   - Review RLS policies

## Success Criteria

Your deployment is successful when:

- ✅ All features work as expected in production
- ✅ No critical errors in logs
- ✅ Response times are acceptable (< 2s)
- ✅ Users can successfully sign up and use the platform
- ✅ Database backups are running
- ✅ Monitoring is active and alerts are working

---

**Last Updated**: March 27, 2026

Remember: Always test in a staging environment before deploying to production!
