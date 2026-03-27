import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Home as HomeIcon, BookOpen, ClipboardList, Users, Phone, Layout, Smartphone, Monitor } from 'lucide-react';

export function DesignFrames() {
  const frames = [
    {
      name: 'Home / Landing Page',
      route: '/',
      icon: HomeIcon,
      sections: [
        {
          title: 'Hero Section',
          components: ['Logo', 'Navigation', 'Headline', 'Subheadline', 'CTA Buttons', 'Hero Image'],
          description: 'Large hero with gradient background, "You\'re Not Alone" badge, mental health imagery'
        },
        {
          title: 'Features Grid',
          components: ['4 Feature Cards', 'Icons with Gradients', 'Descriptive Text'],
          description: 'Mental Health Resources, Self-Assessment Tools, Support Community, Crisis Support'
        },
        {
          title: 'Statistics Banner',
          components: ['3 Statistics', 'Purple-Pink Gradient Background'],
          description: 'Full-width colored section with mental health statistics'
        },
        {
          title: 'Why MindSpace',
          components: ['Image', 'Feature List with Icons', '3 Key Benefits'],
          description: 'Two-column layout with image and text features'
        },
        {
          title: 'Call to Action',
          components: ['Card Container', 'Headline', '2 CTA Buttons'],
          description: 'Final conversion section with gradient background'
        }
      ],
      colors: ['Purple 600', 'Pink 600', 'Blue 500', 'White'],
      breakpoints: ['Mobile: 375px', 'Tablet: 768px', 'Desktop: 1440px']
    },
    {
      name: 'Resources Library',
      route: '/resources',
      icon: BookOpen,
      sections: [
        {
          title: 'Page Header',
          components: ['Title', 'Description', 'Breadcrumbs'],
          description: 'Introduction to mental health resources'
        },
        {
          title: 'Category Tabs',
          components: ['Tab Navigation', '6 Categories', 'Icon + Label'],
          description: 'All, Anxiety, Depression, Stress, Wellbeing, Sleep tabs'
        },
        {
          title: 'Articles Tab',
          components: ['Article Cards Grid', 'Tags', 'Read Time', 'Thumbnails'],
          description: '6+ comprehensive articles with filtering by category'
        },
        {
          title: 'Article Detail View',
          components: ['Back Button', 'Header Section', 'Structured Content', 'Tags'],
          description: 'Full article view with formatted content, callouts, and lists'
        },
        {
          title: 'Coping Strategies Tab',
          components: ['4 Strategy Categories', 'Technique Cards', 'Difficulty Badges', 'Icons'],
          description: 'Breathing, Physical, Grounding, Cognitive strategies'
        },
        {
          title: 'FAQ Tab',
          components: ['Accordion Component', '4 Categories', '12 Questions'],
          description: 'Collapsible FAQ sections: Getting Help, Costs & Access, Supporting Others, Understanding'
        }
      ],
      colors: ['Purple 600', 'Blue 600', 'Gray 900', 'White'],
      breakpoints: ['Mobile: 375px', 'Tablet: 768px', 'Desktop: 1440px']
    },
    {
      name: 'Self-Assessment Tool',
      route: '/assessment',
      icon: ClipboardList,
      sections: [
        {
          title: 'Assessment Overview',
          components: ['Introduction Card', 'Assessment Type Buttons', 'Disclaimer'],
          description: '4 assessment types: Depression (PHQ-9), Anxiety (GAD-7), Stress (PSS-10), Wellbeing (WHO-5)'
        },
        {
          title: 'Assessment Form',
          components: ['Progress Bar', 'Question Cards', 'Radio Buttons', 'Navigation Buttons'],
          description: 'Step-by-step questionnaire with progress indication'
        },
        {
          title: 'Results Screen',
          components: ['Score Display', 'Severity Indicator', 'Interpretation', 'Recommendations', 'Resource Links'],
          description: 'Comprehensive results with personalized feedback and action steps'
        },
        {
          title: 'Severity Levels',
          components: ['Color-Coded Badges', 'Score Ranges', 'Descriptions'],
          description: 'Minimal (Green), Mild (Blue), Moderate (Yellow), Severe (Red)'
        }
      ],
      colors: ['Purple 600', 'Pink 500', 'Green 500', 'Amber 500', 'Red 500'],
      breakpoints: ['Mobile: 375px', 'Tablet: 768px', 'Desktop: 1024px']
    },
    {
      name: 'Community Support',
      route: '/community',
      icon: Users,
      sections: [
        {
          title: 'Community Overview',
          components: ['Header', 'Description', 'Tab Navigation'],
          description: 'Introduction to peer support features'
        },
        {
          title: 'Support Groups Tab',
          components: ['Group Cards Grid', 'Member Count', 'Meeting Schedule', 'Tags', 'Join Buttons'],
          description: '6 support groups: Anxiety, Depression, Academic Stress, First Year, LGBTQ+, International Students'
        },
        {
          title: 'Forums Tab',
          components: ['Forum Topic Cards', 'Post Count', 'Activity Indicators', 'Icons'],
          description: 'Discussion forums for different topics'
        },
        {
          title: 'Group Details',
          components: ['Group Info', 'Member List', 'Schedule', 'Guidelines'],
          description: 'Detailed view of support group information'
        }
      ],
      colors: ['Green 500', 'Emerald 500', 'Purple 600', 'White'],
      breakpoints: ['Mobile: 375px', 'Tablet: 768px', 'Desktop: 1440px']
    },
    {
      name: 'Crisis Support',
      route: '/crisis',
      icon: Phone,
      sections: [
        {
          title: 'Emergency Banner',
          components: ['Alert Component', 'Emergency Message', 'Primary CTA'],
          description: 'Red alert banner at top with immediate crisis resources'
        },
        {
          title: '24/7 Helplines (India)',
          components: ['Helpline Cards', 'Phone Numbers', 'Service Hours', 'Call Buttons'],
          description: 'AASRA, Vandrevala Foundation, iCall, KIRAN, Snehi helplines with details'
        },
        {
          title: 'Warning Signs',
          components: ['Checklist', 'Icons', 'Symptom Descriptions'],
          description: 'Recognizing crisis situations and when to get help'
        },
        {
          title: 'Immediate Actions',
          components: ['Numbered Steps', 'Safety Planning', 'Action Cards'],
          description: 'What to do right now in a crisis'
        },
        {
          title: 'Campus Resources',
          components: ['Resource Cards', 'Contact Info', 'Location', 'Hours'],
          description: 'On-campus mental health services and emergency contacts'
        },
        {
          title: 'Safety Resources',
          components: ['Safety Plan Template', 'Coping Strategies', 'Emergency Contacts'],
          description: 'Tools for crisis prevention and management'
        }
      ],
      colors: ['Red 500', 'Orange 500', 'Purple 600', 'White'],
      breakpoints: ['Mobile: 375px', 'Tablet: 768px', 'Desktop: 1440px']
    }
  ];

  const globalComponents = [
    {
      name: 'Header / Navigation',
      elements: ['Logo with Heart Icon', 'Desktop Nav Menu', 'Mobile Hamburger Menu', 'Sticky Position'],
      styling: 'White background with backdrop blur, purple accent colors'
    },
    {
      name: 'Footer',
      elements: ['Organization Info', 'Crisis Link', 'Copyright'],
      styling: 'White background with backdrop blur, centered layout'
    },
    {
      name: 'Card Components',
      elements: ['CardHeader', 'CardTitle', 'CardDescription', 'CardContent'],
      styling: 'White background, rounded corners, shadow on hover'
    },
    {
      name: 'Buttons',
      variants: ['Primary (Gradient)', 'Secondary', 'Outline', 'Ghost'],
      styling: 'Purple-to-pink gradients, rounded corners, hover effects'
    },
    {
      name: 'Tabs',
      elements: ['TabsList', 'TabsTrigger', 'TabsContent'],
      styling: 'Pill-shaped triggers, smooth transitions'
    },
    {
      name: 'Forms',
      elements: ['Input Fields', 'Radio Groups', 'Checkboxes', 'Labels'],
      styling: 'Clean borders, focus states, validation colors'
    }
  ];

  const colorPalette = [
    { name: 'Purple', shades: ['50', '100', '500', '600', '700'], usage: 'Primary brand, navigation, CTAs' },
    { name: 'Pink', shades: ['50', '100', '500', '600'], usage: 'Secondary brand, gradients, accents' },
    { name: 'Blue', shades: ['50', '100', '500', '600'], usage: 'Calm, trust, informational elements' },
    { name: 'Green', shades: ['500', 'Emerald 500'], usage: 'Success, positive, wellbeing' },
    { name: 'Red/Orange', shades: ['500', 'Orange 500'], usage: 'Crisis, urgent, warnings' },
    { name: 'Amber', shades: ['50', '200', '500', '600'], usage: 'Moderate severity, caution' },
    { name: 'Gray', shades: ['50', '100', '600', '900'], usage: 'Text, backgrounds, neutral elements' }
  ];

  const typography = [
    { element: 'H1', size: '3xl - 6xl', weight: 'Default', usage: 'Hero headlines, page titles' },
    { element: 'H2', size: '2xl - 4xl', weight: 'Default', usage: 'Section headers' },
    { element: 'H3', size: 'xl - 2xl', weight: 'Semibold', usage: 'Card titles, subsections' },
    { element: 'Body', size: 'base - lg', weight: 'Normal', usage: 'Paragraph text, descriptions' },
    { element: 'Small', size: 'sm', weight: 'Normal', usage: 'Meta info, badges, labels' }
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-6">
            <Layout className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl">Design Frames Overview</h1>
          </div>
          <p className="text-xl text-purple-100 max-w-3xl">
            Complete visual documentation of all MindSpace platform screens, components, and design specifications
          </p>
        </div>
      </section>

      {/* Page Frames */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-3xl mb-3 text-gray-900">Page Frames</h2>
          <p className="text-lg text-gray-600">All main screens and their component breakdowns</p>
        </div>

        <div className="space-y-8">
          {frames.map((frame, index) => (
            <Card key={index} className="border-2 border-purple-200">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <frame.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{frame.name}</CardTitle>
                      <CardDescription className="text-base mt-1">
                        Route: <code className="bg-purple-100 px-2 py-1 rounded text-purple-700">{frame.route}</code>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Monitor className="w-5 h-5 text-purple-600" />
                    <Smartphone className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Sections */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Layout className="w-4 h-4" />
                    Sections & Components
                  </h4>
                  <div className="space-y-4">
                    {frame.sections.map((section, sIndex) => (
                      <Card key={sIndex} className="bg-gray-50">
                        <CardContent className="p-4">
                          <h5 className="font-semibold text-gray-900 mb-2">{section.title}</h5>
                          <p className="text-sm text-gray-600 mb-3">{section.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {section.components.map((comp, cIndex) => (
                              <Badge key={cIndex} variant="secondary" className="bg-white">
                                {comp}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Colors & Breakpoints */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2 text-sm">Color Scheme</h5>
                    <div className="flex flex-wrap gap-2">
                      {frame.colors.map((color, cIndex) => (
                        <Badge key={cIndex} variant="outline" className="text-xs">
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2 text-sm">Breakpoints</h5>
                    <div className="flex flex-wrap gap-2">
                      {frame.breakpoints.map((bp, bIndex) => (
                        <Badge key={bIndex} variant="outline" className="text-xs">
                          {bp}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Global Components */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl mb-3 text-gray-900">Global Components</h2>
            <p className="text-lg text-gray-600">Reusable components across all pages</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {globalComponents.map((component, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{component.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Elements:</p>
                    <div className="flex flex-wrap gap-2">
                      {component.elements.map((elem, eIndex) => (
                        <Badge key={eIndex} variant="secondary">
                          {elem}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {component.variants && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Variants:</p>
                      <div className="flex flex-wrap gap-2">
                        {component.variants.map((variant, vIndex) => (
                          <Badge key={vIndex} variant="outline">
                            {variant}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    {component.styling}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Design System */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl mb-3 text-gray-900">Design System</h2>
          <p className="text-lg text-gray-600">Colors, typography, and design tokens</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Color Palette */}
          <Card>
            <CardHeader>
              <CardTitle>Color Palette</CardTitle>
              <CardDescription>Brand colors and semantic usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {colorPalette.map((color, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                    <div className="font-semibold text-gray-900 mb-2">{color.name}</div>
                    <div className="flex gap-2 mb-2">
                      {color.shades.map((shade, sIndex) => (
                        <div
                          key={sIndex}
                          className={`w-8 h-8 rounded border border-gray-300`}
                          style={{
                            backgroundColor: shade.includes('Emerald') ? '#10b981' :
                                           shade.includes('Orange') ? '#f97316' :
                                           color.name === 'Purple' ? shade === '50' ? '#faf5ff' : shade === '100' ? '#f3e8ff' : shade === '500' ? '#a855f7' : shade === '600' ? '#9333ea' : '#7e22ce' :
                                           color.name === 'Pink' ? shade === '50' ? '#fdf2f8' : shade === '100' ? '#fce7f3' : shade === '500' ? '#ec4899' : '#db2777' :
                                           color.name === 'Blue' ? shade === '50' ? '#eff6ff' : shade === '100' ? '#dbeafe' : shade === '500' ? '#3b82f6' : '#2563eb' :
                                           color.name === 'Green' ? '#22c55e' :
                                           color.name === 'Red/Orange' ? shade.includes('Orange') ? '#f97316' : '#ef4444' :
                                           color.name === 'Amber' ? shade === '50' ? '#fffbeb' : shade === '200' ? '#fde68a' : shade === '500' ? '#f59e0b' : '#d97706' :
                                           shade === '50' ? '#f9fafb' : shade === '100' ? '#f3f4f6' : shade === '600' ? '#4b5563' : '#111827'
                          }}
                          title={shade}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">{color.usage}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Typography */}
          <Card>
            <CardHeader>
              <CardTitle>Typography Scale</CardTitle>
              <CardDescription>Text styles and hierarchy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {typography.map((type, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-semibold text-gray-900">{type.element}</div>
                      <Badge variant="outline">{type.weight}</Badge>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      Size: <code className="bg-gray-100 px-2 py-0.5 rounded">{type.size}</code>
                    </div>
                    <p className="text-sm text-gray-600">{type.usage}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Layout Specifications */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl mb-3 text-gray-900">Layout Specifications</h2>
            <p className="text-lg text-gray-600">Spacing, sizing, and responsive behavior</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Container Widths</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Max Width:</span>
                    <code className="bg-purple-100 px-2 py-1 rounded text-purple-700">7xl (1280px)</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Padding:</span>
                    <code className="bg-purple-100 px-2 py-1 rounded text-purple-700">4-8 units</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gutter:</span>
                    <code className="bg-purple-100 px-2 py-1 rounded text-purple-700">24-32px</code>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spacing System</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Section Padding:</span>
                    <code className="bg-purple-100 px-2 py-1 rounded text-purple-700">py-12 / py-16</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Card Gap:</span>
                    <code className="bg-purple-100 px-2 py-1 rounded text-purple-700">gap-4 / gap-6</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Element Margin:</span>
                    <code className="bg-purple-100 px-2 py-1 rounded text-purple-700">mb-4 / mb-6</code>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Border Radius</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cards:</span>
                    <code className="bg-purple-100 px-2 py-1 rounded text-purple-700">rounded-lg</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Buttons:</span>
                    <code className="bg-purple-100 px-2 py-1 rounded text-purple-700">rounded-md</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Badges:</span>
                    <code className="bg-purple-100 px-2 py-1 rounded text-purple-700">rounded-full</code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interaction States */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl mb-3 text-gray-900">Interaction States</h2>
          <p className="text-lg text-gray-600">Hover, active, and focus states</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Buttons & Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-gray-50 rounded">
                  <strong className="text-gray-900">Hover:</strong>
                  <p className="text-gray-600 mt-1">Darker gradient, slight scale (1.05), shadow increase</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <strong className="text-gray-900">Active/Tap:</strong>
                  <p className="text-gray-600 mt-1">Scale down (0.95), darker color</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <strong className="text-gray-900">Disabled:</strong>
                  <p className="text-gray-600 mt-1">Reduced opacity (0.5), cursor not-allowed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cards & Containers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-gray-50 rounded">
                  <strong className="text-gray-900">Hover:</strong>
                  <p className="text-gray-600 mt-1">Shadow-lg, border color change (purple-200)</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <strong className="text-gray-900">Selected/Active:</strong>
                  <p className="text-gray-600 mt-1">Purple/Pink background, colored text</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <strong className="text-gray-900">Transitions:</strong>
                  <p className="text-gray-600 mt-1">All transitions: 200-300ms, ease-in-out</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Accessibility */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl mb-6">Accessibility Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl mb-3">Color Contrast</h3>
                <p className="text-purple-100">All text meets WCAG AA standards (4.5:1 minimum)</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl mb-3">Keyboard Navigation</h3>
                <p className="text-purple-100">Full keyboard support with visible focus states</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl mb-3">Screen Readers</h3>
                <p className="text-purple-100">Semantic HTML with proper ARIA labels</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
