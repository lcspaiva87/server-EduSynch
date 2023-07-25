import { z } from 'zod'

const UserSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().min(6).max(20),
  avatar: z.string().url(),
})

const UserLogin = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
})
const UserNewsletter = z.object({
  email: z.string().email(),
})
export { UserSchema, UserLogin, UserNewsletter }
