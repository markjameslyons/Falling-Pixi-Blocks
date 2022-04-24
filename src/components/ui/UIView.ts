import { Container } from "pixi.js";

export class UIView extends Container{

    constructor(){
        super();
    }

    public init() : void {
        console.log('ui init');
    }
}