import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly homeMenu: Locator;
  readonly academicMenu: Locator;

  constructor(page: Page) {
    this.page = page;

    this.homeMenu = page.getByText('Beranda', {
      exact: true
    });

    this.academicMenu = page.locator('#gm_akademik > a');
  }

  async verifyDashboard() {
    await expect(this.homeMenu.first()).toBeVisible({
      timeout: 15000
    });

    await expect(this.academicMenu).toBeVisible({
      timeout: 15000
    });
  }

  async openAcademicMenu() {
    await this.academicMenu.click();
  }
}