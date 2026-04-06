import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import App from './App';
import { submissionsApi } from './app/api/submissionsApi';
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
});
