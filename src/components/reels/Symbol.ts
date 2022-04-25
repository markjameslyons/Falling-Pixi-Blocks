import { Point, Sprite, Texture } from "pixi.js";
import { Game } from "../../Game";
import { gsap } from "gsap";

export class Symbol extends Sprite{

    private _delayTime : number = 0;
    private _stopPositionY : number  = 1000;


    constructor(symbolIndex: number, reelsPosition : Point, startPosition? : Point){
        super();
        this._delayTime = symbolIndex * Game.CONFIG.TIME_BETWEEN_SYMBOLS;
        if(startPosition !== undefined){
            this.position.set(startPosition.x, startPosition.y);
        }
        else {
            this.position.set(reelsPosition.x, reelsPosition.y);
        }
        
        // For now just assign random texture
        const symbolNum = Math.floor(Math.random() * 8) + 1;
        this.texture = Texture.from(`symbol_${symbolNum}`);
    }

    public tumbleOut() : GSAPTween {
        const stopPosition = (3 * this.height) + 50;
        const speed = 4000;
        const duration = this._stopPositionY / speed;
        const symbolOutTween = gsap.to(this, {
            y : stopPosition,
            duration : duration,
            delay : this._delayTime / 1000,
            ease: "power2.in",
            callbackScope : this,
            onComplete : () => {
                console.log("symbol out");
            }
        });
        return symbolOutTween;
    }

    public spinIn() : void {}

    public setStopPosition(yPosition:number) : void {
        this._stopPositionY = yPosition;
    }

}