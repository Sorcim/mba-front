class HttpClient {
  static async get(endpoint: string) {
    const res = await fetch(endpoint, {
      headers: new Headers([['Content-Type', 'application/json']]),
      credentials: 'include',
      method: 'GET',
    })
    if (!res.ok) throw new Error(res.statusText)

    if (res.status !== 204) return res.json()

    return undefined
  }

  static async post(endpoint: string, { arg }: { arg: object }) {
    const res = await fetch(endpoint, {
      headers: new Headers([['Content-Type', 'application/json']]),
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(arg),
    })
    if (!res.ok) throw new Error(res.statusText)

    if (res.status !== 204) return res.json()

    return undefined
  }

  static async put(endpoint: string, { arg }: { arg: object }) {
    const res = await fetch(endpoint, {
      headers: new Headers([['Content-Type', 'application/json']]),
      credentials: 'include',
      method: 'PUT',
      body: JSON.stringify(arg),
    })
    if (!res.ok) throw new Error(res.statusText)

    if (res.status !== 204) return res.json()

    return undefined
  }

  static async delete(endpoint: string) {
    const res = await fetch(endpoint, {
      headers: new Headers([['Content-Type', 'application/json']]),
      credentials: 'include',
      method: 'DELETE',
    })
    if (!res.ok) throw new Error(res.statusText)

    if (res.status !== 204) return res.json()

    return undefined
  }
}

export default HttpClient
