import {CONTROLS, MIDDLE_OF_BOARD } from "../app.constants";
import { Cell } from "./Cell.model";
import { CellType } from "./enums/CellType.enum";

export class Snake {
    
    public body: Cell[] = [
        new Cell(MIDDLE_OF_BOARD, MIDDLE_OF_BOARD, CellType.SNAKE)
    ]

    public updateSnakePosition(direction: number): Cell[]{
        const newHead = this.moveHead(direction);
        const oldTail = this.body.pop();
        oldTail.cellType = CellType.EMPTY;
        this.body.unshift(newHead);

        return [newHead, oldTail];
    }
    

    private moveHead(direction: number): Cell{
        let head = {...this.body[0]} as Cell;
        switch(direction){
            case CONTROLS.LEFT:
                head.x -= 1;
                break;
            case CONTROLS.RIGHT:
                head.x += 1;
                break;
            case CONTROLS.UP:
                head.y -= 1;
                break;
            case CONTROLS.DOWN:
                head.y += 1;
                break;
        }       
        return head;
    }

    public eatFood(removedTail: Cell){
        this.body.push({...removedTail}); 
    }


}