import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { DashboardPage } from '../pages/dashbord';

test.describe('SIAKAD Polinema - Student Login', () => {

  test('Mahasiswa berhasil login dan masuk dashboard', async ({ page }) => {

    const username = process.env.SIAKAD_USERNAME;
    const password = process.env.SIAKAD_PASSWORD;

    test.skip(
      !username || !password,
      'Kredensial pengujian belum dikonfigurasi'
    );

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    // Membuka halaman login
    await loginPage.goto();

    // Melakukan login
    await loginPage.login(username!, password!);

    // Memastikan dashboard berhasil ditampilkan
    await expect(dashboardPage.welcomeText).toBeVisible();

  });

});