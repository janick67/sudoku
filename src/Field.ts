
export class Field {
    value: number;
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number, _value = 0) {
        this.x = x;
        this.y = y;
        this.value = _value;
    }
}
