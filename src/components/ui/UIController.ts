import { Loader } from "pixi.js";
import { UIView } from "./UIView";
import { UIModel } from "./UIModel";

export class UIController{

    private _view : UIView;
    private _model : UIModel;

    constructor(view : UIView){
        this._view = view;
        this._model = new UIModel();
    }

    public init() : void {
        console.log('UI init');
    }

    public async loadAssets() : Promise<Loader> {
        console.log('loading ui assets...');
        return new Promise((resolve)=>{
            Loader.shared.add("spin_disabled", "assets/ui/btn_spin_disabled.png");
            Loader.shared.add("spin_over", "assets/ui/btn_spin_hover.png");
            Loader.shared.add("spin_enabled", "assets/ui/btn_spin_normal.png");
            Loader.shared.add("spin_pressed", "assets/ui/btn_spin_pressed.png");
            Loader.shared.load(resolve);
        });
    }

}