import { BOARD_SIZE, COLORS } from "../app.constants";
import { Cell } from "./Cell.model";
import { CellType } from "./enums/CellType.enum";

export class Board {

public cells: Cell[][] = [];

constructor(){
    this.fillBoard();
}

public fillBoard(): void {
    for (let i = 0; i < BOARD_SIZE; i++) {
      this.cells[i] = [];
      for (let j = 0; j < BOARD_SIZE; j++) {
        this.cells[i][j] = new Cell(i, j);
      }
    }
  }

  public getColorForCell(row, col){
    switch (this.cells[row][col].cellType) {
        case CellType.EMPTY:
          if((row + col) % 2 === 0) {
            return COLORS.EMPTY_EVEN;
          } else{
            return COLORS.EMPTY_ODD;
          }
        case CellType.SNAKE:
          return COLORS.SNAKE;
        case CellType.FOOD:
          return COLORS.FOOD;
      }
  }

  public updateCells(cells: Cell[]): void{
    cells.map((cell: Cell) => {
      let x = cell.x;
      let y = cell.y;
       if(cell.cellType !== this.cells[x][y].cellType) {
          this.cells[x][y].cellType = cell.cellType;
       }
    })
}

public clearFood(x: number, y:number){
  this.cells[x][y].cellType = CellType.EMPTY;
}

public createFood(): Cell{
  let row: number, col: number;
    while(true){
      row = Math.floor(Math.random() * BOARD_SIZE);
      col = Math.floor(Math.random() * BOARD_SIZE);
      if(this.cells[row][col].cellType !== CellType.SNAKE) {
        this.cells[row][col].cellType = CellType.FOOD;
        return {...this.cells[row][col]};
      }
  }
  
  
}

}