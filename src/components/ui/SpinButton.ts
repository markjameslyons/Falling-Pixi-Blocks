import { Sprite, Texture, Text, TextStyle } from "pixi.js";
import { EventBus } from "../events/EventBus";
import { Howl } from "howler";
import { Game } from "../../Game";

export class SpinButton extends Sprite{

    private _enabledTexture : Texture;
    private _disabledTexture : Texture;
    private _overTexture : Texture;
    private _pressedTexture : Texture;
    private _enabled : boolean = false;
    private _label : Text;
    private _sound : Howl;

    constructor(){
        super();
        this._enabledTexture = Texture.from('spin_enabled');
        this._disabledTexture = Texture.from('spin_disabled');
        this._overTexture = Texture.from('spin_over');
        this._pressedTexture = Texture.from('spin_pressed');

        this._sound = new Howl({
            src : ['sounds/Start_Button.mp3']
        });

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
        this.tint = 0xFFFFFF;
        this._label.tint = 0xFFFFFF;
        this._enabled = true;
        this.interactive = true;
        this.buttonMode = true;
    }

    public disable() : void {
        this.tint = 0x666666;
        this._label.tint = 0x666666;
        this.texture = this._disabledTexture;
        this.interactive = false;
        this.buttonMode = false;
    }

    private _setHandlers() : void {
        this.on("pointerup", this._spinPress);
        this.on("pointerdown", this._onPointerDown);
        this.on("pointerover", this._onPointerOver);
        this.on("pointerout", this._onPointerOut);
    }

    private _spinPress() : void {
        if(this._enabled) {
            this.texture = this._overTexture;
            this.scale.set(1);
            this._sound.play();
            EventBus.getInstance().dispatch(Game.ON_START_TUMBLE);
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
            this.scale.set(1);
            this.texture = this._enabledTexture;
        }
    }

    private _onPointerDown() : void {
        if(this._enabled){
            this.scale.set(0.97);
            this.texture = this._pressedTexture;
        }
    }

}