import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import { useGetRobotPositions } from '../queries/useRobotPositions'
import { LatLngTuple } from 'leaflet'
import { Robot } from './Robot/Robot'
import { Navbar } from './Navbar/Navbar'
import { useState } from 'react'

// Just picked a center
const DEFAULT_CENTER: LatLngTuple = [34.0375, -118.25] // Using the center of the polygon in server.js
const DEFAULT_ZOOM = 14 // Picked default zoom by checking which size fits all the robots in one view
const STARTING_AUTO_INTERVAL_MS = 100

export const RobotMap = () => {
  const [isAutoRunning, setIsAutoRunning] = useState(true)
  const [autoIntervalMs, setAutoIntervalMs] = useState(
    STARTING_AUTO_INTERVAL_MS
  )
  const { data: robots } = useGetRobotPositions(isAutoRunning, autoIntervalMs)

  const handleStartAuto = (newIntervalMs: number) => {
    setIsAutoRunning(true)
    setAutoIntervalMs(newIntervalMs)
  }

  return (
    <>
      <Navbar
        robotCount={robots?.length ?? 0}
        onStartAuto={handleStartAuto}
        onStopAuto={() => setIsAutoRunning(false)}
        autoIntervalMs={autoIntervalMs}
      />
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Render all the robots on the map */}
        {robots !== undefined &&
          robots.map((robot, index) => (
            // No ID unfortunately, so just using index as key for now
            <Robot
              key={index}
              position={robot}
              autoIntervalMs={autoIntervalMs}
            />
          ))}
      </MapContainer>
    </>
  )
}
