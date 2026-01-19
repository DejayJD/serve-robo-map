import { Marker } from "react-leaflet";
import { LatLngTuple, Marker as LeafletMarker } from "leaflet"
import IconServeRobot from './assets/icon-serve-robot.png';
import { DivIcon } from "leaflet";
import './Robot.css';
import { useEffect, useRef } from "react";

const RobotIcon = new DivIcon({
    className: 'robot-marker',
    html: `
        <div class="robot-marker-container">
            <div class="robot-pulse-ring"></div>
            <div class="robot-shadow"></div>
            <img src="${IconServeRobot}" alt="Robot" class="robot-icon" />
        </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
})

const MOVE_ANIMATION_DURATION = 1000; // ms
const ROTATION_ANIMATION_DURATION = 500; // ms

// easing function from https://easings.net
function easeOutSine(x: number): number {
    return Math.sin((x * Math.PI) / 2);
}

export const Robot = ({ position }: { position: LatLngTuple }) => {
    const robotRef = useRef<LeafletMarker | null>(null);
    const prevPositionRef = useRef<LatLngTuple | null>(position);
    const movementAnimationRef = useRef<number | null>(null);
    const rotationRef = useRef<number>(0);

    // Handle animations - rotation and movement
    useEffect(() => {
        const animate = async () => {
            if (!robotRef.current) return;

            const from = prevPositionRef.current;
            const to = position;
            const prevRotation = rotationRef.current;

            if (!from) {
                robotRef.current.setLatLng(to);
                prevPositionRef.current = to;
                return;
            }


            // Determine the rotation to the new position
            const rawRotationTo = Math.floor(Math.atan2(to[1] - from[1], to[0] - from[0]) * (180 / Math.PI));
            // Normalize the rotation to be between 0 and 360 degrees rather than -180 to 180 degrees
            const rotationTo = rawRotationTo < 0 ? rawRotationTo + 360 : rawRotationTo;

            // This is the robot-marker-container right below the Marker
            const robotContainerRef = robotRef.current.getElement()?.firstElementChild;

            // Animate the rotation using CSS transition
            const animateRotation = async () => new Promise((resolve) => {
                robotContainerRef?.setAttribute('style', `transition: transform ${ROTATION_ANIMATION_DURATION}ms ease; transform: rotate(${rotationTo}deg)`);
                // Wait for the rotation animation to finish
                setTimeout(() => {
                    rotationRef.current = rotationTo;
                    resolve(true);
                }, ROTATION_ANIMATION_DURATION);
            })


            // Animate translation movement. This does not use CSS transitions because the marker position must be controlled via Leaflet's setLatLng method
            // To make it animate
            const animateMovement = (now: number) => {
                const elapsed = now - startTime;
                const progress = easeOutSine(Math.min(elapsed / MOVE_ANIMATION_DURATION, 1));

                // Determine the next lat/lng position along the line (LERP) based on where we're at in the animation
                const newLat = from[0] + (to[0] - from[0]) * progress;
                const newLng = from[1] + (to[1] - from[1]) * progress;

                //
                robotRef!.current!.setLatLng([newLat, newLng]);
                if (progress < 1) {
                    requestAnimationFrame(animateMovement);
                }
            }
            // Rotate animation
            if (rotationTo !== prevRotation) {
                await animateRotation();
                rotationRef.current = rotationTo;
            }

            // Use performance now to track the start time of the animation because it's more accurate than Date.now()
            // Set this AFTER rotation completes so movement animation starts from 0 progress
            const startTime = performance.now();
            prevPositionRef.current = to;
            movementAnimationRef.current = requestAnimationFrame(animateMovement);

            return () => {
                if (movementAnimationRef.current) {
                    cancelAnimationFrame(movementAnimationRef.current);
                }
            };
        }
        animate();

    }, [position]);

    return (
        <Marker position={robotRef.current?.getLatLng() ?? position} icon={RobotIcon} ref={(ref) => {
            if (ref) robotRef.current = ref;
        }}
        />
    )
}