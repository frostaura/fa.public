import { defineConfig } from '@playwright/test';
import os from 'node:os';
import path from 'node:path';

const tempDatabasePath = path.join(os.tmpdir(), 'frostaura-playwright.db');

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'on-first-retry',
  },
  webServer: [
    {
      command: 'dotnet run --project src/backend/FrostAura.Api --urls http://127.0.0.1:8080',
      url: 'http://127.0.0.1:8080/health',
      reuseExistingServer: !process.env.CI,
      timeout: 120000,
      env: {
        ASPNETCORE_ENVIRONMENT: 'Development',
        ConnectionStrings__DefaultConnection: `Data Source=${tempDatabasePath}`,
        EMAIL_SENDER_EMAIL: 'noreply@frostaura.local',
        EMAIL_SENDER_NAME: 'FrostAura',
        EMAIL_SUPPORT_EMAIL: 'startup@frostaura.local',
        APP_URL: 'http://127.0.0.1:4173',
        EMAIL_BRAND_NAME: 'FrostAura',
        EMAIL_BRAND_OWNER: 'FrostAura',
        EMAIL_BRAND_PRIMARY_COLOR: '#6f7ef7',
        EMAIL_BRAND_ALERT_COLOR: '#7c6cff',
      },
    },
    {
      command: 'npm run dev -- --host 127.0.0.1 --port 4173',
      url: 'http://127.0.0.1:4173',
      reuseExistingServer: !process.env.CI,
      timeout: 120000,
      env: {
        VITE_API_BASE_URL: 'http://127.0.0.1:8080/api',
      },
    },
  ],
});
