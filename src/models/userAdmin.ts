import { z } from 'zod'

const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  avatar: z.string().url(),
})

export { UserSchema }
