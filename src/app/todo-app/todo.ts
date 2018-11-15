export class Todo {
    id: number;
    value: string;
    done = false;
    edit = false;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
