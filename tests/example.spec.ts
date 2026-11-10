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

  // 3. Memastikan berhasil masuk ke Beranda
  await expect(page).toHaveURL(/beranda/);

  // 4. Membuka menu Akademik
  await page.getByRole('link', { name: /Akademik/ }).click();

  // 5. Membuka Nilai Mahasiswa
  await page.getByRole('link', { name: 'Nilai Mahasiswa' }).click();

  // 6. Memastikan tombol Filter tersedia
  const filterButton = page.getByRole('button', { name: /Filter/ });
  await expect(filterButton).toBeVisible();

  // 7. Menjalankan Filter
  await filterButton.click();

  // 8. Logout
  await page.getByRole('link', { name: 'Log Out' }).click();

  // 9. Memastikan kembali ke halaman login
  await expect(
    page.getByRole('textbox', { name: 'Username' })
  ).toBeVisible();

});