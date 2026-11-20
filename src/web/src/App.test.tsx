import { configureStore } from '@reduxjs/toolkit';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import App from './App';
import { submissionsApi } from './app/api/submissionsApi';
import * as siteContent from './content/siteContent';
import formsReducer from './features/forms/formsSlice';
import siteReducer from './features/site/siteSlice';

function renderApp() {
  const store = configureStore({
    reducer: {
      forms: formsReducer,
      site: siteReducer,
      [submissionsApi.reducerPath]: submissionsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(submissionsApi.middleware),
  });

  return render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}

// Products killed and divisions made dormant on 2026-11-20, plus the phantom programmes and
// dormant-division roles the site used to advertise. Matched case-sensitively at word
// boundaries, because several are also ordinary words ("wealth", "exploration", "ventures")
// that the doctrine copy uses in lowercase.
const removedNames = [
  'Life OS',
  'LifeOS',
  'FrostAura Startup',
  'Wealth',
  'Guild',
  'OceanCare',
  'Foresight',
  'Edgewise',
  'TaleWeaver',
  'Harness',
  'Integrations',
  'Undertow',
  'Squash Command Center',
  'Element Pure',
  'Helix',
  'Industries',
  'Underwater',
  'Exploration',
  'Ventures',
  'Foundation',
  'Enterprise AI',
  'Robotics',
  'Protein Folding',
  'Marine Archaeology',
  'Computational Life Systems',
  'Expedition Operations',
];

function findRemovedNames(text: string) {
  return removedNames.filter((name) => new RegExp(`\\b${name}\\b`).test(text));
}

describe('App', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/');
  });

  it('renders the FrostAura hero copy inside the home view', () => {
    renderApp();

    expect(
      screen.getByRole('heading', { name: /we build the future of human capability/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /view architecture/i })).toBeInTheDocument();
  });

  it('switches the architecture detail panel', async () => {
    const user = userEvent.setup();
    window.history.replaceState(null, '', '/#architecture');
    renderApp();

    await user.click(screen.getByRole('tab', { name: /technologies/i }));

    expect(
      screen.getByText(/generate capital and control systems through software/i),
    ).toBeInTheDocument();
  });

  it('keeps every removed product and dormant division out of the site content', () => {
    expect(findRemovedNames(JSON.stringify(siteContent))).toEqual([]);
    expect(siteContent.companyOrder).toEqual(['consolidated', 'technologies', 'labs']);
    expect(siteContent.companyInterestOptions).toEqual(['FrostAura Technologies', 'FrostAura Labs']);
    expect(siteContent.adjacentCompanyOptions).toEqual(['Technologies', 'Labs']);
    expect(siteContent.investorCompanyOptions).toEqual(['Technologies', 'Labs']);
  });

  it.each(['home', 'architecture', 'projects', 'careers', 'investors'])(
    'renders no removed product or dormant division in the %s view',
    async (section) => {
      const user = userEvent.setup();
      window.history.replaceState(null, '', `/#${section}`);
      const { container } = renderApp();
      const seen: string[] = [container.textContent ?? ''];

      // Walk every tab in the view so hidden panels are read too.
      for (const tablist of screen.queryAllByRole('tablist')) {
        for (const tab of within(tablist).queryAllByRole('tab')) {
          await user.click(tab);
          seen.push(container.textContent ?? '');
        }
      }

      for (const select of Array.from(container.querySelectorAll('select'))) {
        seen.push(Array.from(select.options, (option) => option.textContent).join(' '));
      }

      expect(findRemovedNames(seen.join(' '))).toEqual([]);
    },
  );

  it('offers only the active divisions in the careers form', () => {
    window.history.replaceState(null, '', '/#careers');
    renderApp();

    const companySelect = screen.getByLabelText('Which company interests you most?');
    expect(
      within(companySelect)
        .getAllByRole('option')
        .map((option) => option.textContent),
    ).toEqual(['Select one', 'FrostAura Technologies', 'FrostAura Labs']);
    expect(screen.getAllByRole('checkbox').map((box) => box.closest('label')?.textContent)).toEqual([
      'Technologies',
      'Labs',
    ]);
  });

  it('spotlights only living products in the projects view', async () => {
    const user = userEvent.setup();
    window.history.replaceState(null, '', '/#projects');
    renderApp();

    const choices = within(screen.getByRole('tablist', { name: 'Project choices' })).getAllByRole('tab');
    expect(choices.map((choice) => choice.querySelector('strong')?.textContent)).toEqual([
      'Crusaders Mainframe',
      'Gaia',
      'FrostAura public website',
    ]);

    await user.click(choices[1]);
    expect(screen.getByRole('heading', { name: 'Gaia' })).toBeInTheDocument();
  });
});
