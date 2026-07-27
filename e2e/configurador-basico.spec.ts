import { test, expect } from '@playwright/test';

test.describe('CT02 - Configuração Básica do Veículo', () => {
  test('deve manter o preço base ao selecionar cor exterior e manter rodas padrão', async ({ page }) => {
    // Arrange
    await page.goto('http://localhost:5173/');
    await expect(page.getByRole('heading', { name: 'Velô Sprint' })).toBeVisible();

    const configureLink = page.getByRole('link', { name: /Configure o Seu|Configure Agora|Monte o Seu/i });
    await expect(configureLink).toBeVisible();
    await configureLink.click();

    // Assert navigation
    await expect(page).toHaveURL(/\/configure/);
    await expect(page.getByText('Preço de Venda')).toBeVisible();
    const totalPrice = page.getByRole('heading', { name: /R\$\s*40\.000,00/ });
    await expect(totalPrice).toBeVisible();
    await expect(totalPrice).toHaveText(/R\$\s*40\.000,00/);

    // Validate color selectors and wheel options
    const glacierBlue = page.getByRole('button', { name: 'Glacier Blue' });
    const midnightBlack = page.getByRole('button', { name: 'Midnight Black' });
    const lunarWhite = page.getByRole('button', { name: 'Lunar White' });
    await expect(glacierBlue).toBeVisible();
    await expect(midnightBlack).toBeVisible();
    await expect(lunarWhite).toBeVisible();

    await expect(page.getByRole('button', { name: /Aero Wheels/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Sport Wheels/i })).toBeVisible();

    // Act: select exterior color and validate no price change
    await lunarWhite.click();
    await expect(page.getByRole('img', { name: /lunar-white with aero wheels/i })).toBeVisible();
    await expect(totalPrice).toHaveText(/R\$\s*40\.000,00/);

    await midnightBlack.click();
    await expect(page.getByRole('img', { name: /midnight-black with aero wheels/i })).toBeVisible();
    await expect(totalPrice).toHaveText(/R\$\s*40\.000,00/);

    // Confirm wheels remain default
    await expect(page.getByRole('button', { name: /Aero Wheels/i })).toBeVisible();
    await expect(totalPrice).toHaveText(/R\$\s*40\.000,00/);
  });
});
