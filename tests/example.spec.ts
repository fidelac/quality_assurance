import { test, expect } from '@playwright/test';

test('Pengujian alur akademik mahasiswa SIAKAD', async ({ page }) => {

  // 1. Membuka halaman SIAKAD
  await page.goto('https://siakad.polinema.ac.id/');

  // 2. Login
  await page.getByRole('textbox', { name: 'Username' })
    .fill(process.env.SIAKAD_USERNAME!);

  await page.getByRole('textbox', { name: 'Password' })
    .fill(process.env.SIAKAD_PASSWORD!);

  await page.getByRole('button', { name: /Login/ }).click();

  // 3. Memastikan berhasil masuk
await expect(
  page.getByRole('link', { name: /Akademik/ })
).toBeVisible();

// 4. Membuka menu Akademik
await page.getByRole('link', { name: /Akademik/ }).click();

// 5. Menunggu submenu ditampilkan
await page.waitForTimeout(2000);

// 6. Mengambil screenshot
await page.screenshot({
  path: 'akademik-menu.png',
  fullPage: true
});


});