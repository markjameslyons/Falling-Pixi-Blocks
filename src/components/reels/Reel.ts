import { ReelsView } from "./ReelsView";
import { ReelsModel, ReelState } from "./ReelsModel";
import { Container, Point } from "pixi.js";
import { Symbol } from "./Symbol";
import { Game } from "../../Game";

/**
 * Container for the symbols in each reel 
 */
export class Reel extends Container{

    private _view : ReelsView;
    private _model : ReelsModel;
    private _symbols : Symbol[] = [];

    constructor(view : ReelsView, model : ReelsModel, index : number){
        super();
        this._view = view;
        this._model = model;
        this.position.x = index * Game.CONFIG.SYMBOL_WIDTH;
    }

    /**
     * Add some symbols in this reel
     */
    public setSymbols() : void {
        for (let i = 0; i < Game.CONFIG.SYMBOL_ROWS; i++) {
            const y = i * Game.CONFIG.SYMBOL_HEIGHT;
            let position : Point = new Point(0,y)
            const symbol : Symbol = new Symbol(position);
            this._symbols.push(symbol);
            this.addChild(symbol);
        }   
    }

}