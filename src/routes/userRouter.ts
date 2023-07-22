// routes/userRoutes.ts

import { FastifyInstance } from 'fastify'
import { Registeruser, LoginUser } from '../controller/user/userController'

async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/register', Registeruser)
  fastify.post('/login', LoginUser)
}

export default userRoutes
