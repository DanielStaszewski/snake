export const BOARD_SIZE = 15;

export const MIDDLE_OF_BOARD = Math.floor(BOARD_SIZE / 2);

export enum CONTROLS {
    LEFT = 37,
    UP = 38,
    RIGHT = 39,
    DOWN = 40
}

export const COLORS = {
    FOOD: 'rgb(231, 71, 29)',
    SNAKE: 'rgb(71, 116, 234)',
    EMPTY_ODD: 'rgb(162, 209, 73)',
    EMPTY_EVEN: 'rgb(170, 215, 81)'
}

export const SPEED_MOVEMENT = 200;
