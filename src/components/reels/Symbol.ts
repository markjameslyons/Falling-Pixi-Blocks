import { Point, Sprite, Texture } from "pixi.js";
import { Game } from "../../Game";
import { gsap } from "gsap";

export class Symbol extends Sprite{

    private _delayTime : number = 0;
    private _stopPositionY : number  = 1000;
    private _reelsPosition : Point | undefined;;

    constructor(symbolIndex: number, reelsPosition : Point, startPosition? : Point){
        super();
        this._delayTime = symbolIndex * Game.CONFIG.TIME_BETWEEN_SYMBOLS;
        if(startPosition !== undefined){
            this.position.set(startPosition.x, startPosition.y);
        }
        else {
            this.position.set(reelsPosition.x, reelsPosition.y);
        }
        this._reelsPosition = reelsPosition;
        
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
            ease: "powe4.in",
            callbackScope : this,
            onComplete : () => {
                console.log("symbol out");
            }
        });
        return symbolOutTween;
    }

    public tumbleIn() : GSAPTween {
        if(this._reelsPosition !== undefined){
            const stopPosition = this._reelsPosition.y;
            const speed = 4000;
            const duration = this._stopPositionY / speed;
            const symbolOutTween = gsap.to(this, {
                y : stopPosition,
                duration : duration,
                delay : this._delayTime / 1000,
                ease: "power2.in",
                callbackScope : this,
                onComplete : () => {
                    gsap.fromTo(this,{
                        y : this.y,
                    },{
                        duration : 0.1,
                        y : this.y-12,
                        yoyo : true,
                        repeat : 1
                    });
                }
            });
            return symbolOutTween;
        }
    }

}