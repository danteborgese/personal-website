'use client';

import { useState, useEffect, ReactNode } from 'react';

interface ListItem {
  id: string;
  category: string;
  title: string;
  location: string;
  content: ReactNode;
}

interface ExpandableListProps {
  items: ListItem[];
  headers?: {
    category: string;
    title: string;
    location: string;
  };
}

export default function ExpandableList({
  items,
  headers = { category: 'CATEGORY', title: 'SECTION', location: 'TYPE' }
}: ExpandableListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Listen to hash changes and expand matching item
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the #
      const matchingItem = items.find(item => item.id === hash);
      
      if (hash && matchingItem) {
        setExpandedId(hash);
        // Scroll to position the header at the top after a delay to allow section scroll and expansion to start
        setTimeout(() => {
          const headerElement = document.querySelector('.expandable-list-header');
          
          if (headerElement) {
            // Get the header's position relative to the document
            const headerRect = headerElement.getBoundingClientRect();
            const currentScrollY = window.scrollY;
            
            // Calculate scroll position to put header at the top of viewport
            // Account for any sticky navbar (navbar is sticky, so it will be at top: 0)
            const targetScrollY = currentScrollY + headerRect.top;
            window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
          }
        }, 300);
      }
    };

    // Custom event handler for when hash is already set
    const handleExpandableHash = (e: CustomEvent) => {
      const hash = e.detail?.hash || window.location.hash.slice(1);
      const matchingItem = items.find(item => item.id === hash);
      
      if (hash && matchingItem) {
        setExpandedId(hash);
        setTimeout(() => {
          const headerElement = document.querySelector('.expandable-list-header');
          
          if (headerElement) {
            const headerRect = headerElement.getBoundingClientRect();
            const currentScrollY = window.scrollY;
            const targetScrollY = currentScrollY + headerRect.top;
            window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
          }
        }, 300);
      }
    };

    // Check hash on mount
    handleHashChange();

    // Listen to hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Listen to custom event for when hash is already set
    window.addEventListener('expandable-hash', handleExpandableHash as EventListener);
    
    // Also listen to popstate for browser back/forward
    window.addEventListener('popstate', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('expandable-hash', handleExpandableHash as EventListener);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [items]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="expandable-list">
      {/* Header Row */}
      <div className="expandable-list-header">
        <span className="header-category">{headers.category}</span>
        <span className="header-title">{headers.title}</span>
        <span className="header-location">{headers.location}</span>
        <span className="header-action"></span>
      </div>

      {/* List Items */}
      <div className="expandable-list-body">
        {items.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div key={item.id} className="expandable-list-item">
              <div
                className={`expandable-list-row ${isExpanded ? 'row-expanded' : ''}`}
                onClick={() => toggleExpand(item.id)}
                data-expandable-id={item.id}
              >
                <div className="row-category">
                  <span className="category-badge">{item.category}</span>
                </div>
                <div className="row-title">
                  <h3>{item.title}</h3>
                </div>
                <div className="row-location">
                  <span>{item.location}</span>
                </div>
                <div className="row-arrow">
                  <span className={`list-arrow ${isExpanded ? 'arrow-rotated' : ''}`}>
                    →
                  </span>
                </div>
              </div>

              <div className={`expandable-content ${isExpanded ? 'content-open' : ''}`}>
                <div className="expandable-content-inner">
                  {item.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
