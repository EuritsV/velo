import { Page } from '@playwright/test'

export function generateOrderCode() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  const prefix = Array.from({ length: 3 }, () =>
    letters[Math.floor(Math.random() * letters.length)]
  ).join('');

  const suffix = Array.from({ length: 6 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('');

  return `${prefix}-${suffix}`;
}

export async function searchOrder(page: Page, orderNumber: string) {
  await page.getByRole('textbox', { name: 'Código do Pedido' }).fill(orderNumber)
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()
}