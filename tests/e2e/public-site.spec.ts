import { expect, test } from '@playwright/test';

test('renders the FrostAura landing experience and switches views', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: /we build the future of human capability/i }),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: /open architecture map/i })).toBeVisible();

  await page.getByRole('navigation', { name: 'Primary' }).getByRole('button', { name: 'Projects' }).click();

  await expect(page.getByRole('heading', { name: /projects in motion across the system/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /life os/i })).toBeVisible();
});

test('submits the careers flow', async ({ page }) => {
  await page.goto('/#careers');

  const section = page.locator('#careers');

  await section.getByLabel('Which company interests you most?').selectOption('FrostAura Technologies');
  await section
    .getByLabel('What track best describes you?')
    .selectOption('Principal Software and Platform Engineering');
  await section.getByLabel('Availability window').selectOption('Immediately');
  await section.getByLabel('Where are you based?').fill('Cape Town, South Africa');
  await section.getByRole('button', { name: 'Next' }).click();

  await section.getByLabel('Full name').fill('Jane Doe');
  await section.getByLabel('Email address').fill('jane@example.com');
  await section.getByLabel('Most senior role held recently').fill('Principal Platform Engineer');
  await section.getByRole('button', { name: 'Next' }).click();

  await section
    .getByLabel('What is the highest-leverage thing you would help FrostAura build?')
    .fill('A disciplined public platform.');
  await section
    .getByLabel('Tell us about one hard system, team, or mission you have already delivered.')
    .fill('A high-scale platform migration.');
  await section.getByRole('button', { name: 'Submit' }).click();

  await expect(section.getByText(/submission sent successfully/i)).toBeVisible();
});

test('submits the investors flow', async ({ page }) => {
  await page.goto('/#investors');

  const section = page.locator('#investors');

  await section.getByLabel('Full name').fill('Alex Investor');
  await section.getByLabel('Organization').fill('North Star Capital');
  await section.getByLabel('Email address').fill('alex@example.com');
  await section.getByLabel('Type').selectOption('Family office');
  await section.getByLabel('Region or primary geography').fill('Global');
  await section.getByRole('button', { name: 'Next' }).click();

  await section.getByRole('checkbox').first().check();
  await section.getByLabel('Interest profile').selectOption('Operating company growth');
  await section.getByLabel('Capital range or resource scope').selectOption('1M - 5M USD equivalent');
  await section.getByLabel('Time horizon').selectOption('Within 12 months');
  await section.getByLabel('Preferred mode').selectOption('Capital and strategic support');
  await section.getByRole('button', { name: 'Next' }).click();

  await section
    .getByLabel('Why do you believe FrostAura is interesting?')
    .fill('The architecture compounds capability.');
  await section
    .getByLabel('How could you accelerate the system beyond capital?')
    .fill('Strategic network and operating support.');
  await section.getByRole('button', { name: 'Submit' }).click();

  await expect(section.getByText(/submission sent successfully/i)).toBeVisible();
});
