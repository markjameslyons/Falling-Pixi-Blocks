import { Loader } from "pixi.js";
import { ReelsView } from "./ReelsView";
import { ReelsModel, ReelState } from "./ReelsModel";
import { Reel } from "./Reel";
import { Game } from "../../Game";

/**
 * Controller Class for the reels set
 */
export class ReelsController {

    private _view : ReelsView;
    private _model : ReelsModel;
    private _reels : Reel[] = [];
    private _previousReelState : ReelState = ReelState.IDLE;


    constructor(view : ReelsView, model : ReelsModel){
        this._view = view;
        this._model = model;
    }

    public init() : void {
        for (let i = 0; i < Game.CONFIG.SYMBOL_COLS; i++) {
            this._reels.push(new Reel(this._view, this._model, i));
        }
        this._view.init(this._reels);
        this._model.currentState = ReelState.IDLE;
    }

    public startSpin() : void {
        console.log('Spin Started');
        console.log(this._model.currentState);
        this._model.currentState = ReelState.SPIN_OUT;
    }

    public async loadAssets() : Promise<Loader> {
        return new Promise((resolve)=>{
            Loader.shared.add("symbol_1", "assets/reels/symbol_1.png");
            Loader.shared.add("symbol_2", "assets/reels/symbol_2.png");
            Loader.shared.add("symbol_3", "assets/reels/symbol_3.png");
            Loader.shared.add("symbol_4", "assets/reels/symbol_4.png");
            Loader.shared.add("symbol_5", "assets/reels/symbol_5.png");
            Loader.shared.add("symbol_6", "assets/reels/symbol_6.png");
            Loader.shared.add("symbol_7", "assets/reels/symbol_7.png");
            Loader.shared.add("symbol_8", "assets/reels/symbol_8.png");
            Loader.shared.load(resolve);
        });
    }

    private _startTumbleOut() : void {
        console.log('Symbols - Fall Out...');
        setTimeout(()=>{
            this._model.currentState = ReelState.SPIN_IN;
        },1000);
    }

    private _startTumbleIn() : void {
        console.log('...Symbols - Fall In');
        setTimeout(()=>{
            this._model.currentState = ReelState.IDLE;
        },1000);
    }

    /**
     * Constantly ticking checking for reel state updates
     */
    public update() : void {
        if(this._previousReelState !== this._model.currentState){
            switch(this._model.currentState){
                case ReelState.IDLE:
                    break;
                case ReelState.SPIN_OUT:
                    this._startTumbleOut();
                    break;
                case ReelState.SPIN_IN:
                    this._startTumbleIn();
                    break;
            }
        }
        this._previousReelState = this._model.currentState;
    }

}