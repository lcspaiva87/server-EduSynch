/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyReply, FastifyRequest } from 'fastify'

import { CoinSchema } from '../../models/coinModels'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
type tokenProps = {
  userId: string
  name: string
  icon: string
  avatarUrl: string
}
async function ListCoin(req: FastifyRequest, reply: FastifyReply) {
  try {
    const tokenPayload: tokenProps = await req.jwtVerify()
    const coins = await prisma.coins.findMany({
      where: {
        userId: tokenPayload?.userId,
      },
    })
    console.log()
    reply.status(200).send(coins)
  } catch (error) {
    reply.status(500).send({ message: 'Internal server error', error })
    console.log(error)
  }
}
async function coinRegister(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { name, priceUsd, amount, percentage, userId, icon, acronym } =
      CoinSchema.parse(req.body)
    const existingCoin = await prisma.coins.findFirst({
      where: {
        userId,
        name,
      },
    })
    if (existingCoin) {
      return reply.status(400).send({ message: 'Coin already exists' })
    }
    const coins = await prisma.coins.create({
      data: {
        name,
        priceUsd,
        amount,
        percentage,
        userId,
        icon,
        acronym,
      },
    })
    reply.status(200).send({ message: 'coins registered successfully', coins })
  } catch (error) {
    reply.status(500).send({ message: 'Internal server error', error })
    console.log(error)
  }
}
async function coinTransferring(req: FastifyRequest, reply: FastifyReply) {
  try {
    const TokenSchema = z.object({
      userId: z.any(),
      idCoin: z.any(),
      amount: z.any(),
      nameCoin: z.any(),
      type_trade: z.any(),
    })

    const { userId, idCoin, amount, type_trade, nameCoin } = TokenSchema.parse(
      req.body,
    )

    const coin = await prisma.coins.findFirst({
      where: {
        userId,
        id: idCoin, // Include the idCoin in the where condition as well
      },
    })

    if (coin) {
      const currentAmount = Number(coin.amount)
      const requestedAmount = Number(amount)
      if (isNaN(currentAmount) || currentAmount < requestedAmount) {
        reply.status(500).send({ message: 'Você não tem moedas suficientes.' })
        return
      }
      const newAmount = currentAmount - requestedAmount

      const updatedCoin = await prisma.coins.updateMany({
        where: {
          userId,
          id: idCoin, // Include the idCoin in the where condition as well
        },
        data: {
          amount: newAmount,
        },
      })
      if (newAmount === 0 || newAmount < 0) {
        const deletedCoin = await prisma.coins.delete({
          where: {
            userId,
            id: idCoin,
          },
        })
        return deletedCoin
        // Realizar as ações necessárias após a exclusão da moeda, se necessário
      }
      const coins = await prisma.trade.create({
        data: {
          userId,
          idCoin,
          amount: newAmount,
          nameCoin,
          create_trade: new Date(),
          type_trade,
        },
      })
      reply.status(200).send({ message: 'Trade successfully', coins })
    }
  } catch (error) {
    // Handle any errors that may occur during the trade operation
    reply
      .status(500)
      .send({ message: 'An error occurred during the trade.', error })
  }
}
export { ListCoin, coinRegister, coinTransferring }
