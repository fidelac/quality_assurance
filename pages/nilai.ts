import { Page, Locator, expect } from '@playwright/test';

export class NilaiPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly filterButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.getByText('Transkip Nilai', {
      exact: true
    });

    this.filterButton = page.getByRole('button', {
      name: /Filter/
    });
  }

  async verifyNilaiPage() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.filterButton).toBeVisible();
  }

  async filterNilai() {
    await this.filterButton.click();
  }
}