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
import { User, Mail, Calendar, Shield, ShieldOff, LogOut, Edit2, Save, X, Eye, EyeOff, Info } from 'lucide-react';

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

  const displayName = user.isAnonymous ? 'Anonymous User' : user.name;
  const displayEmail = user.isAnonymous ? 'hidden@anonymous.com' : user.email;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl mb-4">Your Profile</h1>
            <p className="text-xl text-purple-100">
              Manage your account settings and privacy preferences
            </p>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Overview Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center pb-4">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className={`bg-gradient-to-br ${user.avatarColor} text-white text-3xl`}>
                    {user.isAnonymous ? '?' : user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl">{displayName}</CardTitle>
                <CardDescription>{displayEmail}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Joined
                  </span>
                  <span className="font-medium text-gray-900">{user.joinedDate}</span>
                </div>

                <div className="pt-4 border-t">
                  {user.isAnonymous ? (
                    <Badge variant="outline" className="w-full justify-center py-2 text-orange-600 border-orange-600">
                      <ShieldOff className="w-4 h-4 mr-2" />
                      Anonymous Mode Active
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="w-full justify-center py-2 text-green-600 border-green-600">
                      <Shield className="w-4 h-4 mr-2" />
                      Public Profile
                    </Badge>
                  )}
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Settings Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Anonymous Mode Card */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {user.isAnonymous ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      Anonymous Mode
                    </CardTitle>
                    <CardDescription className="mt-2">
                      Hide your personal information while still accessing all features
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className={user.isAnonymous ? "border-orange-200 bg-orange-50" : "border-blue-200 bg-blue-50"}>
                  <Info className={`h-4 w-4 ${user.isAnonymous ? 'text-orange-600' : 'text-blue-600'}`} />
                  <AlertDescription className={user.isAnonymous ? 'text-orange-800' : 'text-blue-800'}>
                    {user.isAnonymous ? (
                      <>
                        <strong>Anonymous mode is ON.</strong> Your name and email are hidden from others. You'll appear as "Anonymous User" in all interactions.
                      </>
                    ) : (
                      <>
                        <strong>Anonymous mode is OFF.</strong> Your name is visible to other users in community interactions.
                      </>
                    )}
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-gray-900">What happens in Anonymous Mode:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <ShieldOff className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
                      <span>Your name appears as "Anonymous User" in forums and groups</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ShieldOff className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
                      <span>Your email is hidden from other users</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
                      <span>You can still access all features including support groups and events</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
                      <span>You can toggle this setting on or off at any time</span>
                    </li>
                  </ul>
                </div>

                <Button
                  onClick={toggleAnonymousMode}
                  className="w-full"
                  variant={user.isAnonymous ? "outline" : "default"}
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
              </CardContent>
            </Card>

            {/* Account Information Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Account Information
                    </CardTitle>
                    <CardDescription className="mt-2">
                      Update your personal details
                    </CardDescription>
                  </div>
                  {!isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-name">Full Name</Label>
                      <Input
                        id="edit-name"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-email">Email</Label>
                      <Input
                        id="edit-email"
                        type="email"
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSave} className="flex-1">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button onClick={handleCancel} variant="outline" className="flex-1">
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <User className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-600">Name</p>
                        <p className="font-medium text-gray-900">{user.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-600">Email</p>
                        <p className="font-medium text-gray-900">{user.email}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Privacy Notice */}
            <Alert className="border-purple-200 bg-purple-50">
              <Shield className="h-4 w-4 text-purple-600" />
              <AlertDescription className="text-purple-800">
                <strong>Your privacy is important.</strong> MindSpace is designed to support your mental health journey with full respect for your privacy. All your data is stored securely, and you have complete control over what you share.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>
    </div>
  );
}
