// Local Storage Service for MindSpace
// Provides persistent browser-based storage for user data
//
// FEATURES:
// - Automatic backup of user profile, mood entries, journal entries, assessments
// - Calendar events, saved resources, community activity
// - Export/Import functionality for data portability
// - Storage usage tracking
// - Data persistence across browser sessions
//
// USAGE:
// Import: import localStorageService from '../utils/localStorage';
// Save mood: localStorageService.addMoodEntry({ userId, mood, date, note });
// Get moods: localStorageService.getMoodEntries();
// Export all: localStorageService.exportAllData();
//
// NOTE: Data is stored locally in the browser and will be cleared if browser data is cleared.
// Users should regularly export backups to keep their data safe.

const STORAGE_PREFIX = 'mindspace_';

// Storage keys
export const STORAGE_KEYS = {
  USER_PROFILE: `${STORAGE_PREFIX}user_profile`,
  MOOD_ENTRIES: `${STORAGE_PREFIX}mood_entries`,
  JOURNAL_ENTRIES: `${STORAGE_PREFIX}journal_entries`,
  ASSESSMENT_RESULTS: `${STORAGE_PREFIX}assessment_results`,
  SAVED_RESOURCES: `${STORAGE_PREFIX}saved_resources`,
  CALENDAR_EVENTS: `${STORAGE_PREFIX}calendar_events`,
  USER_PREFERENCES: `${STORAGE_PREFIX}user_preferences`,
  COMMUNITY_ACTIVITY: `${STORAGE_PREFIX}community_activity`,
  CRISIS_HISTORY: `${STORAGE_PREFIX}crisis_history`,
  LAST_BACKUP: `${STORAGE_PREFIX}last_backup`,
  AUTH_MODE: `${STORAGE_PREFIX}auth_mode`, // 'local' or 'backend'
};

// Types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  university?: string;
  year?: string;
  pronouns?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MoodEntry {
  id: string;
  userId: string;
  mood: 'great' | 'good' | 'okay' | 'bad' | 'terrible';
  note?: string;
  date: string;
  createdAt: string;
}

