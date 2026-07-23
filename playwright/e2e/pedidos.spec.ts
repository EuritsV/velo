import { test } from '@playwright/test'
import { generateOrderCode } from '../support/helpers'
import { OrderLockupPage, type OrderDetails } from '../support/page/OrderLockupPage'
import { LandingPage } from '../support/page/LandingPage'
import { Navbar } from '../support/page/Navbar'



/// AAA - Arrange, Act, Assert



test.describe('Consulta de Pedido', () => {
  let orderLockupPage: OrderLockupPage

  test.beforeEach(async ({ page }) => {

    // Arrange

    await new LandingPage(page).goto()
  
    await new Navbar(page).orderLockupLink()

    orderLockupPage = new OrderLockupPage(page)
 
    await new OrderLockupPage(page).validatePageLoaded()

  })



  test('deve consultar um pedido aprovado', async ({ page }) => {

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
    await orderLockupPage.searchOrder(order.number)



    // Assert

    await orderLockupPage.validateOrderDetails(order)

  })



  test('deve consultar um pedido reprovado', async ({ page }) => {

    // Test Data

    const order: OrderDetails = {

      number:   'VLO-97XQOS',

      status:   'REPROVADO',

      color:    'Midnight Black',

      wheels:   'sport Wheels',

      customer: { name: 'Steve Jobs', email: 'jobs@apple.com' },

      payment:  'À Vista',

    }



    await orderLockupPage.searchOrder(order.number)


    await orderLockupPage.validateOrderDetails(order)

  })



  test('deve consultar um pedido em analise', async ({ page }) => {

    // Test Data

    const order: OrderDetails = {

      number:   'VLO-2ZYZ3D',

      status:   'EM_ANALISE',

      color:    'Lunar White',

      wheels:   'aero Wheels',

      customer: { name: 'João da Silva', email: 'joao@velo.dev' },

      payment:  'À Vista',

    }


    await orderLockupPage.searchOrder(order.number)



    await orderLockupPage.validateOrderDetails(order)

  })



  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

    const order = generateOrderCode()


    await orderLockupPage.searchOrder(order)



    await orderLockupPage.validateOrderNotFound()

  })

  test('deve exibir mensagem quando o código do pedido está fora do padrão', async ({ page }) => {

    await orderLockupPage.searchOrder('ABC-123')

    await orderLockupPage.validateOrderNotFound()

  })

})


