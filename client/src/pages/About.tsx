import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About Gilt Counselling Consult</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering teens & youths for optimal development
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">[About Image Placeholder]</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                At Gilt Counselling Consult, we are dedicated to empowering teens and youths to reach
                their full potential through comprehensive counselling and consulting services.
              </p>
              <p className="text-gray-600 mb-4">
                Our team of experienced professionals provides personalized support in mental health,
                education, career development, and life skills training.
              </p>
              <p className="text-gray-600">
                We believe in creating a safe, inclusive, and supportive environment where every
                individual can thrive and achieve optimal development.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-4 mb-12">
          <div className="bg-gilt-blue text-white p-6 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-2">Joy</h3>
            <p className="text-sm">We bring positivity to every interaction</p>
          </div>
          <div className="bg-gilt-green text-white p-6 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-2">Optimism</h3>
            <p className="text-sm">We believe in potential and possibilities</p>
          </div>
          <div className="bg-gilt-orange text-white p-6 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-2">Confidentiality</h3>
            <p className="text-sm">Your privacy is our priority</p>
          </div>
          <div className="bg-gilt-gold text-white p-6 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-2">Integrity</h3>
            <p className="text-sm">Honest and ethical in all we do</p>
          </div>
          <div className="bg-blue-900 text-white p-6 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-2">Inclusion</h3>
            <p className="text-sm">Welcoming and respectful to all</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gilt-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-white">✓</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Expert Team</h3>
              <p className="text-gray-600">
                Highly qualified professionals with years of experience
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gilt-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-white">✓</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Personalized Care</h3>
              <p className="text-gray-600">
                Tailored solutions to meet your unique needs
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gilt-green rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-white">✓</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Proven Results</h3>
              <p className="text-gray-600">
                Track record of successful outcomes and satisfied clients
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
