import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, MapPin, X, Edit2, Trash2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import localStorageService from '../utils/localStorage';

interface UserCalendarProps {
  userId: string;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const EVENT_COLORS = {
  event: 'bg-purple-100 text-purple-700 border-purple-300',
  task: 'bg-blue-100 text-blue-700 border-blue-300',
  reminder: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  appointment: 'bg-green-100 text-green-700 border-green-300',
};

const EVENT_TYPE_LABELS = {
  event: 'Event',
  task: 'Task',
  reminder: 'Reminder',
  appointment: 'Appointment',
};

export function UserCalendar({ userId }: UserCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '09:00',
    type: 'event' as 'event' | 'task' | 'reminder' | 'appointment',
  });

  // Load events
  useEffect(() => {
    loadEvents();
  }, [userId]);

  const loadEvents = () => {
    const allEvents = localStorageService.getCalendarEvents();
    const userEvents = allEvents.filter(e => e.userId === userId);
    setEvents(userEvents);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days in the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(e => e.date === dateStr);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setFormData({
      ...formData,
      date: date.toISOString().split('T')[0],
    });
    setIsAddEventOpen(true);
  };

  const handleEventClick = (event: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEvent(event);
  };

  const handleAddEvent = () => {
    if (!formData.title || !formData.date) return;

    localStorageService.addCalendarEvent({
      userId,
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      type: formData.type,
    });

    loadEvents();
    setIsAddEventOpen(false);
    resetForm();
  };

  const handleEditEvent = () => {
    if (!selectedEvent || !formData.title) return;

    localStorageService.updateCalendarEvent(selectedEvent.id, {
      title: formData.title,
      description: formData.description,
      time: formData.time,
      type: formData.type,
    });

    loadEvents();
    setSelectedEvent(null);
    setIsEditMode(false);
    resetForm();
  };

  const handleDeleteEvent = (eventId: string) => {
    localStorageService.deleteCalendarEvent(eventId);
    loadEvents();
    setSelectedEvent(null);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '09:00',
      type: 'event',
    });
  };

  const openEditMode = (event: any) => {
    setFormData({
      title: event.title,
      description: event.description || '',
      date: event.date,
      time: event.time || '09:00',
      type: event.type,
    });
    setIsEditMode(true);
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-purple-600" />
            My Calendar
          </CardTitle>
          <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
            <DialogTrigger asChild>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                onClick={() => {
                  resetForm();
                  setIsEditMode(false);
                }}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{isEditMode ? 'Edit Event' : 'Add New Event'}</DialogTitle>
                <DialogDescription>
                  {isEditMode ? 'Update your event details' : 'Create a new calendar event'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Event title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Event description"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date *</Label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="task">Task</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                      <SelectItem value="appointment">Appointment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsAddEventOpen(false);
                    setIsEditMode(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={isEditMode ? handleEditEvent : handleAddEvent}
                  disabled={!formData.title || !formData.date}
                >
                  {isEditMode ? 'Update' : 'Add'} Event
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="sm" onClick={handlePrevMonth}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h3 className="text-lg font-semibold">
            {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <Button variant="ghost" size="sm" onClick={handleNextMonth}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Day Headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {days.map((day, index) => {
            if (!day) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const dayEvents = getEventsForDate(day);
            const isToday = day.getTime() === today.getTime();
            const isPast = day < today;

            return (
              <motion.button
                key={day.toISOString()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDateClick(day)}
                className={`
                  aspect-square p-2 rounded-lg border-2 transition-all relative
                  ${isToday ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}
                  ${isPast && !isToday ? 'opacity-50' : ''}
                `}
              >
                <div className="text-sm font-medium">{day.getDate()}</div>
                {dayEvents.length > 0 && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                    {dayEvents.slice(0, 3).map((event, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full ${
                          event.type === 'event' ? 'bg-purple-500' :
                          event.type === 'appointment' ? 'bg-green-500' :
                          event.type === 'reminder' ? 'bg-yellow-500' :
                          'bg-blue-500'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Upcoming Events */}
        {events.length > 0 && (
          <div className="mt-6 space-y-3">
            <h4 className="font-semibold text-sm text-gray-700">Upcoming Events</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {events
                .filter(e => new Date(e.date) >= today)
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .slice(0, 5)
                .map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-lg border ${EVENT_COLORS[event.type as keyof typeof EVENT_COLORS]} cursor-pointer hover:shadow-md transition-shadow`}
                    onClick={(e) => handleEventClick(event, e)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h5 className="font-medium text-sm">{event.title}</h5>
                        <div className="flex items-center gap-3 mt-1 text-xs opacity-75">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="w-3 h-3" />
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                          {event.time && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {event.time}
                            </span>
                          )}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {EVENT_TYPE_LABELS[event.type as keyof typeof EVENT_TYPE_LABELS]}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* Event Detail Dialog */}
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedEvent?.title}</DialogTitle>
              <DialogDescription>Event Details</DialogDescription>
            </DialogHeader>
            {selectedEvent && (
              <div className="space-y-4">
                {selectedEvent.description && (
                  <div>
                    <Label>Description</Label>
                    <p className="text-sm text-gray-600 mt-1">{selectedEvent.description}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Date</Label>
                    <p className="text-sm mt-1">{new Date(selectedEvent.date).toLocaleDateString()}</p>
                  </div>
                  {selectedEvent.time && (
                    <div>
                      <Label>Time</Label>
                      <p className="text-sm mt-1">{selectedEvent.time}</p>
                    </div>
                  )}
                </div>
                <div>
                  <Label>Type</Label>
                  <Badge className="mt-1">
                    {EVENT_TYPE_LABELS[selectedEvent.type as keyof typeof EVENT_TYPE_LABELS]}
                  </Badge>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      openEditMode(selectedEvent);
                      setSelectedEvent(null);
                      setIsAddEventOpen(true);
                    }}
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => handleDeleteEvent(selectedEvent.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
