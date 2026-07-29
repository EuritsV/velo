import { test } from '../support/fixtures'


test.describe('Adição de Opcionais ao configurar o veículo', () => {

  test.beforeEach(async ({ app }) => {

    await app.configurator.open()
  })

  test('deve atualizar o preço total dinamicamente ao selecionar e desselecionar pacotes opcionais', async ({ app }) => {
  
    await app.configurator.selectWheels('Sport Wheels')


    await app.configurator.validateTotalPrice(/R\$\s*42\.000,00/)


    await app.configurator.toggleOptional('Precision Park')


    await app.configurator.validateTotalPrice(/R\$\s*47\.500,00/)


    await app.configurator.toggleOptional('Flux Capacitor')


    await app.configurator.validateTotalPrice(/R\$\s*52\.500,00/)


    await app.configurator.toggleOptional('Precision Park')


    await app.configurator.validateTotalPrice(/R\$\s*47\.000,00/)
  })
})
