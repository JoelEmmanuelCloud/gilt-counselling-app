import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gilt-gold mb-4">Gilt Counselling Consult</h3>
            <p className="text-gray-400 text-sm">
              Empowering teens & youths for optimal development.
            </p>
            <div className="mt-4 flex space-x-2">
              <span className="bg-gilt-blue text-white px-3 py-1 text-xs rounded">Joy</span>
              <span className="bg-gilt-green text-white px-3 py-1 text-xs rounded">Optimism</span>
              <span className="bg-gilt-gold text-white px-3 py-1 text-xs rounded">Integrity</span>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact (Nigeria)</h4>
            <p className="text-gray-400 text-sm mb-2">
              88 Woji road, Vineyard Building<br />
              GRA Phase 2, Port Harcourt<br />
              Rivers State, Nigeria
            </p>
            <p className="text-gray-400 text-sm">
              +234 803 309 4050<br />
              +234 706 573 4165<br />
              +234 806 211 5372
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Overseas</h4>
            <p className="text-gray-400 text-sm mb-2">
              470 Front St W Toronto<br />
              Ontario M5V 0V6<br />
              Canada
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Gilt Counselling Consult. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
