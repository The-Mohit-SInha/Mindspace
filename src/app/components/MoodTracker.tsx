import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Calendar } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const moods = [
  { emoji: '😢', label: 'Very Sad', value: 1, color: 'from-blue-500 to-blue-600' },
  { emoji: '😔', label: 'Sad', value: 2, color: 'from-indigo-500 to-indigo-600' },
  { emoji: '😐', label: 'Okay', value: 3, color: 'from-gray-500 to-gray-600' },
  { emoji: '🙂', label: 'Good', value: 4, color: 'from-green-500 to-green-600' },
  { emoji: '😊', label: 'Great', value: 5, color: 'from-emerald-500 to-emerald-600' },
];

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [moodHistory, setMoodHistory] = useState<number[]>([]);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    // Load mood history from localStorage
    const saved = localStorage.getItem('mindspace_mood_history');
    if (saved) {
      setMoodHistory(JSON.parse(saved));
      setShowChart(true);
    }
  }, []);

  const handleMoodSelect = (value: number) => {
    setSelectedMood(value);
    const newHistory = [...moodHistory, value].slice(-7); // Keep last 7 days
    setMoodHistory(newHistory);
    localStorage.setItem('mindspace_mood_history', JSON.stringify(newHistory));
    setShowChart(true);

    // Show success message
    setTimeout(() => setSelectedMood(null), 2000);
  };

  const chartData = {
    labels: moodHistory.map((_, idx) => {
      const date = new Date();
      date.setDate(date.getDate() - (moodHistory.length - idx - 1));
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Mood Level',
        data: moodHistory,
        fill: true,
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.4,
        pointBackgroundColor: 'rgb(168, 85, 247)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const mood = moods.find(m => m.value === context.parsed.y);
            return mood ? `${mood.emoji} ${mood.label}` : '';
          },
        },
      },
    },
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: function (value: any) {
            const mood = moods.find(m => m.value === value);
            return mood ? mood.emoji : '';
          },
        },
      },
    },
  };

  return (
    <Card className="border-purple-200 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Daily Mood Tracker
            </CardTitle>
            <CardDescription>How are you feeling today?</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mood Selection */}
        <div className="grid grid-cols-5 gap-2">
          {moods.map((mood, idx) => (
            <motion.button
              key={mood.value}
              onClick={() => handleMoodSelect(mood.value)}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative p-4 rounded-2xl transition-all ${
                selectedMood === mood.value
                  ? `bg-gradient-to-br ${mood.color} shadow-lg`
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div className="text-3xl mb-2">{mood.emoji}</div>
              <div
                className={`text-xs font-medium ${
                  selectedMood === mood.value ? 'text-white' : 'text-gray-700'
                }`}
              >
                {mood.label}
              </div>

              {selectedMood === mood.value && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-xs">✓</span>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Success Message */}
        {selectedMood && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-sm text-green-600 font-medium"
          >
            ✓ Mood recorded! Keep tracking to see your patterns.
          </motion.div>
        )}

        {/* Mood Chart */}
        {showChart && moodHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ delay: 0.3 }}
          >
            <div className="pt-4 border-t border-purple-100">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Your Mood Journey</h4>
              <div className="h-48">
                <Line data={chartData} options={chartOptions} />
              </div>
              <p className="text-xs text-gray-600 mt-4 text-center">
                Tracking your mood helps identify patterns and triggers
              </p>
            </div>
          </motion.div>
        )}

        {!showChart && (
          <div className="text-center py-4">
            <p className="text-sm text-gray-600">
              Start tracking your mood to see trends over time
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