export interface JournalEntry {
  id: string;
  userId: string;
  title: string;
  content: string;
  mood?: string;
  tags?: string[];
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface AssessmentResult {
  id: string;
  userId: string;
  assessmentType: 'anxiety' | 'depression' | 'stress' | 'wellbeing';
  score: number;
  severity: string;
  answers: Record<string, number>;
  date: string;
  createdAt: string;
}

export interface SavedResource {
  id: string;
  userId: string;
  resourceId: string;
  resourceType: 'article' | 'video' | 'technique' | 'faq';
  title: string;
  savedAt: string;
}

export interface CalendarEvent {
  id: string;
  userId: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  type: 'appointment' | 'reminder' | 'event' | 'task';
  completed?: boolean;
  createdAt: string;
}

export interface UserPreferences {
  theme?: 'light' | 'dark' | 'auto';
  notifications?: boolean;
  anonymousMode?: boolean;
  language?: string;
}

export interface CommunityActivity {
  joinedGroups: string[];
  createdTopics: string[];
  scheduledChats: string[];
  registeredEvents: string[];
}

// Local Storage Helper Functions

class LocalStorageService {
  // Generic get/set functions
  private get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return null;
    }
  }

  private set<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      this.updateLastBackup();
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage (${key}):`, error);
      return false;
    }
  }

  private remove(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
      return false;
    }
  }

  // User Profile
  getUserProfile(): UserProfile | null {
    return this.get<UserProfile>(STORAGE_KEYS.USER_PROFILE);
  }

  setUserProfile(profile: UserProfile): boolean {
    return this.set(STORAGE_KEYS.USER_PROFILE, profile);
  }

  updateUserProfile(updates: Partial<UserProfile>): boolean {
    const current = this.getUserProfile();
    if (!current) return false;
    
    const updated = {
      ...current,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return this.setUserProfile(updated);
  }

  // Mood Entries
  getMoodEntries(): MoodEntry[] {
    return this.get<MoodEntry[]>(STORAGE_KEYS.MOOD_ENTRIES) || [];
  }

  addMoodEntry(entry: Omit<MoodEntry, 'id' | 'createdAt'>): boolean {
    const entries = this.getMoodEntries();
    const newEntry: MoodEntry = {
      ...entry,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
    };
    entries.push(newEntry);
    return this.set(STORAGE_KEYS.MOOD_ENTRIES, entries);
  }

  getMoodEntriesForDateRange(startDate: string, endDate: string): MoodEntry[] {
    const entries = this.getMoodEntries();
    return entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= new Date(startDate) && entryDate <= new Date(endDate);
    });
  }

  // Journal Entries
  getJournalEntries(): JournalEntry[] {
    return this.get<JournalEntry[]>(STORAGE_KEYS.JOURNAL_ENTRIES) || [];
  }

  addJournalEntry(entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>): boolean {
    const entries = this.getJournalEntries();
    const newEntry: JournalEntry = {
      ...entry,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    entries.unshift(newEntry); // Add to beginning
    return this.set(STORAGE_KEYS.JOURNAL_ENTRIES, entries);
  }

  updateJournalEntry(id: string, updates: Partial<JournalEntry>): boolean {
    const entries = this.getJournalEntries();
    const index = entries.findIndex(e => e.id === id);
    if (index === -1) return false;

    entries[index] = {
      ...entries[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return this.set(STORAGE_KEYS.JOURNAL_ENTRIES, entries);
  }

  deleteJournalEntry(id: string): boolean {
    const entries = this.getJournalEntries();
    const filtered = entries.filter(e => e.id !== id);
    return this.set(STORAGE_KEYS.JOURNAL_ENTRIES, filtered);
  }

  // Assessment Results
  getAssessmentResults(): AssessmentResult[] {
    return this.get<AssessmentResult[]>(STORAGE_KEYS.ASSESSMENT_RESULTS) || [];
  }

  addAssessmentResult(result: Omit<AssessmentResult, 'id' | 'createdAt'>): boolean {
    const results = this.getAssessmentResults();
    const newResult: AssessmentResult = {
      ...result,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
    };
    results.push(newResult);
    return this.set(STORAGE_KEYS.ASSESSMENT_RESULTS, results);
  }

  getLatestAssessmentByType(type: AssessmentResult['assessmentType']): AssessmentResult | null {
    const results = this.getAssessmentResults();
    const filtered = results.filter(r => r.assessmentType === type);
    return filtered.length > 0 ? filtered[filtered.length - 1] : null;
  }

  // Saved Resources
  getSavedResources(): SavedResource[] {
    return this.get<SavedResource[]>(STORAGE_KEYS.SAVED_RESOURCES) || [];
  }

  saveResource(resource: Omit<SavedResource, 'id' | 'savedAt'>): boolean {
    const resources = this.getSavedResources();
    
    // Check if already saved
    const exists = resources.some(r => 
      r.resourceId === resource.resourceId && r.userId === resource.userId
    );
    if (exists) return true;

    const newResource: SavedResource = {
      ...resource,
      id: this.generateId(),
      savedAt: new Date().toISOString(),
    };
    resources.push(newResource);
    return this.set(STORAGE_KEYS.SAVED_RESOURCES, resources);
  }

  unsaveResource(resourceId: string, userId: string): boolean {
    const resources = this.getSavedResources();
    const filtered = resources.filter(r => 
      !(r.resourceId === resourceId && r.userId === userId)
    );
    return this.set(STORAGE_KEYS.SAVED_RESOURCES, filtered);
  }

  isResourceSaved(resourceId: string, userId: string): boolean {
    const resources = this.getSavedResources();
    return resources.some(r => 
      r.resourceId === resourceId && r.userId === userId
    );
  }

  // Calendar Events
  getCalendarEvents(): CalendarEvent[] {
    return this.get<CalendarEvent[]>(STORAGE_KEYS.CALENDAR_EVENTS) || [];
  }

  addCalendarEvent(event: Omit<CalendarEvent, 'id' | 'createdAt'>): boolean {
    const events = this.getCalendarEvents();
    const newEvent: CalendarEvent = {
      ...event,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
    };
    events.push(newEvent);
    return this.set(STORAGE_KEYS.CALENDAR_EVENTS, events);
  }

  updateCalendarEvent(id: string, updates: Partial<CalendarEvent>): boolean {
    const events = this.getCalendarEvents();
    const index = events.findIndex(e => e.id === id);
    if (index === -1) return false;

    events[index] = { ...events[index], ...updates };
    return this.set(STORAGE_KEYS.CALENDAR_EVENTS, events);
  }

  deleteCalendarEvent(id: string): boolean {
    const events = this.getCalendarEvents();
    const filtered = events.filter(e => e.id !== id);
    return this.set(STORAGE_KEYS.CALENDAR_EVENTS, filtered);
  }

  getEventsForDate(date: string): CalendarEvent[] {
    const events = this.getCalendarEvents();
    return events.filter(e => e.date === date);
  }

  // User Preferences
  getUserPreferences(): UserPreferences {
    return this.get<UserPreferences>(STORAGE_KEYS.USER_PREFERENCES) || {};
  }

  setUserPreferences(preferences: UserPreferences): boolean {
    return this.set(STORAGE_KEYS.USER_PREFERENCES, preferences);
  }

  updateUserPreferences(updates: Partial<UserPreferences>): boolean {
    const current = this.getUserPreferences();
    const updated = { ...current, ...updates };
    return this.setUserPreferences(updated);
  }

  // Community Activity
  getCommunityActivity(): CommunityActivity {
    return this.get<CommunityActivity>(STORAGE_KEYS.COMMUNITY_ACTIVITY) || {
      joinedGroups: [],
      createdTopics: [],
      scheduledChats: [],
      registeredEvents: [],
    };
  }

  updateCommunityActivity(updates: Partial<CommunityActivity>): boolean {
    const current = this.getCommunityActivity();
    const updated = { ...current, ...updates };
    return this.set(STORAGE_KEYS.COMMUNITY_ACTIVITY, updated);
  }

  joinGroup(groupId: string): boolean {
    const activity = this.getCommunityActivity();
    if (!activity.joinedGroups.includes(groupId)) {
      activity.joinedGroups.push(groupId);
      return this.updateCommunityActivity(activity);
    }
    return true;
  }

  leaveGroup(groupId: string): boolean {
    const activity = this.getCommunityActivity();
    activity.joinedGroups = activity.joinedGroups.filter(id => id !== groupId);
    return this.updateCommunityActivity(activity);
  }

  registerForEvent(eventId: string): boolean {
    const activity = this.getCommunityActivity();
    if (!activity.registeredEvents.includes(eventId)) {
      activity.registeredEvents.push(eventId);
      return this.updateCommunityActivity(activity);
    }
    return true;
  }

  // Crisis History (for tracking when crisis resources were accessed)
  addCrisisAccess(helplineId: string): boolean {
    const history = this.get<Array<{id: string, timestamp: string}>>(STORAGE_KEYS.CRISIS_HISTORY) || [];
    history.push({
      id: helplineId,
      timestamp: new Date().toISOString(),
    });
    return this.set(STORAGE_KEYS.CRISIS_HISTORY, history);
  }

  // Backup Management
  private updateLastBackup(): void {
    localStorage.setItem(STORAGE_KEYS.LAST_BACKUP, new Date().toISOString());
  }

  getLastBackupTime(): string | null {
    return localStorage.getItem(STORAGE_KEYS.LAST_BACKUP);
  }

  // Export all data
  exportAllData(): string {
    const data = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      userProfile: this.getUserProfile(),
      moodEntries: this.getMoodEntries(),
      journalEntries: this.getJournalEntries(),
      assessmentResults: this.getAssessmentResults(),
      savedResources: this.getSavedResources(),
      calendarEvents: this.getCalendarEvents(),
      userPreferences: this.getUserPreferences(),
      communityActivity: this.getCommunityActivity(),
    };
    return JSON.stringify(data, null, 2);
  }

  // Import data from backup
  importAllData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.userProfile) this.setUserProfile(data.userProfile);
      if (data.moodEntries) this.set(STORAGE_KEYS.MOOD_ENTRIES, data.moodEntries);
      if (data.journalEntries) this.set(STORAGE_KEYS.JOURNAL_ENTRIES, data.journalEntries);
      if (data.assessmentResults) this.set(STORAGE_KEYS.ASSESSMENT_RESULTS, data.assessmentResults);
      if (data.savedResources) this.set(STORAGE_KEYS.SAVED_RESOURCES, data.savedResources);
      if (data.calendarEvents) this.set(STORAGE_KEYS.CALENDAR_EVENTS, data.calendarEvents);
      if (data.userPreferences) this.setUserPreferences(data.userPreferences);
      if (data.communityActivity) this.updateCommunityActivity(data.communityActivity);

      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  // Clear all data
  clearAllData(): boolean {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }

  // Get storage usage
  getStorageUsage(): { used: number; available: number; percentage: number } {
    try {
      let total = 0;
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key) && key.startsWith(STORAGE_PREFIX)) {
          total += localStorage[key].length + key.length;
        }
      }
      
      // Estimate 5MB available (most browsers support 5-10MB)
      const available = 5 * 1024 * 1024;
      const percentage = (total / available) * 100;

      return {
        used: total,
        available,
        percentage: Math.min(percentage, 100),
      };
    } catch (error) {
      console.error('Error calculating storage usage:', error);
      return { used: 0, available: 5242880, percentage: 0 };
    }
  }

  // Utility functions
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Auth mode management
  getAuthMode(): 'local' | 'backend' {
    return (localStorage.getItem(STORAGE_KEYS.AUTH_MODE) as 'local' | 'backend') || 'local';
  }

  setAuthMode(mode: 'local' | 'backend'): boolean {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH_MODE, mode);
      return true;
    } catch (error) {
      console.error('Error setting auth mode:', error);
      return false;
    }
  }
}

// Export singleton instance
export const localStorageService = new LocalStorageService();

// Export for use in components
export default localStorageService;