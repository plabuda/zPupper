import { Vector, lerp, easeInOut } from "zdog";

export function Sum(array: Vector[]): Vector {
    const accumulator = new Vector();
    const reductor = (acc: Vector, operand: Vector): Vector => acc.add(operand);
    return array.reduce(reductor, accumulator);
}

export function Average(array: Vector[]): Vector {
    const sum = Sum(array);
    const len = array.length;
    return new Vector(
        {
            x: sum.x / len,
            y: sum.y / len,
            z: sum.z / len,
        }
    )
}

export function Lerp(a: Vector, b: Vector, alpha:number) : Vector
{
    return new Vector(
        {
            x: lerp(a.x, b.x, alpha),
            y: lerp(a.y, b.y, alpha),
            z: lerp(a.z, b.z, alpha),
        });
}

export function AddToArray(array: Vector[], operand: Vector) : void
{
    const callback = (element: Vector) => element.add(operand);
    array.forEach(callback);
}

export function Ease(a: Vector, b: Vector, progress :number ) : Vector {
    const alpha = easeInOut(progress, 2);
    return Lerp(a,b,alpha);   
}