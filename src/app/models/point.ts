/**
 * Interface that defines point properties.
 */
export interface Point {
    x: number;
    y: number;
}

export const createPoint = (x: number, y: number): Point => {
    return {x: x, y: y};
}