import { Container, Graphics } from "pixi.js";
import { Game, SYMOL_CONFIG } from "../../Game";
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

    private _tumbleConfig : SYMOL_CONFIG;

    private _lastSymbol : number = 0;

    constructor(){
        super();
    }

    public init(model : ReelsModel, reels : Reel[]) : void {
        this._model = model;
        this._reels = reels;

        // add a background to the reels
        const width = (Game.CONFIG.SYMBOL_WIDTH * Game.CONFIG.SYMBOL_COLS) as number;
        const height = (Game.CONFIG.SYMBOL_HEIGHT * Game.CONFIG.SYMBOL_ROWS) as number; 
        const backer = new Graphics();
        backer.beginFill(0x222222);
        backer.drawRect(0,0,width, height);
        backer.endFill();
        this.addChild(backer);

        // add a mask to the reels container
        const reelMask = new Graphics();
        reelMask.beginFill(0x000000, 1);
        reelMask.drawRect(0, 0, width, height);
        reelMask.endFill();
        this.addChild(reelMask);
        this.mask = reelMask;
        this._setReelsAndSymbols();
    }

    private _setReelsAndSymbols() : void {
        this._reels.forEach((reel : Reel) => {
            reel.setSymbols(true);
            this.addChild(reel);
        });
    }

    private _setIncomingSymbols() : void {
        this._reels.forEach((reel : Reel) => {
            reel.setSymbols(false);
        });
    }

    public _startTumbleOut() : void {
        const randomConfig = Math.floor(Math.random() * (Game.CONFIG.SYMBOLS_CONFIGS.length - 1));
        this._tumbleConfig = Game.CONFIG.SYMBOLS_CONFIGS[randomConfig];
        this._lastSymbol = this._tumbleConfig.TIME_BETWEEN_REELS.indexOf(Math.max(...this._tumbleConfig.TIME_BETWEEN_REELS));
        this._reels.forEach((reel:Reel, i : number) => {
            // set a delay between starting each reel stack
            gsap.delayedCall(this._tumbleConfig.TIME_BETWEEN_REELS[i] / 1000, ()=>{
                reel.tumbleOut(this._lastSymbol);
            });
        });
    }

    public _startTumbleIn() : void {
        
        this._setIncomingSymbols();

        this._reels.forEach((reel:Reel, i : number) => {
            // set a delay between each reel stack
            gsap.delayedCall(this._tumbleConfig.TIME_BETWEEN_REELS[i] / 1000, ()=>{
                reel.tumbleIn();
            });
        });
    }

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