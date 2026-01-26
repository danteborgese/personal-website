'use client';

import ExpandableList from './ExpandableList';
import WorkContent from './WorkContent';
import ContentContent from './ContentContent';
import InterestsContent from './InterestsContent';
import LibraryContent from './LibraryContent';

const sections = [
  {
    id: 'work',
    category: 'Career',
    title: 'Work Experience',
    location: 'Professional',
    content: <WorkContent />,
  },
  {
    id: 'content',
    category: 'Media',
    title: 'Content & Creations',
    location: 'Creative',
    content: <ContentContent />,
  },
  {
    id: 'interests',
    category: 'Personal',
    title: 'Interests & Hobbies',
    location: 'Lifestyle',
    content: <InterestsContent />,
  },
  {
    id: 'library',
    category: 'Reading',
    title: "Dante's Library",
    location: 'Knowledge',
    content: <LibraryContent />,
  },
];

export default function SectionGrid() {
  return (
    <section className="expandable-section">
      <div className="expandable-section-container">
        <ExpandableList
          items={sections}
          headers={{
            category: 'CATEGORY',
            title: 'SECTION',
            location: 'TYPE',
          }}
        />
      </div>
    </section>
  );
}
