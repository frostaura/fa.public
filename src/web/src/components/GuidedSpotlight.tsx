import { useState } from 'react';

import type { GuidedSpotlightItem } from '../content/siteContent';
import { StepperIndicator } from './StepperIndicator';

interface GuidedSpotlightProps {
  heading: string;
  intro?: string;
  items: GuidedSpotlightItem[];
}

export function GuidedSpotlight({ heading, intro, items }: GuidedSpotlightProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];

  return (
    <section className="guided-spotlight" aria-label={heading}>
      <div className="guided-spotlight-head">
        <div>
          <h3>{heading}</h3>
        </div>
        {intro ? <p className="section-copy">{intro}</p> : null}
      </div>

      <div className="guided-tabs" role="tablist" aria-label={heading}>
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            className={`guided-tab ${index === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <StepperIndicator
        count={items.length}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
        ariaLabel={`${heading} progress`}
      />

      <div className="guided-panel" role="tabpanel" aria-live="polite">
        <div className="guided-copy">
          <p className="guided-label">{activeItem.label}</p>
          <h4>{activeItem.title}</h4>
          <p>{activeItem.summary}</p>
          <div className="compact-list">
            {activeItem.points.map((point) => (
              <div key={point} className="compact-item">
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="tag-row">
          {activeItem.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
