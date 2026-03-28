import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Book, Brain, Heart, Activity, Smile, Moon, Clock, Loader2, ThumbsUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { isBackendConfigured } from '../../lib/supabase';
import { getAllResources, getResourcesByCategory, markResourceHelpful, type Resource } from '../../services/resourceService';
import { Alert, AlertDescription } from '../components/ui/alert';

export function Resources() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadResources();
  }, [selectedCategory]);

  const loadResources = async () => {
    setLoading(true);
    setError(null);

    if (isBackendConfigured) {
      try {
        const data = selectedCategory === 'all' 
          ? await getAllResources()
          : await getResourcesByCategory(selectedCategory);
        setResources(data || []);
      } catch (err) {
        console.error('Failed to load resources:', err);
        setError('Failed to load resources from backend. Using demo data.');
        setResources(getMockResources());
      }
    } else {
      setResources(getMockResources());
    }

    setLoading(false);
  };

  const handleMarkHelpful = async (resourceId: string) => {
    if (isBackendConfigured) {
      await markResourceHelpful(resourceId);
      loadResources();
    } else {
      // Update local state for demo
      setResources(prev => prev.map(r => 
        r.id === resourceId ? { ...r, helpful_count: r.helpful_count + 1 } : r
      ));
    }
  };

  const getMockResources = (): Resource[] => {
    const mockData: Resource[] = [
      {
        id: '1',
        category: 'anxiety',
        title: 'Managing Test Anxiety: A Student Guide',
        description: 'Practical strategies to cope with exam-related stress and anxiety.',
        content: `Test anxiety is a psychological condition where students experience extreme distress and anxiety in testing situations. While some nervousness before a test is normal, test anxiety can severely impact performance and wellbeing.

**Common Symptoms:**
- Physical: Racing heartbeat, sweating, nausea, headaches
- Cognitive: Negative thoughts, difficulty concentrating, mind going blank
- Behavioral: Fidgeting, pacing, avoiding study time

**Effective Strategies:**

1. **Prepare Thoroughly:** Start studying well in advance. Break material into manageable chunks and create a study schedule.

2. **Practice Relaxation Techniques:** Deep breathing, progressive muscle relaxation, and visualization can help calm your nerves.

3. **Challenge Negative Thoughts:** Replace "I'm going to fail" with "I've prepared well and I'll do my best."

4. **Take Care of Your Body:** Get adequate sleep, eat nutritious meals, and exercise regularly.

5. **Use Test-Taking Strategies:** Read instructions carefully, answer easier questions first, and manage your time wisely.

**When to Seek Help:**
If test anxiety is severely impacting your grades or causing significant distress, consider reaching out to your campus counseling center for additional support.`,
        read_time: 5,
        helpful_count: 42,
        author: 'Dr. Sarah Johnson',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '2',
        category: 'depression',
        title: 'Recognizing Signs of Depression',
        description: 'Understanding the symptoms and when to seek professional help.',
        content: `Depression is more than just feeling sad or going through a rough patch. It's a serious mental health condition that requires understanding and medical care.

**Common Signs and Symptoms:**
- Emotional: Persistent sad, anxious, or "empty" mood; feelings of worthlessness
- Behavioral: Loss of interest in activities; withdrawal from friends
- Physical: Changes in appetite or weight; sleep disturbances; fatigue
- Cognitive: Difficulty concentrating, remembering, or making decisions

**Treatment Options:**

1. **Therapy:** Cognitive-behavioral therapy (CBT) and other forms of counseling are highly effective.

2. **Medication:** Antidepressants can help balance brain chemistry, often most effective when combined with therapy.

3. **Lifestyle Changes:** Regular exercise, healthy diet, and good sleep habits support recovery.

4. **Support Groups:** Connecting with others who understand can be invaluable.

**When to Seek Help:**
If you've experienced several of these symptoms for more than two weeks, it's important to reach out for help. If you're having thoughts of suicide, call 988 immediately.`,
        read_time: 7,
        helpful_count: 38,
        author: 'Dr. Michael Chen',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '3',
        category: 'stress',
        title: 'Time Management for Mental Health',
        description: 'Balance your academic workload while maintaining your wellbeing.',
        content: `Poor time management often leads to increased stress, anxiety, and feeling overwhelmed. Learning to manage your time effectively is crucial for both academic success and mental wellbeing.

**Common Challenges:**
- Procrastination: Putting off tasks until the last minute
- Overcommitment: Taking on too many activities
- Poor prioritization: Difficulty identifying what's most important

**Effective Strategies:**

1. **Use a Planner:** Write down all assignments, exams, and commitments.

2. **Prioritize with the Eisenhower Matrix:** Categorize tasks by urgency and importance.

3. **Break Tasks into Steps:** Large projects feel less overwhelming when divided.

4. **Time Blocking:** Assign specific time blocks for different activities.

5. **Build in Buffer Time:** Don't schedule every minute; leave room for flexibility.

6. **Learn to Say No:** Protect your time and energy by declining unnecessary commitments.`,
        read_time: 6,
        helpful_count: 35,
        author: 'Emma Rodriguez',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '4',
        category: 'wellbeing',
        title: 'Building Resilience in College',
        description: 'Develop mental strength to navigate challenges and setbacks.',
        content: `Resilience is the ability to bounce back from difficulties, adapt to change, and keep going in the face of adversity.

**Key Components:**

1. **Growth Mindset:** View challenges as opportunities to learn and grow.

2. **Strong Relationships:** Build and maintain supportive connections with friends, family, and mentors.

3. **Self-Compassion:** Treat yourself with the same kindness you'd offer a good friend.

4. **Physical Health:** Regular exercise, good nutrition, and adequate sleep build physical resilience that supports mental strength.

5. **Purpose and Meaning:** Connect your daily activities to larger goals and values.

**Practical Steps:**
- Keep a gratitude journal
- Practice mindfulness meditation
- Set realistic goals
- Celebrate small wins
- Seek help when needed`,
        read_time: 8,
        helpful_count: 31,
        author: 'Dr. James Park',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '5',
        category: 'sleep',
        title: 'Sleep Hygiene for Students',
        description: 'Improve your sleep quality and energy levels.',
        content: `Good sleep is crucial for mental health, academic performance, and overall wellbeing. Yet many students struggle with sleep issues.

**Sleep Hygiene Basics:**

1. **Consistent Schedule:** Go to bed and wake up at the same time daily, even on weekends.

2. **Optimal Environment:** Keep your bedroom dark, quiet, cool (60-67°F), and comfortable.

3. **Limit Screen Time:** Avoid phones, tablets, and computers for at least 1 hour before bed.

4. **Avoid Stimulants:** No caffeine after 2pm; avoid alcohol before bed.

5. **Bedtime Routine:** Develop a relaxing pre-sleep routine (reading, gentle stretching, meditation).

**Common Mistakes:**
- Using your bed for studying or watching TV
- Taking long daytime naps (keep them under 20 minutes)
- Eating large meals close to bedtime
- Exercising too close to bedtime`,
        read_time: 5,
        helpful_count: 28,
        author: 'Dr. Lisa Thompson',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '6',
        category: 'anxiety',
        title: 'Social Anxiety on Campus',
        description: 'Navigate social situations with confidence and ease.',
        content: `Social anxiety can make campus life particularly challenging. Many students experience fear of judgment, embarrassment, or negative evaluation in social settings.

**Understanding Social Anxiety:**
Social anxiety is more than just shyness. It's intense fear or anxiety about social situations where you might be scrutinized by others.

**Effective Strategies:**

1. **Gradual Exposure:** Start with less intimidating social situations and gradually work up to more challenging ones.

2. **Challenge Negative Thoughts:** Question the evidence for anxious thoughts and consider alternative perspectives.

3. **Practice Social Skills:** Role-play conversations or practice greetings in low-pressure situations.

4. **Focus on Others:** Shift attention from self-focused worry to genuine interest in others.

5. **Relaxation Techniques:** Use deep breathing or grounding exercises before and during social situations.

**When to Seek Help:**
If social anxiety significantly interferes with your academic or personal life, consider talking to a counselor about evidence-based treatments like cognitive-behavioral therapy.`,
        read_time: 6,
        helpful_count: 26,
        author: 'Dr. Rachel Green',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    return selectedCategory === 'all' 
      ? mockData 
      : mockData.filter(r => r.category === selectedCategory);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const categories = [
    { id: 'all', label: 'All Resources', icon: Book },
    { id: 'anxiety', label: 'Anxiety', icon: Brain },
    { id: 'depression', label: 'Depression', icon: Heart },
    { id: 'stress', label: 'Stress', icon: Activity },
    { id: 'wellbeing', label: 'Wellbeing', icon: Smile },
    { id: 'sleep', label: 'Sleep', icon: Moon },
  ];

  // Article detail view
  if (selectedResource) {
    return (
      <div className="w-full">
        <section className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 text-white overflow-hidden">
          <div className="absolute inset-0">
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
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
            <Button
              variant="ghost"
              className="mb-6 text-white hover:bg-white/20"
              onClick={() => setSelectedResource(null)}
            >
              ← Back to Resources
            </Button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                {categories.find(c => c.id === selectedResource.category)?.label}
              </Badge>
              <h1 className="text-4xl md:text-5xl mb-4 font-bold">{selectedResource.title}</h1>
              <p className="text-xl text-purple-100 mb-6">{selectedResource.description}</p>
              
              <div className="flex items-center gap-6 text-purple-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{selectedResource.read_time} min read</span>
                </div>
                {selectedResource.author && (
                  <>
                    <span>•</span>
                    <span>By {selectedResource.author}</span>
                  </>
                )}
                <span>•</span>
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{selectedResource.helpful_count} found helpful</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 shadow-xl">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                {selectedResource.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4 text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-600 mb-4">Was this article helpful?</p>
                <Button
                  onClick={() => handleMarkHelpful(selectedResource.id)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Mark as Helpful
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    );
  }

  // Resource list view
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 text-white overflow-hidden">
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
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl mb-4 font-bold">Mental Health Resources</h1>
            <p className="text-xl text-purple-100">
              Evidence-based articles and guides to support your mental wellbeing journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sticky top-16 bg-white/80 backdrop-blur-md z-40 border-b border-gray-200">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </section>
      )}

      {/* Loading State */}
      {loading && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            <span className="ml-3 text-gray-600">Loading resources...</span>
          </div>
        </section>
      )}

      {/* Resources Grid */}
      {!loading && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {resources.length === 0 ? (
            <div className="text-center py-12">
              <Book className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No resources found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {resources.map((resource) => {
                const categoryData = categories.find(c => c.id === resource.category);
                const Icon = categoryData?.icon || Book;

                return (
                  <motion.div key={resource.id} variants={itemVariants}>
                    <Card
                      className="h-full bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all cursor-pointer group"
                      onClick={() => setSelectedResource(resource)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200">
                            <Icon className="w-3 h-3 mr-1" />
                            {categoryData?.label}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="w-3 h-3" />
                            {resource.read_time} min
                          </div>
                        </div>
                        <CardTitle className="group-hover:text-purple-600 transition-colors">
                          {resource.title}
                        </CardTitle>
                        <CardDescription>{resource.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          {resource.author && (
                            <span>By {resource.author}</span>
                          )}
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" />
                            <span>{resource.helpful_count}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </section>
      )}
    </div>
  );
}
