import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Users, MessageCircle, Heart, Calendar, UserPlus, Search, ArrowLeft, Send, MapPin, Clock, ThumbsUp, CheckCircle, BookmarkCheck, FileText, CalendarCheck, ClipboardCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Textarea } from '../components/ui/textarea';
import { Separator } from '../components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useAuth } from '../contexts/AuthContext';

export function Community() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [newReply, setNewReply] = useState('');
  
  // Modal states
  const [joinGroupModal, setJoinGroupModal] = useState<number | null>(null);
  const [newTopicModal, setNewTopicModal] = useState(false);
  const [scheduleChatModal, setScheduleChatModal] = useState<{ name: string; specialty: string } | null>(null);
  const [registerEventModal, setRegisterEventModal] = useState<number | null>(null);
  const [eventProposalModal, setEventProposalModal] = useState(false);
  const [successModal, setSuccessModal] = useState<{ type: string; message: string } | null>(null);
  
  // Form states
  const [joinGroupForm, setJoinGroupForm] = useState({ name: '', email: '', reason: '' });
  const [newTopicForm, setNewTopicForm] = useState({ title: '', category: 'General', content: '' });
  const [scheduleChatForm, setScheduleChatForm] = useState({ name: '', email: '', date: '', time: '', topic: '' });
  const [registerEventForm, setRegisterEventForm] = useState({ name: '', email: '', dietary: '' });
  const [eventProposalForm, setEventProposalForm] = useState({ title: '', orgName: '', contactEmail: '', date: '', description: '', expectedAttendees: '' });

  // User activity tracking states
  const [myJoinedGroups, setMyJoinedGroups] = useState<Array<{ id: number; name: string; joinedDate: string; category: string; meetingTime: string; color: string }>>([]);
  const [myCreatedTopics, setMyCreatedTopics] = useState<Array<{ id: number; title: string; category: string; createdDate: string; replies: number; likes: number; content: string }>>([]);
  const [myScheduledChats, setMyScheduledChats] = useState<Array<{ id: number; counselor: string; date: string; time: string; topic: string; status: string }>>([]);
  const [myRegisteredEvents, setMyRegisteredEvents] = useState<Array<{ id: number; title: string; date: string; time: string; location: string; type: string }>>([]);
  const [myEventProposals, setMyEventProposals] = useState<Array<{ id: number; title: string; orgName: string; date: string; status: string; submittedDate: string }>>([]);

  // Auto-fill forms with user data when user is authenticated
  useEffect(() => {
    if (user) {
      const displayName = user.isAnonymous ? 'Anonymous User' : user.name;
      setJoinGroupForm(prev => ({ ...prev, name: displayName, email: user.email }));
      setScheduleChatForm(prev => ({ ...prev, name: displayName, email: user.email }));
      setRegisterEventForm(prev => ({ ...prev, name: displayName, email: user.email }));
      setEventProposalForm(prev => ({ ...prev, contactEmail: user.email }));
    }
  }, [user]);

  // Helper to check authentication before action
  const requireAuth = (action: () => void) => {
    if (!isAuthenticated) {
      navigate('/sign-in');
      return;
    }
    action();
  };

  // Handler functions
  const handleJoinGroup = () => {
    if (joinGroupModal && joinGroupForm.name && joinGroupForm.email) {
      const group = supportGroups.find(g => g.id === joinGroupModal);
      if (group) {
        const newJoinedGroup = {
          id: joinGroupModal,
          name: group.name,
          joinedDate: new Date().toLocaleDateString(),
          category: group.category,
          meetingTime: group.meetingTime,
          color: group.color
        };
        setMyJoinedGroups([...myJoinedGroups, newJoinedGroup]);
        setJoinGroupForm({ name: '', email: '', reason: '' });
        setJoinGroupModal(null);
        setSuccessModal({ type: 'Join Group', message: 'You have successfully joined the support group!' });
      }
    }
  };

  const handleCreateTopic = () => {
    if (newTopicForm.title && newTopicForm.content) {
      const newTopic = {
        id: Date.now(),
        title: newTopicForm.title,
        category: newTopicForm.category,
        content: newTopicForm.content,
        createdDate: new Date().toLocaleDateString(),
        replies: 0,
        likes: 0
      };
      setMyCreatedTopics([...myCreatedTopics, newTopic]);
      setNewTopicForm({ title: '', category: 'General', content: '' });
      setNewTopicModal(false);
      setSuccessModal({ type: 'New Topic', message: 'Your topic has been posted!' });
    }
  };

  const handleScheduleChat = () => {
    if (scheduleChatModal && scheduleChatForm.name && scheduleChatForm.date && scheduleChatForm.time) {
      const newChat = {
        id: Date.now(),
        counselor: scheduleChatModal.name,
        date: new Date(scheduleChatForm.date).toLocaleDateString(),
        time: scheduleChatForm.time,
        topic: scheduleChatForm.topic,
        status: 'Scheduled'
      };
      setMyScheduledChats([...myScheduledChats, newChat]);
      setScheduleChatForm({ name: '', email: '', date: '', time: '', topic: '' });
      setScheduleChatModal(null);
      setSuccessModal({ type: 'Schedule Chat', message: 'Your chat has been scheduled!' });
    }
  };

  const handleRegisterEvent = () => {
    if (registerEventModal && registerEventForm.name && registerEventForm.email) {
      const event = eventDetails[registerEventModal];
      if (event) {
        const newRegistration = {
          id: registerEventModal,
          title: event.title,
          date: event.date,
          time: event.time,
          location: event.location,
          type: event.type
        };
        setMyRegisteredEvents([...myRegisteredEvents, newRegistration]);
        setRegisterEventForm({ name: '', email: '', dietary: '' });
        setRegisterEventModal(null);
        setSuccessModal({ type: 'Register Event', message: 'You have successfully registered for the event!' });
      }
    }
  };

  const handleSubmitProposal = () => {
    if (eventProposalForm.title && eventProposalForm.orgName && eventProposalForm.contactEmail) {
      const newProposal = {
        id: Date.now(),
        title: eventProposalForm.title,
        orgName: eventProposalForm.orgName,
        date: new Date(eventProposalForm.date).toLocaleDateString(),
        status: 'Under Review',
        submittedDate: new Date().toLocaleDateString()
      };
      setMyEventProposals([...myEventProposals, newProposal]);
      setEventProposalForm({ title: '', orgName: '', contactEmail: '', date: '', description: '', expectedAttendees: '' });
      setEventProposalModal(false);
      setSuccessModal({ type: 'Event Proposal', message: 'Your event proposal has been submitted!' });
    }
  };

  const supportGroups = [
    {
      id: 1,
      name: 'Anxiety Support Circle',
      description: 'A safe space for students dealing with anxiety and stress.',
      members: 234,
      category: 'Anxiety',
      meetingTime: 'Tuesdays, 6:00 PM',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      id: 2,
      name: 'Depression & Mood Support',
      description: 'Connect with others who understand depression and low mood.',
      members: 189,
      category: 'Depression',
      meetingTime: 'Thursdays, 7:00 PM',
      color: 'bg-purple-100 text-purple-700',
    },
    {
      id: 3,
      name: 'First-Gen Student Wellness',
      description: 'Support for first-generation college students navigating mental health.',
      members: 156,
      category: 'Student Life',
      meetingTime: 'Wednesdays, 5:30 PM',
      color: 'bg-green-100 text-green-700',
    },
    {
      id: 4,
      name: 'Mindfulness & Meditation',
      description: 'Practice mindfulness together and learn stress-reduction techniques.',
      members: 312,
      category: 'Wellness',
      meetingTime: 'Mondays & Fridays, 7:30 AM',
      color: 'bg-pink-100 text-pink-700',
    },
    {
      id: 5,
      name: 'LGBTQ+ Mental Health',
      description: 'Affirming space for LGBTQ+ students to discuss mental health.',
      members: 178,
      category: 'Identity',
      meetingTime: 'Sundays, 4:00 PM',
      color: 'bg-orange-100 text-orange-700',
    },
    {
      id: 6,
      name: 'Academic Stress Management',
      description: 'Strategies for managing academic pressure and exam stress.',
      members: 267,
      category: 'Academic',
      meetingTime: 'Wednesdays, 6:30 PM',
      color: 'bg-cyan-100 text-cyan-700',
    },
  ];

  const forumTopics = [
    {
      id: 1,
      title: 'How do you manage test anxiety?',
      author: 'Sarah M.',
      replies: 23,
      likes: 45,
      category: 'Coping Strategies',
      timeAgo: '2 hours ago',
    },
    {
      id: 2,
      title: 'Finding motivation when feeling down',
      author: 'Alex P.',
      replies: 31,
      likes: 67,
      category: 'Depression',
      timeAgo: '5 hours ago',
    },
    {
      id: 3,
      title: 'Best breathing exercises for panic attacks?',
      author: 'Jamie L.',
      replies: 18,
      likes: 52,
      category: 'Anxiety',
      timeAgo: '1 day ago',
    },
    {
      id: 4,
      title: 'Balancing school and self-care',
      author: 'Taylor R.',
      replies: 41,
      likes: 89,
      category: 'Student Life',
      timeAgo: '1 day ago',
    },
  ];

  // Detailed forum data
  const forumTopicDetails: Record<number, {
    title: string;
    author: string;
    timeAgo: string;
    category: string;
    content: string;
    replies: Array<{
      id: number;
      author: string;
      content: string;
      timeAgo: string;
      likes: number;
    }>;
  }> = {
    1: {
      title: 'How do you manage test anxiety?',
      author: 'Sarah M.',
      timeAgo: '2 hours ago',
      category: 'Coping Strategies',
      content: "Finals are coming up and I'm starting to feel that familiar knot in my stomach. I've tried breathing exercises but sometimes they don't feel like enough. What strategies work for you when you're feeling anxious about exams? Any tips would be really appreciated!",
      replies: [
        {
          id: 1,
          author: 'Alex T.',
          content: "I totally understand! What helps me is breaking down my study time into smaller chunks. I use the Pomodoro technique - 25 minutes of focused study, then a 5-minute break. It makes everything feel less overwhelming.",
          timeAgo: '1 hour ago',
          likes: 12
        },
        {
          id: 2,
          author: 'Jordan K.',
          content: "Exercise has been a game-changer for me. Even just a 20-minute walk before studying helps clear my mind. Also, I try to get to the exam room early so I can sit in my seat, take some deep breaths, and visualize doing well.",
          timeAgo: '45 minutes ago',
          likes: 8
        },
        {
          id: 3,
          author: 'Maya P.',
          content: "One thing that helped me was talking to my professors during office hours. They can often clarify what to focus on, which reduces anxiety. Also, studying in groups helps me feel less alone in the stress!",
          timeAgo: '30 minutes ago',
          likes: 15
        }
      ]
    },
    2: {
      title: 'Finding motivation when feeling down',
      author: 'Alex P.',
      timeAgo: '5 hours ago',
      category: 'Depression',
      content: "Lately I've been struggling to find motivation to do even basic things like going to class or doing assignments. Everything feels heavy. How do you all push through when you're in this state? I know I'm not alone in this.",
      replies: [
        {
          id: 1,
          author: 'Chris L.',
          content: "You're definitely not alone. On my worst days, I try to set just ONE tiny goal. Not 'finish the assignment' but 'open the textbook.' Not 'go to all classes' but 'attend one class.' Small wins add up.",
          timeAgo: '4 hours ago',
          likes: 24
        },
        {
          id: 2,
          author: 'Sam R.',
          content: "I struggle with this too. What's helped me is having an 'accountability buddy' - someone who checks in on me and vice versa. Even texting 'did you get out of bed?' helps. Also, please reach out to counseling services if you haven't already.",
          timeAgo: '3 hours ago',
          likes: 18
        }
      ]
    },
    3: {
      title: 'Best breathing exercises for panic attacks?',
      author: 'Jamie L.',
      timeAgo: '1 day ago',
      category: 'Anxiety',
      content: "I've been experiencing panic attacks more frequently and I'm trying to build up a toolkit of techniques that work. What breathing exercises have you found most helpful in the moment? I've tried box breathing but would love to hear other options.",
      replies: [
        {
          id: 1,
          author: 'Riley M.',
          content: "The 4-7-8 technique works wonders for me: breathe in for 4 counts, hold for 7, exhale for 8. The long exhale really helps calm your nervous system. I also like placing one hand on my chest and one on my belly to make sure I'm breathing deeply.",
          timeAgo: '1 day ago',
          likes: 31
        },
        {
          id: 2,
          author: 'Taylor B.',
          content: "Something that helps me is the '5-4-3-2-1' grounding technique combined with breathing. Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. It helps interrupt the panic spiral.",
          timeAgo: '20 hours ago',
          likes: 27
        }
      ]
    },
    4: {
      title: 'Balancing school and self-care',
      author: 'Taylor R.',
      timeAgo: '1 day ago',
      category: 'Student Life',
      content: "Does anyone else feel like there's never enough time for self-care when you're juggling classes, assignments, work, and everything else? I feel guilty taking time for myself when I have so much to do. How do you all balance it?",
      replies: [
        {
          id: 1,
          author: 'Morgan D.',
          content: "I had to reframe how I think about self-care. It's not a luxury - it's maintenance. Like, you wouldn't feel guilty about charging your phone, right? Same with taking care of yourself. You can't pour from an empty cup.",
          timeAgo: '1 day ago',
          likes: 45
        },
        {
          id: 2,
          author: 'Casey W.',
          content: "I schedule self-care like I schedule classes. It's in my planner. 'Tuesday 7pm - yoga' or 'Sunday morning - no phone, just coffee and reading.' If it's scheduled, I'm more likely to protect that time.",
          timeAgo: '18 hours ago',
          likes: 38
        }
      ]
    }
  };

  // Detailed group information
  const groupDetails: Record<number, {
    name: string;
    description: string;
    longDescription: string;
    members: number;
    category: string;
    meetingTime: string;
    facilitator: string;
    color: string;
    guidelines: string[];
  }> = {
    1: {
      name: 'Anxiety Support Circle',
      description: 'A safe space for students dealing with anxiety and stress.',
      longDescription: 'Our Anxiety Support Circle provides a welcoming, non-judgmental space for students experiencing anxiety. Whether you\'re dealing with generalized anxiety, social anxiety, test anxiety, or panic attacks, you\'ll find understanding peers who truly get it. We meet weekly to share experiences, coping strategies, and support each other\'s journeys.',
      members: 234,
      category: 'Anxiety',
      meetingTime: 'Tuesdays, 6:00 PM',
      facilitator: 'Dr. Lisa Chen, Licensed Counselor',
      color: 'bg-blue-100 text-blue-700',
      guidelines: [
        'This is a confidential space - what\'s shared here stays here',
        'Listen with empathy and without judgment',
        'Respect everyone\'s experiences and feelings',
        'You can share as much or as little as you\'re comfortable with',
        'We\'re here to support, not to give medical advice'
      ]
    },
    2: {
      name: 'Depression & Mood Support',
      description: 'Connect with others who understand depression and low mood.',
      longDescription: 'This group offers connection and support for students navigating depression, low mood, or mood disorders. In a compassionate environment, we share our experiences, discuss what helps us through difficult times, and remind each other that we\'re not alone. Professional facilitation ensures a safe and supportive atmosphere.',
      members: 189,
      category: 'Depression',
      meetingTime: 'Thursdays, 7:00 PM',
      facilitator: 'Marcus Johnson, LCSW',
      color: 'bg-purple-100 text-purple-700',
      guidelines: [
        'Be kind to yourself and others',
        'Share your story at your own pace',
        'Respect confidentiality',
        'If you\'re in crisis, please reach out to crisis resources immediately',
        'We celebrate all victories, no matter how small'
      ]
    },
    3: {
      name: 'First-Gen Student Wellness',
      description: 'Support for first-generation college students navigating mental health.',
      longDescription: 'Being a first-generation college student comes with unique challenges. This group provides a space where first-gen students can connect, share experiences about navigating college life without parental guidance, discuss managing expectations, and support each other\'s mental health and wellbeing.',
      members: 156,
      category: 'Student Life',
      meetingTime: 'Wednesdays, 5:30 PM',
      facilitator: 'Priya Patel, Peer Facilitator',
      color: 'bg-green-100 text-green-700',
      guidelines: [
        'Share your authentic experience',
        'No judgment about family background or circumstances',
        'Support each other through the challenges',
        'Celebrate successes together',
        'Resource sharing is encouraged'
      ]
    },
    4: {
      name: 'Mindfulness & Meditation',
      description: 'Practice mindfulness together and learn stress-reduction techniques.',
      longDescription: 'Join us for guided meditation sessions and mindfulness practices designed to reduce stress and increase present-moment awareness. Whether you\'re a beginner or experienced practitioner, all are welcome. We explore various techniques including breath work, body scans, loving-kindness meditation, and more.',
      members: 312,
      category: 'Wellness',
      meetingTime: 'Mondays & Fridays, 7:30 AM',
      facilitator: 'Sarah Williams, Certified Mindfulness Instructor',
      color: 'bg-pink-100 text-pink-700',
      guidelines: [
        'Come as you are - no experience necessary',
        'Find a comfortable position for practice',
        'It\'s okay if your mind wanders - that\'s normal',
        'Respect silence during guided practices',
        'Ask questions and share insights after sessions'
      ]
    },
    5: {
      name: 'LGBTQ+ Mental Health',
      description: 'Affirming space for LGBTQ+ students to discuss mental health.',
      longDescription: 'This affirming support group is specifically for LGBTQ+ students to discuss mental health challenges in a space that understands the unique experiences of the queer community. Topics include coming out stress, discrimination, identity exploration, family dynamics, and finding joy and resilience.',
      members: 178,
      category: 'Identity',
      meetingTime: 'Sundays, 4:00 PM',
      facilitator: 'Alex Rivera, LGBTQ+ Counselor',
      color: 'bg-orange-100 text-orange-700',
      guidelines: [
        'This is a LGBTQ+-specific space',
        'Respect all identities and pronouns',
        'Maintain confidentiality',
        'Support without assumptions',
        'Center queer voices and experiences'
      ]
    },
    6: {
      name: 'Academic Stress Management',
      description: 'Strategies for managing academic pressure and exam stress.',
      longDescription: 'Feeling overwhelmed by assignments, exams, and academic pressure? This group focuses on practical strategies for managing academic stress, time management, perfectionism, and maintaining balance. Share study tips, stress-relief techniques, and support each other through the academic journey.',
      members: 267,
      category: 'Academic',
      meetingTime: 'Wednesdays, 6:30 PM',
      facilitator: 'Dr. James Park, Academic Counselor',
      color: 'bg-cyan-100 text-cyan-700',
      guidelines: [
        'Share study strategies that work for you',
        'Be honest about academic struggles',
        'Support without comparison',
        'Focus on progress, not perfection',
        'Academic integrity is important - we support ethical practices'
      ]
    }
  };

  // Event details
  const eventDetails: Record<number, {
    title: string;
    date: string;
    time: string;
    location: string;
    type: string;
    description: string;
    presenter: string;
    capacity: string;
    topics: string[];
  }> = {
    1: {
      title: 'Mental Health Awareness Workshop',
      date: 'March 30, 2026',
      time: '3:00 PM - 5:00 PM',
      location: 'Student Center, Room 201',
      type: 'Workshop',
      description: 'Join us for an interactive workshop exploring mental health awareness, reducing stigma, and learning to support friends who may be struggling. This session includes group discussions, skill-building activities, and resources for continued learning.',
      presenter: 'Dr. Emily Rodriguez, Clinical Psychologist',
      capacity: '50 students',
      topics: [
        'Understanding common mental health challenges',
        'Recognizing warning signs in yourself and others',
        'How to start conversations about mental health',
        'Supporting friends in crisis',
        'Campus and community resources'
      ]
    },
    2: {
      title: 'Stress Relief Yoga Session',
      date: 'April 2, 2026',
      time: '7:00 AM - 8:00 AM',
      location: 'Recreation Center',
      type: 'Activity',
      description: 'Start your day with gentle yoga designed specifically for stress relief. This beginner-friendly session focuses on stretches and poses that release tension, combined with breathing exercises to calm the mind. Mats provided - just bring yourself!',
      presenter: 'Maya Thompson, Certified Yoga Instructor',
      capacity: '30 students',
      topics: [
        'Gentle stretching for stress relief',
        'Breathing techniques for anxiety',
        'Body awareness and tension release',
        'Brief meditation practice',
        'Tips for daily stress management'
      ]
    },
    3: {
      title: 'Understanding Depression: Panel Discussion',
      date: 'April 5, 2026',
      time: '6:00 PM - 7:30 PM',
      location: 'Virtual (Zoom)',
      type: 'Panel',
      description: 'A candid panel discussion featuring mental health professionals and students with lived experience discussing depression, treatment options, coping strategies, and hope for recovery. Q&A session included. This virtual event is accessible to all students.',
      presenter: 'Panel of mental health professionals and student advocates',
      capacity: 'Unlimited (Virtual)',
      topics: [
        'What depression looks and feels like',
        'Treatment options: therapy, medication, lifestyle',
        'Student experiences and recovery stories',
        'Breaking the stigma around depression',
        'When and how to seek help'
      ]
    }
  };

  const peerSupport = [
    {
      name: 'Emily Chen',
      role: 'Peer Counselor',
      specialty: 'Anxiety & Stress',
      availability: 'Mon-Fri, 2-6 PM',
      initials: 'EC',
      avatar: null,
    },
    {
      name: 'Marcus Johnson',
      role: 'Peer Counselor',
      specialty: 'Academic Pressure',
      availability: 'Tue-Thu, 4-8 PM',
      initials: 'MJ',
      avatar: null,
    },
    {
      name: 'Priya Patel',
      role: 'Peer Counselor',
      specialty: 'Depression Support',
      availability: 'Wed-Fri, 3-7 PM',
      initials: 'PP',
      avatar: null,
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Mental Health Awareness Workshop',
      date: 'March 30, 2026',
      time: '3:00 PM - 5:00 PM',
      location: 'Student Center, Room 201',
      type: 'Workshop',
    },
    {
      id: 2,
      title: 'Stress Relief Yoga Session',
      date: 'April 2, 2026',
      time: '7:00 AM - 8:00 AM',
      location: 'Recreation Center',
      type: 'Activity',
    },
    {
      id: 3,
      title: 'Understanding Depression: Panel Discussion',
      date: 'April 5, 2026',
      time: '6:00 PM - 7:30 PM',
      location: 'Virtual (Zoom)',
      type: 'Panel',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl mb-4">Support Community</h1>
            <p className="text-xl text-green-100">
              Connect with peers, join support groups, and find community. You're not alone in this journey.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwc3R1ZGVudHMlMjBzdXBwb3J0JTIwZ3JvdXB8ZW58MXx8fHwxNzc0NjM1NjI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Students supporting each other"
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-8">
              <p className="text-white text-lg md:text-xl">
                Building connections and supporting each other through shared experiences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Alert */}
      {!isAuthenticated && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <Alert className="border-purple-200 bg-purple-50">
            <Heart className="w-4 h-4 text-purple-600" />
            <AlertDescription className="text-purple-800">
              <strong>Sign in to participate!</strong> Create an account to join support groups, post in forums, and connect with peer counselors.{' '}
              <button onClick={() => navigate('/sign-in')} className="underline font-medium">Sign in now</button>
            </AlertDescription>
          </Alert>
        </section>
      )}

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="groups" className="w-full">
          <TabsList className="grid w-full max-w-3xl grid-cols-5 mb-8">
            <TabsTrigger value="groups">Support Groups</TabsTrigger>
            <TabsTrigger value="forum">Forum</TabsTrigger>
            <TabsTrigger value="peers">Peer Support</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="my-activity">My Activity</TabsTrigger>
          </TabsList>

          {/* Support Groups Tab */}
          <TabsContent value="groups" className="space-y-6">
            {selectedGroup ? (
              // Group Detail View
              <div className="space-y-6">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedGroup(null)}
                  className="mb-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to All Groups
                </Button>

                {groupDetails[selectedGroup] && (
                  <div className="space-y-6">
                    <Card className="border-2">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-4">
                          <Badge className={supportGroups.find(g => g.id === selectedGroup)?.color}>
                            {groupDetails[selectedGroup].category}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Users className="w-4 h-4" />
                            <span>{groupDetails[selectedGroup].members} members</span>
                          </div>
                        </div>
                        <CardTitle className="text-3xl mb-2">{groupDetails[selectedGroup].name}</CardTitle>
                        <CardDescription className="text-base">{groupDetails[selectedGroup].description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <h3 className="text-lg mb-2 text-gray-900">About This Group</h3>
                          <p className="text-gray-700">{groupDetails[selectedGroup].longDescription}</p>
                        </div>

                        <Separator />

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg mb-3 text-gray-900">Meeting Details</h3>
                            <div className="space-y-2 text-gray-700">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-green-600" />
                                <span>{groupDetails[selectedGroup].meetingTime}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-green-600" />
                                <span>Facilitated by {groupDetails[selectedGroup].facilitator}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-green-600" />
                                <span>Student Wellness Center, Room 304</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg mb-3 text-gray-900">Group Guidelines</h3>
                            <ul className="space-y-2">
                              {groupDetails[selectedGroup].guidelines.map((guideline, idx) => (
                                <li key={idx} className="flex gap-2 text-sm text-gray-700">
                                  <span className="text-green-600">✓</span>
                                  <span>{guideline}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <Button 
                            size="lg" 
                            className="w-full md:w-auto"
                            onClick={() => requireAuth(() => setJoinGroupModal(selectedGroup))}
                          >
                            <UserPlus className="w-5 h-5 mr-2" />
                            Join This Group
                          </Button>
                          <p className="text-sm text-gray-600 mt-2">
                            You'll receive an email with Zoom details and meeting reminders
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="p-6">
                        <h3 className="text-lg mb-2 text-gray-900">New to Support Groups?</h3>
                        <p className="text-gray-700 mb-4">
                          It's completely normal to feel nervous about joining your first group. Here's what to expect:
                        </p>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>The facilitator will start with introductions and group guidelines</span>
                          </li>
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>You can share as much or as little as you're comfortable with</span>
                          </li>
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>Most sessions include time for open discussion and peer support</span>
                          </li>
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>Everything shared in the group is confidential</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            ) : (
              // Groups List View
              <>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div>
                    <h2 className="text-2xl mb-2 text-gray-900">Support Groups</h2>
                    <p className="text-gray-600">Find a community that understands your experiences</p>
                  </div>
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search groups..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-full sm:w-64"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {supportGroups.map((group) => (
                    <Card 
                      key={group.id} 
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setSelectedGroup(group.id)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <Badge className={group.color}>{group.category}</Badge>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Users className="w-4 h-4" />
                            <span>{group.members}</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        <CardDescription>{group.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                          <Calendar className="w-4 h-4" />
                          <span>{group.meetingTime}</span>
                        </div>
                        <Button 
                          className="w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            setJoinGroupModal(group.id);
                          }}
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          Join Group
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          {/* Forum Tab */}
          <TabsContent value="forum" className="space-y-6">
            {selectedTopic ? (
              // Topic Detail View
              <div className="space-y-6">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedTopic(null)}
                  className="mb-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Forum
                </Button>

                {forumTopicDetails[selectedTopic] && (
                  <div className="space-y-6">
                    {/* Original Post */}
                    <Card className="border-2">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-6">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-lg">
                              {forumTopicDetails[selectedTopic].author.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h2 className="text-2xl mb-2 text-gray-900">{forumTopicDetails[selectedTopic].title}</h2>
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                  <span className="font-medium">{forumTopicDetails[selectedTopic].author}</span>
                                  <span>•</span>
                                  <span>{forumTopicDetails[selectedTopic].timeAgo}</span>
                                  <Badge variant="secondary">{forumTopicDetails[selectedTopic].category}</Badge>
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700 mt-4 leading-relaxed">
                              {forumTopicDetails[selectedTopic].content}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Replies */}
                    <div className="space-y-4">
                      <h3 className="text-xl text-gray-900">
                        {forumTopicDetails[selectedTopic].replies.length} Replies
                      </h3>
                      
                      {forumTopicDetails[selectedTopic].replies.map((reply) => (
                        <Card key={reply.id}>
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <Avatar className="w-10 h-10">
                                <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                                  {reply.author.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-3 text-sm">
                                    <span className="font-medium text-gray-900">{reply.author}</span>
                                    <span className="text-gray-500">•</span>
                                    <span className="text-gray-500">{reply.timeAgo}</span>
                                  </div>
                                  <Button variant="ghost" size="sm" className="gap-1">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>{reply.likes}</span>
                                  </Button>
                                </div>
                                <p className="text-gray-700 leading-relaxed">{reply.content}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Reply Form */}
                    <Card className="bg-gray-50">
                      <CardContent className="p-6">
                        <h3 className="text-lg mb-4 text-gray-900">Add Your Reply</h3>
                        <div className="space-y-4">
                          <Textarea
                            placeholder="Share your thoughts, experiences, or support..."
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                            className="min-h-32"
                          />
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                              Be kind and supportive. Your words can make a difference.
                            </p>
                            <Button>
                              <Send className="w-4 h-4 mr-2" />
                              Post Reply
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Community Guidelines Reminder */}
                    <Card className="bg-purple-50 border-purple-200">
                      <CardContent className="p-6">
                        <h3 className="text-lg mb-2 text-gray-900">Community Guidelines</h3>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex gap-2">
                            <span className="text-purple-600">✓</span>
                            <span>Be respectful and supportive of all community members</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-purple-600">✓</span>
                            <span>Share from your own experience using "I" statements</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-purple-600">✓</span>
                            <span>Avoid giving medical advice - share what works for you</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-purple-600">✓</span>
                            <span>If you're in crisis, please contact crisis resources immediately</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            ) : (
              // Forum List View
              <>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div>
                    <h2 className="text-2xl mb-2 text-gray-900">Community Forum</h2>
                    <p className="text-gray-600">Share experiences and support one another</p>
                  </div>
                  <Button onClick={() => requireAuth(() => setNewTopicModal(true))}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    New Topic
                  </Button>
                </div>

                <div className="space-y-4">
                  {forumTopics.map((topic) => (
                    <Card 
                      key={topic.id} 
                      className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedTopic(topic.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                              {topic.author.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-lg mb-1 text-gray-900">{topic.title}</h3>
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                  <span>{topic.author}</span>
                                  <span>•</span>
                                  <span>{topic.timeAgo}</span>
                                  <Badge variant="secondary">{topic.category}</Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <MessageCircle className="w-4 h-4" />
                                <span>{topic.replies} replies</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Heart className="w-4 h-4" />
                                <span>{topic.likes} likes</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          {/* Peer Support Tab */}
          <TabsContent value="peers" className="space-y-6">
            <div>
              <h2 className="text-2xl mb-2 text-gray-900">Peer Counselors</h2>
              <p className="text-gray-600">Connect with trained peer counselors for support</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {peerSupport.map((peer, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={peer.avatar || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-500 text-white text-2xl">
                        {peer.initials}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle>{peer.name}</CardTitle>
                    <div className="mt-2">
                      <Badge variant="secondary" className="mb-2">{peer.role}</Badge>
                      <p className="text-sm text-gray-600 mt-2">{peer.specialty}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600 mb-4 text-center">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      {peer.availability}
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => requireAuth(() => setScheduleChatModal({ name: peer.name, specialty: peer.specialty }))}
                    >
                      Schedule Chat
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6">
                <h3 className="text-lg mb-2 text-gray-900">About Peer Counseling</h3>
                <p className="text-gray-700 mb-4">
                  Our peer counselors are trained students who provide empathetic listening and support. 
                  While they are not professional therapists, they can help you navigate challenges and 
                  connect you with additional resources when needed.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Confidential and judgment-free</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Trained in active listening and support</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Available for one-on-one chats</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            {selectedEvent ? (
              // Event Detail View
              <div className="space-y-6">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedEvent(null)}
                  className="mb-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Events
                </Button>

                {eventDetails[selectedEvent] && (
                  <div className="space-y-6">
                    <Card className="border-2">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-4">
                          <Badge variant="outline" className="text-base px-3 py-1">
                            {eventDetails[selectedEvent].type}
                          </Badge>
                          <div className="text-sm text-gray-600">
                            {eventDetails[selectedEvent].capacity}
                          </div>
                        </div>
                        <CardTitle className="text-3xl mb-2">{eventDetails[selectedEvent].title}</CardTitle>
                        <div className="flex flex-col sm:flex-row gap-4 text-gray-600 mt-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-green-600" />
                            <span>{eventDetails[selectedEvent].date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-green-600" />
                            <span>{eventDetails[selectedEvent].time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-green-600" />
                            <span>{eventDetails[selectedEvent].location}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <h3 className="text-lg mb-2 text-gray-900">About This Event</h3>
                          <p className="text-gray-700 leading-relaxed">
                            {eventDetails[selectedEvent].description}
                          </p>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="text-lg mb-3 text-gray-900">Presenter</h3>
                          <p className="text-gray-700">{eventDetails[selectedEvent].presenter}</p>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="text-lg mb-3 text-gray-900">What You'll Learn</h3>
                          <ul className="space-y-2">
                            {eventDetails[selectedEvent].topics.map((topic, idx) => (
                              <li key={idx} className="flex gap-2 text-gray-700">
                                <span className="text-green-600">✓</span>
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Separator />

                        <div className="flex flex-col sm:flex-row gap-4">
                          <Button 
                            size="lg" 
                            className="flex-1"
                            onClick={() => requireAuth(() => setRegisterEventModal(selectedEvent))}
                          >
                            Register for Event
                          </Button>
                          <Button size="lg" variant="outline" className="flex-1">
                            Add to Calendar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-6">
                        <h3 className="text-lg mb-2 text-gray-900">Event Details</h3>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex gap-2">
                            <span className="text-green-600">✓</span>
                            <span>Free for all students</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-green-600">✓</span>
                            <span>Certificate of attendance provided</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-green-600">✓</span>
                            <span>Refreshments will be provided (for in-person events)</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-green-600">✓</span>
                            <span>Questions encouraged - Q&A session included</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            ) : (
              // Events List View
              <>
                <div>
                  <h2 className="text-2xl mb-2 text-gray-900">Upcoming Events</h2>
                  <p className="text-gray-600">Join workshops, activities, and discussions</p>
                </div>

                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <Card 
                      key={event.id} 
                      className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedEvent(event.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                          <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex flex-col items-center justify-center text-white">
                            <div className="text-2xl">{event.date.split(' ')[1].replace(',', '')}</div>
                            <div className="text-xs uppercase">{event.date.split(' ')[0]}</div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-xl mb-1 text-gray-900">{event.title}</h3>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {event.time}
                                  </span>
                                  <span className="hidden sm:block">•</span>
                                  <span>{event.location}</span>
                                </div>
                              </div>
                              <Badge variant="outline">{event.type}</Badge>
                            </div>
                          </div>
                          <Button 
                            className="w-full md:w-auto"
                            onClick={(e) => {
                              e.stopPropagation();
                              setRegisterEventModal(event.id);
                            }}
                          >
                            Register
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6">
                    <h3 className="text-lg mb-2 text-gray-900">Want to Host an Event?</h3>
                    <p className="text-gray-700 mb-4">
                      Student organizations and individuals are encouraged to propose mental health events and workshops. 
                      We support initiatives that promote wellness and build community.
                    </p>
                    <Button 
                      variant="outline"
                      onClick={() => requireAuth(() => setEventProposalModal(true))}
                    >
                      Submit Event Proposal
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* My Activity Tab */}
          <TabsContent value="my-activity" className="space-y-6">
            {!isAuthenticated ? (
              <Card className="bg-purple-50">
                <CardContent className="p-12 text-center">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                  <h3 className="text-lg mb-2 text-gray-900">Sign In to View Your Activity</h3>
                  <p className="text-gray-600 mb-4">Create an account to track your participation in the MindSpace community</p>
                  <Button onClick={() => navigate('/sign-in')}>
                    Sign In
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <div>
                  <h2 className="text-2xl mb-4 text-gray-900">My Activity</h2>
                  <p className="text-gray-600 mb-6">Track your participation in the MindSpace community</p>
                </div>

                <Tabs defaultValue="joined-groups" className="w-full">
              <TabsList className="grid w-full max-w-3xl grid-cols-5">
                <TabsTrigger value="joined-groups">
                  <BookmarkCheck className="w-4 h-4 mr-2" />
                  Groups
                </TabsTrigger>
                <TabsTrigger value="my-topics">
                  <FileText className="w-4 h-4 mr-2" />
                  Topics
                </TabsTrigger>
                <TabsTrigger value="scheduled-chats">
                  <CalendarCheck className="w-4 h-4 mr-2" />
                  Chats
                </TabsTrigger>
                <TabsTrigger value="registered-events">
                  <Calendar className="w-4 h-4 mr-2" />
                  Events
                </TabsTrigger>
                <TabsTrigger value="proposals">
                  <ClipboardCheck className="w-4 h-4 mr-2" />
                  Proposals
                </TabsTrigger>
              </TabsList>

              {/* Joined Groups */}
              <TabsContent value="joined-groups" className="space-y-4 mt-6">
                {myJoinedGroups.length === 0 ? (
                  <Card className="bg-gray-50">
                    <CardContent className="p-12 text-center">
                      <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg mb-2 text-gray-900">No Groups Joined Yet</h3>
                      <p className="text-gray-600 mb-4">Start connecting with peers by joining a support group</p>
                      <Button onClick={() => document.querySelector('[value="groups"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))}>
                        Browse Support Groups
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {myJoinedGroups.map((group) => (
                      <Card key={group.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between mb-2">
                            <Badge className={group.color}>{group.category}</Badge>
                            <span className="text-xs text-gray-500">Joined {group.joinedDate}</span>
                          </div>
                          <CardTitle className="text-lg">{group.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{group.meetingTime}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Created Topics */}
              <TabsContent value="my-topics" className="space-y-4 mt-6">
                {myCreatedTopics.length === 0 ? (
                  <Card className="bg-gray-50">
                    <CardContent className="p-12 text-center">
                      <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg mb-2 text-gray-900">No Topics Created Yet</h3>
                      <p className="text-gray-600 mb-4">Share your experiences and start a conversation</p>
                      <Button onClick={() => requireAuth(() => setNewTopicModal(true))}>
                        Create New Topic
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {myCreatedTopics.map((topic) => (
                      <Card key={topic.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="text-lg mb-2 text-gray-900">{topic.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                <Badge variant="secondary">{topic.category}</Badge>
                                <span>Created {topic.createdDate}</span>
                              </div>
                              <p className="text-gray-700 line-clamp-2">{topic.content}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <MessageCircle className="w-4 h-4" />
                              <span>{topic.replies} replies</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Heart className="w-4 h-4" />
                              <span>{topic.likes} likes</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Scheduled Chats */}
              <TabsContent value="scheduled-chats" className="space-y-4 mt-6">
                {myScheduledChats.length === 0 ? (
                  <Card className="bg-gray-50">
                    <CardContent className="p-12 text-center">
                      <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg mb-2 text-gray-900">No Chats Scheduled</h3>
                      <p className="text-gray-600 mb-4">Connect one-on-one with a peer counselor</p>
                      <Button onClick={() => document.querySelector('[value="peers"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))}>
                        Schedule a Chat
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {myScheduledChats.map((chat) => (
                      <Card key={chat.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-lg mb-1 text-gray-900">Chat with {chat.counselor}</h3>
                              <Badge variant="outline" className="text-green-600 border-green-600">{chat.status}</Badge>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{chat.date} at {chat.time}</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <MessageCircle className="w-4 h-4 mt-0.5" />
                              <span>{chat.topic}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Registered Events */}
              <TabsContent value="registered-events" className="space-y-4 mt-6">
                {myRegisteredEvents.length === 0 ? (
                  <Card className="bg-gray-50">
                    <CardContent className="p-12 text-center">
                      <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg mb-2 text-gray-900">No Events Registered</h3>
                      <p className="text-gray-600 mb-4">Attend workshops and activities to support your wellbeing</p>
                      <Button onClick={() => document.querySelector('[value="events"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))}>
                        Browse Events
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {myRegisteredEvents.map((event) => (
                      <Card key={event.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center gap-6">
                            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex flex-col items-center justify-center text-white">
                              <div className="text-xl">{event.date.split(' ')[1]?.replace(',', '')}</div>
                              <div className="text-xs uppercase">{event.date.split(' ')[0]}</div>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg mb-2 text-gray-900">{event.title}</h3>
                              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {event.time}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {event.location}
                                </span>
                                <Badge variant="outline">{event.type}</Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Event Proposals */}
              <TabsContent value="proposals" className="space-y-4 mt-6">
                {myEventProposals.length === 0 ? (
                  <Card className="bg-gray-50">
                    <CardContent className="p-12 text-center">
                      <ClipboardCheck className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg mb-2 text-gray-900">No Proposals Submitted</h3>
                      <p className="text-gray-600 mb-4">Have an idea for a mental health event? Share it with us!</p>
                      <Button onClick={() => requireAuth(() => setEventProposalModal(true))}>
                        Submit Proposal
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {myEventProposals.map((proposal) => (
                      <Card key={proposal.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-lg mb-2 text-gray-900">{proposal.title}</h3>
                              <p className="text-sm text-gray-600">{proposal.orgName}</p>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={proposal.status === 'Approved' ? 'text-green-600 border-green-600' : 'text-amber-600 border-amber-600'}
                            >
                              {proposal.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Proposed Date: {proposal.date}</span>
                            <span>•</span>
                            <span>Submitted: {proposal.submittedDate}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
              </>
            )}
          </TabsContent>
        </Tabs>
      </section>

      {/* Join Group Modal */}
      <Dialog open={joinGroupModal !== null} onOpenChange={() => setJoinGroupModal(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Join Support Group</DialogTitle>
            <DialogDescription>
              Fill out the form below to join {joinGroupModal && groupDetails[joinGroupModal] ? `the ${groupDetails[joinGroupModal].name}` : 'this'} support group.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={joinGroupForm.name}
                onChange={(e) => setJoinGroupForm({ ...joinGroupForm, name: e.target.value })}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email"
                value={joinGroupForm.email}
                onChange={(e) => setJoinGroupForm({ ...joinGroupForm, email: e.target.value })}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Joining (Optional)</Label>
              <Textarea
                id="reason"
                placeholder="Why do you want to join this group?"
                value={joinGroupForm.reason}
                onChange={(e) => setJoinGroupForm({ ...joinGroupForm, reason: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setJoinGroupModal(null)}>Cancel</Button>
            <Button type="submit" onClick={handleJoinGroup}>Join Group</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Topic Modal */}
      <Dialog open={newTopicModal} onOpenChange={() => setNewTopicModal(false)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Forum Topic</DialogTitle>
            <DialogDescription>
              Start a new discussion in the community forum.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Topic title"
                value={newTopicForm.title}
                onChange={(e) => setNewTopicForm({ ...newTopicForm, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="Category"
                value={newTopicForm.category}
                onChange={(e) => setNewTopicForm({ ...newTopicForm, category: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your topic here..."
                value={newTopicForm.content}
                onChange={(e) => setNewTopicForm({ ...newTopicForm, content: e.target.value })}
                className="min-h-32"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewTopicModal(false)}>Cancel</Button>
            <Button type="submit" onClick={handleCreateTopic}>Post Topic</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Chat Modal */}
      <Dialog open={scheduleChatModal !== null} onOpenChange={() => setScheduleChatModal(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Schedule Chat with Peer Counselor</DialogTitle>
            <DialogDescription>
              Schedule a chat with {scheduleChatModal?.name} for {scheduleChatModal?.specialty} support.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={scheduleChatForm.name}
                onChange={(e) => setScheduleChatForm({ ...scheduleChatForm, name: e.target.value })}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email"
                value={scheduleChatForm.email}
                onChange={(e) => setScheduleChatForm({ ...scheduleChatForm, email: e.target.value })}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={scheduleChatForm.date}
                onChange={(e) => setScheduleChatForm({ ...scheduleChatForm, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={scheduleChatForm.time}
                onChange={(e) => setScheduleChatForm({ ...scheduleChatForm, time: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="topic">Topic (Optional)</Label>
              <Textarea
                id="topic"
                placeholder="What would you like to discuss?"
                value={scheduleChatForm.topic}
                onChange={(e) => setScheduleChatForm({ ...scheduleChatForm, topic: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setScheduleChatModal(null)}>Cancel</Button>
            <Button type="submit" onClick={handleScheduleChat}>Schedule Chat</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Register Event Modal */}
      <Dialog open={registerEventModal !== null} onOpenChange={() => setRegisterEventModal(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Register for Event</DialogTitle>
            <DialogDescription>
              Register for {registerEventModal && eventDetails[registerEventModal] ? `the ${eventDetails[registerEventModal].title}` : 'this'} event.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={registerEventForm.name}
                onChange={(e) => setRegisterEventForm({ ...registerEventForm, name: e.target.value })}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email"
                value={registerEventForm.email}
                onChange={(e) => setRegisterEventForm({ ...registerEventForm, email: e.target.value })}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dietary">Dietary Restrictions (Optional)</Label>
              <Input
                id="dietary"
                placeholder="Any dietary restrictions?"
                value={registerEventForm.dietary}
                onChange={(e) => setRegisterEventForm({ ...registerEventForm, dietary: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRegisterEventModal(null)}>Cancel</Button>
            <Button type="submit" onClick={handleRegisterEvent}>Register</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Event Proposal Modal */}
      <Dialog open={eventProposalModal} onOpenChange={() => setEventProposalModal(false)}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Submit Event Proposal</DialogTitle>
            <DialogDescription>
              Propose a new mental health event or workshop for the community.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                placeholder="Event title"
                value={eventProposalForm.title}
                onChange={(e) => setEventProposalForm({ ...eventProposalForm, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="orgName">Organization Name</Label>
              <Input
                id="orgName"
                placeholder="Name of your organization"
                value={eventProposalForm.orgName}
                onChange={(e) => setEventProposalForm({ ...eventProposalForm, orgName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="Your email"
                value={eventProposalForm.contactEmail}
                onChange={(e) => setEventProposalForm({ ...eventProposalForm, contactEmail: e.target.value })}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Proposed Date</Label>
              <Input
                id="date"
                type="date"
                value={eventProposalForm.date}
                onChange={(e) => setEventProposalForm({ ...eventProposalForm, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Event Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your event..."
                value={eventProposalForm.description}
                onChange={(e) => setEventProposalForm({ ...eventProposalForm, description: e.target.value })}
                className="min-h-24"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expectedAttendees">Expected Attendees</Label>
              <Input
                id="expectedAttendees"
                placeholder="Estimated number of attendees"
                value={eventProposalForm.expectedAttendees}
                onChange={(e) => setEventProposalForm({ ...eventProposalForm, expectedAttendees: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEventProposalModal(false)}>Cancel</Button>
            <Button type="submit" onClick={handleSubmitProposal}>Submit Proposal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={successModal !== null} onOpenChange={() => setSuccessModal(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <DialogTitle>Success!</DialogTitle>
            </div>
            <DialogDescription>
              {successModal?.message}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit" onClick={() => setSuccessModal(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
