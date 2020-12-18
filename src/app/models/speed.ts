/**
 * Interface that defines speed properties.
 */
export interface Speed {
    dx: number;
    dy: number;
}

export const createSpeed = (dx: number, dy: number): Speed => {
    return {dx: dx, dy: dy};
}