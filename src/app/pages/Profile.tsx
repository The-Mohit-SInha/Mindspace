import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { User, Mail, Calendar, Shield, ShieldOff, LogOut, Edit2, Save, X, Eye, EyeOff, Info } from 'lucide-react';
import { UserCalendar } from '../components/UserCalendar';
import { BackupSettings } from '../components/BackupSettings';
import { motion } from 'motion/react';

export function Profile() {
  const navigate = useNavigate();
  const { user, signOut, toggleAnonymousMode, updateProfile, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [editedEmail, setEditedEmail] = useState(user?.email || '');

  if (!isAuthenticated || !user) {
    navigate('/sign-in');
    return null;
  }

  const handleSave = () => {
    updateProfile({ name: editedName, email: editedEmail });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(user.name);
    setEditedEmail(user.email);
    setIsEditing(false);
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 text-white overflow-hidden">
        {/* Animated background elements */}
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
          <motion.div
            className="absolute -bottom-1/2 -left-1/4 w-full h-full bg-pink-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
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
            <h1 className="text-4xl md:text-5xl mb-4 font-bold">Your Profile</h1>
            <p className="text-xl text-purple-100">
              Manage your account settings and privacy preferences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Overview Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-white shadow-lg">
                    <AvatarFallback className={`bg-gradient-to-br ${user.avatarColor} text-white text-3xl`}>
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
                <CardDescription className="text-base">{user.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded-lg">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    Joined
                  </span>
                  <span className="font-medium text-gray-900">{user.joinedDate}</span>
                </div>

                <div className="pt-4 border-t">
                  {user.isAnonymous ? (
                    <Badge variant="outline" className="w-full justify-center py-2 text-orange-600 border-orange-600 bg-orange-50">
                      <ShieldOff className="w-4 h-4 mr-2" />
                      Anonymous Mode Active
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="w-full justify-center py-2 text-green-600 border-green-600 bg-green-50">
                      <Shield className="w-4 h-4 mr-2" />
                      Public Profile
                    </Badge>
                  )}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="w-full hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Settings Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            <Tabs defaultValue="settings" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm border border-gray-200">
                <TabsTrigger value="settings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">Settings</TabsTrigger>
                <TabsTrigger value="calendar" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">Calendar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="settings" className="space-y-6 mt-6">
                {/* Anonymous Mode Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2 text-xl">
                            {user.isAnonymous ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            Anonymous Mode
                          </CardTitle>
                          <CardDescription className="mt-2 text-base">
                            Hide your personal information while still accessing all features
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Alert className={`${user.isAnonymous ? "border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100" : "border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100"} backdrop-blur-sm`}>
                        <Info className={`h-4 w-4 ${user.isAnonymous ? 'text-orange-600' : 'text-blue-600'}`} />
                        <AlertDescription className={user.isAnonymous ? 'text-orange-800' : 'text-blue-800'}>
                          {user.isAnonymous ? (
                            <>
                              <strong>Anonymous mode is ON.</strong> Your name and email are hidden from others in community interactions. You'll appear as "Anonymous User" with a protected email address.
                            </>
                          ) : (
                            <>
                              <strong>Anonymous mode is OFF.</strong> Your name and email are visible to other users in community interactions.
                            </>
                          )}
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="font-medium text-sm text-gray-900">What happens in Anonymous Mode:</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <motion.li
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 }}
                            className="flex items-start gap-2"
                          >
                            <ShieldOff className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
                            <span>Your name appears as "Anonymous User" in forums and groups</span>
                          </motion.li>
                          <motion.li
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.6 }}
                            className="flex items-start gap-2"
                          >
                            <ShieldOff className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
                            <span>Your email is hidden from other users</span>
                          </motion.li>
                          <motion.li
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.7 }}
                            className="flex items-start gap-2"
                          >
                            <Shield className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
                            <span>You can still access all features including support groups and events</span>
                          </motion.li>
                          <motion.li
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.8 }}
                            className="flex items-start gap-2"
                          >
                            <Shield className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
                            <span>You can toggle this setting on or off at any time</span>
                          </motion.li>
                        </ul>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <Button
                          onClick={toggleAnonymousMode}
                          className={`w-full ${user.isAnonymous ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" : ""}`}
                          variant={user.isAnonymous ? "default" : "outline"}
                        >
                          {user.isAnonymous ? (
                            <>
                              <Eye className="w-4 h-4 mr-2" />
                              Disable Anonymous Mode
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-4 h-4 mr-2" />
                              Enable Anonymous Mode
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Account Information Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2 text-xl">
                            <User className="w-5 h-5" />
                            Account Information
                          </CardTitle>
                          <CardDescription className="mt-2 text-base">
                            Update your personal details
                          </CardDescription>
                        </div>
                        {!isEditing && (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setIsEditing(true)}
                            >
                              <Edit2 className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {isEditing ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4"
                        >
                          <div className="space-y-2">
                            <Label htmlFor="edit-name" className="font-medium">Full Name</Label>
                            <Input
                              id="edit-name"
                              value={editedName}
                              onChange={(e) => setEditedName(e.target.value)}
                              placeholder="Enter your name"
                              className="bg-white/50 backdrop-blur-sm border-gray-200"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-email" className="font-medium">Email</Label>
                            <Input
                              id="edit-email"
                              type="email"
                              value={editedEmail}
                              onChange={(e) => setEditedEmail(e.target.value)}
                              placeholder="Enter your email"
                              className="bg-white/50 backdrop-blur-sm border-gray-200"
                            />
                          </div>
                          <div className="flex gap-2">
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex-1"
                            >
                              <Button onClick={handleSave} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                              </Button>
                            </motion.div>
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex-1"
                            >
                              <Button onClick={handleCancel} variant="outline" className="w-full">
                                <X className="w-4 h-4 mr-2" />
                                Cancel
                              </Button>
                            </motion.div>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="space-y-4">
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            className="flex items-center gap-3 p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200"
                          >
                            <User className="w-5 h-5 text-purple-600" />
                            <div>
                              <p className="text-xs text-gray-600 font-medium">Name</p>
                              <p className="font-medium text-gray-900">{user.name}</p>
                            </div>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            className="flex items-center gap-3 p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200"
                          >
                            <Mail className="w-5 h-5 text-purple-600" />
                            <div>
                              <p className="text-xs text-gray-600 font-medium">Email</p>
                              <p className="font-medium text-gray-900">{user.email}</p>
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Privacy Notice */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Alert className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 backdrop-blur-sm shadow-lg">
                    <Shield className="h-4 w-4 text-purple-600" />
                    <AlertDescription className="text-purple-800">
                      <strong>Your privacy is important.</strong> MindSpace is designed to support your mental health journey with full respect for your privacy. All your data is stored securely, and you have complete control over what you share.
                    </AlertDescription>
                  </Alert>
                </motion.div>

                {/* Backup Settings */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <BackupSettings />
                </motion.div>
              </TabsContent>

              <TabsContent value="calendar" className="mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <UserCalendar userId={user.id} />
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </div>
  );
}