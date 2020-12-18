import { Circle } from './circle.model';

/**
 * Unit tests for @see Circle.
 */
describe('Circle', () => {
    it('should create an instance with default radius', () => {
        //given
        let point = {x: 5, y: 5};
        let speed = {dx: 1, dy: 2};
        
        //when
        let circle = new Circle(point, speed, 1, 'black');

        //then
        expect(circle).toBeTruthy();
        expect(circle.radius).toEqual(Circle.DEFAULT_RADIUS);
    });

    it('should create an instance with radius', () => {
        //given
        let point = {x: 5, y: 5};
        let speed = {dx: 1, dy: 2};
        
        //when
        let circle = new Circle(point, speed, 1, 'black', 45);

        //then
        expect(circle).toBeTruthy();
        expect(circle.radius).not.toEqual(Circle.DEFAULT_RADIUS);
    });
});
