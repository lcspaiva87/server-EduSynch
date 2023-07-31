import { FastifyInstance } from 'fastify'

import { jwtHook } from '../lib/jwtHook'
import {
  ListCoin,
  coinRegister,
  coinTransferring,
} from '../controller/Coins/CoinsController'

async function coinRoutes(fastify: FastifyInstance) {
  jwtHook(fastify)
  fastify.get('/coin', ListCoin)
  fastify.post('/coin/register', coinRegister)
  fastify.post('/coin/trade', coinTransferring)
}
export default coinRoutes
