import { test, expect } from "@playwright/test";

/// AAA - Arrange, Act and Assert

test("deve consultar um pedido aprovado", async ({ page }) => {
  // Test data
  const order = "VLO-N5R88V";

  // Arrange
  await page.goto("http://localhost:5173/");
  await expect(
    page.getByTestId("hero-section").getByRole("heading"),
  ).toContainText("Velô Sprint");
  await page.getByRole("link", { name: "Consultar Pedido" }).click();
  await expect(page.getByRole("heading")).toContainText("Consultar Pedido");
  //Act
  await page.getByRole("textbox", { name: "Número do Pedido" }).fill(order);
  //await page.getByTestId("search-order-button").click();
  await page.getByRole("button", { name: "Buscar Pedido" }).click();

  // Assert
  // const orderCode = page.locator('//p[text()="Pedido"]/..//p[text()="VLO-N5R88V"]')
  // await expect(orderCode).toBeVisible({timeout: 5000});

  const containerPedido = page
    .getByRole("paragraph")
    .filter({ hasText: /^Pedido$/ })
    .locator("..");
  await expect(containerPedido).toContainText(order, { timeout: 10_000 });

  await expect(page.getByText("APROVADO")).toBeVisible();
});

test("deve mostrar mensagem quando o pedido não for encontrado", async ({
  page,
}) => {
  // Arrange
  const order = "VLO-ABC123";
  await page.goto("http://localhost:5173/");
  await expect(
    page.getByTestId("hero-section").getByRole("heading"),
  ).toContainText("Velô Sprint");
  await page.getByRole("link", { name: "Consultar Pedido" }).click();
  await expect(page.getByRole("heading")).toContainText("Consultar Pedido");
  //Act
  await page.getByRole("textbox", { name: "Número do Pedido" }).fill(order);
  await page.getByRole("button", { name: "Buscar Pedido" }).click();

  /*await expect(page.locator('#root')).toContainText('Pedido não encontrado');
  await expect(page.locator('#root')).toContainText('Verifique o número do pedido e tente novamente');*/

  const title = page.getByRole("heading", {
    name: "Pedido não encontrado",
    level: 3,
  });
  await expect(title).toBeVisible();

  const message = page.locator("p", {
    hasText: "Verifique o número do pedido e tente novamente",
  });
  await expect(message).toBeVisible();

  // const message = page.getByText('Verifique o número do pedido e tente novamente');
  //const message  = page.locator('//p[text()= "Verifique o número do pedido e tente novamente"]')
  //const message = page.getByRole('paragraph', { name: 'Verifique o número do pedido e tente novamente' });

  /*await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - img
    - heading "Pedido não encontrado" [level=3]
    - paragraph: Verifique o número do pedido e tente novamente
    `);*/
});
