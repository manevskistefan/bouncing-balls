import { Point } from './point';
import { Speed } from './speed';

/**
 * Abstraction for all the shapes and their properties.
 */
export interface Shape {
    point: Point;
    speed: Speed;
    angle: number;
    readonly color: string;
}