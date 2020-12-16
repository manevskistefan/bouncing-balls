import { Point } from "./point";
import { Shape } from "./shape";
import { Speed } from "./speed";

/**
 * Implementation of @interface Shape with its own specific properties.
 */
export class Circle implements Shape {
    static DEFAULT_RADIUS: number = 8;
    
    constructor(public point: Point, 
        public speed: Speed, 
        public angle: number, 
        public color: string, 
        public radius: number = Circle.DEFAULT_RADIUS) {}
}
