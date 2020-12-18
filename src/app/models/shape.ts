import { Point } from './point';
import { Speed } from './speed';

/**
 * Abstraction for all the shapes and their properties.
 */
export interface Shape {
    point: Point;
    speed: Speed;
    readonly angle: number;
    readonly color: string;

    setPoint(point: Point): void;
    setSpeed(speed: Speed): void;
}