import { TestBed } from '@angular/core/testing';
import { Constants } from 'src/app/app.constants';
import { Circle } from 'src/app/models/circle.model';
import { createSpeedStatus } from 'src/app/models/speedstatus';
import { RandomGenerator } from '../utils/randomgenerator';

import { CircleService } from './circle.service';

/**
 * Unit tests for {@link CircleService}.
 */
describe('CircleService', () => {
    let service: CircleService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CircleService);
    });

    it('Should be created', () => {
        expect(service).toBeTruthy();
    });

    it('Should not create circle when point is not valid', () => {
        //given
        let point = {x: undefined, y: 5};

        //when
        expect(() => service.create(point)).toThrow(new Error('Circle can not be created without a point!'));
    });

    it('Should create circle within the given point with random speed angle and color', () => {
        //given
        let point = {x: 5, y: 5};

        //when
        let circle = service.create(point);

        //then
        expect(circle).toBeTruthy();
        expect(circle.point).toEqual(point);
        expect(circle.speed.dx).toBeGreaterThanOrEqual(RandomGenerator.MIN_SPEED);
        expect(circle.speed.dx).toBeLessThanOrEqual(RandomGenerator.MAX_SPEED);
        expect(circle.speed.dy).toBeGreaterThanOrEqual(RandomGenerator.MIN_SPEED);
        expect(circle.speed.dy).toBeLessThanOrEqual(RandomGenerator.MAX_SPEED);
        expect(circle.radius).toEqual(Circle.DEFAULT_RADIUS);
    });

    it('Should calculate new speed when circle is hitting the wall', () => {
        //given
        let circle = new Circle({x: 1, y: 2}, {dx: 5, dy: 5}, 90, 'black');
        let canvasWidth = 10;
        let canvasHeight = 100;

        //when
        let speedStatus = service.calculateNewSpeed(circle, canvasWidth, canvasHeight);

        //then
        expect(speedStatus).toBeTruthy();
        expect(speedStatus.isGroundHit).not.toBeTrue();
        expect(speedStatus.speed).toBeTruthy();
        expect(speedStatus.speed.dx).toEqual(-5);
        expect(speedStatus.speed.dy).toEqual(5 + Constants.Units.GRAVITY);
    });

    it('Should calculate new speed when circle is hitting the ground', () => {
        //given
        let circle = new Circle({x: 5, y: 2}, {dx: 5, dy: 5}, 90, 'black');
        let canvasWidth = 100;
        let canvasHeight = 10;

        //when
        let speedStatus = service.calculateNewSpeed(circle, canvasWidth, canvasHeight);

        //then
        expect(speedStatus).toBeTruthy();
        expect(speedStatus.isGroundHit).toBeTrue();
        expect(speedStatus.speed).toBeTruthy();
        expect(speedStatus.speed.dx).toEqual(5 - Constants.Units.X_FRICTION);
        expect(speedStatus.speed.dy).toEqual((5 + Constants.Units.GRAVITY) * -Constants.Units.BOUNCE_UNIT);
    });

    it('Should calculate new speed when circle is hitting the ground', () => {
        //given
        let circle = new Circle({x: 5, y: 2}, {dx: 5, dy: 5}, 90, 'black');
        let canvasWidth = 100;
        let canvasHeight = 10;

        //when
        let speedStatus = service.calculateNewSpeed(circle, canvasWidth, canvasHeight);

        //then
        expect(speedStatus).toBeTruthy();
        expect(speedStatus.isGroundHit).toBeTrue();
        expect(speedStatus.speed).toBeTruthy();
        expect(speedStatus.speed.dx).toEqual(5 - Constants.Units.X_FRICTION);
        expect(speedStatus.speed.dy).toEqual((5 + Constants.Units.GRAVITY) * -Constants.Units.BOUNCE_UNIT);
    });

    it('Should set speed to zero when circle is hitting the ground with speed smaller then the threshold', () => {
        //given
        let circle = new Circle({x: 5, y: 5}, {dx: 0.2, dy: 0.2}, 90, 'black');
        let canvasWidth = 10;
        let canvasHeight = 10;

        //when
        let speedStatus = service.calculateNewSpeed(circle, canvasWidth, canvasHeight);

        //then
        expect(speedStatus).toBeTruthy();
        expect(speedStatus.isGroundHit).toBeTrue();
        expect(speedStatus.speed).toBeTruthy();
        expect(speedStatus.speed.dx).toEqual(0);
        expect(speedStatus.speed.dy).toEqual(0);
    });

    it('Should calculate new point when circle is not hitting the ground', () => {
        //given
        let circle = new Circle({x: 5, y: 2}, {dx: 5, dy: 5}, 90, 'black');
        let speedStatus = createSpeedStatus({dx: 5, dy: 5}, false);
        let canvasHeight = 10;

        //when
        let newPoint = service.calculateNewPoint(circle, speedStatus, canvasHeight);

        //then
        expect(newPoint).toBeDefined();
        expect(newPoint.x).toEqual(5 + (5 * Math.cos(circle.angle)));
        expect(newPoint.y).toEqual(2 + (5 * Math.sin(circle.angle)));
    });

    it('Should calculate new point based on the canvas height when circle is hitting the ground', () => {
        //given
        let circle = new Circle({x: 5, y: 2}, {dx: 5, dy: 5}, 90, 'black');
        let speedStatus = createSpeedStatus({dx: 5, dy: 5}, true);
        let canvasHeight = 20;

        //when
        let newPoint = service.calculateNewPoint(circle, speedStatus, canvasHeight);

        //then
        expect(newPoint).toBeDefined();
        expect(newPoint.x).toEqual(5 + (5 * Math.cos(circle.angle)));
        expect(newPoint.y).toEqual(12 + (5 * Math.sin(circle.angle)));
    });
});
