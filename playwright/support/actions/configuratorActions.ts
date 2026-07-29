import { Page, expect } from '@playwright/test'

type ExteriorColor = 'Lunar White' | 'Midnight Black' |'Glacier Blue'
type WheelType = 'Sport Wheels' | 'Aero Wheels'
type OptionalFeature = 'Precision Park' | 'Flux Capacitor'

export function createConfiguratorActions(page: Page) {

    const configureLink = page.getByTestId('header-cta')

    function totalPrice() {
        return page.getByTestId('total-price')
    }

    function exteriorColorButton(color: ExteriorColor) {
        return page.getByRole('button', { name: color })
    }

    function wheelButton(wheelType: WheelType) {
        return page.getByRole('button', { name: new RegExp(wheelType, 'i') })
    }

    function optionalCheckbox(optionalFeature: OptionalFeature) {
        const testIdLocator = 'opt-' + optionalFeature.toLowerCase().replace(/\s+/g, '-')
        return page.getByTestId(testIdLocator)
    }

    return {
        elements: {
            configureLink,
        },

        async open() {
            await page.goto('/')
            await expect(page.getByRole('heading', { name: 'Velô Sprint', exact: true })).toBeVisible()

            await expect(configureLink).toBeVisible()
            await configureLink.click()

            await expect(page).toHaveURL(/\/configure/)
            await expect(page.getByText('Preço de Venda')).toBeVisible()
            await expect(totalPrice()).toHaveText(/R\$\s*40\.000,00/)
        },

        async selectExteriorColor(color: ExteriorColor) {
            await exteriorColorButton(color).click()
        },

        async selectWheels(wheelType: WheelType) {
            await wheelButton(wheelType).click()
        },

        async toggleOptional(optionalFeature: OptionalFeature) {
            await optionalCheckbox(optionalFeature).click()
        },

        async validateVehicleImage(imagePattern: RegExp) {
            await expect(page.getByRole('img', { name: imagePattern })).toBeVisible()
        },

        async validateTotalPrice(pricePattern: RegExp) {
            await expect(totalPrice()).toHaveText(pricePattern)
        },
    }
}
