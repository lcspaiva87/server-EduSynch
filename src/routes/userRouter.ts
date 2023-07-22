// routes/userRoutes.ts

import { FastifyInstance } from 'fastify'
import { Registeruser } from '../controller/user/userController'

async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/register', Registeruser)
}

export default userRoutes
