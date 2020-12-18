import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Constants } from 'src/app/app.constants';
import { CircleService } from 'src/app/core/services/circle.service';
import { Logger } from 'src/app/core/utils/logger';
import { Circle } from 'src/app/models/circle.model';

/**
 * Canvas componenet representing frame where all kinds of {@link Shape} can be placed and moved within that frame.
 */
@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit, OnDestroy {
    @ViewChild('canvas', { static: true }) 
    private canvas: ElementRef<HTMLCanvasElement>;
    private context: CanvasRenderingContext2D;
    private interval: NodeJS.Timer;

    private circles: Array<Circle>;

    constructor(private circleService: CircleService) {
        this.circles = new Array();
    }

    ngOnInit(): void {
        this.context = this.canvas.nativeElement.getContext('2d');
        this.context.canvas.width = Constants.Canvas.WIDTH;
        this.context.canvas.height = Constants.Canvas.HEIGHT;
        this.context.fillStyle = Constants.Canvas.COLOR;
        
        Logger.info('Canvas was rendered with default width: ' + Constants.Canvas.WIDTH + ' and height: ' + Constants.Canvas.HEIGHT);

        //draws the canvas every 15 miliseconds
        this.interval = setInterval(() => {
        this.drawCanvas();
        }, 15);
    }

    ngOnDestroy(): void {
        clearInterval(this.interval);
        this.clearCanvas();
    }

    /**
     * Draws the cleaned canvas with the default values. 
     * Afterwards, it gets all the created circles, 
     * move them to the appropriate point based on its speed and draw them in that specific point.
     */
    drawCanvas() {
        this.clearCanvas();
        this.context.strokeRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        //iterate over the circles, recalculate their speed and points and draw them
        this.circles.forEach(circle => {
            let newSpeedWithStatus = this.circleService.calculateNewSpeed(circle, this.context.canvas.width, this.context.canvas.height);
            let newSpeed = newSpeedWithStatus.speed;

            if (newSpeed.dx != 0 || newSpeed.dy != 0) {
                let newPoint = this.circleService.calculateNewPoint(circle, newSpeedWithStatus, this.context.canvas.height);
                circle.setPoint(newPoint);
                circle.setSpeed(newSpeed);
            }
            
            this.drawCircle(circle);
        });
    }

    /**
     * Clears the whole canvas.
     */
    clearCanvas(): void {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    }

    /**
     * Draws the given {@link Circle} with center at his point and appropriate radius. 
     * 
     * @param circle the circle that should be drawn
     */
    drawCircle(circle: Circle) {
        this.context.fillStyle = circle.color;
        this.context.beginPath();
        this.context.arc(circle.point.x, circle.point.y, circle.radius, 0, 2 * Math.PI, true);
        this.context.closePath();
        this.context.fill();
    }

    /**
     * Creates and add @see Circle in the list of all circles that needs to be drawn on the canvas.
     * 
     * @param event canvas click event
     */
    addCircle(event: MouseEvent): void {
        let rect = this.context.canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        
        let point = {x: x, y: y};

        try {
            let circle = this.circleService.create(point);
            Logger.info('Circle was created with coordination x:' + x + ' and y: ' + y + ', random speed: ' + circle.speed.dx + ', random angle: ' + circle.angle + ' and random color: ' + circle.color);
            this.circles.push(circle);
        } catch (e) {
            Logger.error(e);
        }
    }
}
