'use client';

import { useState, ReactNode } from 'react';
import AuroraText from './AuroraText';

interface CollapsibleSectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

export default function CollapsibleSection({ id, title, children }: CollapsibleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section id={id} className="section collapsible-section">
      <div className="container">
        <button 
          className="section-toggle" 
          onClick={toggle}
          aria-expanded={isExpanded}
        >
          <h2>
            <AuroraText>{title}</AuroraText>
          </h2>
          <span className="chevron" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
        </button>
        <div className={`collapsible-content ${isExpanded ? 'open' : ''}`}>
          {children}
        </div>
      </div>
    </section>
  );
}
