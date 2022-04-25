export enum ReelState {
    IDLE,
    SPIN_OUT,
    SPIN_IN
}

/**
 * Model class for the reels set
 */
export class ReelsModel{

    private _currentState : ReelState;

    set currentState(state: ReelState){
        this._currentState = state;
    }

    get currentState(){
        return this._currentState;
    }

    public init() : void {

    }

}