/**
 * Random generator utility.
 */
export class RandomGenerator {
    static MIN_SPEED:number = -8;
    static MAX_SPEED:number = 8;
    private static RGB_NUMBER:number = 255;

    /**
     * Creates and returns random speed (dx and dy) between the @see MIN_SPEED and @see MAX_SPEED.
     */
    static getRandomSpeed(): number {
        return Math.floor(Math.random() * (RandomGenerator.MAX_SPEED - RandomGenerator.MIN_SPEED) + RandomGenerator.MIN_SPEED);
    }

    /**
     * Creates and returns random angle between 0 and 90 degrees.
     */
    static getRandomAngle(): number {
        return Math.random() * Math.PI/2;
    }

    /**
     * Creates and returns random color based on the RGB model.
     */
    static getRandomColor(): string {
        return 'rgb(' + Math.floor(Math.random() * RandomGenerator.RGB_NUMBER) + ',' + 
            Math.floor(Math.random() * RandomGenerator.RGB_NUMBER) + ',' + 
            Math.floor(Math.random() * RandomGenerator.RGB_NUMBER) + ')';
    }
}
