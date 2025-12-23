import React from 'react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const services = [
    {
      title: 'Mental Health & Emotional Wellness',
      description: 'Professional support for mental health challenges and emotional well-being.',
      icon: '🧠'
    },
    {
      title: 'Educational Consulting',
      description: 'Expert guidance on educational planning and academic success strategies.',
      icon: '📚'
    },
    {
      title: 'School Counselling Consult',
      description: 'Specialized counselling services for schools and educational institutions.',
      icon: '🏫'
    },
    {
      title: 'Academic and Career Counselling',
      description: 'Navigate your academic journey and plan your career path with confidence.',
      icon: '🎯'
    },
    {
      title: 'Youth Counselling, Life Skills & Mentoring',
      description: 'Empower young people with essential life skills and mentorship.',
      icon: '🌟'
    },
    {
      title: 'Parenting & Special Needs Support',
      description: 'Comprehensive support for parents and families with special needs children.',
      icon: '👨‍👩‍👧'
    },
    {
      title: 'Organizational Staff Training',
      description: 'Professional development and training programs for organizations.',
      icon: '💼'
    },
    {
      title: 'Group Therapy, Outreach & Advocacy',
      description: 'Community-based therapy, outreach programs, and advocacy services.',
      icon: '🤝'
    },
    {
      title: 'Online Counselling',
      description: 'Convenient and confidential counselling sessions from anywhere.',
      icon: '💻'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive counselling and consulting services designed to empower and support your journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link
                to="/book-appointment"
                className="text-gilt-gold hover:text-gilt-orange font-semibold"
              >
                Book Now →
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gilt-gold rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-white/90 mb-6">
            Book your appointment today and begin your journey to optimal development.
          </p>
          <Link
            to="/book-appointment"
            className="inline-block bg-white text-gilt-gold px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
