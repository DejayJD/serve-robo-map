import { useMutation } from '@tanstack/react-query'
import { BASE_API_URL } from './common'

export const useStartAuto = () => {
  return useMutation({
    mutationFn: ({
      meters,
      intervalMs,
    }: {
      meters: number
      intervalMs: number
    }) => {
      return fetch(`${BASE_API_URL}/start-auto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ meters, intervalMs }),
      })
    },
  })
}
