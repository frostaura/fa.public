import { useEffect, useMemo, useState } from 'react';

import { projectContent } from '../content/siteContent';
import { StepperIndicator } from './StepperIndicator';

export function ProjectCarousel() {
  const [index, setIndex] = useState(0);
  const maxIndex = projectContent.length - 1;
  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );
  const project = projectContent[index];

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setIndex((current) => (current === maxIndex ? 0 : current + 1));
    }, 6500);

    return () => window.clearInterval(interval);
  }, [maxIndex, prefersReducedMotion]);

  return (
    <section className="project-spotlight" aria-label="Projects carousel">
      <div className="project-spotlight-head">
        <div>
          <h3>{project.name}</h3>
          <p className="section-copy">{project.thesis}</p>
        </div>

        <div className="project-controls">
          <button
            type="button"
            className="carousel-nav"
            aria-label="Previous project"
            onClick={() => setIndex((current) => (current === 0 ? maxIndex : current - 1))}
          >
            ←
          </button>
          <div className="project-progress">
            <StepperIndicator
              count={projectContent.length}
              activeIndex={index}
              onSelect={setIndex}
              ariaLabel="Project spotlight progress"
            />
          </div>
          <button
            type="button"
            className="carousel-nav"
            aria-label="Next project"
            onClick={() => setIndex((current) => (current === maxIndex ? 0 : current + 1))}
          >
            →
          </button>
        </div>
      </div>

      <div className="tag-row project-meta">
        <span className="path">{project.company}</span>
        <span className="tag">{project.projectType}</span>
      </div>

      <div className="project-selector" role="tablist" aria-label="Project choices">
        {projectContent.map((item, itemIndex) => (
          <button
            key={item.name}
            type="button"
            role="tab"
            aria-selected={itemIndex === index}
            className={`project-selector-item ${itemIndex === index ? 'active' : ''}`}
            onClick={() => setIndex(itemIndex)}
          >
            <span>{item.company.replace('FrostAura ', '')}</span>
            <strong>{item.name}</strong>
          </button>
        ))}
      </div>
    </section>
  );
}
