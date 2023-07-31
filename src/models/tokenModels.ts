import { z } from 'zod'

const TokenSchema = z.object({
  userId: z.string(),
  name: z.string(),
  icon: z.string().url(),
  avatarUrl: z.number(),
})
export { TokenSchema }
