import { Vector } from "zdog";

export abstract class Constraint {
    protected readonly items: Vector[] = [];

    public Add(item: Vector): void {
        this.items.push(item);
    }

    public Remove(item: Vector): boolean {
        const index = this.items.indexOf(item);        
        if (index < 0) return false;

        this.items.splice(index, 1);
        return true;
    }

    // If true, items had to be moved
    public abstract Enforce(): boolean;

}