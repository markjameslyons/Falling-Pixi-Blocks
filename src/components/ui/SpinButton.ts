import { Sprite, Texture, Text, TextStyle } from "pixi.js";
import { EventBus } from "../events/EventBus";

export class SpinButton extends Sprite{

    private _enabledTexture : Texture;
    private _disabledTexture : Texture;
    private _overTexture : Texture;
    private _pressedTexture : Texture;
    private _enabled : boolean = false;
    private _label : Text;

    constructor(){
        super();
        this._enabledTexture = Texture.from('spin_enabled');
        this._disabledTexture = Texture.from('spin_disabled');
        this._overTexture = Texture.from('spin_over');
        this._pressedTexture = Texture.from('spin_pressed');

        this.texture = this._disabledTexture;
        this._label = new Text('SPIN', new TextStyle({
            align : "center",
            fill: "white",
            fontSize: 36,
            fontWeight: "bold",
            lineJoin: "round",
            strokeThickness: 5
        }));
        this._label.pivot.set(this._label.width / 2, this._label.height / 2);
        this._label.position.set(95, 55);
        this.addChild(this._label);
        this._setHandlers();
    }

    public enable() : void {
        this.texture = this._enabledTexture;
        this._enabled = true;
        this.interactive = true;
        this.buttonMode = true;
    }

    public disable() : void {
        this.texture = this._disabledTexture;
        this.interactive = false;
        this.buttonMode = false;
    }

    private _setHandlers() : void {
        this.on("pointerup", this._spinPress);
        this.on("pointerover", this._onPointerOver);
        this.on("pointerout", this._onPointerOut);
    }

    private _spinPress() : void {
        if(this._enabled){
            EventBus.getInstance().dispatch<string>('onTumbleStart');
            this.disable();
        }
    }

    private _onPointerOver() : void {
        if(this._enabled){
            this.texture = this._overTexture;
        }
    }

    private _onPointerOut() : void {
        if(this._enabled){
            this.texture = this._enabledTexture;
        }
    }

}