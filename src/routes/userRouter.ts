// routes/userRoutes.ts

import { FastifyInstance } from 'fastify'
import {
  Registeruser,
  LoginUser,
  Newsletter,
} from '../controller/user/userController'

async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/register', Registeruser)
  fastify.post('/login', LoginUser)
  fastify.post('/newsletter', Newsletter)
}

export default userRoutes
