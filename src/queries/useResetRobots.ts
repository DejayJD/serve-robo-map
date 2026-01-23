import { useMutation } from '@tanstack/react-query'
import { BASE_API_URL } from './common'

export const useResetRobots = () => {
  return useMutation({
    mutationFn: ({ count }: { count: number }) => {
      return fetch(`${BASE_API_URL}/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ count }),
      }).then(res => res.json())
    },
  })
}
