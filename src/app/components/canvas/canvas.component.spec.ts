import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Constants } from 'src/app/app.constants';
import { CircleService } from 'src/app/core/services/circle.service';
import { Circle } from 'src/app/models/circle.model';
import { createPoint } from 'src/app/models/point';
import { createSpeed } from 'src/app/models/speed';
import { createSpeedStatus } from 'src/app/models/speedstatus';
import { CanvasComponent } from './canvas.component';

/**
 * Unit tests for {@link CanvasComponent}.
 */
describe('CanvasComponent', () => {
    let component: CanvasComponent;
    let mockCircleService: jasmine.SpyObj<CircleService>;
    let fixture: ComponentFixture<CanvasComponent>;

    beforeEach(() => {
        mockCircleService = jasmine.createSpyObj('circleService', ['create', 'calculateNewSpeed', 'calculateNewPoint', 'hitWall', 'hitGround']);
        jasmine.clock().install();

        TestBed.configureTestingModule({
            declarations: [ CanvasComponent ],
            providers: [{ provide: CircleService, useValue: mockCircleService }]
        })
        .compileComponents();

        fixture = TestBed.createComponent(CanvasComponent);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });

    it('Should create the CanvasComponent with empty canvas', () => {
        //when
        fixture.detectChanges();

        //then
        expect(component).toBeTruthy();
        
        let canvasContext = component.context;
        expect(canvasContext.canvas.width).toEqual(Constants.Canvas.WIDTH);
        expect(canvasContext.canvas.height).toEqual(Constants.Canvas.HEIGHT);
        
        let circles = component.circles;
        expect(circles).toHaveSize(0);
    });

    it('Should draw method on the Canvas be called every 15 milisecond', () => {
        //given
        spyOn(component, 'drawCanvas');
        
        //when
        fixture.detectChanges();

        expect(component.drawCanvas).not.toHaveBeenCalled();
        
        //then
        jasmine.clock().tick(15);
        expect(component.drawCanvas).toHaveBeenCalled();
    });

    it('Should draw all the circles within the newly calculated points', () => {
        //given
        let circle1 = new Circle({x: 1, y: 2}, {dx: 5, dy: 5}, 90, 'black');
        let circle2 = new Circle({x: 3, y: 4}, {dx: -5, dy: -5}, 45, 'blue');
        
        let newPoint = createPoint(5, 5);
        let newSpeed = createSpeed(10, 10);
        let speedStatus = createSpeedStatus(newSpeed, false);

        mockCircleService.calculateNewSpeed.and.returnValue(speedStatus);
        mockCircleService.calculateNewPoint.and.returnValue(newPoint);

        spyOn(component, 'drawCircle');

        fixture.detectChanges();
        component.circles = [circle1, circle2];
       
        //when        
        jasmine.clock().tick(15);

        //then
        let updatedCircles = component.circles;
        expect(updatedCircles[0].point).toEqual(newPoint);
        expect(updatedCircles[1].point).toEqual(newPoint);
        expect(updatedCircles[0].speed).toEqual(newSpeed);
        expect(updatedCircles[1].speed).toEqual(newSpeed);

        expect(component.drawCircle).toHaveBeenCalledTimes(2);
    });

    it('Should draw all the circles within old points - no calculation of new point and speed', () => {
        //given
        let circle1 = new Circle({x: 1, y: 2}, {dx: 0, dy: 0}, 90, 'black');
        let circle2 = new Circle({x: 3, y: 4}, {dx: 0, dy: 0}, 45, 'blue');

        spyOn(component, 'drawCircle');

        fixture.detectChanges();
        component.circles = [circle1, circle2];
       
        //when        
        jasmine.clock().tick(15);

        //then
        expect(mockCircleService.calculateNewPoint).not.toHaveBeenCalled();
        expect(mockCircleService.calculateNewSpeed).not.toHaveBeenCalled();

        let updatedCircles = component.circles;
        expect(updatedCircles[0].point).toEqual({x: 1, y: 2});
        expect(updatedCircles[1].point).toEqual({x: 3, y: 4});
        expect(updatedCircles[0].speed).toEqual({dx: 0, dy: 0});
        expect(updatedCircles[1].speed).toEqual({dx: 0, dy: 0});

        expect(component.drawCircle).toHaveBeenCalledTimes(2);
    });

    it('Should create new circle and added to the list of circles when onclick event has been triggered', () => {
        //given
        let canvas = fixture.debugElement.query(By.css('canvas'));
        let event = new MouseEvent('click', {clientX: 5, clientY: 10});
        let newCircle = new Circle({x: 1, y: 2}, {dx: 5, dy: 5}, 90, 'black');

        mockCircleService.create.and.returnValue(newCircle);

        fixture.detectChanges();
        jasmine.clock().tick(15);

        //when
        canvas.triggerEventHandler('click', event);

        //then
        expect(mockCircleService.create).toHaveBeenCalled();
        let circles = component.circles;
        expect(circles.length).toEqual(1);
    });

    it('No instance of circle should be created and added to the list of circles when error is thrown', () => {
        //given
        let canvas = fixture.debugElement.query(By.css('canvas'));
        let event = new MouseEvent('click', {clientX: 5, clientY: 10});

        mockCircleService.create.and.throwError("Circle was not created");

        fixture.detectChanges();
        jasmine.clock().tick(15);

        //when
        canvas.triggerEventHandler('click', event);

        //then
        expect(mockCircleService.create).toHaveBeenCalled();
        let circles = component.circles;
        expect(circles.length).toEqual(0);
    });
});
