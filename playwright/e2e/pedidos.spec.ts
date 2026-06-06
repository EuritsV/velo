import { test, expect } from "@playwright/test";
import { generateOrderCode, searchOrder } from "../support/helpers";

/// AAA - Arrange, Act and Assert

test.describe("Consulta de Pedidos", () => {
  test.beforeEach(async ({ page }) => {
    // Arrange
    await page.goto("http://localhost:5173/");
    await expect(
      page.getByTestId("hero-section").getByRole("heading"),
    ).toContainText("Velô Sprint");
    await page.getByRole("link", { name: "Consultar Pedido" }).click();
    await expect(page.getByRole("heading")).toContainText("Consultar Pedido");
  });

  test("deve consultar um pedido aprovado", async ({ page }) => {
    // Test data
    //const order = "VLO-N5R88V";

    const order = {
      number: "VLO-N5R88V",
      status: "APROVADO",
      color: "Glacier Blue",
      wheels: "aero Wheels",
      customer: {
        name: "Eurits Carvalho",
        email: "eurits@velo.dev",
      },
      payment: "À Vista",
    };

    //Act
    await searchOrder(page, order.number);

    // Assert


    await expect(page.getByTestId(`order-result-${order.number}`))
      .toMatchAriaSnapshot(`
    - img
    - paragraph: Pedido
    - paragraph: ${order.number}
    - status:
      - img
      - text: ${order.status}
    - img "Velô Sprint"
    - paragraph: Modelo
    - paragraph: Velô Sprint
    - paragraph: Cor
    - paragraph: ${order.color}
    - paragraph: Interior
    - paragraph: cream
    - paragraph: Rodas
    - paragraph: ${order.wheels}
    - heading "Dados do Cliente" [level=4]
    - paragraph: Nome
    - paragraph: ${order.customer.name}
    - paragraph: Email
    - paragraph: ${order.customer.email}
    - paragraph: Loja de Retirada
    - paragraph
    - paragraph: Data do Pedido
    - paragraph: /\\d+\\/\\d+\\/\\d+/
    - heading "Pagamento" [level=4]
    - paragraph: ${order.payment}
    - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
    `);

    const statusBadge = page
      .getByRole("status")
      .filter({ hasText: order.status });
    await expect(statusBadge).toHaveClass(/bg-green-100/);
    await expect(statusBadge).toHaveClass(/text-green-700/);

    const statusIcon = statusBadge.locator('svg');
    expect(statusIcon).toHaveClass(/lucide-circle-check-big/)
  });

  test("deve consultar um pedido reprovado", async ({ page }) => {
    // Test data
    const order = {
      number: "VLO-97XQOS",
      status: "REPROVADO",
      color: "Midnight Black",
      wheels: "sport Wheels",
      customer: {
        name: "Steve Jobs",
        email: "jobs@apple.com",
      },
      payment: "À Vista",
    };

    //Act
   await searchOrder(page, order.number);

    // Assert

    await expect(page.getByTestId(`order-result-${order.number}`))
      .toMatchAriaSnapshot(`
    - img
    - paragraph: Pedido
    - paragraph: ${order.number}
    - status:
      - img
      - text: ${order.status}
    - img "Velô Sprint"
    - paragraph: Modelo
    - paragraph: Velô Sprint
    - paragraph: Cor
    - paragraph: ${order.color}
    - paragraph: Interior
    - paragraph: cream
    - paragraph: Rodas
    - paragraph: ${order.wheels}
    - heading "Dados do Cliente" [level=4]
    - paragraph: Nome
    - paragraph: ${order.customer.name}
    - paragraph: Email
    - paragraph: ${order.customer.email}
    - paragraph: Loja de Retirada
    - paragraph
    - paragraph: Data do Pedido
    - paragraph: /\\d+\\/\\d+\\/\\d+/
    - heading "Pagamento" [level=4]
    - paragraph: ${order.payment}
    - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
    `);

     const statusBadge = page
      .getByRole("status")
      .filter({ hasText: order.status });
    await expect(statusBadge).toHaveClass(/bg-red-100/);
    await expect(statusBadge).toHaveClass(/text-red-700/);

    const statusIcon = statusBadge.locator('svg');
    expect(statusIcon).toHaveClass(/lucide-circle-x/)
  });

  test("deve consultar um pedido em análise", async ({ page }) => {
    // Test data
    const order = {
      number: "VLO-2ZYZ3D",
      status: "EM_ANALISE",
      color: "Lunar White",
      wheels: "aero Wheels",
      customer: {
        name: "João da Silva",
        email: "joao@velo.dev",
      },
      payment: "À Vista",
    };

    //Act
   await searchOrder(page, order.number);

    // Assert

    await expect(page.getByTestId(`order-result-${order.number}`))
      .toMatchAriaSnapshot(`
    - img
    - paragraph: Pedido
    - paragraph: ${order.number}
    - status:
      - img
      - text: ${order.status}
    - img "Velô Sprint"
    - paragraph: Modelo
    - paragraph: Velô Sprint
    - paragraph: Cor
    - paragraph: ${order.color}
    - paragraph: Interior
    - paragraph: cream
    - paragraph: Rodas
    - paragraph: ${order.wheels}
    - heading "Dados do Cliente" [level=4]
    - paragraph: Nome
    - paragraph: ${order.customer.name}
    - paragraph: Email
    - paragraph: ${order.customer.email}
    - paragraph: Loja de Retirada
    - paragraph
    - paragraph: Data do Pedido
    - paragraph: /\\d+\\/\\d+\\/\\d+/
    - heading "Pagamento" [level=4]
    - paragraph: ${order.payment}
    - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
    `);

     const statusBadge = page
      .getByRole("status")
      .filter({ hasText: order.status });
    await expect(statusBadge).toHaveClass(/bg-amber-100/);
    await expect(statusBadge).toHaveClass(/text-amber-700/);

    const statusIcon = statusBadge.locator('svg');
    expect(statusIcon).toHaveClass(/lucide-clock/)

  });

  test("deve mostrar mensagem quando o pedido não for encontrado", async ({
    page,
  }) => {
    // Arrange
    const order = generateOrderCode(); // Gerar um código de pedido aleatório para garantir que não exista no sistema
    //Act
    await searchOrder(page, order);

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
});
