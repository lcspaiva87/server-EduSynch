import { FastifyReply, FastifyRequest } from 'fastify'
import { UserLogin, UserSchema } from '../../models/userAdmin'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function Registeruser(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { terms, email, name, password } = UserSchema.parse(req.body)
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return reply.status(400).send({ message: 'Email already exists' })
    }
    if (!terms) {
      return reply
        .status(400)
        .send({ message: 'to register accept the terms of service' })
    }
    // Criptografa a senha antes de armazená-la no banco de dados
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        avatar:
          'https://ogimg.infoglobo.com.br/in/24907109-c86-bcf/FT1086A/avatar-a-lenda-de-aang.jpg',
      },
    })
    const token = await reply.jwtSign({
      userId: user.id,
      name: user.name,
      avatarUrl: user.avatar,
    })
    reply.status(200).send({ message: 'User registered successfully', token })
  } catch (error: any) {
    reply.status(400).send({ message: error })
  }
}
async function LoginUser(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { email, password } = UserLogin.parse(req.body)

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return reply.status(404).send({ message: 'User not found' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return reply.status(401).send({ message: 'Invalid credentials' })
    }
    const token = await reply.jwtSign({
      userId: user.id,
      name: user.name,
      avatarUrl: user.avatar,
    })
    reply.status(200).send({ token })
  } catch (error) {
    reply.status(500).send({ message: 'Internal server error', error })
  }
}

export { Registeruser, LoginUser }
