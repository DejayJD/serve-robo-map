import { useState } from 'react'
import { useResetRobots } from '../../queries/useResetRobots'
import './Navbar.css'
import { useStartAuto } from '../../queries/useStartAuto'
import { useStopAuto } from '../../queries/useStopAuto'
import { Button } from '../Button/Button'
import { NumberInput } from '../NumberInput/NumberInput'

export const Navbar = ({
  robotCount,
  onStartAuto,
  onStopAuto,
  autoIntervalMs,
}: {
  robotCount: number
  onStartAuto: (newIntervalMs: number) => void
  onStopAuto: () => void
  autoIntervalMs: number
}) => {
  const { mutate: resetRobots } = useResetRobots()
  const { mutate: startAuto } = useStartAuto()
  const { mutate: stopAuto } = useStopAuto()
  const [robotInputCount, setRobotInputCount] = useState(robotCount ?? 0)
  const [autoInputMeters, setAutoInputMeters] = useState(100)
  const [autoInputInterval, setAutoInputInterval] = useState(autoIntervalMs)
  return (
    <nav className="navbar">
      <div className="navbar-row">
        <Button onClick={() => resetRobots({ count: robotInputCount ?? 10 })}>
          Reset
        </Button>
        <NumberInput
          value={robotInputCount}
          onChange={setRobotInputCount}
          label="Count"
        />
        <div> Current Count: {robotCount}</div>
      </div>
      <div className="navbar-row">
        <NumberInput
          value={autoInputMeters}
          onChange={setAutoInputMeters}
          label="Meters"
        />
        <NumberInput
          value={autoInputInterval}
          onChange={setAutoInputInterval}
          label="Interval"
        />
        <Button
          onClick={() => {
            onStartAuto(autoInputInterval)
            startAuto({
              meters: autoInputMeters,
              intervalMs: autoInputInterval,
            })
          }}
        >
          Start Auto
        </Button>
        <Button
          onClick={() => {
            onStopAuto()
            stopAuto()
          }}
        >
          Stop Auto
        </Button>
      </div>
    </nav>
  )
}
