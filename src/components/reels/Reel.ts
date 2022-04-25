import { Container, Point } from "pixi.js";
import { Symbol } from "./Symbol";
import { Game } from "../../Game";

/**
 * Container for the symbols in each reel 
 */
export class Reel extends Container{

    private _reelIndex : number;
    private _currentSymbols : Symbol[] = [];
    private _currentSymbolsOut = 0;
    private _currentSymbolsIn = 0;

    constructor(index : number){
        super();
        this._reelIndex = index;
        this.position.x = index * Game.CONFIG.SYMBOL_WIDTH;
    }

    /**
     * Add some symbols in this reel
     */
    public setSymbols(init : boolean) : void {

        // reset the collection of symbols
        this._currentSymbols = [];
        
        // remove any previous symbols from the stage
        this.removeChildren();

        for (let i = 0; i < Game.CONFIG.SYMBOL_ROWS; i++) {
 
            const y = (Game.CONFIG.SYMBOL_ROWS - 1) * Game.CONFIG.SYMBOL_HEIGHT - i * Game.CONFIG.SYMBOL_HEIGHT;  
            let settledPosition : Point = new Point(0,y);
            let startPosition : Point;
            if(!init){
                // Set the current position data as on the reels
                startPosition = new Point(0, 0 - Game.CONFIG.SYMBOL_HEIGHT);
            }

            const symbol : Symbol = new Symbol(i, settledPosition, startPosition);
            this._currentSymbols.push(symbol);
            this.addChild(symbol);
            
        }   
    }

    public tumbleOut() : void {
        for (let i = 0; i < this._currentSymbols.length; i++) {
            this._currentSymbols[i].tumbleOut();
        }
    }
    public tumbleIn() : void {
        for (let i = 0; i < this._currentSymbols.length; i++) {
            this._currentSymbols[i].tumbleIn();
        }
    }

}