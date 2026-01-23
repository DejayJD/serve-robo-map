import { useMutation } from '@tanstack/react-query'
import { BASE_API_URL } from './common'

export const useStopAuto = () => {
  return useMutation({
    mutationFn: () => {
      return fetch(`${BASE_API_URL}/stop-auto`, {
        method: 'POST',
      })
    },
  })
}
