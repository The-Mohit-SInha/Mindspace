import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Brain, Users, ClipboardList, Phone, BookOpen, Heart, Shield, Sparkles, Target, Star, Quote } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { MoodTracker } from '../components/MoodTracker';

export function Home() {
  const features = [
    {
      icon: BookOpen,
      title: 'Mental Health Resources',
      description: 'Access articles, guides, and coping strategies for various mental health concerns.',
      link: '/resources',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: ClipboardList,
      title: 'Self-Assessment Tools',
      description: 'Take confidential assessments to better understand your mental health.',
      link: '/assessment',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Users,
      title: 'Support Community',
      description: 'Connect with peers who understand and share similar experiences.',
      link: '/community',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Phone,
      title: 'Crisis Support',
      description: 'Get immediate help if you\'re in crisis. Available 24/7.',
      link: '/crisis',
      color: 'from-red-500 to-orange-500',
    },
  ];

  const howItWorks = [
    {
      icon: Target,
      title: 'Identify Your Needs',
      description: 'Take our self-assessment to understand your mental health',
    },
    {
      icon: Brain,
      title: 'Access Resources',
      description: 'Browse curated content tailored to your specific concerns',
    },
    {
      icon: Users,
      title: 'Connect & Share',
      description: 'Join support groups and connect with peers anonymously',
    },
    {
      icon: Sparkles,
      title: 'Track Progress',
      description: 'Monitor your mood and celebrate your growth journey',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'College Student',
      content: 'MindSpace helped me realize I wasn\'t alone. The anonymous support groups gave me the courage to open up.',
      rating: 5,
    },
    {
      name: 'James K.',
      role: 'Graduate Student',
      content: 'The self-assessment tools helped me understand my anxiety better. The resources are incredibly helpful!',
      rating: 5,
    },
    {
      name: 'Emily R.',
      role: 'Undergraduate',
      content: 'Being able to track my mood and see patterns has been game-changing. I love the mood tracker feature!',
      rating: 5,
    },
  ];

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

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-6 py-3 rounded-full mb-8 shadow-lg"
            >
              <Heart className="w-5 h-5 fill-current" />
              <span className="font-medium">You're Not Alone</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
            >
              Your Mental Wellness
              <br />
              <span className="block mt-2">Journey Starts Here</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              A safe, supportive space for students seeking mental health resources, 
              peer support, and professional guidance. Available 24/7.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/assessment">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all"
                  >
                    <ClipboardList className="w-5 h-5 mr-2" />
                    Start Assessment
                  </Button>
                </motion.div>
              </Link>
              <Link to="/community">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-6 border-2 border-purple-300 hover:bg-purple-50 shadow-lg"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Join Community
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              {[
                { number: '10K+', label: 'Active Users' },
                { number: '50+', label: 'Support Groups' },
                { number: '24/7', label: 'Availability' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4 text-gray-900">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive mental health support designed specifically for students
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div key={idx} variants={itemVariants}>
                  <Link to={feature.link}>
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card className="h-full border-2 border-transparent hover:border-purple-200 transition-all bg-white/80 backdrop-blur-sm hover:shadow-2xl">
                        <CardHeader>
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <CardTitle className="text-xl">{feature.title}</CardTitle>
                          <CardDescription className="text-base">
                            {feature.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Mood Tracker Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <MoodTracker />
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4 text-gray-900">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Your journey to better mental health in four simple steps
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {howItWorks.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div key={idx} variants={itemVariants} className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl`}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </motion.div>
                  <div className="text-sm font-bold text-purple-600 mb-2">STEP {idx + 1}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4 text-gray-900">
              Student Stories
            </h2>
            <p className="text-xl text-gray-600">
              Hear from students who found support through MindSpace
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="h-full bg-white/80 backdrop-blur-sm border-purple-100 hover:shadow-xl transition-all">
                    <CardHeader>
                      <Quote className="w-10 h-10 text-purple-300 mb-4" />
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <CardDescription className="text-gray-700 text-base leading-relaxed">
                        "{testimonial.content}"
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-0 bg-gradient-to-br from-purple-600 to-pink-600 text-white overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMTZjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6TTIwIDM0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek00IDM0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
              <CardContent className="p-12 text-center relative z-10">
                <Shield className="w-16 h-16 mx-auto mb-6 text-white" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Take the First Step Today
                </h2>
                <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                  Join thousands of students who are prioritizing their mental health. 
                  Your journey to wellness starts with a single step.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/assessment">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="lg"
                        className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 shadow-xl"
                      >
                        Start Assessment
                      </Button>
                    </motion.div>
                  </Link>
                  <Link to="/community">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        size="lg"
                        className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white/20"
                      >
                        Explore Community
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
