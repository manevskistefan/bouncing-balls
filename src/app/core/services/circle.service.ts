import { Injectable } from '@angular/core';
import { Constants } from 'src/app/app.constants';
import { Circle } from 'src/app/models/circle.model';
import { createPoint, Point } from 'src/app/models/point';
import { createSpeed } from 'src/app/models/speed';
import { createSpeedStatus, SpeedStatus } from 'src/app/models/speedstatus';
import { RandomGenerator } from '../utils/randomgenerator';
import { ShapeService } from './shape.service';

/**
 * Specific implementation of {@link ShapeService} for the {@link Circle} model.
 * 
 * @publicApi
 */
@Injectable({
    providedIn: 'root'
})
export class CircleService implements ShapeService<Circle> {

    constructor() { }

    create(point: Point): Circle {
        if (!this.isPointValid(point)) {
            throw Error('Circle can not be created without a point!');
        }
        
        let angle = RandomGenerator.getRandomAngle();
        let randomSpeed = RandomGenerator.getRandomSpeed();
        let speed = createSpeed(randomSpeed, randomSpeed);
        let color = RandomGenerator.getRandomColor();
        
        return new Circle(point, speed, angle, color);
    }

    private isPointValid(point: Point): boolean {
        return (point != undefined && point.x != undefined && point.y != undefined);
    }

    calculateNewSpeed(circle: Circle, canvasWidth: number, canvasHeight: number): SpeedStatus {
        let isHittingTheGround = false;
        let dx = circle.speed.dx;
        let dy = circle.speed.dy;

        //add gravity to dy each time speed calculation is done
        dy += Constants.Units.GRAVITY;

        if (this.hitWall(circle, canvasWidth)) {
            dx *= -1;
        }

        if (this.hitGround(circle, canvasHeight)) {
            isHittingTheGround = true;

            dy *= -Constants.Units.BOUNCE_UNIT;
            dx = this.addFriction(dx);

            //in case dx and dy are very small, set the speed to 0 to stop the movement
            if (dy < 0 && dy > Constants.Units.Y_AXIS_CRITERIA) {
                dy = 0;
            }
        
            if (Math.abs(dx) <= Constants.Units.X_AXIS_CRITERIA) {
                dx = 0;
            }
        }

        let speed = createSpeed(dx, dy);
        return createSpeedStatus(speed, isHittingTheGround);
    }

    calculateNewPoint(circle: Circle, speedStatus: SpeedStatus, canvasHeight: number): Point {
        let speed = speedStatus.speed;
        let isGroundHit = speedStatus.isGroundHit;

        let x = circle.point.x;
        let y:number;

        if (isGroundHit) {
            //relocate the circle to be exactly on the ground, not below
            y = canvasHeight - circle.radius;
        } else {
            y = circle.point.y;
        }

        //calculate the new x and y based on the trigonometry functions
        x += (speed.dx * Math.cos(circle.angle));
        y += (speed.dy * Math.sin(circle.angle));
        
        return createPoint(x, y);
    }

    hitWall(circle: Circle, canvasWidth: number): boolean {
        return (circle.point.x + circle.radius + circle.speed.dx) > canvasWidth || (circle.point.x + circle.speed.dx) < circle.radius;
    }
    
    hitGround(circle: Circle, canvasHeight: number): boolean {
        return (circle.point.y + circle.radius + circle.speed.dy) > canvasHeight;
    }

    /**
     * Adds friction to the speed on the x axis.
     * 
     * @param dx the current speed of the {@link Circle}.
     */
    private addFriction(dx: number): number {
        if(dx > 0) {
            dx -= Constants.Units.X_FRICTION;
        }
        if(dx < 0) {
            dx += Constants.Units.X_FRICTION;
        }
    
        return dx;
    }
}
