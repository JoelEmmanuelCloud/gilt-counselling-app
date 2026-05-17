'use client';

import React, { useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';

const PHONE_NUMBER = '2347065734165';
const DISPLAY_NUMBER = '+234 706 573 4165';

const services = [
  'Mental Health & Emotional Wellness',
  'Educational Consulting',
  'School Counselling Consult',
  'Academic and Career Counselling',
  'Youth Counselling, Life Skills & Mentoring',
  'Parenting & Special Needs Support',
  'Organizational Staff Training',
  'Group Therapy, Outreach & Advocacy',
  'Online Counselling',
];

export default function BookAppointment() {
  const [selectedService, setSelectedService] = useState('');

  const buildMessage = () => {
    if (selectedService) {
      return encodeURIComponent(
        `Hello, I would like to book a counselling session for *${selectedService}* with Gilt Counselling Consult. Please help me schedule an appointment.`
      );
    }
    return encodeURIComponent(
      'Hello, I would like to book a counselling session with Gilt Counselling Consult. Please help me schedule an appointment.'
    );
  };

  const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${buildMessage()}`;

  return (
    <main className="min-h-screen bg-gray-50 py-8 sm:py-12 md:py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <SectionHeading
          title="Book Your Session"
          subtitle="No forms, no sign-up required — just send our secretary a message on WhatsApp and she'll schedule everything for you."
        />

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8 mt-6 sm:mt-8 md:mt-10">
          
          <div className="mb-8">
            <p className="text-sm font-semibold text-[#8B7355] uppercase tracking-wide mb-3">
              Step 1 — Optional
            </p>
            <p className="text-gray-700 font-medium mb-4">
              Select the service you're interested in to personalise your message:
            </p>
            <div className="grid gap-2">
              {services.map((service) => (
                <button
                  key={service}
                  onClick={() =>
                    setSelectedService(prev => (prev === service ? '' : service))
                  }
                  className={`text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium ${
                    selectedService === service
                      ? 'border-[#8B7355] bg-[#8B7355]/10 text-[#6B5A3E]'
                      : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-[#8B7355]/50'
                  }`}
                >
                  {selectedService === service && (
                    <span className="mr-2 text-[#8B7355]">✓</span>
                  )}
                  {service}
                </button>
              ))}
            </div>
          </div>

          
          <div className="mb-8">
            <p className="text-sm font-semibold text-[#8B7355] uppercase tracking-wide mb-3">
              Step 2
            </p>
            <p className="text-gray-700 font-medium mb-4">
              Tap the button below to open WhatsApp. Our secretary will reply and confirm your appointment time.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-lg py-5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Book via WhatsApp
            </a>
          </div>

          
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm">or prefer to call?</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          
          <a
            href={`tel:${DISPLAY_NUMBER.replace(/\s/g, '')}`}
            className="flex items-center justify-center gap-3 w-full border-2 border-gray-200 hover:border-[#8B7355] text-gray-700 hover:text-[#8B7355] font-semibold text-base py-4 rounded-2xl transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call {DISPLAY_NUMBER}
          </a>
        </div>

        
        <p className="text-center text-gray-500 text-sm mt-6 leading-relaxed">
          Our secretary is available <strong>Monday – Friday, 9 AM – 5 PM</strong>.<br />
          Messages received outside office hours will be attended to the next business day.
        </p>
      </div>
    </main>
  );
}
