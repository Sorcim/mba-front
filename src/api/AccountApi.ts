export class AccountApi {
  static url(id?: number) {
    const baseUrl = import.meta.env.VITE_API_URL
    return {
      create: `${baseUrl}/account`,
      get: `${baseUrl}/account`,
      show: `${baseUrl}/account/${id}`,
      update: `${baseUrl}/account/${id}`,
      delete: `${baseUrl}/account/${id}`,
    }
  }
}
