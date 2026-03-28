import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Trash2, Download, Settings, Loader2, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
}

const STORAGE_KEY = 'mindspace_chat_history';
const API_KEY_STORAGE = 'mindspace_openai_key';

// Comprehensive fallback responses for mental health topics
const fallbackResponses = [
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
    response: "Hello! 👋 I'm here to support you with your mental health journey. I can help you with managing stress, anxiety, depression, academic pressure, relationships, self-care, and much more.\n\nHow are you feeling today? What's on your mind?"
  },
  {
    keywords: ['thanks', 'thank you', 'appreciate', 'helpful'],
    response: "You're very welcome! I'm glad I could help. Remember, taking care of your mental health is an ongoing journey, and reaching out is a sign of strength.\n\nIs there anything else you'd like to talk about or explore?"
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'talk later'],
    response: "Take care of yourself! Remember, I'm here 24/7 whenever you need support. Don't hesitate to reach out anytime.\n\nStay well! 💜"
  },
  {
    keywords: ['anxious', 'anxiety', 'worried', 'nervous', 'panic', 'panic attack', 'heart racing', 'can\'t breathe'],
    response: "I hear that you're feeling anxious. Anxiety is a common experience, especially for students. Here are some immediate techniques that might help:\n\n**Grounding Techniques:**\n• 5-4-3-2-1 method: Name 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste\n• Box breathing: Breathe in for 4, hold for 4, exhale for 4, hold for 4\n• Progressive muscle relaxation: Tense and release muscle groups\n\n**Resources:**\n• Visit our Resources page for anxiety management tools\n• Try our Assessment tool to understand your anxiety levels\n• Join our Anxiety Support Group in the Community section\n\nIf you're experiencing a panic attack right now, remember: it will pass. Focus on slow, deep breaths. Would you like to talk about what's triggering these feelings?"
  },
  {
    keywords: ['depressed', 'depression', 'sad', 'hopeless', 'empty', 'numb', 'worthless', 'no point', 'give up', 'crying'],
    response: "Thank you for sharing how you're feeling. Depression can feel overwhelming, but please know that help is available and things can get better. You're not alone in this.\n\n**Immediate Support:**\n• If you're having thoughts of self-harm, please visit our Crisis Support page immediately\n• Connect with someone you trust - a friend, family member, or counselor\n• Small steps matter: even getting out of bed or taking a shower is an accomplishment\n\n**Resources:**\n• Take our validated Depression Assessment to understand your symptoms\n• Join our Depression Support Group for peer support\n• Explore evidence-based coping strategies in our Resources section\n• Consider reaching out to a mental health professional\n\n**Remember:** Depression is treatable. Seeking help is a sign of strength. What would feel most helpful to you right now?"
  },
  {
    keywords: ['stress', 'stressed', 'overwhelmed', 'pressure', 'burnout', 'too much', 'can\'t cope', 'drowning'],
    response: "It sounds like you're dealing with a lot of stress. This is very common among students, and there are effective ways to manage it:\n\n**Immediate Relief:**\n• Take a 5-minute break right now - step away from what's stressing you\n• Try the 4-7-8 breathing: Breathe in for 4, hold for 7, exhale for 8\n• Do a quick body scan - where are you holding tension?\n\n**Long-term Strategies:**\n• Break overwhelming tasks into tiny, manageable steps\n• Practice saying 'no' to protect your mental energy\n• Schedule regular breaks and self-care time\n• Use the Pomodoro Technique: 25 min work, 5 min break\n• Prioritize sleep, nutrition, and movement\n\n**MindSpace Resources:**\n• Time management tools in our Resources section\n• Academic Stress Management support group\n• Stress assessment tools\n\nWhat specific area is causing you the most stress? Let's break it down together."
  },
  {
    keywords: ['lonely', 'alone', 'isolated', 'no friends', 'nobody cares', 'left out', 'excluded'],
    response: "Feeling lonely is more common than you might think, especially in college. Many students feel this way, even those who seem surrounded by people. Your feelings are valid.\n\n**Understanding Loneliness:**\n• Loneliness is about quality of connection, not quantity of people\n• It's a signal that you need meaningful connection\n• The pandemic has intensified loneliness for many\n\n**Ways to Connect:**\n• Join our Community support groups - connect with others who understand\n• Attend campus events and workshops (check our Events section)\n• Schedule a chat with one of our trained peer counselors\n• Try joining clubs or activities aligned with your interests\n• Reach out to one person today, even with a simple message\n\n**Remember:** Taking the first step to connect takes courage. You've already shown that courage by reaching out here. Would you like information about our support groups or social events?"
  },
  {
    keywords: ['sleep', 'insomnia', 'tired', 'exhausted', 'fatigue', 'can\'t sleep', 'nightmares', 'sleeping too much'],
    response: "Sleep difficulties can significantly impact mental health, and mental health issues can disrupt sleep - it's often a two-way street.\n\n**Sleep Hygiene Basics:**\n• Consistent sleep schedule (even on weekends)\n• Create a relaxing bedtime routine (30-60 min before bed)\n• Cool, dark, quiet bedroom environment\n• Limit screens 1 hour before bed (blue light disrupts melatonin)\n• Avoid caffeine after 2 PM\n• Get natural sunlight exposure during the day\n\n**Relaxation Techniques:**\n• 4-7-8 breathing before bed\n• Progressive muscle relaxation\n• Guided sleep meditation (check our Resources)\n• Write down tomorrow's worries to 'put them away'\n\n**When to Seek Help:**\nPersistent sleep issues (2+ weeks) may indicate anxiety, depression, or sleep disorders. Consider talking to a healthcare provider.\n\nWhat's your sleep pattern like? Let's see if we can identify specific issues."
  },
  {
    keywords: ['exam', 'test', 'midterm', 'finals', 'grades', 'failing', 'academic', 'study', 'assignment', 'deadline'],
    response: "Academic pressure is one of the top stressors for students. Let's work through this together:\n\n**Immediate Strategies:**\n• Break study material into small chunks\n• Use active recall and spaced repetition\n• Create a realistic study schedule with breaks\n• Study in 25-minute focused blocks (Pomodoro)\n• Form or join study groups for accountability\n\n**Managing Test Anxiety:**\n• Preparation is the best anxiety reducer\n• Practice with past exams if available\n• Use visualization: imagine yourself calm and confident\n• Arrive early to settle in\n• Read through entire exam first before starting\n\n**Perspective Shifts:**\n• One grade doesn't define your worth or future\n• Focus on learning, not just grades\n• Reach out to professors during office hours\n• Utilize campus tutoring resources\n\n**MindSpace Resources:**\n• Academic Stress Management group\n• Test anxiety coping strategies\n• Time management tools\n\nWhat specific aspect is worrying you most?"
  },
  {
    keywords: ['relationship', 'boyfriend', 'girlfriend', 'partner', 'breakup', 'broke up', 'heartbreak', 'dating', 'toxic'],
    response: "Relationship issues can be really challenging and affect your overall wellbeing. Whether it's a current relationship concern or processing a breakup, your feelings matter.\n\n**If you're in a difficult relationship:**\n• Healthy relationships have mutual respect, trust, and support\n• Warning signs: controlling behavior, isolation, constant criticism, fear\n• You deserve to feel safe, valued, and respected\n• It's okay to set boundaries or walk away\n\n**If you're dealing with a breakup:**\n• Grief is normal - allow yourself to feel\n• Lean on supportive friends and family\n• Maintain routines and self-care\n• Avoid dwelling on social media\n• This pain is temporary, though it doesn't feel that way now\n\n**Building healthy relationships:**\n• Communication is key\n• Maintain your own identity and friendships\n• Notice red flags early\n• Trust your instincts\n\n**Resources:**\n• Relationship support group in Community\n• Articles on healthy relationships in Resources\n\nWhat aspect of this situation is weighing on you most?"
  },
  {
    keywords: ['family', 'parents', 'mom', 'dad', 'mother', 'father', 'siblings', 'home', 'family issues'],
    response: "Family relationships can be complex and have a significant impact on mental health, especially when you're navigating independence in college.\n\n**Common challenges:**\n• Conflicting expectations about your future\n• Different values or beliefs\n• Lack of understanding about mental health\n• Financial dependence creating tension\n• Missing family vs. enjoying independence\n\n**Strategies:**\n• Set healthy boundaries while maintaining respect\n• Communicate your needs clearly and calmly\n• Remember you can't control others, only your responses\n• Seek support from friends, mentors, or counselors\n• Give yourself permission to prioritize your wellbeing\n• Consider family counseling if everyone is willing\n\n**If family dynamics are harmful:**\n• Your safety and mental health come first\n• Limit contact if necessary for your wellbeing\n• Build your chosen support network\n• Connect with campus resources\n\n**MindSpace Support:**\n• Family issues discussion in Community forums\n• Peer counselors can help you process\n• Resources on setting boundaries\n\nWhat's the main challenge you're facing with family right now?"
  },
  {
    keywords: ['self-esteem', 'confidence', 'insecure', 'not good enough', 'hate myself', 'ugly', 'stupid', 'failure', 'imposter'],
    response: "Low self-esteem and self-critical thoughts are incredibly common among students. Many high-achievers experience imposter syndrome. You're not alone in feeling this way.\n\n**Understanding negative self-talk:**\n• Your thoughts are not facts\n• You're often your own harshest critic\n• Comparison (especially on social media) feeds insecurity\n• Past experiences may have shaped these beliefs\n\n**Building self-compassion:**\n• Talk to yourself like you would a good friend\n• Acknowledge your accomplishments, even small ones\n• Challenge negative thoughts: What's the evidence?\n• Practice gratitude for what your body/mind can do\n• Focus on growth, not perfection\n\n**Practical steps:**\n• Limit social media if it triggers comparison\n• List your strengths and past successes\n• Set small, achievable goals\n• Celebrate progress, not just outcomes\n• Surround yourself with supportive people\n\n**Professional support:**\nPersistent negative self-perception may benefit from counseling. Cognitive Behavioral Therapy (CBT) is particularly effective for this.\n\n**MindSpace Resources:**\n• Self-esteem building exercises in Resources\n• Supportive community groups\n• Assessment tools\n\nWhat negative thoughts are you struggling with most?"
  },
  {
    keywords: ['eating', 'food', 'weight', 'body', 'fat', 'diet', 'anorexia', 'bulimia', 'binge', 'appetite'],
    response: "Concerns about eating, body image, and weight can be really difficult. These issues exist on a spectrum and deserve compassionate attention.\n\n**Important to know:**\n• Body image issues are common, especially with social media pressure\n• Eating disorders are serious mental health conditions\n• They're not about vanity - they're complex psychological issues\n• Full recovery is absolutely possible with proper support\n\n**Warning signs:**\n• Obsessive thoughts about food, weight, or body shape\n• Extreme food restriction or dieting\n• Binge eating followed by purging\n• Excessive exercise\n• Social withdrawal around meals\n• Severe mood changes\n\n**If you're struggling:**\n• Please reach out to a healthcare provider or counselor - early intervention matters\n• Visit our Crisis Support page if you're in immediate danger\n• Recovery requires professional support - this isn't something to handle alone\n• You deserve nourishment and health\n\n**Body image support:**\n• Challenge unrealistic media standards\n• Unfollow accounts that trigger comparison\n• Focus on what your body can do, not just appearance\n• Practice body neutrality if body positivity feels too far\n\n**MindSpace Resources:**\n• Body image support discussions in Community\n• Crisis resources\n• Professional referrals\n\nPlease consider reaching out to a professional. Would you like information about campus counseling services?"
  },
  {
    keywords: ['substance', 'drinking', 'alcohol', 'drugs', 'weed', 'marijuana', 'smoking', 'vaping', 'addiction', 'high', 'drunk'],
    response: "Substance use is common in college, but it can become problematic. Being honest with yourself about your relationship with substances is important.\n\n**Reflection questions:**\n• Are you using to cope with stress, anxiety, or other emotions?\n• Has your use increased over time?\n• Do you experience negative consequences but continue anyway?\n• Are friends or family expressing concern?\n• Do you feel you need substances to have fun or relax?\n\n**Understanding the connection:**\n• Substance use often masks underlying anxiety, depression, or trauma\n• While it may provide temporary relief, it typically worsens mental health\n• It can interfere with sleep, academics, and relationships\n• Dependency can develop gradually\n\n**If you're concerned:**\n• You don't have to label yourself to seek help\n• Reducing or stopping is easier with support\n• Campus likely has confidential counseling services\n• Support groups can be incredibly helpful\n• Medical support may be needed for safe withdrawal\n\n**Harm reduction:**\n• Never use alone\n• Know what you're taking\n• Stay hydrated\n• Have a trusted sober friend\n• Don't mix substances\n\n**Crisis situations:**\nIf someone is unconscious, having seizures, or struggling to breathe, call emergency services immediately.\n\n**MindSpace Resources:**\n• Crisis Support page for immediate help\n• Information on coping strategies beyond substance use\n• Peer support in Community\n\nWhat's your main concern about substance use? I'm here to listen without judgment."
  },
  {
    keywords: ['identity', 'lgbtq', 'gay', 'lesbian', 'trans', 'transgender', 'nonbinary', 'sexuality', 'gender', 'coming out', 'closet'],
    response: "Questions and concerns about identity, sexuality, and gender are deeply personal. Your identity is valid, and you deserve support and acceptance.\n\n**Know this:**\n• Your feelings and identity are valid, whatever they are\n• There's no timeline for figuring this out\n• Identity can be fluid - it's okay if it evolves\n• You don't owe anyone explanations or labels\n• You deserve to be your authentic self\n\n**If you're questioning:**\n• Exploration is natural and healthy\n• Connect with LGBTQ+ community resources\n• Read stories from others with similar experiences\n• There's no rush to label yourself\n• Trust your feelings\n\n**Coming out:**\n• Only come out when YOU'RE ready and it's safe\n• Start with supportive, trusted people\n• Have a support plan in case of negative reactions\n• Campus LGBTQ+ centers can provide guidance\n• It's okay to be out in some spaces and not others\n\n**If facing discrimination:**\n• You deserve respect and safety\n• Document incidents if possible\n• Report to appropriate authorities\n• Connect with LGBTQ+ support networks\n• Your safety comes first\n\n**Mental health connection:**\nLGBTQ+ individuals face higher rates of anxiety and depression due to discrimination and minority stress. Seeking affirming mental health support is important.\n\n**MindSpace Resources:**\n• LGBTQ+ support discussions in Community\n• Identity and belonging resources\n• Peer support\n\n**Campus resources:**\nMost campuses have LGBTQ+ resource centers, support groups, and affirming counselors.\n\nWhat aspect of this are you working through right now?"
  },
  {
    keywords: ['suicide', 'suicidal', 'kill myself', 'end it', 'better off dead', 'not worth living', 'self-harm', 'cutting', 'hurt myself'],
    response: "🚨 I'm very concerned about what you're sharing. These feelings are serious, and I want you to get immediate support.\n\n**PLEASE REACH OUT NOW:**\n\n**Emergency:**\n• Call 988 (Suicide & Crisis Lifeline) - Available 24/7\n• Text \"HELLO\" to 741741 (Crisis Text Line)\n• Call 911 or go to your nearest emergency room\n• Campus security or counseling center emergency line\n\n**Right Now:**\n• Don't stay alone - reach out to someone you trust\n• Remove access to any means of harm\n• Go to a safe, public space\n• Visit our Crisis Support page for immediate resources\n\n**IMPORTANT:**\n• These feelings can be temporary, even though they feel permanent right now\n• Crisis moments pass - you can get through this\n• Many people have felt this way and recovered\n• Professional help can make a huge difference\n• Your life has value, even if you can't see it right now\n\n**Please get help immediately. You don't have to face this alone. Crisis counselors are standing by 24/7.**\n\nWill you reach out to one of these resources right now? Your safety is the top priority."
  },
  {
    keywords: ['trauma', 'ptsd', 'abuse', 'assault', 'sexual assault', 'rape', 'attacked', 'violent', 'flashback'],
    response: "I'm so sorry you've experienced trauma. What happened to you is not your fault, and you deserve support and healing.\n\n**Important to know:**\n• Trauma responses are normal reactions to abnormal events\n• Healing is possible, though it takes time\n• You didn't deserve what happened\n• Your feelings - whatever they are - are valid\n• Professional trauma-informed care can help significantly\n\n**Common trauma responses:**\n• Flashbacks or intrusive memories\n• Avoidance of reminders\n• Hypervigilance or feeling on edge\n• Sleep disturbances or nightmares\n• Difficulty trusting others\n• Emotional numbness or overwhelming emotions\n\n**If you've experienced assault:**\n• Your safety is the priority\n• You have options - reporting is your choice\n• Campus likely has confidential advocates\n• Medical attention may be important (even if time has passed)\n• Title IX office can provide accommodations\n\n**Healing approaches:**\n• Trauma-focused therapy (EMDR, CPT, PE)\n• Building a support network\n• Grounding techniques for flashbacks\n• Self-compassion practices\n• Gradual exposure to safe triggers\n\n**Resources:**\n• RAINN (1-800-656-4673) - Sexual Assault Hotline\n• Our Crisis Support page for more resources\n• Campus counseling center for trauma-informed care\n• Campus victim advocate services\n\n**MindSpace:**\n• Trauma survivor support in Community\n• Grounding and coping techniques in Resources\n\nHealing from trauma often requires professional support. Would you like help connecting to resources?"
  },
  {
    keywords: ['procrastination', 'procrastinating', 'can\'t focus', 'distracted', 'motivation', 'lazy', 'unmotivated', 'adhd', 'attention'],
    response: "Difficulty with focus, motivation, and procrastination is incredibly common among students. Let's figure out what's behind it.\n\n**Common causes:**\n• Underlying anxiety or depression\n• Task feels overwhelming (too big or unclear)\n• Fear of failure or perfectionism\n• ADHD or executive function challenges\n• Burnout or exhaustion\n• Task doesn't align with your values or energy\n\n**Procrastination strategies:**\n• Make the first step ridiculously tiny (\"open the document\")\n• Use the 2-minute rule: if it takes less than 2 min, do it now\n• Set a timer for just 10 minutes of focused work\n• Remove distractions (phone in another room)\n• Work during your peak energy times\n• Reward yourself after completing chunks\n\n**Focus techniques:**\n• Pomodoro Technique (25 min work, 5 min break)\n• Study in dedicated spaces (not your bed)\n• Use website blockers during study time\n• Try body doubling (study with others)\n• Break tasks into concrete, specific steps\n• Use ambient noise or focus music\n\n**Could it be ADHD?**\nIf you experience persistent patterns of:\n• Difficulty sustaining attention\n• Impulsivity\n• Restlessness\n• Starting but not finishing tasks\n• Losing things frequently\n• Time blindness\n\nConsider an ADHD evaluation. Many students aren't diagnosed until college.\n\n**MindSpace Resources:**\n• Productivity tools in Resources section\n• Study strategy workshops in Events\n• Peer accountability groups\n\nWhat happens when you try to start? Let's identify the specific barrier."
  },
  {
    keywords: ['purpose', 'meaning', 'future', 'career', 'major', 'don\'t know what to do', 'lost', 'direction', 'existential'],
    response: "Questioning your path and purpose is a normal part of young adulthood, though it can feel unsettling. These big questions matter.\n\n**You're not alone:**\n• Most students change majors at least once\n• Career paths are rarely linear anymore\n• Your 20s are for exploration, not having it all figured out\n• Purpose often emerges through action, not just reflection\n\n**Existential questions:**\n• \"What's the point?\" often surfaces during stress or depression\n• These questions can lead to growth\n• Meaning is often found in connection, contribution, and growth\n• You don't need one grand purpose - many small purposes work too\n\n**Exploring your direction:**\n• What activities make you lose track of time?\n• What problems do you care about solving?\n• What do people often thank you for or ask your help with?\n• If money weren't a factor, what would you do?\n• Try things - internships, volunteering, clubs\n\n**Managing the uncertainty:**\n• The discomfort of not knowing is part of the process\n• Focus on the next small step, not the entire path\n• Talk to people in various fields\n• Use campus career services\n• Your major doesn't determine your entire life\n\n**If this is depression:**\nPersistent feelings of meaninglessness or emptiness can indicate depression. Consider our Assessment tools or talking to a counselor.\n\n**MindSpace Resources:**\n• Career exploration workshops in Events\n• Purpose and meaning discussions in Community\n• Peer counselors who've been through similar questions\n\nWhat specific aspect feels most uncertain or overwhelming right now?"
  },
  {
    keywords: ['money', 'financial', 'broke', 'afford', 'debt', 'loans', 'job', 'work', 'bills', 'poor'],
    response: "Financial stress is one of the top concerns for college students and can significantly impact mental health. These worries are legitimate and deserve attention.\n\n**Immediate concerns:**\n• If you're food insecure, check campus food pantries\n• If housing is unstable, talk to student services ASAP\n• Emergency student loans may be available\n• Many campuses have emergency funds for crisis situations\n\n**Managing financial stress:**\n• Create a realistic budget (many free apps available)\n• Track spending for a week to see where money goes\n• Prioritize needs vs. wants\n• Look into campus work-study opportunities\n• Check if you qualify for additional financial aid\n• Use free campus resources (gym, events, health center)\n\n**Long-term strategies:**\n• Build small emergency fund ($500-1000)\n• Look into financial literacy workshops on campus\n• Consider financial counseling services\n• Be cautious with credit cards\n• Explore scholarship opportunities\n\n**Mental health connection:**\n• Money stress can trigger or worsen anxiety/depression\n• Shame about finances is common but unhelpful\n• Many students struggle financially - you're not alone\n• Focus on what you can control\n\n**Student loan concerns:**\n• Understand your loan types and terms\n• Know about income-driven repayment options\n• Don't let loan worry paralyze you - there are always options\n• Loan forgiveness programs exist for various careers\n\n**MindSpace Resources:**\n• Financial stress management in Resources\n• Student support discussions in Community\n• Connection to campus financial resources\n\nWhat aspect of the financial situation is weighing on you most?"
  },
  {
    keywords: ['homesick', 'miss home', 'miss family', 'miss friends', 'adjusting', 'freshman', 'new', 'transition'],
    response: "Homesickness and adjustment challenges are incredibly common, especially in your first year. What you're feeling is a normal response to major life change.\n\n**Understanding homesickness:**\n• It's grief for what's familiar and comfortable\n• Usually peaks in the first few weeks/months\n• Doesn't mean you made the wrong choice\n• Most students experience it to some degree\n\n**Healthy coping:**\n• Stay connected to home, but set boundaries (not calling multiple times daily)\n• Create new routines and traditions\n• Give new friendships time to develop (they won't feel like old friends immediately)\n• Explore your new environment\n• Join clubs or activities to find your people\n• Personalize your space with comforting items\n\n**When to seek help:**\n• If homesickness persists beyond a few months\n• If it's interfering with academics or functioning\n• If you're isolating yourself\n• If it's accompanied by depression symptoms\n\n**Building belonging:**\n• Attend campus events (even when you don't feel like it)\n• Say yes to social invitations\n• Find study groups in your classes\n• Connect with people who share your interests\n• Remember: everyone is looking for friends\n\n**Balance:**\n• It's okay to miss home AND enjoy college\n• You don't have to choose between old life and new life\n• Both can coexist\n\n**MindSpace Resources:**\n• Transition support groups in Community\n• Articles on adjustment in Resources\n• Connect with other students feeling the same\n\nWhat specific aspect of being away from home is hardest for you?"
  },
  {
    keywords: ['angry', 'anger', 'mad', 'furious', 'rage', 'irritable', 'frustrated', 'annoyed'],
    response: "Anger is a valid and natural emotion, though it can feel overwhelming or concerning when it's intense or frequent. Let's explore what's underneath it.\n\n**Understanding anger:**\n• Often a secondary emotion covering hurt, fear, or helplessness\n• Can be a symptom of depression (especially in men)\n• May indicate violated boundaries or unmet needs\n• Suppressing anger isn't healthy, but neither is uncontrolled expression\n\n**In the moment:**\n• Take a timeout - leave the situation if possible\n• Deep breathing or physical exercise\n• Count to 10 (it works!)\n• Progressive muscle relaxation\n• Splash cold water on your face\n• Vigorous physical activity (run, punch a pillow)\n\n**Understanding your anger:**\n• What's the trigger? (The real one, not just the surface one)\n• What need isn't being met?\n• What boundary was crossed?\n• Is there a pattern?\n• Are you actually angry about something else?\n\n**Healthy expression:**\n• Use \"I feel\" statements, not accusations\n• Address issues when calm, not in the heat of anger\n• Write it out first (don't send it!)\n• Talk to a trusted friend or counselor\n• Physical outlets: exercise, art, music\n\n**When anger is a problem:**\n• Frequent intense outbursts\n• Damaging relationships\n• Breaking things or physical aggression\n• Getting into trouble because of anger\n• Feeling out of control\n\nThese patterns suggest professional support could help. Anger management isn't about suppressing emotion - it's about understanding and expressing it healthily.\n\n**MindSpace Resources:**\n• Anger management techniques in Resources\n• Stress management support groups\n• Assessment tools\n\nWhat's triggering your anger? Let's explore what's really going on."
  },
  {
    keywords: ['help', 'support', 'need', 'resources', 'where do i start', 'what can you do', 'how can you help'],
    response: "I'm glad you're reaching out! I'm here to support your mental health journey in many ways:\n\n**What I can help with:**\n• Managing anxiety, stress, and depression\n• Academic pressure and test anxiety\n• Relationship and family concerns\n• Loneliness and connection\n• Self-esteem and confidence\n• Sleep difficulties\n• Grief and loss\n• Life transitions and adjustment\n• Identity questions\n• Crisis support information\n• Finding the right resources\n• Coping strategies and techniques\n• General mental health education\n\n**MindSpace Platform Features:**\n\n📚 **Resources**: Evidence-based articles, coping strategies, and mental health information organized by category\n\n📊 **Assessment**: Validated self-assessment tools for anxiety, depression, and stress to help you understand your mental health\n\n👥 **Community**: \n• Support groups (anxiety, depression, academic stress, etc.)\n• Peer counselor connections\n• Discussion forums\n• Campus events and workshops\n\n🆘 **Crisis Support**: 24/7 hotlines, emergency resources, and immediate help information\n\n**How to talk to me:**\nJust share what's on your mind - there's no wrong way to start. You can:\n• Describe how you're feeling\n• Share a specific problem\n• Ask questions\n• Explore resources\n• Practice coping techniques\n• Just vent (sometimes that's what you need!)\n\n**Remember:**\n• This is a judgment-free space\n• I'm available 24/7\n• Your conversations are private\n• I can't diagnose or prescribe, but I can guide you to appropriate resources\n• In emergencies, always call 988 or 911\n\nWhat would be most helpful for you right now?"
  }
];

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [tempApiKey, setTempApiKey] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history and API key on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem(STORAGE_KEY);
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    }

    const savedApiKey = localStorage.getItem(API_KEY_STORAGE);
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getFallbackResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const response of fallbackResponses) {
      if (response.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return response.response;
      }
    }

    return "Thank you for reaching out. I'm here to help you with mental health support and resources.\n\nYou can ask me about:\n• Managing anxiety or stress\n• Coping with depression\n• Sleep difficulties\n• Feeling lonely or isolated\n• Finding resources and support groups\n• Crisis support information\n\nWhat's on your mind today?";
  };

  const getAIResponse = async (userMessage: string): Promise<string> => {
    if (!apiKey) {
      return getFallbackResponse(userMessage);
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are a compassionate and knowledgeable mental health support assistant for MindSpace, a comprehensive student mental health platform. 

**Your Core Responsibilities:**

1. **Empathetic Listening**: Always validate feelings before offering advice. Use phrases like "I hear you", "That sounds really difficult", "Your feelings are valid"

2. **Comprehensive Support Areas**:
   • Anxiety, panic attacks, and worry
   • Depression, sadness, and hopelessness
   • Stress, overwhelm, and burnout
   • Academic pressure, test anxiety, procrastination
   • Relationship issues (romantic, family, friendships)
   • Loneliness, isolation, and social anxiety
   • Self-esteem, confidence, and imposter syndrome
   • Sleep difficulties and fatigue
   • Body image and eating concerns
   • Substance use and addiction concerns
   • Identity questions (sexuality, gender, purpose)
   • Trauma and PTSD
   • Grief and loss
   • Anger management
   • Financial stress
   • Homesickness and transitions
   • Life purpose and career uncertainty
   • General mental health education

3. **Evidence-Based Strategies**: Offer practical, research-backed coping techniques:
   • Grounding exercises (5-4-3-2-1 technique)
   • Breathing exercises (4-7-8, box breathing)
   • Cognitive reframing
   • Progressive muscle relaxation
   • Mindfulness and meditation
   • Behavioral activation
   • Time management (Pomodoro, task breakdown)
   • Sleep hygiene
   • Social connection strategies
   • Self-compassion practices

4. **Resource Navigation**: Guide users to MindSpace features:
   • **Resources page**: Articles, coping strategies, educational content
   • **Assessment tools**: Validated self-assessments for anxiety, depression, stress
   • **Community section**: Support groups, peer counselors, discussion forums, events
   • **Crisis Support page**: 24/7 hotlines, emergency resources

5. **Crisis Recognition**: IMMEDIATELY prioritize safety if user mentions:
   • Suicide or suicidal ideation
   • Self-harm or plans to harm
   • Harm to others
   • Severe crisis situations
   → Direct to Crisis Support page and hotlines (988, 741741, 911)

6. **Professional Boundaries**:
   • Never diagnose mental health conditions
   • Don't prescribe treatments or medications
   • Always recommend professional help for persistent or severe symptoms
   • Acknowledge when issues need licensed therapist support
   • You're a supportive companion, not a replacement for therapy

7. **Conversational Style**:
   • Warm, understanding, and non-judgmental
   • Use natural, conversational language (not overly clinical)
   • Keep responses concise but substantive (2-4 paragraphs typically)
   • Ask clarifying questions to understand better
   • End with an open question to continue dialogue
   • Use bullet points for clarity when listing strategies
   • Acknowledge progress and effort

8. **Cultural Sensitivity**:
   • Be aware of diverse backgrounds and experiences
   • Avoid assumptions about family structure, relationships, or beliefs
   • Recognize systemic factors (discrimination, financial hardship, etc.)
   • Be affirming of LGBTQ+ identities
   • Acknowledge different coping styles and preferences

9. **Normalize Struggles**: Remind students that:
   • Mental health challenges are common in college
   • Seeking help is strength, not weakness
   • Recovery and growth are possible
   • They're not alone in their experiences

10. **Follow-Up**: Remember context from recent conversation (you have access to last 5 messages) to provide continuity

**Response Format Guidelines:**
• Start with empathy/validation
• Provide practical strategies or information
• Guide to relevant resources when appropriate
• End with a question or invitation to continue

**Example Opening Lines:**
• "Thank you for sharing that with me. It takes courage to open up about these feelings."
• "I can hear how much this is affecting you. Let's work through this together."
• "That sounds really challenging. Many students face similar struggles."

Remember: Your goal is to provide immediate support, psychoeducation, and connection to resources - not to replace professional mental health care.`
            },
            ...messages.slice(-5).map(msg => ({
              role: msg.isUser ? 'user' : 'assistant',
              content: msg.text
            })),
            {
              role: 'user',
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('AI API Error:', error);
      return getFallbackResponse(userMessage);
    }
  };

  const handleSend = async () => {
    if (message.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: message,
        isUser: true,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, userMessage]);
      setMessage('');
      setIsTyping(true);

      try {
        const responseText = await getAIResponse(message);
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          isUser: false,
          timestamp: Date.now()
        };

        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        toast.error('Failed to get response. Please try again.');
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleClearHistory = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
    toast.success('Chat history cleared');
  };

  const handleExportChat = () => {
    const exportData = {
      platform: 'MindSpace',
      exportDate: new Date().toISOString(),
      messages: messages.map(m => ({
        text: m.text,
        sender: m.isUser ? 'You' : 'AI Support',
        timestamp: new Date(m.timestamp).toLocaleString()
      }))
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindspace-chat-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Chat history exported');
  };

  const handleSaveApiKey = () => {
    if (tempApiKey.trim()) {
      localStorage.setItem(API_KEY_STORAGE, tempApiKey.trim());
      setApiKey(tempApiKey.trim());
      setShowSettings(false);
      toast.success('API key saved! AI responses enabled.');
    }
  };

  const handleRemoveApiKey = () => {
    localStorage.removeItem(API_KEY_STORAGE);
    setApiKey('');
    setTempApiKey('');
    toast.info('API key removed. Using fallback responses.');
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
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">AI Mental Health Support</CardTitle>
                      {apiKey && <Sparkles className="w-4 h-4" />}
                    </div>
                    <CardDescription className="text-purple-100 text-xs">
                      {apiKey ? 'AI-powered support' : 'Resource-based support'}
                    </CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowSettings(!showSettings)}
                      className="text-white hover:bg-white/20 h-8 w-8"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="text-white hover:bg-white/20 h-8 w-8"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-purple-100">Available 24/7</span>
                </div>
              </CardHeader>

              {showSettings ? (
                <CardContent className="p-4 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">OpenAI API Key (Optional)</h3>
                    <p className="text-xs text-gray-600 mb-3">
                      Add your OpenAI API key for AI-powered responses. Without it, you'll receive resource-based support.
                    </p>
                    <Input
                      type="password"
                      placeholder="sk-..."
                      value={tempApiKey}
                      onChange={(e) => setTempApiKey(e.target.value)}
                      className="mb-2"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSaveApiKey} className="flex-1">
                        Save Key
                      </Button>
                      {apiKey && (
                        <Button size="sm" variant="outline" onClick={handleRemoveApiKey}>
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleExportChat}
                        className="flex-1"
                        disabled={messages.length === 0}
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Export
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleClearHistory}
                        className="flex-1"
                        disabled={messages.length === 0}
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Clear
                      </Button>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowSettings(false)}
                    className="w-full"
                  >
                    Back to Chat
                  </Button>
                </CardContent>
              ) : (
                <CardContent className="p-4">
                  {/* Messages */}
                  <div className="h-64 overflow-y-auto mb-4 space-y-3">
                    {messages.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-center">
                        <div>
                          <MessageCircle className="w-12 h-12 mx-auto mb-3 text-purple-300" />
                          <p className="text-sm text-gray-600 mb-2">
                            Welcome to AI Mental Health Support
                          </p>
                          <p className="text-xs text-gray-500">
                            Ask me about managing stress, anxiety, finding resources, or any mental health concerns.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        {messages.map((msg) => (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[85%] px-4 py-2 rounded-2xl ${
                                msg.isUser
                                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                              <p className={`text-xs mt-1 ${msg.isUser ? 'text-purple-100' : 'text-gray-500'}`}>
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                        {isTyping && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start"
                          >
                            <div className="bg-gray-100 px-4 py-2 rounded-2xl flex items-center gap-2">
                              <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                              <span className="text-sm text-gray-600">Thinking...</span>
                            </div>
                          </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </div>

                  {/* Input */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSend()}
                      className="flex-1"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={handleSend}
                      size="icon"
                      disabled={isTyping || !message.trim()}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>

                  <p className="text-xs text-gray-500 mt-2 text-center">
                    If you're in crisis, please visit our <a href="/crisis" className="text-purple-600 underline">Crisis Support</a> page
                  </p>
                </CardContent>
              )}
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

        {/* AI Badge */}
        {!isOpen && apiKey && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center"
          >
            <Sparkles className="w-3 h-3 text-white" />
          </motion.div>
        )}
      </motion.button>
    </>
  );
}