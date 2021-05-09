import { CellType } from "./enums/CellType.enum";

export class Cell{

    constructor(public x: number, public  y: number,  public cellType: CellType = CellType.EMPTY){
    }


}