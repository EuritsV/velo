import { test, expect } from '../support/fixtures'
import { generateOrderCode } from '../support/helpers'
import { type OrderDetails } from '../support/actions/orderLockupActions'

/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {

  test.beforeEach(async ({ app }) => {
    // Arrange
    await app.orderLockup.open()
  })

  test('deve consultar um pedido aprovado', async ({ app }) => {
    // Test Data
    const order: OrderDetails = {
      number:   'VLO-N5R88V',
      status:   'APROVADO',
      color:    'Glacier Blue',
      wheels:   'aero Wheels',
      customer: { name: 'Eurits Carvalho', email: 'eurits@velo.dev' },
      payment:  'À Vista',
    }

    // Act
    await app.orderLockup.searchOrder(order.number)

    // Assert
    await app.orderLockup.validateOrderDetails(order)
  })

  test('deve consultar um pedido reprovado', async ({ app }) => {
    // Test Data
    const order: OrderDetails = {
      number:   'VLO-97XQOS',
      status:   'REPROVADO',
      color:    'Midnight Black',
      wheels:   'sport Wheels',
      customer: { name: 'Steve Jobs', email: 'jobs@apple.com' },
      payment:  'À Vista',
    }

    await app.orderLockup.searchOrder(order.number)

    await app.orderLockup.validateOrderDetails(order)
  })

  test('deve consultar um pedido em analise', async ({ app }) => {
    // Test Data
    const order: OrderDetails = {
      number:   'VLO-2ZYZ3D',
      status:   'EM_ANALISE',
      color:    'Lunar White',
      wheels:   'aero Wheels',
      customer: { name: 'João da Silva', email: 'joao@velo.dev' },
      payment:  'À Vista',
    }

    await app.orderLockup.searchOrder(order.number)

    await app.orderLockup.validateOrderDetails(order)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ app }) => {
    const order = generateOrderCode()

    await app.orderLockup.searchOrder(order)

    await app.orderLockup.validateOrderNotFound()
  })

  test('deve exibir mensagem quando o código do pedido está fora do padrão', async ({ app }) => {
    await app.orderLockup.searchOrder('ABC-123')

    await app.orderLockup.validateOrderNotFound()
  })

  test('deve manter o botão de busca desabilitado com campo vazio pu apenas espaços', async ({app, page}) =>{

    const button = app.orderLockup.elements.searchButton
    await expect(button).toBeDisabled()

    await app.orderLockup.elements.orderInput.fill('     ')
    await expect(button).toBeDisabled()


  })

})
