import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config';

export default defineConfig({
  ...baseConfig,
  timeout: 5 * 1000,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: '/test-results/html' }],
    ['github'],
    ['junit', { outputFile: '/test-results/junit/results.xml' }]
  ],
  use: {
    baseURL: 'http://127.0.0.1:3000',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    screenshot: 'on',
  },
  webServer: {
    command: 'node /.output/server/index.mjs',
    url: 'http://127.0.0.1:3000',
    cwd: '/.output',
    reuseExistingServer: false,
    stderr: 'pipe',
    stdout: 'pipe'
  },
});