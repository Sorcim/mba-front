const fetcher = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  const json = await response.json()
  if (response.status === 401) {
    window.location.href = '/'
  }
  if (json.error) {
    throw json.error
  }
  return json
}

export const simpleFetcher = async (url: string) => {
  fetch(url).then((res) => res.json())
}

export default fetcher
