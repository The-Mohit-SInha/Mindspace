import { Phone, MessageCircle, AlertTriangle, ExternalLink, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { motion } from 'motion/react';

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
      <section className="relative bg-gradient-to-br from-red-600 via-orange-600 to-pink-600 text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/5 rounded-full blur-3xl"
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
          <motion.div
            className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-white/5 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-start gap-4 mb-6"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <AlertTriangle className="w-12 h-12 flex-shrink-0" />
            </motion.div>
            <div>
              <h1 className="text-4xl md:text-5xl mb-4 font-bold">Crisis Support</h1>
              <p className="text-xl text-red-100">
                If you or someone you know is in immediate danger, call 112 (National Emergency Number) or go to the nearest emergency room.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Immediate Help Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Alert className="mb-8 border-red-300 bg-gradient-to-br from-red-50 to-orange-50 shadow-lg backdrop-blur-sm">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <AlertTitle className="text-red-900 text-lg font-semibold">In Crisis Right Now?</AlertTitle>
            <AlertDescription className="text-red-800">
              If you're experiencing a mental health emergency, please call Vandrevala Foundation at 1860 2662 345 
              or AASRA at 91-9820466726 immediately. For medical emergencies, call 112 (National Emergency Number) 
              or go to your nearest hospital emergency department.
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Quick Access Crisis Lines */}
        <div className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl mb-6 text-gray-900 font-bold"
          >
            24/7 Crisis Helplines
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {crisisLines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <Card className="border-2 hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:scale-[1.02] group">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl font-semibold group-hover:text-purple-600 transition-colors">{line.name}</CardTitle>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-1 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full font-medium border border-green-200"
                      >
                        <Clock className="w-4 h-4" />
                        {line.availability}
                      </motion.div>
                    </div>
                    <CardDescription className="text-base">{line.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg mb-4 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-600 mb-1 font-medium">{line.type}</div>
                          <div className="text-2xl text-gray-900 font-bold">{line.phone}</div>
                        </div>
                        {line.type.includes('Call') && (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button size="lg" className="bg-green-600 hover:bg-green-700 shadow-lg">
                              <Phone className="w-5 h-5 mr-2" />
                              Call Now
                            </Button>
                          </motion.div>
                        )}
                        {line.type === 'Text' && (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-lg">
                              <MessageCircle className="w-5 h-5 mr-2" />
                              Text
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Two Column Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Warning Signs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-2xl mb-6 text-gray-900 font-bold">Warning Signs</h2>
            <Card className="bg-gradient-to-br from-orange-50 via-orange-50 to-red-50 border-2 border-orange-200 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  When to Seek Help
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 font-medium">
                  If you or someone you know is experiencing any of these signs, reach out for help:
                </p>
                <ul className="space-y-2">
                  {warningSignsPersonal.map((sign, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                      className="flex gap-2 text-gray-700"
                    >
                      <span className="text-orange-600 flex-shrink-0 mt-1 font-bold">•</span>
                      <span>{sign}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* How to Help Others */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-2xl mb-6 text-gray-900 font-bold">Helping Someone in Crisis</h2>
            <Card className="bg-gradient-to-br from-blue-50 via-blue-50 to-purple-50 border-2 border-blue-200 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Phone className="w-5 h-5 text-blue-600" />
                  How to Support Others
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 font-medium">
                  If someone you know is struggling, here's how you can help:
                </p>
                <ul className="space-y-3">
                  {warningSignsOthers.map((step, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                      className="flex gap-3 group"
                    >
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white text-sm flex items-center justify-center font-semibold shadow-md"
                      >
                        {index + 1}
                      </motion.span>
                      <span className="text-gray-700 mt-0.5 group-hover:text-gray-900 transition-colors">{step}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Campus Resources */}
        <div className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-3xl mb-6 text-gray-900 font-bold"
          >
            Campus Resources
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {campusResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <Card className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:scale-[1.02] group border-2 border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">{resource.name}</CardTitle>
                    <CardDescription className="text-base">{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-3 rounded-lg">
                        <Phone className="w-4 h-4 text-purple-600" />
                        <span className="font-medium">{resource.contact}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-3 rounded-lg">
                        <Clock className="w-4 h-4 text-purple-600" />
                        <span className="font-medium">{resource.hours}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Online Resources */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-3xl mb-6 text-gray-900 font-bold"
          >
            Online Resources
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'NIMHANS',
                description: 'National Institute of Mental Health',
                url: 'https://nimhans.ac.in'
              },
              {
                title: 'Mann Mukti',
                description: 'Mental health support portal',
                url: 'https://www.mannmukti.org'
              },
              {
                title: 'White Swan Foundation',
                description: 'Mental health awareness resources',
                url: 'https://www.whiteswanfoundation.org'
              },
              {
                title: 'YourDOST',
                description: 'Online counseling for students',
                url: 'https://yourdost.com'
              },
              {
                title: 'Mpower',
                description: 'Mental health initiative by India',
                url: 'https://mpowerminds.com'
              },
              {
                title: 'The Live Love Laugh Foundation',
                description: 'Mental health awareness & support',
                url: 'https://www.thelivelovelaughfoundation.org'
              }
            ].map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
              >
                <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white/90 to-purple-50/50 backdrop-blur-sm hover:scale-[1.02] group border-2 border-gray-200 h-full flex flex-col">
                  <CardHeader className="flex-grow">
                    <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">{resource.title}</CardTitle>
                    <CardDescription className="text-base">{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button variant="outline" className="w-full group-hover:bg-purple-50 group-hover:border-purple-300 transition-colors" asChild>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          Visit Website
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Safety Planning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Card className="mt-12 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 border-2 border-purple-300 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Create a Safety Plan</CardTitle>
              <CardDescription className="text-base">
                Having a plan in place can help you stay safe during difficult times
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg mb-3 text-gray-900 font-semibold">Include in Your Plan:</h3>
                  <ul className="space-y-2">
                    {[
                      'Warning signs that a crisis may be developing',
                      'Coping strategies that have helped in the past',
                      'People and places that provide distraction',
                      'People you can ask for help',
                      'Professionals and agencies to contact during crisis',
                      'Ways to make your environment safe'
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 1.3 + index * 0.05 }}
                        className="flex gap-2 text-gray-700"
                      >
                        <span className="text-purple-600 font-bold">✓</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border border-purple-200 shadow-lg">
                  <h3 className="text-lg mb-3 text-gray-900 font-semibold">Remember:</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    You deserve support and there are people who want to help you. 
                    Crisis is temporary, and with the right support, you can get through this.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg">
                      Download Safety Plan Template
                    </Button>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}