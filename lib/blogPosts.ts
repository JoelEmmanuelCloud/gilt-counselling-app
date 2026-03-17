export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  isoDate: string;
  readTime: string;
  author: string;
  image: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'understanding-teen-anxiety',
    title: 'Understanding Teen Anxiety: Signs and Support Strategies',
    excerpt: 'Learn to recognize the signs of anxiety in teenagers and discover practical ways to provide support and encouragement.',
    category: 'Teen Development',
    date: 'December 15, 2024',
    isoDate: '2024-12-15',
    readTime: '5 min read',
    author: 'Gilt Counselling Consult',
    image: '/images/blog/teen-anxiety.jpg',
    content: `
      <p class="body-lg mb-6">Anxiety in teenagers is more common than many parents realize. The teenage years bring significant changes—physical, emotional, and social—that can trigger feelings of worry and stress.</p>

      <h2 class="heading-sm mt-8 mb-4">Recognizing the Signs</h2>
      <p class="body-md mb-4">Teen anxiety can manifest in various ways:</p>
      <ul class="list-disc list-inside space-y-2 mb-6 text-gray-700">
        <li>Excessive worry about school, friendships, or the future</li>
        <li>Physical symptoms like headaches, stomach aches, or fatigue</li>
        <li>Avoidance of social situations or activities they once enjoyed</li>
        <li>Difficulty concentrating or sleeping</li>
        <li>Irritability or mood swings</li>
      </ul>

      <h2 class="heading-sm mt-8 mb-4">How to Provide Support</h2>
      <p class="body-md mb-4">As a parent or caregiver, you can make a significant difference:</p>

      <h3 class="font-heading font-semibold text-lg mt-6 mb-3">1. Create a Safe Space for Conversation</h3>
      <p class="body-md mb-4">Let your teen know that it's okay to talk about their worries without fear of judgment. Sometimes just listening without trying to "fix" everything can be incredibly powerful.</p>

      <h3 class="font-heading font-semibold text-lg mt-6 mb-3">2. Validate Their Feelings</h3>
      <p class="body-md mb-4">Avoid dismissing their concerns as "just teenage drama." Their feelings are real and deserve to be acknowledged, even if the situation seems minor from an adult perspective.</p>

      <h3 class="font-heading font-semibold text-lg mt-6 mb-3">3. Encourage Healthy Coping Strategies</h3>
      <p class="body-md mb-4">Help them discover what works for them—whether it's exercise, creative expression, journaling, or spending time in nature. Different strategies work for different people.</p>

      <h3 class="font-heading font-semibold text-lg mt-6 mb-3">4. Model Good Self-Care</h3>
      <p class="body-md mb-4">Teens learn by watching. Show them how you manage your own stress in healthy ways.</p>

      <h3 class="font-heading font-semibold text-lg mt-6 mb-3">5. Know When to Seek Professional Help</h3>
      <p class="body-md mb-6">If anxiety is interfering with daily life, school performance, or relationships, it may be time to consult a professional counselor who specializes in adolescent mental health.</p>

      <h2 class="heading-sm mt-8 mb-4">You're Not Alone</h2>
      <p class="body-md mb-4">Many families navigate teen anxiety, and support is available. Professional counseling can provide your teen with tools to manage anxiety effectively and build resilience for the future.</p>

      <p class="body-md">Remember: seeking help is a sign of strength, not weakness. It shows your teen that taking care of mental health is just as important as physical health.</p>
    `,
  },
  {
    slug: 'support-mental-health-daily',
    title: '5 Ways to Support Your Mental Health Daily',
    excerpt: 'Small, consistent practices that can make a big difference in your emotional wellbeing and resilience.',
    category: 'Mental Health',
    date: 'December 10, 2024',
    isoDate: '2024-12-10',
    readTime: '4 min read',
    author: 'Gilt Counselling Consult',
    image: '/images/blog/mental-health.jpg',
    content: `
      <p class="body-lg mb-6">Mental health isn't just about addressing problems when they arise—it's about building daily practices that strengthen your emotional resilience and wellbeing.</p>

      <h2 class="heading-sm mt-8 mb-4">1. Start with Morning Intentions</h2>
      <p class="body-md mb-6">Before checking your phone or diving into the day's demands, take five minutes to set an intention. What do you want to bring to today? How do you want to show up for yourself and others?</p>

      <h2 class="heading-sm mt-8 mb-4">2. Move Your Body</h2>
      <p class="body-md mb-6">Physical activity isn't just good for your body—it's essential for mental health. Even a 10-minute walk can shift your mood and clear your mind. Find movement that feels good to you, not punishing.</p>

      <h2 class="heading-sm mt-8 mb-4">3. Practice Gratitude</h2>
      <p class="body-md mb-6">Taking a moment each day to acknowledge what you're grateful for can shift your perspective and reduce stress. Write down three things, share them with someone, or simply pause to appreciate them.</p>

      <h2 class="heading-sm mt-8 mb-4">4. Set Boundaries with Technology</h2>
      <p class="body-md mb-6">Constant connectivity can be exhausting. Designate tech-free times, especially before bed. Your mental space needs protection from the endless scroll of information and comparison.</p>

      <h2 class="heading-sm mt-8 mb-4">5. Connect with Others</h2>
      <p class="body-md mb-6">Meaningful connection is vital for mental health. Reach out to someone you care about—a quick text, a phone call, or meeting for coffee. We're not meant to navigate life alone.</p>

      <p class="body-md mt-8">These practices won't eliminate life's challenges, but they can help you face them from a place of greater strength and stability. Start small—even one of these practices can make a difference.</p>
    `,
  },
  {
    slug: 'building-resilience-young-people',
    title: 'Building Resilience in Young People',
    excerpt: "How to help teens and youths develop the inner strength to navigate life's challenges with confidence.",
    category: 'Teen Development',
    date: 'December 5, 2024',
    isoDate: '2024-12-05',
    readTime: '6 min read',
    author: 'Gilt Counselling Consult',
    image: '/images/blog/resilience.jpg',
    content: `
      <p class="body-lg mb-6">Resilience—the ability to bounce back from setbacks—isn't something you either have or don't have. It's a skill that can be learned and strengthened over time.</p>

      <h2 class="heading-sm mt-8 mb-4">What is Resilience?</h2>
      <p class="body-md mb-6">Resilience doesn't mean avoiding difficulties or never feeling overwhelmed. It means developing the inner resources to navigate challenges, learn from them, and emerge stronger.</p>

      <h2 class="heading-sm mt-8 mb-4">How to Foster Resilience</h2>

      <h3 class="font-heading font-semibold text-lg mt-6 mb-3">Encourage Problem-Solving</h3>
      <p class="body-md mb-4">When young people face challenges, resist the urge to immediately solve the problem for them. Instead, guide them through the process of finding solutions themselves.</p>

      <h3 class="font-heading font-semibold text-lg mt-6 mb-3">Normalize Failure</h3>
      <p class="body-md mb-4">Reframe mistakes as learning opportunities rather than disasters. Share your own experiences of failure and what you learned from them.</p>

      <h3 class="font-heading font-semibold text-lg mt-6 mb-3">Build Strong Relationships</h3>
      <p class="body-md mb-4">Having supportive relationships is one of the most important factors in resilience. Help young people develop healthy friendships and maintain family connections.</p>

      <h3 class="font-heading font-semibold text-lg mt-6 mb-3">Teach Emotional Awareness</h3>
      <p class="body-md mb-4">Help them identify and name their emotions. Understanding what they're feeling is the first step to managing it effectively.</p>

      <h3 class="font-heading font-semibold text-lg mt-6 mb-3">Celebrate Effort, Not Just Outcomes</h3>
      <p class="body-md mb-6">Praise the process—the hard work, persistence, and courage—not just the end result. This builds a growth mindset.</p>

      <p class="body-md mt-8">Building resilience takes time and practice. Be patient with the process, and remember that every challenge overcome is an opportunity for growth.</p>
    `,
  },
  {
    slug: 'family-communication-safe-spaces',
    title: 'Family Communication: Creating Safe Spaces for Difficult Conversations',
    excerpt: 'Practical tips for fostering open, honest dialogue within your family, even about tough topics.',
    category: 'Family',
    date: 'November 28, 2024',
    isoDate: '2024-11-28',
    readTime: '5 min read',
    author: 'Gilt Counselling Consult',
    image: '/images/blog/family-communication.jpg',
    content: `
      <p class="body-lg mb-6">Difficult conversations are inevitable in every family. What matters is whether your family has the tools and the trust to navigate them together.</p>

      <h2 class="heading-sm mt-8 mb-4">Why Safe Spaces Matter</h2>
      <p class="body-md mb-6">When family members feel safe to express themselves without fear of judgment, ridicule, or dismissal, they are more likely to share early—before small problems become big ones. Safety in communication is the foundation of a healthy family.</p>

      <h2 class="heading-sm mt-8 mb-4">Practical Tips for Open Dialogue</h2>

      <h3 class="font-heading font-semibold text-lg mt-6 mb-3">1. Choose the Right Time and Place</h3>
      <p class="body-md mb-4">Avoid important conversations when anyone is hungry, tired, or rushed. A calm, private setting signals that you're taking the conversation seriously.</p>

      <h3 class="font-heading font-semibold text-lg mt-6 mb-3">2. Listen More Than You Speak</h3>
      <p class="body-md mb-4">Resist the urge to fix, advise, or defend. Simply hearing someone out—without interruption—is one of the most powerful gifts you can offer.</p>

      <h3 class="font-heading font-semibold text-lg mt-6 mb-3">3. Use "I" Statements</h3>
      <p class="body-md mb-4">Say "I feel worried when..." rather than "You always..." This reduces defensiveness and keeps the focus on feelings rather than blame.</p>

      <h3 class="font-heading font-semibold text-lg mt-6 mb-3">4. Follow Through</h3>
      <p class="body-md mb-6">Trust is built through consistency. If your child shares something difficult and you respond with care, they'll come to you again. If you dismiss or punish, they'll stop sharing.</p>

      <p class="body-md mt-8">Creating a culture of open communication takes time, but the investment is immeasurable. Families that talk together, heal together.</p>
    `,
  },
  {
    slug: 'when-to-seek-counselling',
    title: 'When to Seek Professional Counselling: A Guide for Parents',
    excerpt: 'Understanding the signs that your child or teen might benefit from professional support.',
    category: 'Parenting',
    date: 'November 20, 2024',
    isoDate: '2024-11-20',
    readTime: '7 min read',
    author: 'Gilt Counselling Consult',
    image: '/images/blog/counselling.jpg',
    content: `
      <p class="body-lg mb-6">As a parent, knowing when to seek outside help for your child can be one of the most challenging—and most loving—decisions you make.</p>

      <h2 class="heading-sm mt-8 mb-4">Signs That Professional Support May Be Needed</h2>

      <h3 class="font-heading font-semibold text-lg mt-6 mb-3">Persistent Mood Changes</h3>
      <p class="body-md mb-4">If your child has been consistently sad, irritable, or withdrawn for more than two weeks, it's worth exploring with a professional. Brief mood changes are normal; prolonged ones often aren't.</p>

      <h3 class="font-heading font-semibold text-lg mt-6 mb-3">Declining School Performance</h3>
      <p class="body-md mb-4">A sudden drop in grades or increasing school refusal can signal underlying emotional difficulties that need attention beyond academic support.</p>

      <h3 class="font-heading font-semibold text-lg mt-6 mb-3">Withdrawal from Friends and Activities</h3>
      <p class="body-md mb-4">When a previously social child stops engaging with friends or hobbies they once loved, it's an important signal to pay attention to.</p>

      <h3 class="font-heading font-semibold text-lg mt-6 mb-3">Changes in Sleep or Eating</h3>
      <p class="body-md mb-4">Significant changes in appetite or sleep patterns—especially when combined with other warning signs—may indicate emotional distress.</p>

      <h3 class="font-heading font-semibold text-lg mt-6 mb-3">Expressions of Hopelessness</h3>
      <p class="body-md mb-6">Any statements about not wanting to be here, feeling hopeless, or harming themselves should be taken seriously and addressed immediately with a professional.</p>

      <h2 class="heading-sm mt-8 mb-4">It's Okay to Ask for Help</h2>
      <p class="body-md mb-6">Seeking counselling for your child is not a sign of failure—it's a sign of attentiveness and love. Early intervention almost always leads to better outcomes.</p>

      <p class="body-md">If you're unsure whether professional help is needed, trust your instincts. A consultation costs little, and the peace of mind—or the help received—is invaluable.</p>
    `,
  },
  {
    slug: 'self-care-not-selfish',
    title: 'Self-Care is Not Selfish: A Message for Caregivers',
    excerpt: 'Why taking care of yourself is essential to being able to care for others effectively.',
    category: 'Self-Care',
    date: 'November 15, 2024',
    isoDate: '2024-11-15',
    readTime: '4 min read',
    author: 'Gilt Counselling Consult',
    image: '/images/blog/self-care.jpg',
    content: `
      <p class="body-lg mb-6">If you've ever been on an aeroplane, you've heard it: "Please put on your own oxygen mask before assisting others." This isn't selfishness—it's survival wisdom. The same principle applies to caregiving.</p>

      <h2 class="heading-sm mt-8 mb-4">The Caregiver's Dilemma</h2>
      <p class="body-md mb-6">Caregivers—parents, teachers, counsellors, spouses—often put everyone else first. This generosity is admirable, but it has a cost. Burnout doesn't just hurt you; it diminishes your ability to care for the very people you love.</p>

      <h2 class="heading-sm mt-8 mb-4">What Self-Care Actually Looks Like</h2>
      <p class="body-md mb-4">Self-care isn't always spa days and bubble baths. For most caregivers, it's simpler and more urgent:</p>
      <ul class="list-disc list-inside space-y-2 mb-6 text-gray-700">
        <li>Getting enough sleep</li>
        <li>Eating regular, nourishing meals</li>
        <li>Having at least one hour each week that is genuinely yours</li>
        <li>Saying no to one unnecessary commitment</li>
        <li>Asking for help when you need it</li>
      </ul>

      <h2 class="heading-sm mt-8 mb-4">Reframing the Narrative</h2>
      <p class="body-md mb-6">Many caregivers feel guilty for prioritising themselves. But consider this: when you are rested, emotionally regulated, and well, you show up differently. Your presence is calmer, your patience is greater, and your capacity to give is replenished.</p>

      <p class="body-md">You cannot pour from an empty cup. Taking care of yourself is, ultimately, taking care of everyone who depends on you.</p>
    `,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
