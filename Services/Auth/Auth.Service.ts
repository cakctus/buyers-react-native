import { useLoginMutation } from "../../redux/api/Auth/auth"
import StorageService from "../Storage/Storage.Service"

class AuthService {
  public static async isAuth(cb: (arg: boolean | null) => void) {
    try {
      const value = await StorageService.get("auth")

      if (value) {
        cb(true)
      }
    } catch (e) {
      cb(false)
    }
  }

  public static async login(body: any) {
    const [authPost] = useLoginMutation()

    try {
      const s = await authPost(body)
      return s
    } catch (error) {
      // todo
    }
  }
}

export default AuthService
