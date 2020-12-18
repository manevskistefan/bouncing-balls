/**
 * Application constants.
 */
export class Constants {
    static APP_NAME:string = 'Bouncing Balls';
    
    static Canvas = class {
        static WIDTH:number = 1200;
        static HEIGHT:number = 500;
        static COLOR:string = '#000000';
    }

    static Units = class {
        static GRAVITY:number = 0.4;
        static X_FRICTION:number = 0.1;
        static BOUNCE_UNIT:number = 0.7;
        static Y_AXIS_CRITERIA:number = -1.9;
        static X_AXIS_CRITERIA:number = 0.1;
    }
}
