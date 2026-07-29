import { test } from '../support/fixtures'

test.describe('Configuração Básica do Veículo', () => {
  test.beforeEach(async ({ app }) => {
  
    await app.configurator.open()
  })

  test('deve alterar a cor exterior do veículo e manter o preço base inalterado', async ({ app }) => {

    await app.configurator.selectExteriorColor('Lunar White')


    await app.configurator.validateVehicleImage(/lunar-white with aero wheels/i)
    await app.configurator.validateTotalPrice(/R\$\s*40\.000,00/)


    await app.configurator.selectExteriorColor('Midnight Black')


    await app.configurator.validateVehicleImage(/midnight-black with aero wheels/i)
    await app.configurator.validateTotalPrice(/R\$\s*40\.000,00/)
  })

  test('deve atualizar o preço total e a imagem ao alternar entre modelos de rodas', async ({ app }) => {

    await app.configurator.selectWheels('Sport Wheels')


    await app.configurator.validateTotalPrice(/R\$\s*42\.000,00/)
    await app.configurator.validateVehicleImage(/with sport wheels/i)


    await app.configurator.selectWheels('Aero Wheels')


    await app.configurator.validateTotalPrice(/R\$\s*40\.000,00/)
    await app.configurator.validateVehicleImage(/with aero wheels/i)
  })
})
