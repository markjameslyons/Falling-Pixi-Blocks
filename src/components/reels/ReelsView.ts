import { Container, Graphics } from "pixi.js";
import { Game } from "../../Game";
import { Reel } from "./Reel";
import { ReelsModel, ReelsState } from "./ReelsModel";
import { gsap } from "gsap";

/**
 * View class for the reel set
 */
export class ReelsView extends Container{

    private _reels : Reel[] = [];

    private _model : ReelsModel;

    private _previousReelsState : ReelsState = ReelsState.IDLE;

    constructor(){
        super();
    }

    public init(model : ReelsModel, reels : Reel[]) : void {
        this._model = model;
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
            reel.setSymbols(true);
            this.addChild(reel);
        })
    }

    public _startTumbleOut() : void {

        this._reels.forEach((reel:Reel, i : number) => {
            // set a delay between each reel stack
            gsap.delayedCall(i * Game.CONFIG.TIME_BETWEEN_REELS / 1000, ()=>{
                reel.tumbleOut();
            });
        });

        // TODO - Just set a delayed call to trigger the drop in for now
        gsap.delayedCall(1.5, () => {
            this._model.currentState = ReelsState.SPIN_IN
        });
    }

    public _startTumbleIn() : void {}

    public update() : void {
        if(this._previousReelsState !== this._model.currentState){
            switch(this._model.currentState){
                case ReelsState.IDLE:
                    break;
                case ReelsState.SPIN_OUT:
                    this._startTumbleOut();
                    break;
                case ReelsState.SPIN_IN:
                    this._startTumbleIn();
                    break;
            }
        }
        this._previousReelsState = this._model.currentState;
    }
    
}