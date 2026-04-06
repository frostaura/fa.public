import { useEffect, useMemo, useState } from 'react';

import { projectContent } from '../content/siteContent';
import { StepperIndicator } from './StepperIndicator';

export function ProjectCarousel() {
  const [index, setIndex] = useState(0);
  const [detailMode, setDetailMode] = useState<'role' | 'why' | 'fit'>('role');
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

  const detailContent = {
    role: {
      label: 'Portfolio role',
      text: project.portfolioRole,
    },
    why: {
      label: 'Why now',
      text: project.whyNow,
    },
    fit: {
      label: 'Blueprint fit',
      text: project.blueprint,
    },
  } as const;

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
        <span className="tag">{project.stage}</span>
      </div>

      <div className="signal-grid">
        <article className="signal-card">
          <span>Horizon</span>
          <strong>{project.horizon}</strong>
        </article>
        <article className="signal-card">
          <span>Energy</span>
          <strong>{project.energy}</strong>
        </article>
        <article className="signal-card">
          <span>Placement</span>
          <strong>{project.company.replace('FrostAura ', '')}</strong>
        </article>
      </div>

      <div className="project-insights">
        <article className="project-insight-item">
          <span>Portfolio role</span>
          <p>{project.portfolioRole}</p>
        </article>
        <article className="project-insight-item">
          <span>Why now</span>
          <p>{project.whyNow}</p>
        </article>
        <article className="project-insight-item">
          <span>Blueprint fit</span>
          <p>{project.blueprint}</p>
        </article>
      </div>

      <div className="project-detail-compact">
        <div className="detail-switch project-detail-switch" role="tablist" aria-label="Project detail views">
          <button
            type="button"
            role="tab"
            aria-selected={detailMode === 'role'}
            className={`detail-mode ${detailMode === 'role' ? 'active' : ''}`}
            onClick={() => setDetailMode('role')}
          >
            Role
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={detailMode === 'why'}
            className={`detail-mode ${detailMode === 'why' ? 'active' : ''}`}
            onClick={() => setDetailMode('why')}
          >
            Why now
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={detailMode === 'fit'}
            className={`detail-mode ${detailMode === 'fit' ? 'active' : ''}`}
            onClick={() => setDetailMode('fit')}
          >
            Fit
          </button>
        </div>
        <div className="project-detail-panel" role="tabpanel" aria-live="polite">
          <p className="guided-label">{detailContent[detailMode].label}</p>
          <p>{detailContent[detailMode].text}</p>
        </div>
      </div>

      <div className="cross">
        <strong>Cross-ties</strong>
        <div className="compact-list">
          {project.cross.map((item) => (
            <div key={item} className="compact-item">
              {item}
            </div>
          ))}
        </div>
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
