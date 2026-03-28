// Community Page Backend Integration Guide
// This file shows how to add backend support to CommunityNew.tsx

/*
 * STEP 1: Add imports at the top of CommunityNew.tsx
 */

import { isBackendConfigured } from '../../lib/supabase';
import { 
  getAllSupportGroups, 
  getAllForumTopics, 
  getAllEvents,
  joinSupportGroup,
  createForumTopic,
  registerForEvent,
  type SupportGroup,
  type ForumTopic,
  type Event 
} from '../../services/communityService';

/*
 * STEP 2: Add state variables after existing state declarations
 */

// Add these after line 51 (after eventInCalendar state)
const [backendGroups, setBackendGroups] = useState<SupportGroup[]>([]);
const [backendTopics, setBackendTopics] = useState<ForumTopic[]>([]);
const [backendEvents, setBackendEvents] = useState<Event[]>([]);
const [dataLoading, setDataLoading] = useState(false);

/*
 * STEP 3: Add data loading function
 */

// Add this before the existing helper functions (around line 230)
const loadCommunityData = async () => {
  if (!isBackendConfigured) return;
  
  setDataLoading(true);
  try {
    const [groups, topics, events] = await Promise.all([
      getAllSupportGroups(),
      getAllForumTopics(),
      getAllEvents(),
    ]);
    
    if (groups) setBackendGroups(groups);
    if (topics) setBackendTopics(topics);
    if (events) setBackendEvents(events);
  } catch (error) {
    console.error('Failed to load community data:', error);
    toast.error('Failed to load some community data');
  } finally {
    setDataLoading(false);
  }
};

/*
 * STEP 4: Add useEffect to load data on mount
 */

// Add this after the existing useEffect for auto-fill forms (around line 94)
useEffect(() => {
  loadCommunityData();
}, []);

/*
 * STEP 5: Replace mock data constants with smart functions
 */

// Replace line 237-292 (const supportGroups = [...])
const getSupportGroups = () => {
  // If backend configured and we have data, use it
  if (isBackendConfigured && backendGroups.length > 0) {
    return backendGroups.map(group => ({
      id: parseInt(group.id),
      name: group.name,
      description: group.description,
      members: group.member_count || 0,
      category: group.category,
      meetingTime: group.meeting_time,
      color: getCategoryColor(group.category),
    }));
  }
  
  // Otherwise use mock data (existing array)
  return [
    {
      id: 1,
      name: 'Anxiety Support Circle',
      description: 'A safe space for students dealing with anxiety and stress.',
      members: 234,
      category: 'Anxiety',
      meetingTime: 'Tuesdays, 6:00 PM',
      color: 'bg-blue-100 text-blue-700',
    },
    // ... rest of mock groups
  ];
};

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'Anxiety': 'bg-blue-100 text-blue-700',
    'Depression': 'bg-purple-100 text-purple-700',
    'Student Life': 'bg-green-100 text-green-700',
    'Wellness': 'bg-pink-100 text-pink-700',
    'Identity': 'bg-yellow-100 text-yellow-700',
    'Academic': 'bg-orange-100 text-orange-700',
    'Grief': 'bg-indigo-100 text-indigo-700',
    'Relationships': 'bg-cyan-100 text-cyan-700',
  };
  return colors[category] || 'bg-gray-100 text-gray-700';
};

const supportGroups = getSupportGroups();

// Similar pattern for forum topics (replace line 294+)
const getForumTopics = () => {
  if (isBackendConfigured && backendTopics.length > 0) {
    return backendTopics.map(topic => ({
      id: parseInt(topic.id),
      title: topic.title,
      author: 'Anonymous User', // Backend doesn't expose author for privacy
      replies: topic.reply_count || 0,
      likes: topic.like_count || 0,
      category: topic.category,
      timestamp: new Date(topic.created_at).toLocaleDateString(),
      content: topic.content,
    }));
  }
  
  // Otherwise use existing mock data
  return [
    // ... existing mock topics
  ];
};

const forumTopics = getForumTopics();

// Similar pattern for events
const getEvents = () => {
  if (isBackendConfigured && backendEvents.length > 0) {
    return backendEvents.map(event => ({
      id: parseInt(event.id),
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      type: event.event_type,
      spots: event.max_participants || 50,
      registered: event.registered_count || 0,
    }));
  }
  
  // Otherwise use existing mock data
  return [
    // ... existing mock events
  ];
};

