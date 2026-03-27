import { useState } from 'react';
import { ClipboardList, AlertCircle, CheckCircle2, Brain, Heart, Activity, ArrowRight, BookOpen, Users, Phone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { Progress } from '../components/ui/progress';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Link } from 'react-router';
import { Separator } from '../components/ui/separator';

type AssessmentType = 'anxiety' | 'depression' | 'stress' | null;

interface Question {
  id: string;
  text: string;
  options: { value: number; label: string }[];
}

export function Assessment() {
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentType>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const assessmentTypes = [
    {
      id: 'anxiety' as AssessmentType,
      title: 'Anxiety Assessment',
      description: 'Evaluate your anxiety levels over the past two weeks.',
      icon: Brain,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'depression' as AssessmentType,
      title: 'Depression Screening',
      description: 'Assess symptoms of depression and low mood.',
      icon: Heart,
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'stress' as AssessmentType,
      title: 'Stress Inventory',
      description: 'Measure your current stress levels and impact.',
      icon: Activity,
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const assessmentQuestions: Record<string, Question[]> = {
    anxiety: [
      {
        id: 'q1',
        text: 'Feeling nervous, anxious, or on edge',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' },
        ],
      },
      {
        id: 'q2',
        text: 'Not being able to stop or control worrying',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' },
        ],
      },
      {
        id: 'q3',
        text: 'Worrying too much about different things',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' },
        ],
      },
      {
        id: 'q4',
        text: 'Trouble relaxing',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' },
        ],
      },
      {
        id: 'q5',
        text: 'Being so restless that it\'s hard to sit still',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' },
        ],
      },
      {
        id: 'q6',
        text: 'Becoming easily annoyed or irritable',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' },
        ],
      },
      {
        id: 'q7',
        text: 'Feeling afraid as if something awful might happen',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' },
        ],
      },
    ],
    depression: [
      {
        id: 'q1',
        text: 'Little interest or pleasure in doing things',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' },
        ],
      },
      {
        id: 'q2',
        text: 'Feeling down, depressed, or hopeless',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' },
        ],
      },
      {
        id: 'q3',
        text: 'Trouble falling or staying asleep, or sleeping too much',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' },
        ],
      },
      {
        id: 'q4',
        text: 'Feeling tired or having little energy',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' },
        ],
      },
      {
        id: 'q5',
        text: 'Poor appetite or overeating',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' },
        ],
      },
      {
        id: 'q6',
        text: 'Feeling bad about yourself or that you are a failure',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' },
        ],
      },
      {
        id: 'q7',
        text: 'Trouble concentrating on things',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'Several days' },
          { value: 2, label: 'More than half the days' },
          { value: 3, label: 'Nearly every day' },
        ],
      },
    ],
    stress: [
      {
        id: 'q1',
        text: 'Been upset because of something that happened unexpectedly',
        options: [
          { value: 0, label: 'Never' },
          { value: 1, label: 'Almost never' },
          { value: 2, label: 'Sometimes' },
          { value: 3, label: 'Fairly often' },
          { value: 4, label: 'Very often' },
        ],
      },
      {
        id: 'q2',
        text: 'Felt unable to control important things in your life',
        options: [
          { value: 0, label: 'Never' },
          { value: 1, label: 'Almost never' },
          { value: 2, label: 'Sometimes' },
          { value: 3, label: 'Fairly often' },
          { value: 4, label: 'Very often' },
        ],
      },
      {
        id: 'q3',
        text: 'Felt nervous and stressed',
        options: [
          { value: 0, label: 'Never' },
          { value: 1, label: 'Almost never' },
          { value: 2, label: 'Sometimes' },
          { value: 3, label: 'Fairly often' },
          { value: 4, label: 'Very often' },
        ],
      },
      {
        id: 'q4',
        text: 'Felt confident about your ability to handle personal problems',
        options: [
          { value: 4, label: 'Never' },
          { value: 3, label: 'Almost never' },
          { value: 2, label: 'Sometimes' },
          { value: 1, label: 'Fairly often' },
          { value: 0, label: 'Very often' },
        ],
      },
      {
        id: 'q5',
        text: 'Felt that things were going your way',
        options: [
          { value: 4, label: 'Never' },
          { value: 3, label: 'Almost never' },
          { value: 2, label: 'Sometimes' },
          { value: 1, label: 'Fairly often' },
          { value: 0, label: 'Very often' },
        ],
      },
      {
        id: 'q6',
        text: 'Found that you could not cope with all the things you had to do',
        options: [
          { value: 0, label: 'Never' },
          { value: 1, label: 'Almost never' },
          { value: 2, label: 'Sometimes' },
          { value: 3, label: 'Fairly often' },
          { value: 4, label: 'Very often' },
        ],
      },
    ],
  };

  const questions = selectedAssessment ? assessmentQuestions[selectedAssessment] : [];
  const totalQuestions = questions.length;
  const progress = totalQuestions > 0 ? ((currentQuestion + 1) / totalQuestions) * 100 : 0;

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, value) => sum + value, 0);
  };

  const getResultInterpretation = (score: number, type: AssessmentType) => {
    if (!type) return { level: '', description: '', recommendations: [] };

    const interpretations: Record<string, any> = {
      anxiety: {
        minimal: { max: 4, level: 'Minimal Anxiety', color: 'text-green-600', bg: 'bg-green-50' },
        mild: { max: 9, level: 'Mild Anxiety', color: 'text-yellow-600', bg: 'bg-yellow-50' },
        moderate: { max: 14, level: 'Moderate Anxiety', color: 'text-orange-600', bg: 'bg-orange-50' },
        severe: { max: 21, level: 'Severe Anxiety', color: 'text-red-600', bg: 'bg-red-50' },
      },
      depression: {
        minimal: { max: 4, level: 'Minimal Depression', color: 'text-green-600', bg: 'bg-green-50' },
        mild: { max: 9, level: 'Mild Depression', color: 'text-yellow-600', bg: 'bg-yellow-50' },
        moderate: { max: 14, level: 'Moderate Depression', color: 'text-orange-600', bg: 'bg-orange-50' },
        severe: { max: 21, level: 'Severe Depression', color: 'text-red-600', bg: 'bg-red-50' },
      },
      stress: {
        low: { max: 13, level: 'Low Stress', color: 'text-green-600', bg: 'bg-green-50' },
        moderate: { max: 26, level: 'Moderate Stress', color: 'text-yellow-600', bg: 'bg-yellow-50' },
        high: { max: 40, level: 'High Stress', color: 'text-red-600', bg: 'bg-red-50' },
      },
    };

    const levels = interpretations[type];
    let result = null;

    for (const key in levels) {
      if (score <= levels[key].max) {
        result = levels[key];
        break;
      }
    }

    if (!result) {
      result = Object.values(levels)[Object.values(levels).length - 1];
    }

    const recommendations: Record<string, string[]> = {
      minimal: [
        'Continue your current self-care practices',
        'Consider preventive strategies like regular exercise and sleep',
        'Stay connected with supportive friends and family',
      ],
      mild: [
        'Practice stress-reduction techniques like deep breathing',
        'Maintain a regular sleep schedule',
        'Consider talking to a counselor if symptoms persist',
        'Engage in regular physical activity',
      ],
      moderate: [
        'We recommend speaking with a mental health professional',
        'Implement daily self-care routines',
        'Reach out to campus counseling services',
        'Consider joining a support group',
      ],
      severe: [
        'Please seek professional help as soon as possible',
        'Contact your campus counseling center',
        'Talk to a trusted friend, family member, or advisor',
        'If in crisis, visit our Crisis Support page for immediate resources',
      ],
    };

    const severityKey = Object.keys(levels).find(key => score <= levels[key].max) || 'severe';
    
    return {
      ...result,
      recommendations: recommendations[severityKey] || recommendations.severe,
    };
  };

  const handleAnswerChange = (value: string) => {
    setAnswers({
      ...answers,
      [questions[currentQuestion].id]: parseInt(value),
    });
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setSelectedAssessment(null);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const currentAnswer = answers[questions[currentQuestion]?.id];
  const canProceed = currentAnswer !== undefined;

  if (!selectedAssessment) {
    return (
      <div className="w-full">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 to-pink-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl mb-4">Self-Assessment Tools</h1>
              <p className="text-xl text-purple-100">
                Take a confidential assessment to better understand your mental health. These tools are for informational purposes and not a substitute for professional diagnosis.
              </p>
            </div>
          </div>
        </section>

        {/* Assessment Selection */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Alert className="mb-8 border-blue-200 bg-blue-50">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-900">
              These assessments are based on validated screening tools but are not diagnostic. 
              If you're concerned about your mental health, please consult with a healthcare professional.
            </AlertDescription>
          </Alert>

          <h2 className="text-2xl mb-6 text-gray-900">Choose an Assessment</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {assessmentTypes.map((assessment) => (
              <Card
                key={assessment.id}
                className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-purple-300"
                onClick={() => setSelectedAssessment(assessment.id)}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${assessment.color} flex items-center justify-center mb-4`}>
                    <assessment.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>{assessment.title}</CardTitle>
                  <CardDescription>{assessment.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Assessment</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Information Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <Card className="bg-purple-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-purple-600" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Answer questions honestly about your recent experiences</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Receive personalized results and recommendations</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>All responses are completely confidential</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Takes approximately 5-10 minutes to complete</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  Important Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex gap-2">
                    <span className="text-blue-600 flex-shrink-0">•</span>
                    <span>These tools are for screening purposes only</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 flex-shrink-0">•</span>
                    <span>Results do not constitute a clinical diagnosis</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 flex-shrink-0">•</span>
                    <span>Consider discussing results with a healthcare provider</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 flex-shrink-0">•</span>
                    <span>If you're in crisis, please seek immediate help</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const result = getResultInterpretation(score, selectedAssessment);
    const assessmentInfo = assessmentTypes.find(a => a.id === selectedAssessment);
    
    // Get detailed explanations based on assessment type and severity
    const getDetailedExplanation = () => {
      if (selectedAssessment === 'anxiety') {
        if (score <= 4) {
          return "Your responses indicate minimal anxiety symptoms. This suggests you're managing stress and worry effectively in your daily life. Continue to practice healthy coping strategies and maintain your well-being.";
        } else if (score <= 9) {
          return "Your responses indicate mild anxiety symptoms. While these symptoms are manageable, they may still affect your daily life. Consider learning additional coping techniques and monitoring your symptoms over time.";
        } else if (score <= 14) {
          return "Your responses indicate moderate anxiety symptoms. These symptoms are likely impacting your daily functioning and quality of life. Professional support can help you develop effective strategies to manage anxiety.";
        } else {
          return "Your responses indicate severe anxiety symptoms that are significantly impacting your daily life. Please know that help is available, and speaking with a mental health professional can make a meaningful difference. You don't have to face this alone.";
        }
      } else if (selectedAssessment === 'depression') {
        if (score <= 4) {
          return "Your responses indicate minimal depression symptoms. You appear to be maintaining good mental health. Continue engaging in activities that bring you joy and fulfillment.";
        } else if (score <= 9) {
          return "Your responses indicate mild depression symptoms. While you may be experiencing some difficult days, these symptoms are still manageable. Consider reaching out for support and implementing self-care strategies.";
        } else if (score <= 14) {
          return "Your responses indicate moderate depression symptoms. These symptoms are likely affecting your energy, motivation, and daily activities. Professional support can help you work through these challenges.";
        } else {
          return "Your responses indicate severe depression symptoms that are significantly impacting your life. Please know that depression is treatable, and reaching out for professional help is a sign of strength. You deserve support and relief from these symptoms.";
        }
      } else {
        if (score <= 13) {
          return "Your responses indicate low stress levels. You appear to be managing life's demands effectively. Continue using the coping strategies that work well for you.";
        } else if (score <= 26) {
          return "Your responses indicate moderate stress levels. You may be feeling overwhelmed by daily demands. This is a good time to evaluate your stress management strategies and consider new approaches.";
        } else {
          return "Your responses indicate high stress levels. You're experiencing significant stress that may be affecting your health and well-being. Consider seeking support to develop effective stress management techniques.";
        }
      }
    };

    // Get recommended resources based on assessment type
    const getRecommendedResources = () => {
      if (selectedAssessment === 'anxiety') {
        return [
          { title: 'Understanding Anxiety: Symptoms and Management', type: 'Article' },
          { title: 'Breathing Exercises for Anxiety Relief', type: 'Guide' },
          { title: 'Anxiety Support Circle', type: 'Support Group' },
        ];
      } else if (selectedAssessment === 'depression') {
        return [
          { title: 'Recognizing and Coping with Depression', type: 'Article' },
          { title: 'Depression & Mood Support Group', type: 'Support Group' },
          { title: 'Building a Self-Care Routine', type: 'Guide' },
        ];
      } else {
        return [
          { title: 'Managing Academic Stress', type: 'Article' },
          { title: 'Mindfulness & Meditation Sessions', type: 'Activity' },
          { title: 'Academic Stress Management Group', type: 'Support Group' },
        ];
      }
    };

    return (
      <div className="w-full">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="border-2">
            <CardHeader className="text-center">
              <div className={`w-16 h-16 rounded-full ${result.bg} flex items-center justify-center mx-auto mb-4`}>
                {assessmentInfo && <assessmentInfo.icon className={`w-8 h-8 ${result.color}`} />}
              </div>
              <CardTitle className="text-3xl mb-2">Assessment Complete</CardTitle>
              <CardDescription className="text-lg">
                {assessmentInfo?.title}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Score Display */}
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">Your Score</div>
                <div className="text-5xl mb-2">{score}</div>
                <div className={`text-2xl mb-3 ${result.color}`}>{result.level}</div>
                <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
                  {getDetailedExplanation()}
                </p>
              </div>

              <Separator />

              {/* What This Means */}
              <div>
                <h3 className="text-xl mb-3 text-gray-900">What This Means</h3>
                <p className="text-gray-700 leading-relaxed">
                  {score <= 4 && "You're showing healthy functioning with minimal symptoms. Continue your current wellness practices and stay connected to your support system."}
                  {score > 4 && score <= 9 && "You're experiencing some symptoms that may benefit from attention and self-care. Now is a good time to implement stress-reduction strategies and monitor how you're feeling."}
                  {score > 9 && score <= 14 && "Your symptoms suggest you would benefit from professional support. Many students experience these challenges, and seeking help is a positive step toward feeling better."}
                  {score > 14 && "Your symptoms indicate significant distress. Please prioritize reaching out for professional help. Effective treatments are available, and you don't have to manage this alone."}
                </p>
              </div>

              <Separator />

              {/* Personalized Recommendations */}
              <div>
                <h3 className="text-xl mb-4 text-gray-900">Personalized Recommendations</h3>
                <ul className="space-y-3">
                  {result.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              {/* Recommended Resources */}
              <div>
                <h3 className="text-xl mb-4 text-gray-900">Recommended Resources</h3>
                <div className="grid gap-3">
                  {getRecommendedResources().map((resource, index) => (
                    <Link
                      key={index}
                      to={resource.type === 'Support Group' ? '/community' : '/resources'}
                      className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        {resource.type === 'Article' && <BookOpen className="w-5 h-5 text-purple-600" />}
                        {resource.type === 'Guide' && <ClipboardList className="w-5 h-5 text-purple-600" />}
                        {resource.type === 'Support Group' && <Users className="w-5 h-5 text-purple-600" />}
                        {resource.type === 'Activity' && <Activity className="w-5 h-5 text-purple-600" />}
                        <div>
                          <div className="text-gray-900 font-medium">{resource.title}</div>
                          <div className="text-sm text-gray-600">{resource.type}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Alert for high scores */}
              {score > 14 && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-900">
                    <strong>Important:</strong> Your results suggest that you may benefit from professional support. Please consider reaching out to a mental health professional or your campus counseling center. If you're in crisis, please visit our <Link to="/crisis" className="underline font-medium">Crisis Support page</Link> for immediate help.
                  </AlertDescription>
                </Alert>
              )}

              {score > 9 && score <= 14 && (
                <Alert className="border-orange-200 bg-orange-50">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-900">
                    We encourage you to speak with a counselor or mental health professional who can provide personalized support and guidance. Campus counseling services are free and confidential.
                  </AlertDescription>
                </Alert>
              )}

              <Separator />

              {/* Next Steps Card */}
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-6">
                  <h3 className="text-lg mb-3 text-gray-900">Next Steps</h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <BookOpen className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900">Explore Resources</div>
                        <div className="text-sm text-gray-700">Browse articles and guides related to your assessment results</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Users className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900">Connect with Others</div>
                        <div className="text-sm text-gray-700">Join support groups and community forums</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Phone className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900">Seek Professional Help</div>
                        <div className="text-sm text-gray-700">Contact campus counseling services or a mental health provider</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button onClick={handleRestart} className="flex-1">
                  Take Another Assessment
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/resources">View Resources</Link>
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/community">Find Support</Link>
                </Button>
              </div>

              {/* Disclaimer */}
              <div className="text-center text-sm text-gray-600 pt-4">
                <p>These results are for informational purposes only and do not constitute a diagnosis. Please consult with a healthcare professional for personalized advice.</p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>
                {assessmentTypes.find(a => a.id === selectedAssessment)?.title}
              </CardTitle>
              <span className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {totalQuestions}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Question */}
            <div>
              <h3 className="text-xl mb-6 text-gray-900">
                Over the last 2 weeks, how often have you been bothered by:
              </h3>
              <p className="text-lg mb-6 text-gray-700">{questions[currentQuestion].text}</p>

              {/* Options */}
              <RadioGroup value={currentAnswer?.toString()} onValueChange={handleAnswerChange}>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option) => (
                    <label
                      key={option.value}
                      htmlFor={`option-${option.value}`}
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                        currentAnswer === option.value
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
                      <span className="flex-1 text-gray-900">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex-1"
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={!canProceed}
                className="flex-1"
              >
                {currentQuestion === totalQuestions - 1 ? 'View Results' : 'Next'}
              </Button>
            </div>

            {/* Exit Button */}
            <Button
              variant="ghost"
              onClick={handleRestart}
              className="w-full text-gray-500"
            >
              Exit Assessment
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}