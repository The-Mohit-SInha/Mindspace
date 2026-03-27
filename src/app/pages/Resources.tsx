import { useState } from 'react';
import { Book, Brain, Heart, Activity, Smile, Moon, ArrowLeft, Clock, AlertCircle, CheckCircle2, Lightbulb, AlertTriangle } from 'lucide-react';
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
      content: `
        <h2>What is Depression?</h2>
        <p>Depression is more than just feeling sad or going through a rough patch. It's a serious mental health condition that requires understanding and medical care.</p>
        
        <h3>Common Signs and Symptoms</h3>
        <ul>
          <li>Persistent sad, anxious, or "empty" mood</li>
          <li>Loss of interest in activities once enjoyed</li>
          <li>Changes in appetite or weight</li>
          <li>Sleep disturbances (insomnia or oversleeping)</li>
          <li>Loss of energy or increased fatigue</li>
          <li>Difficulty concentrating or making decisions</li>
          <li>Feelings of worthlessness or excessive guilt</li>
          <li>Thoughts of death or suicide</li>
        </ul>
        
        <h3>Depression in College Students</h3>
        <p>College can be particularly challenging with academic pressure, social adjustments, and financial stress. It's important to recognize that depression is not a sign of weakness or something you can just "snap out of."</p>
        
        <h3>When to Seek Help</h3>
        <p>If you've experienced several of these symptoms for more than two weeks, it's important to reach out for help. Campus counseling services, your doctor, or a mental health professional can provide support and treatment options.</p>
        
        <h3>Treatment Options</h3>
        <p><strong>Therapy:</strong> Cognitive-behavioral therapy (CBT) and other forms of counseling are highly effective.</p>
        <p><strong>Medication:</strong> Antidepressants can help balance brain chemistry.</p>
        <p><strong>Lifestyle Changes:</strong> Regular exercise, healthy diet, and good sleep habits support recovery.</p>
        <p><strong>Support Groups:</strong> Connecting with others who understand can be invaluable.</p>
      `,
    },
    {
      category: 'stress',
      title: 'Time Management for Mental Health',
      description: 'Balance your academic workload while maintaining your wellbeing.',
      readTime: '6 min read',
      tags: ['Stress', 'Productivity', 'Balance'],
      content: `
        <h2>The Connection Between Time Management and Mental Health</h2>
        <p>Poor time management often leads to increased stress, anxiety, and feeling overwhelmed. Learning to manage your time effectively is crucial for both academic success and mental wellbeing.</p>
        
        <h3>Common Time Management Challenges</h3>
        <ul>
          <li>Procrastination and last-minute cramming</li>
          <li>Overcommitting to activities</li>
          <li>Difficulty prioritizing tasks</li>
          <li>Not allowing time for self-care</li>
          <li>Poor sleep schedule</li>
        </ul>
        
        <h3>Effective Strategies</h3>
        <p><strong>Use a Planner</strong> - Whether digital or paper, having a centralized place to track assignments, appointments, and commitments is essential.</p>
        
        <p><strong>Priority Matrix</strong> - Categorize tasks as:</p>
        <ul>
          <li>Urgent and Important (do first)</li>
          <li>Important but Not Urgent (schedule)</li>
          <li>Urgent but Not Important (delegate if possible)</li>
          <li>Neither Urgent nor Important (eliminate)</li>
        </ul>
        
        <p><strong>Time Blocking</strong> - Dedicate specific time blocks for studying, classes, exercise, and relaxation.</p>
        
        <p><strong>The Pomodoro Technique</strong> - Work in focused 25-minute intervals with 5-minute breaks in between.</p>
        
        <p><strong>Learn to Say No</strong> - It's okay to decline commitments when your schedule is already full.</p>
        
        <h3>Building in Self-Care</h3>
        <p>Schedule time for activities that restore your energy: exercise, hobbies, socializing, or simply relaxing. Self-care isn't selfish—it's necessary for maintaining your mental health and academic performance.</p>
      `,
    },
    {
      category: 'wellbeing',
      title: 'Building Healthy Social Connections',
      description: 'How to create and maintain meaningful relationships in college.',
      readTime: '8 min read',
      tags: ['Social', 'Wellbeing', 'Relationships'],
      content: `
        <h2>The Importance of Social Connections</h2>
        <p>Strong social connections are fundamental to mental health and wellbeing. Research shows that meaningful relationships can reduce stress, increase happiness, and even improve physical health.</p>
        
        <h3>Challenges in College</h3>
        <p>College presents unique social challenges: leaving old friends behind, meeting new people, balancing social life with academics, and navigating diverse social environments.</p>
        
        <h3>Building New Connections</h3>
        <p><strong>Join Clubs and Organizations</strong> - Find groups that align with your interests. Shared activities provide natural conversation starters.</p>
        
        <p><strong>Attend Campus Events</strong> - Take advantage of orientation activities, guest lectures, and social gatherings.</p>
        
        <p><strong>Study Groups</strong> - Form study groups in your classes. Academic collaboration can lead to friendships.</p>
        
        <p><strong>Be Yourself</strong> - Authentic connections are more fulfilling than trying to be someone you're not.</p>
        
        <h3>Maintaining Relationships</h3>
        <ul>
          <li>Make time for friends despite busy schedules</li>
          <li>Practice active listening</li>
          <li>Show appreciation and gratitude</li>
          <li>Be there during difficult times</li>
          <li>Communicate openly and honestly</li>
        </ul>
        
        <h3>Quality Over Quantity</h3>
        <p>You don't need dozens of friends. A few close, supportive relationships are more valuable than many superficial ones. Focus on building deep connections with people who genuinely care about you.</p>
        
        <h3>When Social Anxiety Gets in the Way</h3>
        <p>If social anxiety is preventing you from making connections, start small. Begin with one-on-one interactions, practice conversation skills, and consider seeking support from campus counseling services.</p>
      `,
    },
    {
      category: 'sleep',
      title: 'Sleep Hygiene for Students',
      description: 'Improving your sleep quality for better mental health and performance.',
      readTime: '5 min read',
      tags: ['Sleep', 'Health', 'Routine'],
      content: `
        <h2>Why Sleep Matters</h2>
        <p>Sleep is essential for cognitive function, emotional regulation, and physical health. College students often sacrifice sleep, but this can seriously impact academic performance, mood, and overall wellbeing.</p>
        
        <h3>The Consequences of Sleep Deprivation</h3>
        <ul>
          <li>Difficulty concentrating and learning</li>
          <li>Impaired memory consolidation</li>
          <li>Increased anxiety and depression</li>
          <li>Weakened immune system</li>
          <li>Poor decision-making</li>
        </ul>
        
        <h3>Sleep Hygiene Practices</h3>
        <p><strong>Consistent Schedule</strong> - Go to bed and wake up at the same time every day, even on weekends.</p>
        
        <p><strong>Create a Bedtime Routine</strong> - Develop a relaxing pre-sleep routine: reading, gentle stretching, or meditation.</p>
        
        <p><strong>Optimize Your Environment</strong></p>
        <ul>
          <li>Keep your room cool, dark, and quiet</li>
          <li>Use comfortable bedding</li>
          <li>Remove or cover electronic displays</li>
        </ul>
        
        <p><strong>Limit Screen Time</strong> - Avoid screens 30-60 minutes before bed. Blue light interferes with melatonin production.</p>
        
        <p><strong>Watch Your Intake</strong></p>
        <ul>
          <li>Avoid caffeine 6+ hours before bed</li>
          <li>Limit alcohol (it disrupts sleep quality)</li>
          <li>Don't eat heavy meals close to bedtime</li>
        </ul>
        
        <p><strong>Exercise Regularly</strong> - Regular physical activity promotes better sleep, but avoid intense exercise close to bedtime.</p>
        
        <h3>Managing All-Nighters</h3>
        <p>While sometimes unavoidable, all-nighters should be rare exceptions, not regular occurrences. When you must stay up late, try to:</p>
        <ul>
          <li>Take short power naps (20 minutes) if needed</li>
          <li>Stay hydrated</li>
          <li>Recovery properly with extra sleep the following night</li>
        </ul>
        
        <h3>When to Seek Help</h3>
        <p>If you consistently have trouble falling asleep, staying asleep, or feel unrested despite adequate sleep time, consult a healthcare provider. You may have a sleep disorder that requires treatment.</p>
      `,
    },
    {
      category: 'anxiety',
      title: 'Mindfulness and Meditation Basics',
      description: 'Simple mindfulness exercises you can practice anywhere.',
      readTime: '4 min read',
      tags: ['Anxiety', 'Mindfulness', 'Techniques'],
      content: `
        <h2>What is Mindfulness?</h2>
        <p>Mindfulness is the practice of being present and fully engaged in the current moment, without judgment. It's a powerful tool for managing anxiety, stress, and improving overall mental wellbeing.</p>
        
        <h3>Benefits of Mindfulness</h3>
        <ul>
          <li>Reduced anxiety and stress</li>
          <li>Improved focus and concentration</li>
          <li>Better emotional regulation</li>
          <li>Enhanced self-awareness</li>
          <li>Improved sleep quality</li>
        </ul>
        
        <h3>Simple Mindfulness Exercises</h3>
        
        <p><strong>Mindful Breathing</strong></p>
        <p>Focus your attention on your breath. Notice the sensation of air entering and leaving your nostrils. When your mind wanders, gently bring it back to your breath. Practice for 5-10 minutes daily.</p>
        
        <p><strong>Body Scan Meditation</strong></p>
        <p>Lie down comfortably. Starting at your toes, slowly bring attention to each part of your body, noticing any sensations without trying to change them. Move gradually up to the top of your head.</p>
        
        <p><strong>Mindful Walking</strong></p>
        <p>As you walk, pay attention to the sensation of your feet touching the ground, the movement of your body, and the environment around you. Walk slowly and deliberately.</p>
        
        <p><strong>5-4-3-2-1 Grounding Technique</strong></p>
        <p>Notice:</p>
        <ul>
          <li>5 things you can see</li>
          <li>4 things you can touch</li>
          <li>3 things you can hear</li>
          <li>2 things you can smell</li>
          <li>1 thing you can taste</li>
        </ul>
        
        <h3>Tips for Getting Started</h3>
        <ul>
          <li>Start with just 5 minutes a day</li>
          <li>Find a quiet, comfortable space</li>
          <li>Be patient with yourself—mind wandering is normal</li>
          <li>Use guided meditation apps if helpful</li>
          <li>Practice regularly for best results</li>
        </ul>
        
        <h3>Incorporating Mindfulness into Daily Life</h3>
        <p>You don't need to meditate formally to be mindful. Practice mindfulness while eating, showering, or doing everyday activities by simply paying full attention to the experience.</p>
      `,
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
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl mb-4">Mental Health Resources</h1>
            <p className="text-xl text-blue-100">
              Explore evidence-based articles, coping strategies, and information to support your mental health journey.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="coping">Coping Skills</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          {/* Articles Tab */}
          <TabsContent value="articles" className="space-y-8">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-purple-300'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span>{category.label}</span>
                </button>
              ))}
            </div>

            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => {
                const articleIndex = articles.findIndex(a => a.title === article.title);
                return (
                  <Card 
                    key={index} 
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedArticle(articleIndex)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        {article.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                      <CardTitle className="text-xl">{article.title}</CardTitle>
                      <CardDescription>{article.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">{article.readTime}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Coping Skills Tab */}
          <TabsContent value="coping" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Coping Strategies */}
              <div>
                <h2 className="text-2xl mb-6 text-gray-900">Quick Coping Strategies</h2>
                <div className="space-y-4">
                  {copingStrategies.map((category) => (
                    <div key={category.category}>
                      <h3 className="text-xl font-bold mb-3">{category.category}</h3>
                      <div className="space-y-4">
                        {category.strategies.map((strategy, index) => (
                          <Card key={index}>
                            <CardHeader>
                              <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                                  <strategy.icon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <CardTitle className="text-lg">{strategy.title}</CardTitle>
                                  <CardDescription className="mt-2">{strategy.description}</CardDescription>
                                </div>
                              </div>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guided Exercise */}
              <div>
                <h2 className="text-2xl mb-6 text-gray-900">Guided Meditation</h2>
                <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
                  <CardContent className="p-6">
                    <div className="relative rounded-xl overflow-hidden mb-6">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1764192114257-ae9ecf97eb6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwbWluZGZ1bG5lc3MlMjBjYWxtfGVufDF8fHx8MTc3NDYwMzU5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Meditation practice"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <h3 className="text-xl mb-3 text-gray-900">5-Minute Mindfulness</h3>
                    <p className="text-gray-600 mb-4">
                      Take a moment to center yourself with this simple mindfulness exercise.
                    </p>
                    <ol className="space-y-3 text-gray-700">
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white text-sm flex items-center justify-center">1</span>
                        <span>Find a comfortable seated position and close your eyes.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white text-sm flex items-center justify-center">2</span>
                        <span>Take three deep breaths, noticing the sensation of breathing.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white text-sm flex items-center justify-center">3</span>
                        <span>Scan your body from head to toe, releasing any tension.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white text-sm flex items-center justify-center">4</span>
                        <span>Return focus to your breath whenever your mind wanders.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white text-sm flex items-center justify-center">5</span>
                        <span>Slowly open your eyes when ready and notice how you feel.</span>
                      </li>
                    </ol>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl mb-2 text-gray-900">Frequently Asked Questions</h2>
                <p className="text-gray-600">Find answers to common questions about mental health and support services</p>
              </div>

              <div className="space-y-8">
                {faqs.map((faqCategory, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h3 className="text-xl mb-4 text-gray-900 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm flex items-center justify-center">
                        {categoryIndex + 1}
                      </span>
                      {faqCategory.category}
                    </h3>
                    <Accordion type="single" collapsible className="w-full">
                      {faqCategory.questions.map((faq, questionIndex) => (
                        <AccordionItem 
                          key={questionIndex} 
                          value={`category-${categoryIndex}-question-${questionIndex}`}
                        >
                          <AccordionTrigger className="text-left hover:text-purple-600">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>

              {/* Additional Help Card */}
              <Card className="mt-8 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <CardContent className="p-6">
                  <h3 className="text-lg mb-2 text-gray-900">Still Have Questions?</h3>
                  <p className="text-gray-700 mb-4">
                    If you can't find the answer you're looking for, don't hesitate to reach out to campus counseling services or visit our Crisis Support page for immediate assistance.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline">Contact Counseling Services</Button>
                    <Button variant="outline">Visit Crisis Support</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}