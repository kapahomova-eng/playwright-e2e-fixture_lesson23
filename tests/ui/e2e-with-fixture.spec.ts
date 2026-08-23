import { expect, test } from '../fixtures/delivery.fixture'
import { SERVICE_URL } from '../../config/env-data'
import { OrderFoundPage } from '../pages/order-found-page'
import { faker } from '@faker-js/faker/locale/ar'
import { AuthorizedPage } from '../pages/authorized-page'
;[
  { username: 'Daniil', phone: '+3716782992' },
  { username: 'Bob', phone: '+3716782993' },
  { username: 'Charlie', phone: '+3716782994' },
].forEach(({ username, phone }) => {
  test(`Create order through UI with fixture with ${username} ${phone}`, async ({
    context,
    auth,
  }) => {
    const page = await context.newPage()
    await context.addInitScript((token) => {
      localStorage.setItem('jwt', token)
    }, auth)
    await page.goto(SERVICE_URL)
    const authorizedPage = new AuthorizedPage(page)
    await authorizedPage.fillElement(authorizedPage.userInputField, username)
    await authorizedPage.fillElement(authorizedPage.phoneInputField, phone)
    await authorizedPage.clickElement(authorizedPage.createOrderButton)
    await expect(authorizedPage.orderSuccessfullyCreatedPopupOkButton).toBeVisible()
  })
})
test('Create order through UI with fixture', async ({ context, auth }) => {
  const page = await context.newPage()
  await context.addInitScript((token) => {
    localStorage.setItem('jwt', token)
  }, auth)
  await page.goto(SERVICE_URL)
  const authorizedPage = new AuthorizedPage(page)
  await authorizedPage.createOrder(faker.internet.username(), faker.phone.number())
  await expect(authorizedPage.orderSuccessfullyCreatedPopupOkButton).toBeVisible()
})
test('Search for an existing order created through API with fixture', async ({
  context,
  auth,
  orderId,
}) => {
  await context.addInitScript((token) => {
    localStorage.setItem('jwt', token)
  }, auth)
  const page = await context.newPage()
  await page.goto(SERVICE_URL)
  const authorizedPage = new AuthorizedPage(page)
  await authorizedPage.searchOrder(String(orderId))
  const orderFoundPage = new OrderFoundPage(page)
  await expect(orderFoundPage.orderStatusOpen).toBeVisible()
})
test('Search for order with delivered status using mock fixture', async ({ mainPage }) => {
  const authorizedPage = new AuthorizedPage(mainPage)
  await authorizedPage.clickElement(authorizedPage.statusButton)
  await authorizedPage.fillElement(authorizedPage.statusSearchInput, '9999')
  await authorizedPage.clickElement(authorizedPage.statusSearchButton)
  const orderFoundPage = new OrderFoundPage(mainPage)
  await expect(orderFoundPage.orderStatusDelivered).toBeVisible()
})
