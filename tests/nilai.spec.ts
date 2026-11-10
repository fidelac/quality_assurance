import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { NilaiPage } from '../pages/nilai';

test.describe('SIAKAD Polinema - Nilai Mahasiswa', () => {

  test('Mahasiswa dapat membuka halaman Nilai Mahasiswa', async ({ page }) => {
    const username = process.env.SIAKAD_USERNAME;
    const password = process.env.SIAKAD_PASSWORD;

    test.skip(
      !username || !password,
      'Kredensial belum dikonfigurasi'
    );

    const loginPage = new LoginPage(page);
    const nilaiPage = new NilaiPage(page);

    // 1. Membuka halaman login
    await loginPage.goto();

    // 2. Melakukan login
    await loginPage.login(username!, password!);

    // 3. Membuka menu Akademik
    const akademikMenu = page.getByRole('link', {
      name: /Akademik/
    });

    await expect(akademikMenu).toBeVisible({
      timeout: 15000
    });

    await akademikMenu.click();

    // 4. Membuka submenu Nilai Mahasiswa
    const nilaiMenu = page.getByRole('link', {
      name: 'Nilai Mahasiswa'
    });

    await expect(nilaiMenu).toBeVisible({
      timeout: 10000
    });

    await nilaiMenu.click();

    // 5. Menunggu halaman selesai dimuat
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);

    // 6. Debugging halaman
    console.log('URL:', page.url());
    console.log('Judul browser:', await page.title());

    console.log(
      'Isi halaman:',
      (await page.locator('body').innerText()).slice(0, 1500)
    );

    // 7. Menyimpan screenshot
    await page.screenshot({
      path: 'test-results/halaman-nilai.png',
      fullPage: true
    });

    // 8. Memastikan halaman Nilai Mahasiswa tampil
    await nilaiPage.verifyNilaiPage();

    // 9. Mengklik tombol Filter
    await nilaiPage.filterNilai();
  });

});