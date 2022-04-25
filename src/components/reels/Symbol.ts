import { Point, Sprite, Texture } from "pixi.js";


export class Symbol extends Sprite{

    constructor(position : Point){
        super();
        // For now just assign random texture
        const symbolNum = Math.floor(Math.random() * 8) + 1;
        this.texture = Texture.from(`symbol_${symbolNum}`);
        this.position.set(position.x, position.y);
    }

}