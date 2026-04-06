import { useCallback, useEffect, useMemo } from 'react';

import logoWhite from './assets/brand/logo-white.png';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { CompanyExplorer } from './components/CompanyExplorer';
import { CareersForm } from './components/CareersForm';
import { GuidedSpotlight } from './components/GuidedSpotlight';
import { InvestorsForm } from './components/InvestorsForm';
import { ProjectCarousel } from './components/ProjectCarousel';
import {
  careerSpotlights,
  heroContexts,
  homeManifesto,
  homeSignals,
  investorSpotlights,
  missionMoments,
} from './content/siteContent';
import {
  setActiveCompany,
  setActiveSection,
  setContext,
  siteSections,
  type SectionId,
} from './features/site/siteSlice';

const sectionLabels: Record<SectionId, string> = {
  home: 'Home',
  architecture: 'Architecture',
  projects: 'Projects',
  careers: 'Careers',
  investors: 'Investors',
};

const homeDestinations = [
  {
    section: 'architecture' as const,
    title: 'Architecture map',
    copy: 'Companies, energy lines, and reveal states.',
  },
  {
    section: 'projects' as const,
    title: 'Project spotlight',
    copy: 'One active program with stable control.',
  },
  {
    section: 'careers' as const,
    title: 'Careers signal',
    copy: 'Hiring context and application flow.',
  },
  {
    section: 'investors' as const,
    title: 'Investor signal',
    copy: 'Thesis framing and intake.',
  },
];

function resolveContext(hostname: string) {
  if (hostname.startsWith('careers.')) return 'careers' as const;
  if (hostname.startsWith('investors.')) return 'investors' as const;
  return 'default' as const;
}

function isSectionId(value: string): value is SectionId {
  return siteSections.includes(value as SectionId);
}

function resolveInitialSection(hostname: string, hash: string): {
  context: ReturnType<typeof resolveContext>;
  section: SectionId;
} {
  const context = resolveContext(hostname);
  const hashSection = hash.replace('#', '').toLowerCase();

  if (isSectionId(hashSection)) {
    return { context, section: hashSection };
  }

  if (context === 'careers' || context === 'investors') {
    return { context, section: context };
  }

  return { context, section: 'home' };
}

