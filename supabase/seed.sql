-- Seed data for MindSpace
-- Run this after setting up the schema

-- Insert sample resources
INSERT INTO resources (category, title, description, content, author, read_time, helpful_count) VALUES
('anxiety', 'Understanding Anxiety: A Student''s Guide', 'Learn about anxiety symptoms, triggers, and coping strategies specifically for students.', 
'Anxiety is a normal response to stress, but when it becomes overwhelming, it can interfere with daily life. This guide helps students understand the difference between normal stress and anxiety disorders...', 
'Dr. Sarah Johnson', 10, 245),

('anxiety', 'Breathing Techniques for Panic Attacks', 'Simple breathing exercises you can use anywhere to manage panic attacks.',
'When you feel a panic attack coming on, try the 4-7-8 breathing technique: Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds...', 
'Dr. Michael Chen', 5, 189),

('depression', 'Recognizing Depression in College', 'Signs and symptoms of depression that college students should watch for.',
'Depression can manifest differently in students. Watch for changes in sleep patterns, grades, social withdrawal, and loss of interest in activities...', 
'Dr. Emily Rodriguez', 8, 302),

('depression', 'Building a Routine for Better Mental Health', 'How establishing daily routines can help manage depression.',
'Structure and routine provide a sense of control and normalcy. Start small with consistent wake times, meals, and exercise...', 
'Dr. David Kim', 7, 156),

('stress', 'Managing Academic Stress', 'Proven strategies for handling exam pressure and assignment deadlines.',
'Break large tasks into smaller chunks, use the Pomodoro technique, and prioritize self-care during high-stress periods...', 
'Dr. Lisa Thompson', 6, 421),

('stress', 'Time Management for Students', 'Effective time management techniques to reduce stress and improve productivity.',
'Use time-blocking, prioritize tasks with the Eisenhower Matrix, and learn to say no to maintain balance...', 
'Dr. James Martinez', 9, 278),

('wellbeing', 'The Importance of Sleep for Mental Health', 'How quality sleep affects your mood, focus, and overall wellbeing.',
'Sleep and mental health are closely connected. Aim for 7-9 hours, maintain a consistent schedule, and create a relaxing bedtime routine...', 
'Dr. Rachel Green', 8, 334),

('wellbeing', 'Exercise and Mental Health', 'The powerful connection between physical activity and emotional wellbeing.',
'Regular exercise releases endorphins, reduces stress hormones, and improves self-esteem. Even 20 minutes of daily movement helps...', 
'Dr. Tom Anderson', 7, 267),

('sleep', 'Creating a Sleep-Friendly Environment', 'Tips for optimizing your bedroom for better sleep quality.',
'Keep your room cool (65-68°F), dark, and quiet. Remove electronics, invest in comfortable bedding, and use your bed only for sleep...', 
'Dr. Maria Santos', 6, 198),

('sleep', 'Breaking the Cycle of Insomnia', 'Cognitive behavioral techniques for overcoming persistent sleep problems.',
'Challenge anxious thoughts about sleep, establish a wind-down routine, and avoid napping during the day...', 
'Dr. Kevin Wong', 10, 223);

