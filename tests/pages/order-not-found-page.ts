import { AuthorizedPage } from './authorized-page'
import { type Locator, type Page } from '@playwright/test'

export class OrderNotFoundPage extends AuthorizedPage {
  readonly orderNotFoundTitle: Locator
  readonly orderNotFoundDescription: Locator
  readonly orderNotFoundImage: Locator

  constructor(page: Page) {
    super(page)
    this.orderNotFoundTitle = page.getByTestId('orderNotFound-title')
    this.orderNotFoundDescription = page.getByTestId('orderNotFound-description')
    this.orderNotFoundImage = page.getByTestId('orderNotFound-image')
  }
}
