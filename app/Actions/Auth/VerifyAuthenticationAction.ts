import { Action } from '@stacksjs/actions'
import { type AuthenticationResponseJSON, getUserPasskey, verifyAuthenticationResponse } from '@stacksjs/auth'
import type { RequestInstance } from '@stacksjs/types'
import User from '../../../storage/framework/orm/src/models/User.ts'

export default new Action({
  name: 'VerifyAuthenticationAction',
  description: 'Verify authentication from passkey',
  method: 'POST',
  async handle(request: RequestInstance) {
    const body = request.all()

    const passkeyRes: AuthenticationResponseJSON = body.res

    const email = request.get('email') ?? ''

    const user = await User.where('email', email).first()

    const userPasskey = await getUserPasskey(user?.id as number, body.res.id as string)

    if (!user || !userPasskey) return

    try {
      const verification = await verifyAuthenticationResponse({
        response: passkeyRes,
        expectedChallenge: body.challenge,
        expectedOrigin: 'http://localhost:3333',
        expectedRPID: 'localhost',
        authenticator: {
          credentialID: userPasskey?.id,
          credentialPublicKey: userPasskey?.cred_public_key,
          counter: userPasskey.counter,
          transports: ['internal'],
        },
      })

      return verification
    } catch (error) {
      console.error(error)
    }
  },
})
