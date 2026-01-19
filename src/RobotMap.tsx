import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useGetRobotPositions } from './queries/useRobotPositions';
import { LatLngTuple } from 'leaflet';
import { Robot } from './Robot';


// Just picked a center 
const DEFAULT_CENTER: LatLngTuple = [34.0375, -118.25] // Using the center of the polygon in server.js
const DEFAULT_ZOOM = 14 // picked default zoom manually by checking which size fits all the robots in one view


export const RobotMap = () => {

    const { data: robots } = useGetRobotPositions()

    return (
        <MapContainer
            center={DEFAULT_CENTER}
            zoom={DEFAULT_ZOOM}
            style={{ height: '100vh', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {robots !== undefined && robots.map((robot, index) => (
                // No ID unfortunately, so just using index as key for now
                <Robot key={index} position={robot} />
            ))}
        </MapContainer>
    )
}
