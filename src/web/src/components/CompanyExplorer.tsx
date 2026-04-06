import { useState } from 'react';

import { companyContent, companyOrder } from '../content/siteContent';

interface CompanyExplorerProps {
  activeCompany: string;
  onSelect: (key: string) => void;
}

type DetailMode = 'role' | 'programs' | 'flow';

export function CompanyExplorer({ activeCompany, onSelect }: CompanyExplorerProps) {
  const [detailMode, setDetailMode] = useState<DetailMode>('role');
  const company = companyContent[activeCompany as keyof typeof companyContent];

  return (
    <div className="company-explorer">
      <section className="company-rail" aria-label="FrostAura companies">
        <div className="company-rail-head">
          <h3>Choose a company node.</h3>
          <p className="section-copy">
            Select a company to reveal its role, active programs, and cross-system ties.
          </p>
        </div>

        <div className="company-rail-track" role="tablist" aria-label="FrostAura companies">
          {companyOrder.map((key) => {
            const item = companyContent[key];

            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={activeCompany === key}
                className={`company-pill ${activeCompany === key ? 'active' : ''}`}
                onClick={() => onSelect(key)}
              >
                {item.name.replace('FrostAura ', '')}
              </button>
            );
          })}
        </div>

        <div className="company-energy-strip">
          <div className="energy-callout">
            <strong>{company.energy}</strong>
            <p>{company.imply}</p>
          </div>
          <div className="company-spotlight">
            {company.spotlight.map((item) => (
              <div key={item.label} className="company-stat">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="company-panel" aria-live="polite">
        <div className="company-summary">
          <div>
            <h3>{company.name}</h3>
            <p className="detail-copy">{company.mission}</p>
          </div>
          <div className="company-summary-copy">
            <p className="section-copy">
              {detailMode === 'role'
                ? 'Key roles currently most relevant to how this company operates.'
                : detailMode === 'programs'
                  ? 'Typical programs and operating lanes for this part of FrostAura.'
                  : 'How this company connects back into the wider FrostAura system.'}
            </p>
          </div>
        </div>

        <div className="detail-switch" role="tablist" aria-label={`${company.name} detail modes`}>
          <button
            type="button"
            role="tab"
            aria-selected={detailMode === 'role'}
            className={`detail-mode ${detailMode === 'role' ? 'active' : ''}`}
            onClick={() => setDetailMode('role')}
          >
            Roles
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={detailMode === 'programs'}
            className={`detail-mode ${detailMode === 'programs' ? 'active' : ''}`}
            onClick={() => setDetailMode('programs')}
          >
            Programs
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={detailMode === 'flow'}
            className={`detail-mode ${detailMode === 'flow' ? 'active' : ''}`}
            onClick={() => setDetailMode('flow')}
          >
            Flow
          </button>
        </div>

        {detailMode === 'role' && (
          <div className="detail-reveal">
            <div className="compact-list roles">
              {company.roles.map(([title, summary]) => (
                <article key={title} className="compact-item-card">
                  <h4>{title}</h4>
                  <p>{summary}</p>
                </article>
              ))}
            </div>
          </div>
        )}

        {detailMode === 'programs' && (
          <div className="detail-reveal detail-columns">
            <div>
              <h4>Typical programs</h4>
              <div className="compact-list">
                {company.projects.map((project) => (
                  <div key={project} className="compact-item">
                    {project}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4>Operating role</h4>
              <div className="compact-list">
                {company.focus.map((item) => (
                  <div key={item} className="compact-item">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {detailMode === 'flow' && (
          <div className="detail-reveal detail-columns">
            <div>
              <h4>Cross-ties</h4>
              <div className="tag-row">
                {company.cross.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4>What the name implies</h4>
              <p>{company.imply}</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
