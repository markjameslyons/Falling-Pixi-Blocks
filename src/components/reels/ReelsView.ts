import { Container, Graphics } from "pixi.js";
import { Game } from "../../Game";
import { Reel } from "./Reel";

/**
 * View class for the reel set
 */
export class ReelsView extends Container{

    private _reels : Reel[] = [];

    constructor(){
        super();
    }

    public init(reels : Reel[]) : void {
        const width = (Game.CONFIG.SYMBOL_WIDTH * Game.CONFIG.SYMBOL_COLS) as number;
        const height = (Game.CONFIG.SYMBOL_HEIGHT * Game.CONFIG.SYMBOL_ROWS) as number; 
        const backer = new Graphics();
        backer.beginFill(0x000000);
        backer.drawRect(0,0,width, height);
        backer.endFill();
        this.addChild(backer);
        this._reels = reels;
        this._setReelsAndSymbols();
    }

    private _setReelsAndSymbols() : void {
        this._reels.forEach((reel : Reel) => {
            reel.setSymbols();
            this.addChild(reel);
        })
    }
        
}