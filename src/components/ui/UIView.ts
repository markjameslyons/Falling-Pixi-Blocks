import { Container, Loader } from "pixi.js";
import { SpinButton } from "./SpinButton";
import { EventBus } from "../../components/events/EventBus";
import { Game } from "../../Game";

export class UIView extends Container{

    private _spinButton : SpinButton;

    constructor(){
        super();
    }

    public init() : void {
        this._spinButton = new SpinButton();
        this._spinButton.pivot.set(this._spinButton.width / 2, this._spinButton.height / 2);
        this.addChild(this._spinButton);
        this.setPosition();
    }

    public enableSpinButton() : void {
        this._spinButton.enable();
    }
    
    public setPosition() : void {
        this.position.set(
            Game.CONFIG.SYMBOL_WIDTH * 3 - Game.CONFIG.SYMBOL_WIDTH / 2,
            Game.CONFIG.SYMBOL_HEIGHT * 3 + Game.CONFIG.SYMBOL_WIDTH / 2
        );
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