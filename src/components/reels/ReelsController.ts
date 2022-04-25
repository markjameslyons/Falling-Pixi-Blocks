import { Loader } from "pixi.js";
import { ReelsView } from "./ReelsView";
import { ReelsModel, ReelsState } from "./ReelsModel";
import { Reel } from "./Reel";
import { Game } from "../../Game";

/**
 * Controller Class for the reels set
 */
export class ReelsController {

    private _view : ReelsView;
    private _model : ReelsModel;
    private _reels : Reel[] = [];

    constructor(view : ReelsView, model : ReelsModel){
        this._view = view;
        this._model = model;
    }

    public init() : void {
        // Create instances of each Reel
        for (let i = 0; i < Game.CONFIG.SYMBOL_COLS; i++) {
            this._reels.push(new Reel(i));
        }
        // init the view and set the games state to idle
        this._view.init(this._model, this._reels);
        this._model.currentState = ReelsState.IDLE;
        
    }

    public startSpin() : void {
        // change the reels state to kick off spin in view
        this._model.currentState = ReelsState.SPIN_OUT;
        
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


}