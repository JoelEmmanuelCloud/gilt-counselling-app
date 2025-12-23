import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function ServiceCard({
  title,
  description,
  icon,
  className = ''
}: ServiceCardProps) {
  return (
    <div className={`card group ${className}`}>
      {icon && (
        <div className="mb-4 text-soft-gold">
          {icon}
        </div>
      )}
      <h3 className="heading-sm mb-3 group-hover:text-soft-gold transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
