'use client';

import React from 'react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Get In Touch</h1>
          <p className="text-xl text-gray-600">We're here to help. Reach out to us today!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gilt-gold mb-3">Nigeria Office</h3>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-start">
                  <span className="font-semibold mr-2">📍</span>
                  <span>88 Woji road, Vineyard Building<br />GRA Phase 2, Port Harcourt<br />Rivers State, Nigeria</span>
                </p>
                <p className="flex items-center">
                  <span className="font-semibold mr-2">📞</span>
                  <span>
                    +234 803 309 4050<br />
                    +234 706 573 4165<br />
                    +234 806 211 5372
                  </span>
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gilt-gold mb-3">Overseas Office</h3>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-start">
                  <span className="font-semibold mr-2">📍</span>
                  <span>470 Front St W Toronto<br />Ontario M5V 0V6<br />Canada</span>
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gilt-gold/10 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Office Hours</h3>
              <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
              <p className="text-gray-600">Sunday: Closed</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-transparent"
                  placeholder="+234 xxx xxx xxxx"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gilt-gold focus:border-transparent"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gilt-gold text-white py-3 rounded-lg font-semibold hover:bg-gilt-orange transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
