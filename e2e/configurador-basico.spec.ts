import { test, expect } from '@playwright/test';

test.describe('CT02 - Configuração Básica do Veículo', () => {
  test('deve manter o preço base ao selecionar cor exterior e manter rodas padrão', async ({ page }) => {
    // Arrange
    await page.goto('http://localhost:5173/');

    await expect(page.getByRole('heading', { name: 'Velô Sprint' })).toBeVisible();
    const configureLink = page.getByRole('link', { name: /Configure o Seu|Configure Agora|Monte o Seu/i });
    await expect(configureLink).toBeVisible();

    // Act
    await configureLink.click();
    await expect(page).toHaveURL(/\/configure/);

    const totalPrice = page.getByRole('heading', { name: /R\$\s*40\.000,00/ });
    await expect(page.getByText('Preço de Venda')).toBeVisible();
    await expect(totalPrice).toBeVisible();
    await expect(totalPrice).toHaveText(/R\$\s*40\.000,00/);

    const glacierBlue = page.getByRole('button', { name: 'Glacier Blue' });
    const midnightBlack = page.getByRole('button', { name: 'Midnight Black' });
    const lunarWhite = page.getByRole('button', { name: 'Lunar White' });
    await expect(glacierBlue).toBeVisible();
    await expect(midnightBlack).toBeVisible();
    await expect(lunarWhite).toBeVisible();

    await expect(page.getByRole('button', { name: /Aero Wheels/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Sport Wheels/i })).toBeVisible();
    await expect(page.getByRole('img', { name: /with aero wheels/i })).toBeVisible();

    // Act: alterar a cor exterior para Lunar White
    await lunarWhite.click();
    await expect(page.getByRole('img', { name: /lunar-white with aero wheels/i })).toBeVisible();
    await expect(totalPrice).toHaveText(/R\$\s*40\.000,00/);

    // Act: alterar a cor exterior para Midnight Black
    await midnightBlack.click();
    await expect(page.getByRole('img', { name: /midnight-black with aero wheels/i })).toBeVisible();
    await expect(totalPrice).toHaveText(/R\$\s*40\.000,00/);

    // Assert: confirmar que o preço base não foi alterado e que a roda padrão permanece Aero
    await expect(totalPrice).toHaveText(/R\$\s*40\.000,00/);
    await expect(page.getByRole('button', { name: /Aero Wheels/i })).toBeVisible();
  });
});
