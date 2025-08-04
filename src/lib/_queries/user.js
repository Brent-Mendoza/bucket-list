import { User } from "../_models/UserModel"

export async function createUser(user) {
  try {
    const newUser = await User.create(user)
    return await newUser.save()
  } catch (e) {
    throw new Error(e)
  }
}
