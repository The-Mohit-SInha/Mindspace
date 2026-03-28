import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, TrendingUp, Smile } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import localStorageService, { MoodEntry } from '../utils/localStorage';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

const moods = [
  { emoji: '😢', label: 'Very Sad', value: 'terrible', color: 'bg-blue-500' },
  { emoji: '😔', label: 'Sad', value: 'bad', color: 'bg-indigo-500' },
  { emoji: '😐', label: 'Okay', value: 'okay', color: 'bg-gray-500' },
  { emoji: '🙂', label: 'Good', value: 'good', color: 'bg-green-500' },
  { emoji: '😊', label: 'Great', value: 'great', color: 'bg-emerald-500' },
];

export function MoodCalendar() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showMoodSelector, setShowMoodSelector] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please sign in to track your mood');
      navigate('/sign-in');
    }
  }, [isAuthenticated, navigate]);

  // Load mood entries
  useEffect(() => {
    if (user) {
      const entries = localStorageService.getMoodEntries();
      const userEntries = entries.filter(e => e.userId === user.id);
      setMoodEntries(userEntries);
    }
  }, [user]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getMoodForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return moodEntries.find(entry => entry.date === dateStr);
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Only allow selecting today or past dates
    if (date > today) {
      toast.error('You can only track mood for today or past dates');
      return;
    }
    
    setSelectedDate(date);
    setShowMoodSelector(true);
  };

  const handleMoodSelect = (moodValue: string) => {
    if (!user || !selectedDate) return;

    const dateStr = selectedDate.toISOString().split('T')[0];
    
    // Check if mood already exists for this date
    const existingMood = moodEntries.find(entry => 
      entry.userId === user.id && entry.date === dateStr
    );

    if (existingMood) {
      // Update existing mood
      const updatedEntries = moodEntries.map(entry => 
        entry.id === existingMood.id 
          ? { ...entry, mood: moodValue as MoodEntry['mood'] }
          : entry
      );
      // Update localStorage
      localStorage.setItem('mindspace_mood_entries', JSON.stringify(updatedEntries));
      setMoodEntries(updatedEntries);
      toast.success('Mood updated!');
    } else {
      // Add new mood
      localStorageService.addMoodEntry({
        userId: user.id,
        mood: moodValue as MoodEntry['mood'],
        date: dateStr,
      });
      
      // Reload entries
      const entries = localStorageService.getMoodEntries();
      const userEntries = entries.filter(e => e.userId === user.id);
      setMoodEntries(userEntries);
      toast.success('Mood recorded!');
    }

    setShowMoodSelector(false);
    setSelectedDate(null);
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Calculate mood statistics
  const moodStats = moodEntries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalMoods = Object.values(moodStats).reduce((sum, count) => sum + count, 0);
  const averageMood = totalMoods > 0 
    ? moodEntries.reduce((sum, entry) => {
        const moodValue = moods.find(m => m.value === entry.mood)?.value || 'okay';
        const numValue = ['terrible', 'bad', 'okay', 'good', 'great'].indexOf(moodValue) + 1;
        return sum + numValue;
      }, 0) / totalMoods
    : 0;

  const averageMoodEmoji = moods[Math.round(averageMood) - 1]?.emoji || '😐';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Mood Calendar
          </h1>
          <p className="text-gray-600">Track your emotional journey day by day</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Calendar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2"
          >
            <Card className="border-purple-200 bg-white/80 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-purple-600" />
                    {monthName}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={previousMonth}
                      className="hover:bg-purple-50"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentMonth(new Date())}
                      className="hover:bg-purple-50"
                    >
                      Today
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextMonth}
                      className="hover:bg-purple-50"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Days of week header */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div
                      key={day}
                      className="text-center text-sm font-semibold text-gray-600 py-2"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-2">
                  {/* Empty cells for days before month starts */}
                  {Array.from({ length: startingDayOfWeek }).map((_, idx) => (
                    <div key={`empty-${idx}`} className="aspect-square" />
                  ))}

                  {/* Days of the month */}
                  {Array.from({ length: daysInMonth }).map((_, idx) => {
                    const day = idx + 1;
                    const date = new Date(year, month, day);
                    const mood = getMoodForDate(date);
                    const isToday = 
                      date.toDateString() === new Date().toDateString();
                    const isFuture = date > new Date();

                    return (
                      <motion.button
                        key={day}
                        whileHover={!isFuture ? { scale: 1.05 } : {}}
                        whileTap={!isFuture ? { scale: 0.95 } : {}}
                        onClick={() => handleDateClick(day)}
                        disabled={isFuture}
                        className={`
                          aspect-square rounded-xl p-2 transition-all relative
                          ${isToday ? 'ring-2 ring-purple-500' : ''}
                          ${isFuture ? 'opacity-30 cursor-not-allowed' : 'hover:shadow-md cursor-pointer'}
                          ${mood ? moods.find(m => m.value === mood.mood)?.color + ' text-white' : 'bg-gray-50 hover:bg-gray-100'}
                        `}
                      >
                        <div className="text-sm font-medium">
                          {day}
                        </div>
                        {mood && (
                          <div className="text-2xl mt-1">
                            {moods.find(m => m.value === mood.mood)?.emoji}
                          </div>
                        )}
                        {isToday && (
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Mood Legend</h4>
                  <div className="flex flex-wrap gap-3">
                    {moods.map(mood => (
                      <div key={mood.value} className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded ${mood.color} flex items-center justify-center text-sm`}>
                          {mood.emoji}
                        </div>
                        <span className="text-xs text-gray-600">{mood.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Statistics Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Average Mood */}
            <Card className="border-purple-200 bg-white/80 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  Overall Mood
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-6xl mb-3">{averageMoodEmoji}</div>
                  <p className="text-sm text-gray-600">
                    Based on {totalMoods} {totalMoods === 1 ? 'entry' : 'entries'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Mood Distribution */}
            <Card className="border-purple-200 bg-white/80 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Smile className="w-5 h-5 text-purple-600" />
                  Mood Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {moods.map(mood => {
                    const count = moodStats[mood.value] || 0;
                    const percentage = totalMoods > 0 ? (count / totalMoods) * 100 : 0;
                    
                    return (
                      <div key={mood.value}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="flex items-center gap-2">
                            <span className="text-lg">{mood.emoji}</span>
                            <span className="text-gray-700">{mood.label}</span>
                          </span>
                          <span className="font-medium text-gray-900">{count}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className={`${mood.color} h-2 rounded-full`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick tip */}
            <Card className="border-purple-200 bg-gradient-to-br from-purple-100 to-pink-100 shadow-xl">
              <CardContent className="pt-6">
                <p className="text-sm text-gray-700 leading-relaxed">
                  💡 <strong>Tip:</strong> Consistent mood tracking helps identify patterns and triggers. 
                  Try to log your mood at the same time each day!
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Mood Selector Modal */}
      <AnimatePresence>
        {showMoodSelector && selectedDate && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowMoodSelector(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl">
                <CardHeader>
                  <CardTitle>How did you feel?</CardTitle>
                  <CardDescription>
                    {selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-3">
                    {moods.map((mood, idx) => (
                      <motion.button
                        key={mood.value}
                        onClick={() => handleMoodSelect(mood.value)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <span className="text-4xl">{mood.emoji}</span>
                        <span className="text-xs font-medium text-gray-700">{mood.label}</span>
                      </motion.button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => setShowMoodSelector(false)}
                  >
                    Cancel
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
