export const BASE_URL = 'http://localhost:8000'

export function storageUrl(path: string): string {
  return `${BASE_URL}/storage/${path}`
}
