import { Loader } from "pixi.js";
import { ReelsView } from "./ReelsView";
import { ReelsModel } from "./ReelsModel";

export class ReelsController {

    private _view : ReelsView;
    private _model : ReelsModel;

    constructor(view : ReelsView){
        this._view = view;
        this._model = new ReelsModel();
    }

    public init() : void {
        console.log('reels init');
    }

    public async loadAssets() : Promise<Loader> {
        console.log('loading reels assets...');
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