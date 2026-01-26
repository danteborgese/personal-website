'use client';

import { useState } from 'react';
import { WobbleCard } from './ui/wobble-card';
import WorkContent from './WorkContent';
import ContentContent from './ContentContent';
import InterestsContent from './InterestsContent';
import LibraryContent from './LibraryContent';

type SectionId = 'work' | 'content' | 'interests' | 'library' | null;

const sectionConfig = {
  work: {
    title: 'Work',
    gradientColors: ['#2563EB', '#1E40AF', '#1E3A8A'],
  },
  content: {
    title: 'Content',
    gradientColors: ['#7C3AED', '#6D28D9', '#5B21B6'],
  },
  interests: {
    title: 'Interests & Hobbies',
    gradientColors: ['#EA580C', '#DC2626', '#B91C1C'],
  },
  library: {
    title: "Dante's Library",
    gradientColors: ['#059669', '#047857', '#065F46'],
  },
};

export default function SectionGrid() {
  const [openSection, setOpenSection] = useState<SectionId>(null);

  const handleCardClick = (sectionId: SectionId) => {
    if (openSection === sectionId) {
      setOpenSection(null);
    } else {
      setOpenSection(sectionId);
    }
  };

  const renderContent = (sectionId: SectionId) => {
    switch (sectionId) {
      case 'work':
        return <WorkContent />;
      case 'content':
        return <ContentContent />;
      case 'interests':
        return <InterestsContent />;
      case 'library':
        return <LibraryContent />;
      default:
        return null;
    }
  };

  return (
    <section className="section-grid-section">
      <div className="container">
        <div className="sections-grid">
          {(Object.keys(sectionConfig) as Array<keyof typeof sectionConfig>).map((sectionId) => {
            const config = sectionConfig[sectionId];
            const isExpanded = openSection === sectionId;
            
            return (
              <div key={sectionId} className="section-card-wrapper">
                <WobbleCard
                  containerClassName="section-grid-card"
                  gradientColors={config.gradientColors}
                  isExpanded={isExpanded}
                  onClick={() => handleCardClick(sectionId)}
                >
                  <div className="wobble-card-header">
                    <h2>
                      {config.title}
                    </h2>
                  </div>
                </WobbleCard>
                {isExpanded && (
                  <div className="expanded-content-container">
                    {renderContent(sectionId)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
