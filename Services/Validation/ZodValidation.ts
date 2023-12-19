import { z } from "zod"

class ZodValidationService {
  private static loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })

  private static signinSchema = z.object({
    email: z.string().email("Invalid email address"),
  })

  public static validateLogin(email: string, password: string) {
    const result = this.loginSchema.safeParse({ email, password })

    if (result.success) {
      return {
        isValid: true,
        validationErrors: { email: "", password: "" },
      }
    }

    const validationErrors = {
      email:
        result.error.issues.find((issue) => issue.path[0] === "email")
          ?.message ?? "",
      password:
        result.error.issues.find((issue) => issue.path[0] === "password")
          ?.message ?? "",
    }

    return {
      isValid: false,
      validationErrors,
    }
  }

  public static validationSignin(email: string) {
    const result = this.signinSchema.safeParse({ email })

    if (result.success) {
      return {
        isValid: true,
        validationError: "",
      }
    }

    const validationError = result.error.issues[0]?.message ?? ""

    return {
      isValid: false,
      validationError,
    }
  }

  public static validationResetPass(email: string) {
    const result = this.signinSchema.safeParse({ email })

    if (result.success) {
      return {
        isValid: true,
        validationError: "",
      }
    }

    const validationError = result.error.issues[0]?.message ?? ""

    return {
      isValid: false,
      validationError,
    }
  }
}

export default ZodValidationService
