import { Container, Point } from "pixi.js";
import { Symbol } from "./Symbol";
import { Game } from "../../Game";

/**
 * Container for the symbols in each reel 
 */
export class Reel extends Container{

    private _reelIndex : number;
    private _currentSymbols : Symbol[] = [];

    constructor(index : number){
        super();
        this._reelIndex = index;
        this.position.x = index * Game.CONFIG.SYMBOL_WIDTH;
    }

    /**
     * Add some symbols to this reel
     */
    public setSymbols(init : boolean) : void {

        // reset the collection of symbols
        this._currentSymbols = [];

        // remove any previous symbols from the stage
        this.removeChildren();

        for (let i = 0; i < Game.CONFIG.SYMBOL_ROWS; i++) {
 
            const y = (Game.CONFIG.SYMBOL_ROWS - 1) * Game.CONFIG.SYMBOL_HEIGHT - i * Game.CONFIG.SYMBOL_HEIGHT;  
            // Set the current position data as on the reels
            let settledPosition : Point = new Point(0,y);
            let startPosition : Point;
            if(!init){
                // Set the start position data as above the reels + and extra 120px to stretch out the easing a little
                startPosition = new Point(0, 0 - Game.CONFIG.SYMBOL_HEIGHT - 120);
            }

            const symbol : Symbol = new Symbol(i, this._reelIndex, settledPosition, startPosition);
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