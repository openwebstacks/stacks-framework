import type { RequestInstance } from '@stacksjs/types'
import { Action } from '@stacksjs/actions'
import { HttpError } from '@stacksjs/error-handling'
import Product from '../../../storage/framework/orm/src/models/Product.ts'
import User from '../../../storage/framework/orm/src/models/User.ts'

export default new Action({
  name: 'CreatePaymentIntentAction',
  description: 'Create Payment Intent for stripe',
  method: 'POST',
  async handle(request: RequestInstance) {
    const userId = Number(request.getParam('id'))
    const productId = Number(request.get('productId'))

    const product = await Product.find(productId)

    const user = await User.find(userId)

    if (!product) {
      throw new HttpError(422, 'Product not found!')
    }

    const paymentIntent = await user?.paymentIntent({
      amount: Number(product.unit_price),
      currency: 'usd',
      payment_method_types: ['card'],
    })

    return paymentIntent
  },
})
