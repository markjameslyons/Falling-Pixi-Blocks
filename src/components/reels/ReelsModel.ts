export enum ReelsState {
    IDLE,
    SPIN_OUT,
    SPIN_IN
}

/**
 * Model class for the reels set
 */
export class ReelsModel{

    private _currentState : ReelsState;

    set currentState(state: ReelsState){
        this._currentState = state;
    }

    get currentState(){
        return this._currentState;
    }

}