import { z } from 'zod'

const CoinSchema = z.object({
  name: z.string(),
  acronym: z.string(),
  icon: z.string().url(),
  amount: z.number(),
  priceUsd: z.number(),
  percentage: z.number(),
  userId: z.string(),
})
export { CoinSchema }
