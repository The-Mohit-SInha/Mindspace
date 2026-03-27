/**
 * MindSpace Backend Integration Examples
 * 
 * This file demonstrates how to integrate the backend services
 * into your existing React components.
 */

import { useEffect, useState } from 'react';
import { 
  getAllResources, 
  getResourcesByCategory,
  markResourceHelpful 
} from '../services/resourceService';
import {
  getAllAssessments,
  submitAssessmentResult,
  getUserAssessmentResults,
  calculateSeverity,
  generateRecommendations
} from '../services/assessmentService';
import {
  saveMoodEntry,
  getUserMoodHistory,
  getMoodStatistics
} from '../services/moodService';
import {
  getAllSupportGroups,
  joinSupportGroup,
  getUserGroups
} from '../services/communityService';

// ============================================
// Example 1: Resources Page Integration
// ============================================

export function ResourcesPageExample() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadResources();
  }, [selectedCategory]);

  const loadResources = async () => {
    setLoading(true);
    try {
      const data = selectedCategory === 'all' 
        ? await getAllResources()
        : await getResourcesByCategory(selectedCategory);
      setResources(data);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkHelpful = async (resourceId: string) => {
    await markResourceHelpful(resourceId);
    loadResources(); // Refresh to show updated count
  };

  return (
    <div>
      {/* Category filter */}
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="all">All Resources</option>
        <option value="anxiety">Anxiety</option>
        <option value="depression">Depression</option>
        <option value="stress">Stress</option>
      </select>

      {/* Resources list */}
      {loading ? (
        <p>Loading resources...</p>
      ) : (
        resources.map((resource: any) => (
          <div key={resource.id}>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <button onClick={() => handleMarkHelpful(resource.id)}>
              Helpful ({resource.helpful_count})
            </button>
          </div>
        ))
      )}
    </div>
  );
}

// ============================================
// Example 2: Assessment Integration
// ============================================

export function AssessmentExample() {
  const [assessments, setAssessments] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const userId = 'user-id-from-auth'; // Get from AuthContext

  useEffect(() => {
    loadAssessments();
  }, []);

  const loadAssessments = async () => {
    const data = await getAllAssessments();
    setAssessments(data);
  };

  const handleSubmitAssessment = async (assessment: any) => {
    // Calculate total score
    const score = Object.values(answers).reduce((a: any, b: any) => a + b, 0);
    const maxScore = assessment.questions.length * 3; // Assuming 0-3 scale
    
    // Calculate severity
    const severity = calculateSeverity(score, maxScore);
    
    // Generate recommendations
    const recommendations = generateRecommendations(severity, assessment.category);

    // Submit result
    await submitAssessmentResult(
      userId,
      assessment.id,
      score,
      answers,
      severity,
      recommendations
    );

    // Show results or navigate to results page
    console.log('Assessment completed!', { score, severity, recommendations });
  };

  return (
    <div>
      {/* Assessment UI */}
    </div>
  );
}

// ============================================
// Example 3: Mood Tracker Integration
// ============================================

export function MoodTrackerExample() {
  const [moodHistory, setMoodHistory] = useState([]);
  const [statistics, setStatistics] = useState<any>(null);
  const userId = 'user-id-from-auth'; // Get from AuthContext

  useEffect(() => {
    loadMoodData();
  }, []);

  const loadMoodData = async () => {
    const history = await getUserMoodHistory(userId, 7); // Last 7 days
    const stats = await getMoodStatistics(userId, 7);
    setMoodHistory(history);
    setStatistics(stats);
  };

  const handleMoodSelect = async (moodValue: number) => {
    await saveMoodEntry(userId, moodValue);
    loadMoodData(); // Refresh data
  };

  return (
    <div>
      {/* Mood selection buttons */}
      <div>
        {[1, 2, 3, 4, 5].map(value => (
          <button key={value} onClick={() => handleMoodSelect(value)}>
            {value}
          </button>
        ))}
      </div>

      {/* Statistics */}
      {statistics && (
        <div>
          <p>Average Mood: {statistics.average}</p>
          <p>Trend: {statistics.trend}</p>
          <p>Total Entries: {statistics.totalEntries}</p>
        </div>
      )}

      {/* Mood chart would go here */}
    </div>
  );
}

// ============================================
// Example 4: Support Groups Integration
// ============================================

export function SupportGroupsExample() {
  const [allGroups, setAllGroups] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const userId = 'user-id-from-auth'; // Get from AuthContext

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    const all = await getAllSupportGroups();
    const user = await getUserGroups(userId);
    setAllGroups(all);
    setUserGroups(user);
  };

  const handleJoinGroup = async (groupId: string) => {
    try {
      await joinSupportGroup(groupId, userId);
      loadGroups(); // Refresh to show updated membership
    } catch (error) {
      console.error('Failed to join group:', error);
    }
  };

  const isUserInGroup = (groupId: string) => {
    return userGroups.some((g: any) => g.id === groupId);
  };

  return (
    <div>
      {allGroups.map((group: any) => (
        <div key={group.id}>
          <h3>{group.name}</h3>
          <p>{group.description}</p>
          <p>{group.member_count} members</p>
          {isUserInGroup(group.id) ? (
            <span>✓ Joined</span>
          ) : (
            <button onClick={() => handleJoinGroup(group.id)}>
              Join Group
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================
// Example 5: Real-time Chat Integration
// ============================================

export function ChatExample() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const userId = 'user-id-from-auth'; // Get from AuthContext
  const userName = 'User Name'; // Get from AuthContext

  useEffect(() => {
    // Load initial messages
    loadMessages();

    // Subscribe to new messages
    const subscription = subscribeToMessages((message) => {
      setMessages(prev => [...prev, message]);
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribeFromMessages(subscription);
    };
  }, []);

  const loadMessages = async () => {
    const data = await getRecentMessages(50);
    setMessages(data);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      await sendChatMessage(userId, userName, newMessage, false);
      setNewMessage('');
    }
  };

  return (
    <div>
      {/* Messages list */}
      <div>
        {messages.map((msg: any) => (
          <div key={msg.id}>
            <strong>{msg.sender_name}:</strong> {msg.message}
          </div>
        ))}
      </div>

      {/* Message input */}
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

// ============================================
// Example 6: Using with AuthContext
// ============================================

export function IntegrationWithAuthExample() {
  // In your actual components, use the AuthContext like this:
  
  // import { useAuth } from '../contexts/AuthContext';
  
  // const { user, isAuthenticated } = useAuth();
  
  // if (!isAuthenticated) {
  //   return <Navigate to="/sign-in" />;
  // }

  // Now you can use user.id for backend calls:
  // const resources = await getAllResources();
  // const moodHistory = await getUserMoodHistory(user.id);
  // etc.

  return <div>See comments in code</div>;
}

// ============================================
// Example 7: Error Handling Pattern
// ============================================

export function ErrorHandlingExample() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await getAllResources();
      setData(result);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      // Error toast is already shown by the service
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{/* Render data */}</div>;
}

// Import statements for Example 5
import { getRecentMessages, sendChatMessage, subscribeToMessages, unsubscribeFromMessages } from '../services/chatService';
