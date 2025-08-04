import { User } from "./_models/UserModel"
import getAuthUser from "./getAuthUser"

export default async function getAuthUserData() {
  const session = await getAuthUser() // you already have this
  if (!session?.userId) return null
  const user = await User.findById(session.userId).lean()
  if (!user) return null

  return {
    _id: user._id.toString(),
    email: user.email,
    username: user.username,
  }
}
