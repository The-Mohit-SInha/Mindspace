import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { isBackendConfigured } from '../../lib/supabase';
import { getAllMessages, sendMessage, type ChatMessage } from '../../services/chatService';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

export function FloatingChatButton() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  // Load messages when chat opens
  useEffect(() => {
    if (isOpen) {
      loadMessages();
      
      // Subscribe to real-time messages if backend is configured
      if (isBackendConfigured) {
        const subscription = supabase
          .channel('chat_messages')
          .on('postgres_changes', 
            { event: 'INSERT', schema: 'public', table: 'chat_messages' },
            (payload) => {
              const newMessage = payload.new as ChatMessage;
              setMessages(prev => [...prev, newMessage]);
            }
          )
          .subscribe();

        return () => {
          subscription.unsubscribe();
        };
      }
    }
  }, [isOpen]);

  const loadMessages = async () => {
    setLoading(true);
    
    if (isBackendConfigured && user) {
      try {
        const data = await getAllMessages(user.id);
        setMessages(data || []);
      } catch (err) {
        console.error('Failed to load messages:', err);
      }
    }
    
    setLoading(false);
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    const messageText = message.trim();
    setMessage('');
    setSending(true);

    if (isBackendConfigured && user) {
      try {
        const newMessage = await sendMessage(user.id, messageText);
        if (newMessage) {
          setMessages(prev => [...prev, newMessage]);
        }
        
        // Simulate bot response after 1 second
        setTimeout(async () => {
          const botResponse = await sendMessage(
            'system',
            "Thank you for reaching out. A peer counselor will respond shortly. Remember, you're not alone. 💜",
            false
          );
          if (botResponse) {
            setMessages(prev => [...prev, botResponse]);
          }
        }, 1000);
      } catch (err) {
        console.error('Failed to send message:', err);
      }
    } else {
      // Demo mode: use local state
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        user_id: user?.id || 'demo',
        message: messageText,
        is_user: true,
        created_at: new Date().toISOString(),
      };
      setMessages(prev => [...prev, userMessage]);
      
      // Simulate bot response
      setTimeout(() => {
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          user_id: 'system',
          message: "Thank you for reaching out. A peer counselor will respond shortly. Remember, you're not alone. 💜",
          is_user: false,
          created_at: new Date().toISOString(),
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
    }
    
    setSending(false);
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] md:w-96"
          >
            <Card className="shadow-2xl border-purple-200 bg-white/95 backdrop-blur-xl">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Anonymous Support</CardTitle>
                    <CardDescription className="text-purple-100 text-xs">
                      We're here to listen
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-purple-100">Available 24/7</span>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {/* Messages */}
                <div className="h-64 overflow-y-auto mb-4 space-y-3">
                  {loading ? (
                    <div className="h-full flex items-center justify-center text-center">
                      <div>
                        <Loader2 className="w-12 h-12 mx-auto mb-3 text-purple-300 animate-spin" />
                        <p className="text-sm text-gray-600">
                          Loading messages...
                        </p>
                      </div>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-center">
                      <div>
                        <MessageCircle className="w-12 h-12 mx-auto mb-3 text-purple-300" />
                        <p className="text-sm text-gray-600">
                          Start a conversation. Your identity is anonymous and safe.
                        </p>
                      </div>
                    </div>
                  ) : (
                    messages.map((msg, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.is_user ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                            msg.is_user
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSend}
                    size="icon"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </Button>
                </div>

                <p className="text-xs text-gray-500 mt-2 text-center">
                  If you're in crisis, please visit our <a href="/crisis" className="text-purple-600 underline">Crisis Support</a> page
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-4 md:right-6 z-50 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-purple-500/50 transition-shadow"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification Badge */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
          >
            <span className="text-xs text-white font-bold">!</span>
          </motion.div>
        )}
      </motion.button>
    </>
  );
}