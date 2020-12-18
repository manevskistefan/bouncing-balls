import { Speed } from "./speed";

/**
 * Wrapper for the {@link Speed} and flag which represents if the ground of the canvas was hit.
 */
export interface SpeedStatus {
    speed: Speed;
    isGroundHit: boolean;
}

export const createSpeedStatus = (speed: Speed, isGroundHit: boolean): SpeedStatus => {
    return {speed: speed, isGroundHit: isGroundHit};
}