export default function App() {
  const dispatch = useAppDispatch();
  const { activeCompany, activeSection, context } = useAppSelector((state) => state.site);
  const hero = heroContexts[context];
  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  useEffect(() => {
    const { context: nextContext, section } = resolveInitialSection(
      window.location.hostname.toLowerCase(),
      window.location.hash,
    );

    dispatch(setContext(nextContext));
    dispatch(setActiveSection(section));
    window.history.replaceState(null, '', `#${section}`);

    const handleHashChange = () => {
      const hashSection = window.location.hash.replace('#', '').toLowerCase();
      if (isSectionId(hashSection)) {
        dispatch(setActiveSection(hashSection));
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [dispatch]);

  const activateSection = useCallback(
    (section: SectionId) => {
      dispatch(setActiveSection(section));
      window.history.replaceState(null, '', `#${section}`);
      if (typeof window.scrollTo === 'function') {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    },
    [dispatch, prefersReducedMotion],
  );

  const renderView = () => {
    switch (activeSection) {
      case 'architecture':
        return (
          <section id="architecture" className="view-panel section-view">
            <div className="section-head compact">
              <div>
                <h2>Explore the FrostAura constellation.</h2>
              </div>
              <p className="section-copy">
                Select a company to reveal its role, operating programs, and energy through the
                wider system.
              </p>
            </div>

            <CompanyExplorer
              activeCompany={activeCompany}
              onSelect={(key) => dispatch(setActiveCompany(key))}
            />
          </section>
        );

      case 'projects':
        return (
          <section id="projects" className="view-panel section-view projects-view">
            <div className="section-head compact">
              <div>
                <h2>Projects in motion across the system.</h2>
              </div>
              <p className="section-copy">
                One active spotlight at a time, with stable controls and a clearer sense of how
                programs move between cash flow, capability, and frontier optionality.
              </p>
            </div>

            <ProjectCarousel />
          </section>
        );

      case 'careers':
        return (
          <section id="careers" className="view-panel section-view">
            <div className="section-head compact">
              <div>
                <h2>Small teams. Senior people. Disproportionate leverage.</h2>
              </div>
              <p className="section-copy">
                A compact guide to team shape, focus roles, and the application path.
              </p>
            </div>

            <div className="section-stack">
              <GuidedSpotlight
                heading="How the careers funnel works now"
                intro="Use the spotlight to understand hiring intent, focus roles, and team shape before starting the application flow."
                items={careerSpotlights}
              />
              <CareersForm />
            </div>
          </section>
        );

      case 'investors':
        return (
          <section id="investors" className="view-panel section-view">
            <div className="section-head compact">
              <div>
                <h2>Aligned capital for a colder, cleaner long-range system.</h2>
              </div>
              <p className="section-copy">
                A cleaner thesis view for aligned, long-horizon partners.
              </p>
            </div>

            <div className="section-stack">
              <GuidedSpotlight
                heading="How the investor view is framed"
                items={investorSpotlights}
              />
              <InvestorsForm />
            </div>
          </section>
        );

      case 'home':
      default:
        return (
          <section id="home" className="view-panel home-view">
            <div className="hero-layout">
              <div className="hero-copy">
                <h1>{hero.title}</h1>
                <p className="lead">{hero.text}</p>

                <div className="button-row">
                  <button
                    type="button"
                    className="button"
                    onClick={() => activateSection('architecture')}
                  >
                    View architecture
                  </button>
                  <button
                    type="button"
                    className="ghost-button"
                    onClick={() => activateSection(hero.ctaTarget as SectionId)}
                  >
                    {hero.ctaLabel}
                  </button>
                </div>

                <div className="signal-grid hero-signals">
                  {homeSignals.map((item) => (
                    <article key={item.label} className="signal-card">
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                      <p>{item.copy}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="hero-side">
                <article className="frost-panel home-system-panel">
                  <p className="guided-label">System map</p>
                  <h3>One FrostAura system across capital, capability, ventures, and public good.</h3>
                  <p className="section-copy">
                    Holding company, venture studio, R&amp;D platform, operator, and public-good
                    engine inside one disciplined shell.
                  </p>
                  <div className="flow-band" aria-hidden="true">
                    {['Capital', 'Capability', 'Ventures', 'Public good'].map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                  <div className="launcher-grid">
                    {homeDestinations.map((item) => (
                      <button
                        key={item.section}
                        type="button"
                        className="launcher-card"
                        onClick={() => activateSection(item.section)}
                      >
                        <strong>{item.title}</strong>
                        <span>{item.copy}</span>
                      </button>
                    ))}
                  </div>
                </article>
              </div>
            </div>

            <article className="frost-panel home-vision-panel">
              <div className="home-vision-intro">
                <p className="guided-label">Operating doctrine</p>
                <h3>From capital to capability to progress.</h3>
                <p className="section-copy">
                  The FrostAura blueprint is compact by design: one shell, a few sharp doctrines,
                  and a horizon model that turns operating power into long-range progress.
                </p>
              </div>

              <div className="manifesto-grid">
                {homeManifesto.map((item) => (
                  <article key={item.label} className="manifesto-card">
                    <span>{item.label}</span>
                    <h4>{item.title}</h4>
                    <p>{item.summary}</p>
                  </article>
                ))}
              </div>

              <div className="mission-track home-horizon-track">
                {missionMoments.map((item) => (
                  <article key={item.label} className="mission-track-item">
                    <p className="guided-label">{item.label}</p>
                    <h4>{item.title}</h4>
                    <p>{item.summary}</p>
                  </article>
                ))}
              </div>
            </article>
          </section>
        );
    }
  };

  return (
    <div className="site-shell">
      <div className="ambient ambient-a" aria-hidden="true" />
      <div className="ambient ambient-b" aria-hidden="true" />
      <div className="ambient ambient-c" aria-hidden="true" />

        <header className="topbar glass">
          <button type="button" className="brand-button" onClick={() => activateSection('home')}>
            <img src={logoWhite} alt="FrostAura" className="brand-logo" />
            <span>FrostAura</span>
          </button>

        <nav className="nav" aria-label="Primary">
          {siteSections.map((section) => (
            <button
              key={section}
              type="button"
              className={`nav-link ${activeSection === section ? 'active' : ''}`}
              onClick={() => activateSection(section)}
            >
              {sectionLabels[section]}
            </button>
          ))}
        </nav>
      </header>

      <main className="experience-main">
        <div key={activeSection} className="view-frame">
          {renderView()}
        </div>
      </main>

      <footer className="site-footer">
        <div className="footer-card">
          <img src={logoWhite} alt="FrostAura" className="footer-logo" />
          <div>
            <h3>FrostAura</h3>
            <p>
              One FrostAura shell, multiple guided views: architecture, projects, careers,
              investors, and the long-range operating thesis.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