const events = getEvents();

/*
 * STEP 6: Update action handlers to use backend
 */

// Update handleJoinGroup (around line 96)
const handleJoinGroup = async () => {
  if (joinGroupModal && joinGroupForm.name && joinGroupForm.email) {
    const group = supportGroups.find(g => g.id === joinGroupModal);
    if (group) {
      // If backend is configured, save to database
      if (isBackendConfigured && user) {
        try {
          await joinSupportGroup(user.id, String(group.id));
          toast.success(`Successfully joined ${group.name}!`);
        } catch (error) {
          console.error('Failed to join group:', error);
          toast.error('Failed to join group');
        }
      }
      
      // Add to local state (works in both modes)
      const newJoinedGroup = {
        id: group.id,
        name: group.name,
        joinedDate: new Date().toISOString().split('T')[0],
        category: group.category,
        meetingTime: group.meetingTime,
        color: group.color,
      };
      
      setMyJoinedGroups([...myJoinedGroups, newJoinedGroup]);
      setJoinGroupModal(null);
      setJoinGroupForm({ name: '', email: '', reason: '' });
      setSuccessModal({
        type: 'group',
        message: `You've successfully joined ${group.name}! You'll receive meeting details via email.`
      });
    }
  }
};

// Update handleNewTopic (around line 117)
const handleNewTopic = async () => {
  if (newTopicForm.title && newTopicForm.content) {
    // If backend is configured, save to database
    if (isBackendConfigured && user) {
      try {
        await createForumTopic({
          user_id: user.id,
          title: newTopicForm.title,
          category: newTopicForm.category,
          content: newTopicForm.content,
        });
        toast.success('Topic created successfully!');
        // Reload topics
        loadCommunityData();
      } catch (error) {
        console.error('Failed to create topic:', error);
        toast.error('Failed to create topic');
      }
    }
    
    // Add to local state (works in both modes)
    const newTopic = {
      id: Date.now(),
      title: newTopicForm.title,
      category: newTopicForm.category,
      createdDate: new Date().toISOString().split('T')[0],
      replies: 0,
      likes: 0,
      content: newTopicForm.content,
    };
    
    setMyCreatedTopics([...myCreatedTopics, newTopic]);
    setNewTopicModal(false);
    setNewTopicForm({ title: '', category: 'General', content: '' });
    setSuccessModal({
      type: 'topic',
      message: 'Your topic has been posted! Other students can now respond.'
    });
  }
};

// Update handleRegisterEvent (around line 156)
const handleRegisterEvent = async () => {
  if (registerEventModal && registerEventForm.name && registerEventForm.email) {
    const event = events.find(e => e.id === registerEventModal);
    if (event) {
      // If backend is configured, save to database
      if (isBackendConfigured && user) {
        try {
          await registerForEvent(user.id, String(event.id));
          toast.success(`Registered for ${event.title}!`);
        } catch (error) {
          console.error('Failed to register for event:', error);
          toast.error('Failed to register for event');
        }
      }
      
      // Add to local state (works in both modes)
      const newRegisteredEvent = {
        id: event.id,
        title: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        type: event.type,
      };
      
      setMyRegisteredEvents([...myRegisteredEvents, newRegisteredEvent]);
      setRegisterEventModal(null);
      setRegisterEventForm({ name: '', email: '', dietary: '' });
      setSuccessModal({
        type: 'event',
        message: `You're registered for ${event.title}! Check your email for details.`
      });
    }
  }
};

/*
 * STEP 7: Add loading state to UI
 */

// In the render section, add a loading state before content:
{dataLoading && (
  <div className="flex justify-center items-center py-12">
    <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
    <span className="ml-3 text-gray-600">Loading community data...</span>
  </div>
)}

/*
 * THAT'S IT! 
 * 
 * The Community page will now:
 * - Load data from backend when configured
 * - Fall back to mock data in demo mode
 * - Save user actions to database
 * - Show loading states
 * - Handle errors gracefully
 * 
 * All existing UI and functionality remains intact!
 */

export { }; // Make this a module
