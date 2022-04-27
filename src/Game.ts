import * as PIXI  from "pixi.js"
import { ReelsView } from "./components/reels/ReelsView";
import { ReelsModel } from "./components/reels/ReelsModel";
import { ReelsController } from "./components/reels/ReelsController";
import { UIView } from "./components/ui/UIView";
import { EventBus, Registry } from "./components/events/EventBus";

export interface SYMOL_CONFIG {
    TIME_BETWEEN_SYMBOLS : number,
    TIME_BETWEEN_REELS : number[]
};

export class Game{

    public static CONFIG = {
        SYMBOL_WIDTH : 236,
        SYMBOL_HEIGHT : 226,
        SYMBOL_ROWS : 3,
        SYMBOL_COLS : 5,
        SYMBOLS_CONFIGS : [
            {
                TIME_BETWEEN_SYMBOLS : 120,
                TIME_BETWEEN_REELS : [
                    100,300,500,300,100
                ]
            },
            {
                TIME_BETWEEN_SYMBOLS : 120,
                TIME_BETWEEN_REELS : [
                    500,400,300,200,100
                ]
            },
            {
                TIME_BETWEEN_SYMBOLS : 120,
                TIME_BETWEEN_REELS : [
                    500,400,300,200,100
                ]
            },
            {
                TIME_BETWEEN_SYMBOLS : 120,
                TIME_BETWEEN_REELS : [
                    500,500,100,500,500
                ]
            },
            {
                TIME_BETWEEN_SYMBOLS : 120,
                TIME_BETWEEN_REELS : [
                    500,300,100,300,500
                ]
            },
            {
                TIME_BETWEEN_SYMBOLS : 120,
                TIME_BETWEEN_REELS : [
                    100,200,300,400,500
                ]
            },
            {
                TIME_BETWEEN_SYMBOLS : 120,
                TIME_BETWEEN_REELS : [
                    500,400,300,200,100
                ]
            }
        ],


    };

    //public static REELS_DELAY : number[] = ;

    private _renderer: PIXI.AbstractRenderer;
    private _stage : PIXI.Container;
    private _uiView : UIView;
    private _reelsView : ReelsView;
    private _reelsModel : ReelsModel;
    private _reelsController : ReelsController;
    
    private _onStartTumbleListener : Registry | undefined;
    private _tumbleInListener : Registry | undefined;

    constructor()
    {
        // Set up the pixi renderer and add it to the html doc
        this._renderer = PIXI.autoDetectRenderer({
            width : window.innerWidth,
            height : window.innerHeight,
            backgroundColor : 0x343434
        });
        document.body.appendChild(this._renderer.view);
        
        // instantiate Reels classes
        this._reelsModel = new ReelsModel();
        this._reelsView = new ReelsView();
        this._reelsController = new ReelsController(this._reelsView, this._reelsModel);
        
        // instantiate UI classes
        this._uiView = new UIView();

        // Tell the renderer to render the stage, this will be our main container
        this._stage = new PIXI.Container();

        // Set up event listener for spin button press
        this._onStartTumbleListener = EventBus.getInstance().register('onTumbleStart',this._onSpinStart.bind(this));
        // set up listener for reel spin complete
        this._tumbleInListener = EventBus.getInstance().register('onTumbleInComplete',this._onSpinComplete.bind(this));
    }

    public async init() {
        // load the reels assets
        await this._reelsController.loadAssets().catch(error => {
            console.log(error.message);
        });

        // load the ui assets
        await this._uiView.loadAssets().catch(error => {
            console.log(error.message);
        });

        // init the reels and ui
        this._reelsController.init();
        this._uiView.init();

        // Add the views to the stage and position the stage
        this._stage.addChild(this._reelsView, this._uiView);
        this._stage.pivot.set(this._reelsView.width / 2, 0);
        this._stage.position.set(window.innerWidth / 2, 50);
        this._stage.scale.set(0.7);
        // Start the game loop
        this._start();
    }

    private _onSpinStart() : void {
        this._reelsController.startSpin();
    }

    private _onSpinComplete() : void {
        this._uiView.enableSpinButton();
    }

    private _start() : void {
        PIXI.Ticker.shared.add(this._onTick, this);
        this._uiView.enableSpinButton();
	}

    private _onTick(deltaTime:number) : void {
        this._renderer.render(this._stage);
        this._reelsView.update();
    }
}