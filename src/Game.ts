import * as PIXI  from "pixi.js"

export class Game{

    private _renderer: PIXI.AbstractRenderer;
    private _stage : PIXI.Container;

    constructor() {

        // Set up the pixi renderer and add it to the html doc
        this._renderer = PIXI.autoDetectRenderer({
            width : window.innerWidth,
            height : window.innerHeight,
            backgroundColor : 0x343434
        });
        document.body.appendChild(this._renderer.view);
        
        // Tell the renderer to render the stage, this will be our main container
        this._stage = new PIXI.Container();
    }

    /**
     * Wait until the assets are loaded before we start the game ;)
     */
    public async init() {
        await this._loadAssets();
        this._start();

        // Display a simple asset for now
        const logo = new PIXI.Sprite(PIXI.Texture.from("assets/1.png"));
        logo.anchor.set(0.5, 0);
        logo.position.set(this._renderer.width / 2, 20);
        this._stage.addChild(logo);
    }

    private async _loadAssets() : Promise<any>{
        return new Promise((resolve)=>{
            PIXI.Loader.shared.add("assets/1.png");
		    PIXI.Loader.shared.load(resolve);
        });
    }

    private _start() {
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