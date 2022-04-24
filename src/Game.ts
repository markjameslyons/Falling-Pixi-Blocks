import * as PIXI  from "pixi.js"
import { ReelsView } from "./components/reels/ReelsView";
import { ReelsController } from "./components/reels/ReelsController";
import { UIView } from "./components/ui/UIView";
import { UIController } from "./components/ui/UIController";

export class Game{

    private _renderer: PIXI.AbstractRenderer;
    private _stage : PIXI.Container;
    private _uiView : UIView;
    private _uiController : UIController;
    private _reelsView : ReelsView;
    private _reelsController : ReelsController;

    constructor(){
        // Set up the pixi renderer and add it to the html doc
        this._renderer = PIXI.autoDetectRenderer({
            width : window.innerWidth,
            height : window.innerHeight,
            backgroundColor : 0x343434
        });
        document.body.appendChild(this._renderer.view);
        
        // instantiate Reels classes
        this._reelsView = new ReelsView();
        this._reelsController = new ReelsController(this._reelsView);
        
        // instantiate UI classes
        this._uiView = new UIView();
        this._uiController = new UIController(this._uiView);

        // Tell the renderer to render the stage, this will be our main container
        this._stage = new PIXI.Container();
        this._stage.addChild(this._reelsView, this._uiView);
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

        // Start the game loop
        this._start();
    }

    private _start() : void {
		var lastTime = requestAnimationFrame(()=>{});
		function loopHandler(time: number){
			this.onTick(time - lastTime);
			requestAnimationFrame(loopHandler.bind(this));
			lastTime = time;
		}
		loopHandler.call(this, lastTime);
	}

    private onTick(deltaTime : number) : void {
        // TODO - pass delta to a reels component
        this._renderer.render(this._stage);
    }
}