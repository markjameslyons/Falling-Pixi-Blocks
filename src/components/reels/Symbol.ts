import { Point, Sprite, Texture } from "pixi.js";
import { Game } from "../../Game";
import { gsap } from "gsap";
import { EventBus } from "../events/EventBus";
import { Howl } from "howler";

export class Symbol extends Sprite{

    private _delayTime : number = 0;
    private _stopPositionY : number  = 1000;
    private _reelsPosition : Point | undefined;
    private _symbolIndex : number;
    private _reelIndex : number;
    private sound : Howl;

    constructor(symbolIndex: number, reelIndex: number, reelsPosition : Point, startPosition? : Point){
        super();
        this._symbolIndex = symbolIndex;
        this._reelIndex = reelIndex;
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

        this.sound = new Howl({
            src : ['sounds/Reel_Stop_'+(Math.floor(Math.random() * 5) + 1)+".mp3"]
        });
    }

    /**
     * TODO - use Pixi ticker update
     */
    public tumbleOut() : GSAPTween {
        const stopPosition = (3 * this.height) + 50;
        const speed = 4000;
        const duration = this._stopPositionY / speed;
        const symbolOutTween = gsap.to(this, {
            y : stopPosition,
            duration : duration,
            delay : this._delayTime / 1000,
            ease: "power4.in",
            callbackScope : this,
            onComplete : () => {
                if(this._reelIndex === Game.CONFIG.SYMBOL_COLS - 1 && this._symbolIndex === 2){
                    EventBus.getInstance().dispatch(Game.ON_TUMBLE_OUT_END);
                }
            }
        });
        return symbolOutTween;
    }

    /**
     * TODO - use Pixi ticker update
     */
    public tumbleIn() : GSAPTween {
        if(this._reelsPosition !== undefined){
            const stopPosition = this._reelsPosition.y;
            const speed = 4000;
            const duration = this._stopPositionY / speed;
            const symbolOutTween = gsap.to(this, {
                y : stopPosition,
                duration : duration,
                delay : this._delayTime / 1000,
                ease: "power4.in",
                callbackScope : this,
                onComplete : () => {
                    gsap.fromTo(this,{
                        y : this.y,
                    },{
                        duration : 0.1,
                        y : this.y-8,
                        yoyo : true,
                        repeat : 1
                    });
                    this.sound.play();
                    if(this._reelIndex === Game.CONFIG.SYMBOL_COLS - 1 && this._symbolIndex === 2){
                        EventBus.getInstance().dispatch(Game.ON_TUMBLE_IN_END);
                    }

                }
            });
            return symbolOutTween;
        }
    }

}