-- Insert sample assessments
INSERT INTO assessments (title, description, category, questions) VALUES
('Generalized Anxiety Disorder (GAD-7)', 'A brief screening tool for anxiety symptoms', 'anxiety', 
'[
  {"id": 1, "text": "Feeling nervous, anxious, or on edge", "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]},
  {"id": 2, "text": "Not being able to stop or control worrying", "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]},
  {"id": 3, "text": "Worrying too much about different things", "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]},
  {"id": 4, "text": "Trouble relaxing", "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]},
  {"id": 5, "text": "Being so restless that it is hard to sit still", "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]},
  {"id": 6, "text": "Becoming easily annoyed or irritable", "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]},
  {"id": 7, "text": "Feeling afraid, as if something awful might happen", "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]}
]'::jsonb),

('Patient Health Questionnaire (PHQ-9)', 'Screening tool for depression severity', 'depression',
'[
  {"id": 1, "text": "Little interest or pleasure in doing things", "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]},
  {"id": 2, "text": "Feeling down, depressed, or hopeless", "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]},
  {"id": 3, "text": "Trouble falling or staying asleep, or sleeping too much", "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]},
  {"id": 4, "text": "Feeling tired or having little energy", "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]},
  {"id": 5, "text": "Poor appetite or overeating", "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]},
  {"id": 6, "text": "Feeling bad about yourself or that you are a failure", "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]},
  {"id": 7, "text": "Trouble concentrating on things", "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]},
  {"id": 8, "text": "Moving or speaking slowly, or being fidgety or restless", "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]},
  {"id": 9, "text": "Thoughts that you would be better off dead or hurting yourself", "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]}
]'::jsonb),

('Stress Level Assessment', 'Evaluate your current stress levels', 'stress',
'[
  {"id": 1, "text": "How often have you felt overwhelmed by your workload?", "options": ["Never", "Rarely", "Sometimes", "Often", "Always"]},
  {"id": 2, "text": "Do you have difficulty sleeping due to stress?", "options": ["Never", "Rarely", "Sometimes", "Often", "Always"]},
  {"id": 3, "text": "How often do you feel unable to cope with demands?", "options": ["Never", "Rarely", "Sometimes", "Often", "Always"]},
  {"id": 4, "text": "Do you experience physical symptoms of stress (headaches, tension)?", "options": ["Never", "Rarely", "Sometimes", "Often", "Always"]},
  {"id": 5, "text": "How often do you feel irritable or short-tempered?", "options": ["Never", "Rarely", "Sometimes", "Often", "Always"]}
]'::jsonb);

-- Insert sample support groups
INSERT INTO support_groups (name, description, category, member_count, is_active) VALUES
('Anxiety Support Circle', 'A safe space for students dealing with anxiety to share experiences and coping strategies.', 'anxiety', 127, true),
('Depression Peer Support', 'Connect with others who understand what you''re going through. Share, listen, and heal together.', 'depression', 98, true),
('Academic Stress Management', 'Discuss strategies for managing exam stress, assignment deadlines, and academic pressure.', 'stress', 156, true),
('Mindfulness & Meditation', 'Practice mindfulness techniques and meditation together. Beginners welcome!', 'wellbeing', 203, true),
('Sleep Support Group', 'For students struggling with insomnia or sleep-related issues. Share tips and find solutions.', 'sleep', 74, true),
('LGBTQ+ Mental Health', 'A supportive community for LGBTQ+ students navigating mental health challenges.', 'general', 89, true),
('International Students Support', 'Support group for international students dealing with cultural adjustment and homesickness.', 'general', 112, true),
('Grief & Loss Support', 'A compassionate space for students coping with loss and grief.', 'general', 45, true);

-- Insert sample crisis resources
INSERT INTO crisis_resources (title, type, phone, description, availability, is_emergency) VALUES
('National Suicide Prevention Lifeline', 'hotline', '988', 'Free and confidential support for people in distress, 24/7', '24/7', true),
('Crisis Text Line', 'text', '741741', 'Text HOME to 741741 to connect with a Crisis Counselor', '24/7', true),
('SAMHSA National Helpline', 'hotline', '1-800-662-4357', 'Treatment referral and information service for mental health and substance abuse', '24/7', false),
('Trevor Project (LGBTQ Youth)', 'hotline', '1-866-488-7386', 'Crisis intervention and suicide prevention services for LGBTQ young people', '24/7', true),
('Veterans Crisis Line', 'hotline', '988 (Press 1)', 'Support for veterans and their families', '24/7', true),
('NAMI HelpLine', 'hotline', '1-800-950-6264', 'Information, referrals, and support for mental health questions', 'Mon-Fri 10am-10pm ET', false),
('Campus Counseling Center', 'in-person', '', 'Free counseling services for enrolled students. Schedule appointments online.', 'Mon-Fri 9am-5pm', false),
('Emergency Services', 'emergency', '911', 'For immediate medical or psychiatric emergencies', '24/7', true);

-- Insert sample forum topics
INSERT INTO forum_topics (title, content, author_id, author_name, category, views, replies_count) VALUES
('How do you manage exam anxiety?', 'Finals are coming up and I''m really struggling with anxiety. What techniques have helped you?', 
(SELECT id FROM auth.users LIMIT 1), 'Anonymous Student', 'anxiety', 234, 12),

('Feeling overwhelmed - need advice', 'I''m juggling too many responsibilities and feeling burned out. How do you prioritize and find balance?', 
(SELECT id FROM auth.users LIMIT 1), 'Stressed Junior', 'stress', 189, 8),

('Success story: Overcoming depression', 'I wanted to share my journey of recovery to give others hope. It does get better!', 
(SELECT id FROM auth.users LIMIT 1), 'Hopeful Senior', 'depression', 456, 23);

-- Insert sample events
INSERT INTO events (title, description, date, time, location, type, organizer_id, attendee_count, max_attendees) VALUES
('Mindfulness Meditation Workshop', 'Learn basic mindfulness techniques to reduce stress and anxiety. No experience needed!', 
'2026-04-05', '18:00:00', 'Student Wellness Center, Room 201', 'Workshop', 
(SELECT id FROM auth.users LIMIT 1), 0, 30),

('Mental Health Awareness Walk', 'Join us for a community walk to raise awareness about mental health. All are welcome!', 
'2026-04-12', '10:00:00', 'Campus Green', 'Event', 
(SELECT id FROM auth.users LIMIT 1), 0, 200),

('Art Therapy Session', 'Express yourself through creative art in a supportive environment. All materials provided.', 
'2026-04-08', '15:30:00', 'Creative Arts Building', 'Workshop', 
(SELECT id FROM auth.users LIMIT 1), 0, 20),

('Anxiety Support Group Meeting', 'Weekly meeting for students dealing with anxiety. Share experiences and coping strategies.', 
'2026-04-02', '19:00:00', 'Virtual (Zoom link provided)', 'Support Group', 
(SELECT id FROM auth.users LIMIT 1), 0, 50);
