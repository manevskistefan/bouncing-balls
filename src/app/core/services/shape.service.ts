import { Point } from "src/app/models/point";
import { Shape } from "src/app/models/shape";
import { SpeedStatus } from "src/app/models/speedstatus";

/**
 * Service for manipulation over the {@link Shape} model.
 * 
 * @publicApi
 */
export interface ShapeService<T extends Shape> {

    /**
     * Creates brand new {@link Shape} within the given {@link Point} and random {@link Speed}, angle and color.
     * 
     * @param point 
     */
    create(point: Point): T;

    /**
     * Calculates and returns the new {@link SpeedStatus} of the given shape based on the current {@link Speed}.
     * 
     * @param shape the shape which the speed needs to be recalculated
     * @param width the width of the canvas
     * @param height the height of the canvas
     */
    calculateNewSpeed(shape: T, width: number, height: number): SpeedStatus;

    /**
     * Calculates and returns the new {@link Point} of the given shape based on the provided {@link SpeedStatus}.
     *  
     * @param shape the shape which the point needs to be recalculated
     * @param speedStatus the speed status holding both the speed and the flag for hitting the ground
     */
    calculateNewPoint(shape: T, speedStatus: SpeedStatus, canvasHeight: number): Point;

    /**
     * Checks if the given {@link Shape} hits one of the walls(left or right).
     * 
     * @param shape the shape
     * @param width the canvas width
     */
    hitWall(shape: T, width: number): boolean;

    /**
     * Checks if the given {@link Shape} hits the ground.
     * 
     * @param shape the shape
     * @param height the canvas height
     */
    hitGround(shape: T, height: number): boolean;
}