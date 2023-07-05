export class AuthApi {
  static url() {
    const baseUrl = import.meta.env.VITE_API_URL
    return {
      login: `${baseUrl}/auth/login`,
    }
  }
}
