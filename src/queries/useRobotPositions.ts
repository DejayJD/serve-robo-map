import { useQuery } from '@tanstack/react-query'
import { QueryKeys, queryKeys } from './queryKeys'
import { LatLngTuple } from 'leaflet'
import { BASE_API_URL } from './common'

const DEFAULT_REFRESH_INTERVAL = 100 // ms

export const useGetRobotPositions = (
  isAutoRunning: boolean,
  intervalMs: number
) => {
  return useQuery({
    queryKey: queryKeys[QueryKeys.RobotPositions],
    queryFn: (): Promise<LatLngTuple[]> => {
      return fetch(`${BASE_API_URL}/robots`)
        .then(res => res.json())
        .then(data => data.robots)
        .then(data => data as LatLngTuple[])
    },
    refetchInterval: isAutoRunning
      ? (intervalMs ?? DEFAULT_REFRESH_INTERVAL)
      : false,
  })
}
