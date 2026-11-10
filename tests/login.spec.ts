import { test } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { DashboardPage } from '../pages/dashbord';

test.describe('SIAKAD Polinema - Student Login', () => {

  test('Mahasiswa berhasil login dan masuk dashboard', async ({ page }) => {
    const username = process.env.SIAKAD_USERNAME;
    const password = process.env.SIAKAD_PASSWORD;

    test.skip(!username || !password, 'Kredensial belum dikonfigurasi');

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login(username!, password!);

    await page.waitForTimeout(5000);

    console.log('URL setelah login:', page.url());

    console.log(
      'Isi halaman:',
      (await page.locator('body').innerText()).slice(0, 1500)
    );

    await page.screenshot({
      path: 'test-results/dashboard-github.png',
      fullPage: true
    });

    await dashboardPage.verifyDashboard();
  });

});