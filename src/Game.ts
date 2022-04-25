import * as PIXI  from "pixi.js"
import { ReelsView } from "./components/reels/ReelsView";
import { ReelsModel } from "./components/reels/ReelsModel";
import { ReelsController } from "./components/reels/ReelsController";
import { UIView } from "./components/ui/UIView";
import { UIController } from "./components/ui/UIController";

export class Game{

    public static CONFIG = {
        SYMBOL_WIDTH : 236,
        SYMBOL_HEIGHT : 226,
        SYMBOL_ROWS : 3,
        SYMBOL_COLS : 5,
        TIME_BETWEEN_SYMBOLS : 120,
        TIME_BETWEEN_REELS : 60
    };

    private _renderer: PIXI.AbstractRenderer;
    private _stage : PIXI.Container;

    private _uiView : UIView;
    private _uiController : UIController;
    
    private _reelsView : ReelsView;
    private _reelsModel : ReelsModel;
    private _reelsController : ReelsController;

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
        this._uiController = new UIController(this._uiView);

        // Tell the renderer to render the stage, this will be our main container
        this._stage = new PIXI.Container();
    }

    public async init() {
        // load the reels assets
        await this._reelsController.loadAssets().catch(error => {
            console.log(error.message);
        });

        // load the ui assets
        await this._uiController.loadAssets().catch(error => {
            console.log(error.message);
        });

        // init the controllers
        this._reelsController.init();
        this._uiController.init();

        // Add the views to the stage and position the stage
        this._stage.addChild(this._reelsView, this._uiView);
        this._stage.pivot.set(this._reelsView.width / 2, 0);
        this._stage.position.set(window.innerWidth / 2, 50);

        // Start the game loop
        this._start();

        // Simulate spin button
        setTimeout(() => this._reelsController.startSpin(), 2000);
    }

    private _start() : void {
        PIXI.Ticker.shared.add(this._onTick, this)
	}

    private _onTick(deltaTime:number) : void {
        this._renderer.render(this._stage);
        this._reelsView.update();
    }
}