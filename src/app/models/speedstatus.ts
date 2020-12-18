import { Speed } from "./speed";

/**
 * Wrapper for the {@link Speed} and the flag representing if the ground of the canvas was hit.
 */
export interface SpeedStatus {
    speed: Speed;
    isGroundHit: boolean;
}