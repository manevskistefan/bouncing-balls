import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Config } from 'src/app/app.config';

/**
 * Canvas componenet representing frame where all kinds of @interface Shape can be placed and moved within that frame.
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

  constructor() { }

  ngOnInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.context.canvas.width = Config.Canvas.WIDTH;
    this.context.canvas.height = Config.Canvas.HEIGHT;
    this.context.fillStyle = Config.Canvas.COLOR;
    
    console.log(this.context);

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
   * Clears the whole canvas.
   */
  clearCanvas(): void {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  /**
   * Draws the cleaned canvas with the default values. 
   * Afterwards it gets all the created circles, 
   * move them to the appropriate point based on its speed and draw them in that specific point.
   */
  drawCanvas() {
    this.clearCanvas();
    this.context.strokeRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  /**
   * Creates and add @see Circle in the list of all circles that needs to be drawn on the canvas.
   * 
   * @param event click event
   */
  addCircle(event: MouseEvent): void {
   console.log(event);
  }
}
