import { Phone, MessageCircle, AlertTriangle, ExternalLink, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';

export function Crisis() {
  const crisisLines = [
    {
      name: 'Vandrevala Foundation',
      phone: '1860 2662 345 / 1800 2333 330',
      description: '24/7 crisis helpline providing support in multiple languages including Hindi, English, Tamil, Telugu, and more.',
      availability: '24/7',
      type: 'Call',
    },
    {
      name: 'AASRA',
      phone: '91-9820466726',
      description: '24-hour suicide prevention helpline. Email support also available at aasrahelpline@yahoo.com',
      availability: '24/7',
      type: 'Call or Email',
    },
    {
      name: 'iCall - TISS',
      phone: '9152987821',
      description: 'Psychosocial helpline by TISS. Email counseling available at icall@tiss.edu',
      availability: 'Mon-Sat, 8am-10pm',
      type: 'Call or Email',
    },
    {
      name: 'Snehi',
      phone: '91-22-27546669',
      description: 'Crisis intervention center providing emotional support to those in distress.',
      availability: 'Daily, 10am-10pm',
      type: 'Call',
    },
    {
      name: 'Mitram Foundation',
      phone: '080-25722573',
      description: 'Suicide prevention helpline based in Bangalore offering emotional support.',
      availability: 'Daily, 10am-7pm',
      type: 'Call',
    },
    {
      name: 'Sumaitri',
      phone: '011-23389090',
      description: 'Delhi-based volunteer organization providing emotional support and suicide prevention.',
      availability: 'Daily, 2pm-10pm',
      type: 'Call',
    },
  ];

  const warningSignsPersonal = [
    'Talking about wanting to die or hurt yourself',
    'Looking for ways to end your life',
    'Feeling hopeless or having no reason to live',
    'Feeling trapped or in unbearable pain',
    'Being a burden to others',
    'Increased use of alcohol or drugs',
    'Acting anxious, agitated, or reckless',
    'Sleeping too little or too much',
    'Withdrawing or feeling isolated',
    'Showing rage or talking about seeking revenge',
    'Displaying extreme mood swings',
  ];

  const warningSignsOthers = [
    'Listen without judgment',
    'Take their concerns seriously',
    'Ask directly if they are thinking about suicide',
    'Stay with them or ensure they\'re not alone',
    'Remove means of self-harm if possible',
    'Help them connect with crisis resources',
    'Follow up and check in regularly',
  ];

  const campusResources = [
    {
      name: 'Campus Counseling Center',
      contact: 'Visit Student Wellness Center',
      hours: 'Mon-Fri, 9am-5pm',
      description: 'Free or subsidized counseling services for enrolled students',
    },
    {
      name: 'Campus Security',
      contact: 'Emergency: 112 or Campus Security',
      hours: '24/7',
      description: 'Immediate emergency response and student safety',
    },
    {
      name: 'Student Health Services',
      contact: 'Call for appointment',
      hours: 'Mon-Sat, 9am-6pm',
      description: 'Medical care and mental health referrals',
    },
    {
      name: 'Student Affairs Office',
      contact: 'Visit administration building',
      hours: 'Mon-Fri, 9am-5pm',
      description: 'Student support, advocacy, and accommodation services',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section - Emergency Alert Style */}
      <section className="bg-gradient-to-br from-red-600 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-start gap-4 mb-6">
            <AlertTriangle className="w-12 h-12 flex-shrink-0" />
            <div>
              <h1 className="text-4xl md:text-5xl mb-4">Crisis Support</h1>
              <p className="text-xl text-red-100">
                If you or someone you know is in immediate danger, call 112 (National Emergency Number) or go to the nearest emergency room.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Immediate Help Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Alert className="mb-8 border-red-300 bg-red-50">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <AlertTitle className="text-red-900 text-lg">In Crisis Right Now?</AlertTitle>
          <AlertDescription className="text-red-800">
            If you're experiencing a mental health emergency, please call Vandrevala Foundation at 1860 2662 345 
            or AASRA at 91-9820466726 immediately. For medical emergencies, call 112 (National Emergency Number) 
            or go to your nearest hospital emergency department.
          </AlertDescription>
        </Alert>

        {/* Quick Access Crisis Lines */}
        <div className="mb-12">
          <h2 className="text-3xl mb-6 text-gray-900">24/7 Crisis Helplines</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {crisisLines.map((line, index) => (
              <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl">{line.name}</CardTitle>
                    <div className="flex items-center gap-1 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      <Clock className="w-4 h-4" />
                      {line.availability}
                    </div>
                  </div>
                  <CardDescription>{line.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">{line.type}</div>
                        <div className="text-2xl text-gray-900">{line.phone}</div>
                      </div>
                      {line.type.includes('Call') && (
                        <Button size="lg" className="bg-green-600 hover:bg-green-700">
                          <Phone className="w-5 h-5 mr-2" />
                          Call Now
                        </Button>
                      )}
                      {line.type === 'Text' && (
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                          <MessageCircle className="w-5 h-5 mr-2" />
                          Text
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Two Column Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Warning Signs */}
          <div>
            <h2 className="text-2xl mb-6 text-gray-900">Warning Signs</h2>
            <Card className="bg-orange-50 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  When to Seek Help
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  If you or someone you know is experiencing any of these signs, reach out for help:
                </p>
                <ul className="space-y-2">
                  {warningSignsPersonal.map((sign, index) => (
                    <li key={index} className="flex gap-2 text-gray-700">
                      <span className="text-orange-600 flex-shrink-0 mt-1">•</span>
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* How to Help Others */}
          <div>
            <h2 className="text-2xl mb-6 text-gray-900">Helping Someone in Crisis</h2>
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-600" />
                  How to Support Others
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  If someone you know is struggling, here's how you can help:
                </p>
                <ul className="space-y-3">
                  {warningSignsOthers.map((step, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 mt-0.5">{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Campus Resources */}
        <div className="mb-12">
          <h2 className="text-3xl mb-6 text-gray-900">Campus Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {campusResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>{resource.name}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{resource.contact}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{resource.hours}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Online Resources */}
        <div>
          <h2 className="text-3xl mb-6 text-gray-900">Online Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">NIMHANS</CardTitle>
                <CardDescription>National Institute of Mental Health</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://nimhans.ac.in" target="_blank" rel="noopener noreferrer">
                    Visit Website
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Mann Mukti</CardTitle>
                <CardDescription>Mental health support portal</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://www.mannmukti.org" target="_blank" rel="noopener noreferrer">
                    Visit Website
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">White Swan Foundation</CardTitle>
                <CardDescription>Mental health awareness resources</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://www.whiteswanfoundation.org" target="_blank" rel="noopener noreferrer">
                    Visit Website
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">YourDOST</CardTitle>
                <CardDescription>Online counseling for students</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://yourdost.com" target="_blank" rel="noopener noreferrer">
                    Visit Website
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Mpower</CardTitle>
                <CardDescription>Mental health initiative by India</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://mpowerminds.com" target="_blank" rel="noopener noreferrer">
                    Visit Website
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">The Live Love Laugh Foundation</CardTitle>
                <CardDescription>Mental health awareness & support</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://www.thelivelovelaughfoundation.org" target="_blank" rel="noopener noreferrer">
                    Visit Website
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Safety Planning */}
        <Card className="mt-12 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="text-2xl">Create a Safety Plan</CardTitle>
            <CardDescription className="text-base">
              Having a plan in place can help you stay safe during difficult times
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg mb-3 text-gray-900">Include in Your Plan:</h3>
                <ul className="space-y-2">
                  <li className="flex gap-2 text-gray-700">
                    <span className="text-purple-600">✓</span>
                    <span>Warning signs that a crisis may be developing</span>
                  </li>
                  <li className="flex gap-2 text-gray-700">
                    <span className="text-purple-600">✓</span>
                    <span>Coping strategies that have helped in the past</span>
                  </li>
                  <li className="flex gap-2 text-gray-700">
                    <span className="text-purple-600">✓</span>
                    <span>People and places that provide distraction</span>
                  </li>
                  <li className="flex gap-2 text-gray-700">
                    <span className="text-purple-600">✓</span>
                    <span>People you can ask for help</span>
                  </li>
                  <li className="flex gap-2 text-gray-700">
                    <span className="text-purple-600">✓</span>
                    <span>Professionals and agencies to contact during crisis</span>
                  </li>
                  <li className="flex gap-2 text-gray-700">
                    <span className="text-purple-600">✓</span>
                    <span>Ways to make your environment safe</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg mb-3 text-gray-900">Remember:</h3>
                <p className="text-gray-700 mb-4">
                  You deserve support and there are people who want to help you. 
                  Crisis is temporary, and with the right support, you can get through this.
                </p>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Download Safety Plan Template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}