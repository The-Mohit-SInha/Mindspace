import { useState } from 'react';
import { motion } from 'motion/react';
import { Book, Brain, Heart, Activity, Smile, Moon, ArrowLeft, Clock, AlertCircle, CheckCircle2, Lightbulb, AlertTriangle, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Separator } from '../components/ui/separator';

export function Resources() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

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

  const articles = [
    {
      category: 'anxiety',
      title: 'Managing Test Anxiety: A Student Guide',
      description: 'Practical strategies to cope with exam-related stress and anxiety.',
      readTime: '5 min read',
      tags: ['Anxiety', 'Academic', 'Coping Skills'],
      sections: [
        {
          type: 'intro',
          title: 'Understanding Test Anxiety',
          content: 'Test anxiety is a psychological condition where students experience extreme distress and anxiety in testing situations. While some nervousness before a test is normal, test anxiety can severely impact performance and wellbeing.',
        },
        {
          type: 'symptoms',
          title: 'Common Symptoms',
          items: [
            { label: 'Physical symptoms', description: 'Racing heartbeat, sweating, nausea, headaches' },
            { label: 'Cognitive symptoms', description: 'Negative thoughts, difficulty concentrating, mind going blank' },
            { label: 'Behavioral symptoms', description: 'Fidgeting, pacing, avoiding study time' },
          ],
        },
        {
          type: 'strategies',
          title: 'Effective Strategies',
          strategies: [
            { title: 'Prepare Thoroughly', description: 'Start studying well in advance. Break material into manageable chunks and create a study schedule.' },
            { title: 'Practice Relaxation Techniques', description: 'Deep breathing, progressive muscle relaxation, and visualization can help calm your nerves.' },
            { title: 'Challenge Negative Thoughts', description: 'Replace "I\'m going to fail" with "I\'ve prepared well and I\'ll do my best."' },
            { title: 'Take Care of Your Body', description: 'Get adequate sleep, eat nutritious meals, and exercise regularly.' },
            { title: 'Use Test-Taking Strategies', description: 'Read instructions carefully, answer easier questions first, and manage your time wisely.' },
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          title: 'When to Seek Help',
          content: 'If test anxiety is severely impacting your grades or causing significant distress, consider reaching out to your campus counseling center for additional support.',
        },
      ],
    },
    {
      category: 'depression',
      title: 'Recognizing Signs of Depression',
      description: 'Understanding the symptoms and when to seek professional help.',
      readTime: '7 min read',
      tags: ['Depression', 'Mental Health', 'Support'],
      sections: [
        {
          type: 'intro',
          title: 'What is Depression?',
          content: 'Depression is more than just feeling sad or going through a rough patch. It\'s a serious mental health condition that requires understanding and medical care. Left untreated, depression can impact every aspect of your life, from relationships to academic performance.',
        },
        {
          type: 'symptoms',
          title: 'Common Signs and Symptoms',
          items: [
            { label: 'Emotional symptoms', description: 'Persistent sad, anxious, or "empty" mood; feelings of worthlessness or excessive guilt' },
            { label: 'Behavioral changes', description: 'Loss of interest in activities once enjoyed; withdrawal from friends and activities' },
            { label: 'Physical symptoms', description: 'Changes in appetite or weight; sleep disturbances (insomnia or oversleeping); loss of energy or increased fatigue' },
            { label: 'Cognitive difficulties', description: 'Difficulty concentrating, remembering, or making decisions; thoughts of death or suicide' },
          ],
        },
        {
          type: 'info',
          title: 'Depression in College Students',
          content: 'College can be particularly challenging with academic pressure, social adjustments, and financial stress. It\'s important to recognize that depression is not a sign of weakness or something you can just "snap out of." It\'s a real medical condition that responds to treatment.',
        },
        {
          type: 'strategies',
          title: 'Treatment Options',
          strategies: [
            { title: 'Therapy', description: 'Cognitive-behavioral therapy (CBT) and other forms of counseling are highly effective. A therapist can help you develop coping strategies and address underlying issues.' },
            { title: 'Medication', description: 'Antidepressants can help balance brain chemistry. They often work best when combined with therapy.' },
            { title: 'Lifestyle Changes', description: 'Regular exercise, healthy diet, and good sleep habits support recovery. Even small changes can make a significant difference.' },
            { title: 'Support Groups', description: 'Connecting with others who understand can be invaluable. Many campuses offer peer support groups.' },
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          title: 'When to Seek Help',
          content: 'If you\'ve experienced several of these symptoms for more than two weeks, it\'s important to reach out for help. Campus counseling services, your doctor, or a mental health professional can provide support and treatment options. If you\'re having thoughts of suicide, call 988 (Suicide & Crisis Lifeline) immediately.',
        },
      ],
    },
    {
      category: 'stress',
      title: 'Time Management for Mental Health',
      description: 'Balance your academic workload while maintaining your wellbeing.',
      readTime: '6 min read',
      tags: ['Stress', 'Productivity', 'Balance'],
      sections: [
        {
          type: 'intro',
          title: 'The Connection Between Time Management and Mental Health',
          content: 'Poor time management often leads to increased stress, anxiety, and feeling overwhelmed. Learning to manage your time effectively is crucial for both academic success and mental wellbeing. When you feel in control of your time, you feel more in control of your life.',
        },
        {
          type: 'symptoms',
          title: 'Common Time Management Challenges',
          items: [
            { label: 'Procrastination', description: 'Putting off tasks until the last minute, leading to unnecessary stress and cramming' },
            { label: 'Overcommitment', description: 'Taking on too many activities and responsibilities, leaving no time for rest' },
            { label: 'Poor prioritization', description: 'Difficulty identifying what tasks are most important and urgent' },
            { label: 'Neglecting self-care', description: 'Not allowing time for exercise, relaxation, and social connections' },
          ],
        },
        {
          type: 'strategies',
          title: 'Effective Time Management Strategies',
          strategies: [
            { title: 'Use a Planner', description: 'Whether digital or paper, having a centralized place to track assignments, appointments, and commitments is essential. Review it daily and weekly.' },
            { title: 'Priority Matrix', description: 'Categorize tasks as: Urgent and Important (do first), Important but Not Urgent (schedule), Urgent but Not Important (delegate if possible), Neither Urgent nor Important (eliminate).' },
            { title: 'Time Blocking', description: 'Dedicate specific time blocks for studying, classes, exercise, and relaxation. Treat these blocks as non-negotiable appointments.' },
            { title: 'The Pomodoro Technique', description: 'Work in focused 25-minute intervals with 5-minute breaks in between. This maintains focus while preventing burnout.' },
            { title: 'Learn to Say No', description: 'It\'s okay to decline commitments when your schedule is already full. Protecting your time protects your mental health.' },
          ],
        },
        {
          type: 'callout',
          variant: 'success',
          title: 'Building in Self-Care',
          content: 'Schedule time for activities that restore your energy: exercise, hobbies, socializing, or simply relaxing. Self-care isn\'t selfish—it\'s necessary for maintaining your mental health and academic performance. Treat self-care time with the same importance as class time.',
        },
      ],
    },
    {
      category: 'wellbeing',
      title: 'Building Healthy Social Connections',
      description: 'How to create and maintain meaningful relationships in college.',
      readTime: '8 min read',
      tags: ['Social', 'Wellbeing', 'Relationships'],
      sections: [
        {
          type: 'intro',
          title: 'The Importance of Social Connections',
          content: 'Strong social connections are fundamental to mental health and wellbeing. Research shows that meaningful relationships can reduce stress, increase happiness, and even improve physical health. College is an ideal time to build lasting friendships and develop social skills.',
        },
        {
          type: 'symptoms',
          title: 'Social Challenges in College',
          items: [
            { label: 'Transition difficulties', description: 'Leaving old friends behind and starting over in a new environment' },
            { label: 'Time management', description: 'Balancing social life with demanding academic schedules' },
            { label: 'Diversity navigation', description: 'Meeting people from different backgrounds and perspectives' },
            { label: 'Social anxiety', description: 'Feeling nervous or uncomfortable in social situations' },
          ],
        },
        {
          type: 'strategies',
          title: 'Building New Connections',
          strategies: [
            { title: 'Join Clubs and Organizations', description: 'Find groups that align with your interests. Shared activities provide natural conversation starters and regular opportunities to connect.' },
            { title: 'Attend Campus Events', description: 'Take advantage of orientation activities, guest lectures, and social gatherings. Even if you go alone, you\'ll meet others doing the same.' },
            { title: 'Form Study Groups', description: 'Academic collaboration in your classes can lead to friendships. You\'re already working toward common goals.' },
            { title: 'Be Authentic', description: 'Be yourself rather than trying to fit a certain image. Authentic connections are more fulfilling and sustainable.' },
            { title: 'Take Initiative', description: 'Suggest grabbing coffee, studying together, or attending events. Many people are waiting for someone else to make the first move.' },
          ],
        },
        {
          type: 'info',
          title: 'Maintaining Relationships',
          content: 'Once you\'ve made connections, nurture them by making time for friends despite busy schedules, practicing active listening, showing appreciation and gratitude, being there during difficult times, and communicating openly and honestly.',
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Quality Over Quantity',
          content: 'You don\'t need dozens of friends. A few close, supportive relationships are more valuable than many superficial ones. Focus on building deep connections with people who genuinely care about you. If social anxiety is preventing you from making connections, start small with one-on-one interactions and consider seeking support from campus counseling services.',
        },
      ],
    },
    {
      category: 'sleep',
      title: 'Sleep Hygiene for Students',
      description: 'Improving your sleep quality for better mental health and performance.',
      readTime: '5 min read',
      tags: ['Sleep', 'Health', 'Routine'],
      sections: [
        {
          type: 'intro',
          title: 'Why Sleep Matters',
          content: 'Sleep is essential for cognitive function, emotional regulation, and physical health. College students often sacrifice sleep for studying, socializing, or work, but this can seriously impact academic performance, mood, and overall wellbeing. Quality sleep is one of the most important factors in mental health.',
        },
        {
          type: 'symptoms',
          title: 'The Consequences of Sleep Deprivation',
          items: [
            { label: 'Cognitive impairment', description: 'Difficulty concentrating, learning new information, and impaired memory consolidation' },
            { label: 'Emotional dysregulation', description: 'Increased anxiety, depression, irritability, and mood swings' },
            { label: 'Physical health issues', description: 'Weakened immune system, increased risk of illness, weight gain' },
            { label: 'Poor decision-making', description: 'Impaired judgment and increased risk-taking behavior' },
          ],
        },
        {
          type: 'strategies',
          title: 'Sleep Hygiene Practices',
          strategies: [
            { title: 'Consistent Schedule', description: 'Go to bed and wake up at the same time every day, even on weekends. This regulates your body\'s internal clock.' },
            { title: 'Create a Bedtime Routine', description: 'Develop a relaxing pre-sleep routine: reading, gentle stretching, or meditation. This signals your body it\'s time to wind down.' },
            { title: 'Optimize Your Environment', description: 'Keep your room cool (65-68°F), dark, and quiet. Use comfortable bedding and remove or cover electronic displays.' },
            { title: 'Limit Screen Time', description: 'Avoid screens 30-60 minutes before bed. Blue light interferes with melatonin production. Use blue light filters if you must use devices.' },
            { title: 'Watch Your Intake', description: 'Avoid caffeine 6+ hours before bed, limit alcohol (it disrupts sleep quality), and don\'t eat heavy meals close to bedtime.' },
            { title: 'Exercise Regularly', description: 'Regular physical activity promotes better sleep, but avoid intense exercise close to bedtime as it can be stimulating.' },
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          title: 'When to Seek Help',
          content: 'If you consistently have trouble falling asleep, staying asleep, or feel unrested despite adequate sleep time, consult a healthcare provider. You may have a sleep disorder like insomnia or sleep apnea that requires treatment. Don\'t suffer in silence—quality sleep is essential for your wellbeing.',
        },
      ],
    },
    {
      category: 'anxiety',
      title: 'Mindfulness and Meditation Basics',
      description: 'Simple mindfulness exercises you can practice anywhere.',
      readTime: '4 min read',
      tags: ['Anxiety', 'Mindfulness', 'Techniques'],
      sections: [
        {
          type: 'intro',
          title: 'What is Mindfulness?',
          content: 'Mindfulness is the practice of being present and fully engaged in the current moment, without judgment. It\'s a powerful tool for managing anxiety, stress, and improving overall mental wellbeing. The best part? You can practice it anywhere, anytime.',
        },
        {
          type: 'symptoms',
          title: 'Benefits of Mindfulness',
          items: [
            { label: 'Stress reduction', description: 'Lower levels of cortisol and reduced anxiety symptoms' },
            { label: 'Improved focus', description: 'Better concentration and attention span for academic work' },
            { label: 'Emotional regulation', description: 'Greater ability to manage difficult emotions and reactions' },
            { label: 'Enhanced wellbeing', description: 'Improved self-awareness, sleep quality, and overall life satisfaction' },
          ],
        },
        {
          type: 'strategies',
          title: 'Simple Mindfulness Exercises',
          strategies: [
            { title: 'Mindful Breathing', description: 'Focus your attention on your breath. Notice the sensation of air entering and leaving your nostrils. When your mind wanders (and it will), gently bring it back to your breath. Practice for 5-10 minutes daily.' },
            { title: 'Body Scan Meditation', description: 'Lie down comfortably. Starting at your toes, slowly bring attention to each part of your body, noticing any sensations without trying to change them. Move gradually up to the top of your head.' },
            { title: 'Mindful Walking', description: 'As you walk, pay attention to the sensation of your feet touching the ground, the movement of your body, and the environment around you. Walk slowly and deliberately.' },
            { title: '5-4-3-2-1 Grounding', description: 'Notice: 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, 1 thing you can taste. Perfect for managing anxiety.' },
            { title: 'Mindful Daily Activities', description: 'Practice mindfulness while eating, showering, or doing everyday activities by simply paying full attention to the experience. No special time or place needed.' },
          ],
        },
        {
          type: 'callout',
          variant: 'success',
          title: 'Tips for Getting Started',
          content: 'Start with just 5 minutes a day. Find a quiet, comfortable space. Be patient with yourself—mind wandering is completely normal and expected. Use guided meditation apps if helpful. Practice regularly for best results. Remember, mindfulness is a skill that improves with practice.',
        },
      ],
    },
  ];

  const copingStrategies = [
    {
      category: 'Breathing Techniques',
      strategies: [
        {
          title: 'Deep Breathing (4-7-8)',
          description: 'Breathe in for 4 counts, hold for 7, exhale for 8. Repeat 4 times.',
          icon: Activity,
          difficulty: 'Beginner',
        },
        {
          title: 'Box Breathing',
          description: 'Inhale for 4, hold for 4, exhale for 4, hold for 4. Great for immediate calm.',
          icon: Activity,
          difficulty: 'Beginner',
        },
        {
          title: 'Alternate Nostril Breathing',
          description: 'Close right nostril, inhale left. Close left, exhale right. Balances energy.',
          icon: Activity,
          difficulty: 'Intermediate',
        },
      ]
    },
    {
      category: 'Physical Techniques',
      strategies: [
        {
          title: 'Progressive Muscle Relaxation',
          description: 'Tense and relax muscle groups from toes to head. Releases physical tension.',
          icon: Heart,
          difficulty: 'Beginner',
        },
        {
          title: 'Quick Exercise',
          description: 'Take a 10-minute walk, do jumping jacks, or stretch. Movement reduces stress.',
          icon: Heart,
          difficulty: 'Beginner',
        },
        {
          title: 'Cold Water Splash',
          description: 'Splash cold water on face or hold ice. Activates the dive reflex to calm anxiety.',
          icon: Heart,
          difficulty: 'Beginner',
        },
      ]
    },
    {
      category: 'Grounding & Mindfulness',
      strategies: [
        {
          title: '5-4-3-2-1 Grounding',
          description: 'Name 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste.',
          icon: Brain,
          difficulty: 'Beginner',
        },
        {
          title: 'Mindful Observation',
          description: 'Choose an object. Study it intensely for 2 minutes, noticing every detail.',
          icon: Brain,
          difficulty: 'Beginner',
        },
        {
          title: 'Body Scan',
          description: 'Notice sensations in each body part from toes to head without judgment.',
          icon: Brain,
          difficulty: 'Intermediate',
        },
      ]
    },
    {
      category: 'Cognitive Strategies',
      strategies: [
        {
          title: 'Thought Challenging',
          description: 'Question negative thoughts. Ask: "Is this true? Is there another way to see this?"',
          icon: Book,
          difficulty: 'Intermediate',
        },
        {
          title: 'Journaling',
          description: 'Write thoughts and feelings for 10 minutes. No editing, just express.',
          icon: Book,
          difficulty: 'Beginner',
        },
        {
          title: 'Positive Affirmations',
          description: 'Repeat encouraging statements: "I am capable. This feeling will pass."',
          icon: Book,
          difficulty: 'Beginner',
        },
      ]
    },
  ];

  const faqs = [
    {
      category: 'Getting Help',
      questions: [
        {
          question: 'How do I know if I need professional help?',
          answer: 'Consider seeking professional help if you experience persistent sadness, anxiety, or mood changes that interfere with daily life, relationships, or academic performance. Changes in sleep, appetite, or energy levels lasting more than two weeks are also signs to talk to a professional.',
        },
        {
          question: 'Are campus counseling services confidential?',
          answer: 'Yes, campus counseling services are generally confidential. Information shared in therapy sessions is protected by privacy laws. However, counselors may need to break confidentiality in situations involving imminent danger to yourself or others, or as required by law.',
        },
        {
          question: 'What happens in a first therapy session?',
          answer: 'Your first session typically involves getting to know your therapist, discussing what brought you to therapy, and talking about your goals. The therapist will ask about your history and current concerns. This is also a chance for you to ask questions and determine if the therapist is a good fit.',
        },
      ]
    },
    {
      category: 'Costs & Access',
      questions: [
        {
          question: 'What if I can\'t afford therapy?',
          answer: 'Many universities offer free or low-cost counseling services to students. Additionally, there are community mental health centers, sliding-scale therapists, support groups, and online resources available at reduced or no cost.',
        },
        {
          question: 'How long does therapy take?',
          answer: 'The duration of therapy varies greatly depending on individual needs and goals. Some people benefit from short-term therapy (8-12 sessions), while others may engage in longer-term treatment. Your therapist will work with you to develop a treatment plan.',
        },
        {
          question: 'Can I access help outside of business hours?',
          answer: 'Many campuses offer after-hours crisis support through hotlines or on-call counselors. Additionally, national crisis lines like 988 (Suicide & Crisis Lifeline) are available 24/7. Check your campus resources page for specific options.',
        },
      ]
    },
    {
      category: 'Supporting Others',
      questions: [
        {
          question: 'How can I support a friend who is struggling?',
          answer: 'Listen without judgment, express concern, encourage them to seek professional help, and continue to check in regularly. Remember that you\'re not responsible for fixing their problems, but your support can make a significant difference.',
        },
        {
          question: 'What should I do if I\'m worried about someone\'s safety?',
          answer: 'If you believe someone is in immediate danger, call 911 or campus security. For non-emergency concerns, reach out to campus counseling services, a resident advisor, or a trusted adult. Don\'t keep serious concerns to yourself.',
        },
        {
          question: 'How do I talk to someone about getting help?',
          answer: 'Choose a private, comfortable setting. Express your concerns using "I" statements (e.g., "I\'ve noticed you seem down lately and I\'m concerned"). Listen without judgment, offer support, and suggest specific resources. Avoid forcing the conversation.',
        },
      ]
    },
    {
      category: 'Understanding Mental Health',
      questions: [
        {
          question: 'What\'s the difference between feeling sad and depression?',
          answer: 'Sadness is a normal emotion that usually passes. Depression is a mental health condition characterized by persistent feelings of sadness, hopelessness, loss of interest in activities, and other symptoms that last for at least two weeks and interfere with daily functioning.',
        },
        {
          question: 'Is it normal to feel anxious in college?',
          answer: 'Yes, some anxiety in college is normal given the academic pressures, life transitions, and new responsibilities. However, when anxiety becomes excessive, persistent, and interferes with daily activities or academics, it may be an anxiety disorder requiring professional support.',
        },
        {
          question: 'Can mental health issues be cured?',
          answer: 'Many mental health conditions can be effectively managed with proper treatment, which may include therapy, medication, lifestyle changes, and support. While some people fully recover, others manage symptoms long-term. The key is seeking appropriate care and support.',
        },
      ]
    },
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  // If an article is selected, show the full article view
  if (selectedArticle !== null) {
    const article = articles[selectedArticle];
    return (
      <div className="w-full">
        {/* Article Header */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Button
              variant="ghost"
              onClick={() => setSelectedArticle(null)}
              className="text-white hover:bg-white/20 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Resources
            </Button>
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-white/30">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4">{article.title}</h1>
            <div className="flex items-center gap-4 text-blue-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {article.sections ? (
            // New structured format
            <div className="space-y-8">
              {article.sections.map((section: any, index: number) => {
                if (section.type === 'intro') {
                  return (
                    <div key={index}>
                      <h2 className="text-3xl mb-4 text-gray-900">{section.title}</h2>
                      <p className="text-lg text-gray-700 leading-relaxed">{section.content}</p>
                    </div>
                  );
                }

                if (section.type === 'symptoms') {
                  return (
                    <div key={index}>
                      <h3 className="text-2xl mb-4 text-gray-900">{section.title}</h3>
                      <div className="grid gap-4">
                        {section.items.map((item: any, idx: number) => (
                          <Card key={idx} className="border-l-4 border-l-purple-500">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-1">{item.label}</h4>
                                  <p className="text-gray-600">{item.description}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (section.type === 'strategies') {
                  return (
                    <div key={index}>
                      <h3 className="text-2xl mb-4 text-gray-900">{section.title}</h3>
                      <div className="grid gap-4">
                        {section.strategies.map((strategy: any, idx: number) => (
                          <Card key={idx} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-5">
                              <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center text-lg font-semibold">
                                  {idx + 1}
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{strategy.title}</h4>
                                  <p className="text-gray-700 leading-relaxed">{strategy.description}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (section.type === 'info') {
                  return (
                    <div key={index}>
                      <h3 className="text-2xl mb-4 text-gray-900">{section.title}</h3>
                      <p className="text-lg text-gray-700 leading-relaxed">{section.content}</p>
                    </div>
                  );
                }

                if (section.type === 'callout') {
                  const calloutStyles = {
                    warning: {
                      bg: 'bg-amber-50',
                      border: 'border-amber-200',
                      icon: AlertTriangle,
                      iconColor: 'text-amber-600',
                    },
                    info: {
                      bg: 'bg-blue-50',
                      border: 'border-blue-200',
                      icon: Lightbulb,
                      iconColor: 'text-blue-600',
                    },
                    success: {
                      bg: 'bg-green-50',
                      border: 'border-green-200',
                      icon: CheckCircle2,
                      iconColor: 'text-green-600',
                    },
                  };

                  const style = calloutStyles[section.variant] || calloutStyles.info;
                  const Icon = style.icon;

                  return (
                    <Card key={index} className={`${style.bg} ${style.border} border-2`}>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <Icon className={`w-6 h-6 ${style.iconColor} flex-shrink-0 mt-1`} />
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">{section.title}</h4>
                            <p className="text-gray-700 leading-relaxed">{section.content}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                }

                return null;
              })}
            </div>
          ) : (
            // Old HTML format fallback
            <div 
              className="prose prose-lg max-w-none
                prose-headings:text-gray-900 
                prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-ul:my-4 prose-li:text-gray-700 prose-li:my-2
                prose-strong:text-gray-900 prose-strong:font-semibold"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          )}

          {/* Related Articles */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl mb-6 text-gray-900">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {articles
                .filter((a, idx) => idx !== selectedArticle && a.category === article.category)
                .slice(0, 2)
                .map((relatedArticle, idx) => {
                  const relatedIndex = articles.findIndex(a => a.title === relatedArticle.title);
                  return (
                    <Card 
                      key={idx} 
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => {
                        setSelectedArticle(relatedIndex);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <CardHeader>
                        <CardTitle className="text-lg">{relatedArticle.title}</CardTitle>
                        <CardDescription>{relatedArticle.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500">{relatedArticle.readTime}</p>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg"
            >
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">Evidence-Based Resources</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl mb-6"
            >
              Mental Health Resources
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl text-blue-100 leading-relaxed"
            >
              Explore evidence-based articles, coping strategies, and information to support your mental health journey.
            </motion.p>
          </motion.div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -z-0"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl -z-0"></div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8 bg-white/80 backdrop-blur-sm shadow-lg">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="coping">Coping Skills</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          {/* Articles Tab */}
          <TabsContent value="articles" className="space-y-8">
            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-2 justify-center"
            >
              {categories.map((category, idx) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all shadow-sm ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 hover:border-purple-300 hover:shadow-md'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span className="font-medium">{category.label}</span>
                </motion.button>
              ))}
            </motion.div>

            {/* Articles Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredArticles.map((article, index) => {
                const articleIndex = articles.findIndex(a => a.title === article.title);
                return (
                  <motion.div key={index} variants={itemVariants}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card 
                        className="h-full border-2 border-transparent hover:border-purple-200 transition-all bg-white/80 backdrop-blur-sm hover:shadow-2xl cursor-pointer"
                        onClick={() => setSelectedArticle(articleIndex)}
                      >
                        <CardHeader>
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            {article.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <CardTitle className="text-xl leading-tight">{article.title}</CardTitle>
                          <CardDescription className="text-base mt-2">{article.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{article.readTime}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </TabsContent>

          {/* Coping Skills Tab */}
          <TabsContent value="coping" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* Coping Strategies */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl text-gray-900">Quick Coping Strategies</h2>
                </div>
                
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  {copingStrategies.map((category, catIdx) => (
                    <motion.div key={category.category} variants={itemVariants}>
                      <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                        <span className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
                        {category.category}
                      </h3>
                      <div className="space-y-3">
                        {category.strategies.map((strategy, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.02, x: 4 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Card className="border-2 border-transparent hover:border-purple-200 hover:shadow-lg transition-all bg-white/80 backdrop-blur-sm">
                              <CardHeader className="pb-4">
                                <div className="flex items-start gap-4">
                                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-md">
                                    <strategy.icon className="w-6 h-6 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <CardTitle className="text-lg mb-2">{strategy.title}</CardTitle>
                                    <CardDescription className="text-base leading-relaxed">{strategy.description}</CardDescription>
                                    <Badge variant="outline" className="mt-3 text-xs">
                                      {strategy.difficulty}
                                    </Badge>
                                  </div>
                                </div>
                              </CardHeader>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Guided Exercise */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="lg:sticky lg:top-24 h-fit"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl text-gray-900">Guided Meditation</h2>
                </div>
                
                <Card className="bg-gradient-to-br from-blue-5 via-purple-50 to-pink-50 border-2 border-purple-200 shadow-xl">
                  <CardContent className="p-6">
                    <div className="relative rounded-2xl overflow-hidden mb-6 shadow-lg">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1764192114257-ae9ecf97eb6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwbWluZGZ1bG5lc3MlMjBjYWxtfGVufDF8fHx8MTc3NDYwMzU5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Meditation practice"
                        className="w-full h-56 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent"></div>
                    </div>
                    <h3 className="text-2xl mb-3 text-gray-900 font-semibold">5-Minute Mindfulness</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      Take a moment to center yourself with this simple mindfulness exercise.
                    </p>
                    <ol className="space-y-4 text-gray-700">
                      {[
                        'Find a comfortable seated position and close your eyes.',
                        'Take three deep breaths, noticing the sensation of breathing.',
                        'Scan your body from head to toe, releasing any tension.',
                        'Return focus to your breath whenever your mind wanders.',
                        'Slowly open your eyes when ready and notice how you feel.'
                      ].map((step, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + idx * 0.1 }}
                          className="flex gap-4"
                        >
                          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white text-sm flex items-center justify-center font-semibold shadow-md">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed pt-1">{step}</span>
                        </motion.li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-full mb-6 shadow-lg"
                >
                  <Lightbulb className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-700">Need Answers?</span>
                </motion.div>
                
                <h2 className="text-4xl mb-4 text-gray-900">Frequently Asked Questions</h2>
                <p className="text-xl text-gray-600">Find answers to common questions about mental health and support services</p>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                {faqs.map((faqCategory, categoryIndex) => (
                  <motion.div key={categoryIndex} variants={itemVariants}>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white text-lg font-semibold flex items-center justify-center shadow-lg">
                        {categoryIndex + 1}
                      </span>
                      <h3 className="text-2xl text-gray-900 font-semibold">{faqCategory.category}</h3>
                    </div>
                    
                    <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-purple-200 transition-colors shadow-md">
                      <CardContent className="p-6">
                        <Accordion type="single" collapsible className="w-full">
                          {faqCategory.questions.map((faq, questionIndex) => (
                            <AccordionItem 
                              key={questionIndex} 
                              value={`category-${categoryIndex}-question-${questionIndex}`}
                              className="border-b border-gray-200 last:border-0"
                            >
                              <AccordionTrigger className="text-left hover:text-purple-600 font-medium text-lg py-4">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent className="text-gray-600 leading-relaxed text-base pb-4">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* Additional Help Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <Card className="mt-12 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border-2 border-purple-200 shadow-xl">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl mb-3 text-gray-900 font-semibold">Still Have Questions?</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed max-w-2xl mx-auto">
                      If you can't find the answer you're looking for, don't hesitate to reach out to campus counseling services or visit our Crisis Support page for immediate assistance.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="border-2 border-purple-300 hover:bg-purple-50 hover:border-purple-400"
                      >
                        Contact Counseling Services
                      </Button>
                      <Button 
                        size="lg"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
                      >
                        Visit Crisis Support
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}