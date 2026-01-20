import { useQuery } from '@tanstack/react-query'
import { QueryKeys, queryKeys } from './queryKeys'
import { LatLngTuple } from 'leaflet'

const REFRESH_INTERVAL = 1500 // ms

const BASE_API_URL = 'http://localhost:4000'

export const useGetRobotPositions = () => {
  return useQuery({
    queryKey: queryKeys[QueryKeys.RobotPositions],
    queryFn: (): Promise<LatLngTuple[]> => {
      return fetch(`${BASE_API_URL}/robots`)
        .then(res => res.json())
        .then(data => data.robots)
        .then(data => data as LatLngTuple[])
    },
    refetchInterval: REFRESH_INTERVAL,
  })
}
