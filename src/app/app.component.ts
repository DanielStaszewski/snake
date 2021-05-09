import { Component, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { BOARD_SIZE, CONTROLS, SPEED_MOVEMENT } from './app.constants';
import { Board } from './models/Board.model';
import { Cell } from './models/Cell.model';
import { CellType } from './models/enums/CellType.enum';
import { Snake } from './models/Snake.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private interval: any;
  private keypressSub: Subscription;

  public isGameOverAlertOpened: boolean;
  public gameBoard: Board;
  public snake: Snake;
  public score = 0;
  public bestScore: number;
  public isNewGame: boolean;
  public direction: number;
  public isRecord = false;

  ngOnInit() {
    this.gameBoard = new Board();
    this.bestScore = !!localStorage.getItem("bestScore") ? +localStorage.getItem("bestScore") : 0;
  }

  public getCellColor(row: number, col: number): string {
    return this.gameBoard.getColorForCell(row, col);
  }

  private updateGameState(): void {
    if(this.direction){

      const [newHead, oldTail] = this.snake.updateSnakePosition(this.direction);

      if(!this.checkPositionValidity(newHead)) return this.gameOver();

      if(this.checkFoodEncounter(newHead)){
        this.snake.eatFood(oldTail);
        this.gameBoard.clearFood(newHead.x, newHead.y);
        this.score++;
        this.gameBoard.createFood();
      }

      this.gameBoard.updateCells([newHead, oldTail]);
    }
   
  }

  private checkPositionValidity(newHead: Cell): boolean {
    if(this.checkBoardEncounter(newHead)){
      return false;
    } 
    if(this.checkBodyEncounter(newHead)){
      return false;
    } 
    return true;
  }

  private checkFoodEncounter(newHead: Cell): boolean{ 
    return newHead.x === this.gameBoard.cells[newHead.x][newHead.y].x 
    && newHead.y === this.gameBoard.cells[newHead.x][newHead.y].y 
    && this.gameBoard.cells[newHead.x][newHead.y].cellType === CellType.FOOD; 
  }

  private checkBoardEncounter(newHead: Cell): boolean{
    return newHead.x === BOARD_SIZE || newHead.x === -1 || newHead.y === BOARD_SIZE || newHead.y === -1;
  }

  private checkBodyEncounter(newHead: Cell): boolean{
    return this.snake.body.some((cell: Cell, index: number) => {
      if(index === 0) return false;
      return cell.x === newHead.x && cell.y === newHead.y;
    });
  }

  
  private handleKeypress(e: KeyboardEvent): void {
    switch (e.keyCode) {
      case CONTROLS.LEFT:
        if(this.direction === CONTROLS.RIGHT) break;
        this.direction = CONTROLS.LEFT;
        break;
      case CONTROLS.RIGHT:
        if(this.direction === CONTROLS.LEFT) break;
        this.direction = CONTROLS.RIGHT;
        break;
      case CONTROLS.UP:
        if(this.direction === CONTROLS.DOWN) break;
        this.direction = CONTROLS.UP;
        break;
      case CONTROLS.DOWN:
        if(this.direction === CONTROLS.UP) break;
        this.direction = CONTROLS.DOWN;
        break;
    }
  }

  private checkIfBestResult(): void{
    if(this.score > this.bestScore){
      this.bestScore = this.score;
      this.isRecord = true;
      localStorage.setItem("bestScore", this.bestScore.toLocaleString());
    }
  }

  public newGame(): void {
    this.resetGame();
    this.isRecord = false;
    this.score = 0;

    this.snake = new Snake();

    this.gameBoard.updateCells([this.snake.body[0]]);
    this.gameBoard.createFood();

    this.keypressSub = fromEvent(document, 'keydown')
    .subscribe((e: KeyboardEvent) => this.handleKeypress(e));

    this.interval = setInterval(() => {
      this.updateGameState();
    }, SPEED_MOVEMENT);
  }

  private gameOver(): void{
    this.toggleGameOverAlert()
    this.checkIfBestResult();
    this.resetGame();
  }

  private resetGame(): void{
    this.direction = null;
    this.gameBoard.fillBoard();
    clearInterval(this.interval);
  }


  public toggleGameOverAlert(): void{
    if(!this.isGameOverAlertOpened){
      this.isGameOverAlertOpened = true;
    } else {
      this.isGameOverAlertOpened = false;
    }
  }

  ngOnDestroy(): void{
    this.keypressSub.unsubscribe();
  }

}
