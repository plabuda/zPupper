import { Illustration, Shape, Vector } from 'zdog';
import { AddToArray, Average, Ease } from './vector_utils';

function RandomHueColorString(): string {

    const hue = Math.random() * 360;    
    return `hsla(${hue}, 60%, 50%, 1)`;
}

class Stick{
    distance: number;

    constructor(readonly begin: number, readonly end: number, distance: number)
    {
        this.distance = distance;
    }
}

export class Universe {
    private readonly points: Vector[] = [];
    private readonly sticks: Stick[] = [];
    readonly illo: Illustration;

    constructor(canvas: string) {
        this.illo = new Illustration(
            {
                element: canvas
            }
        );
    }

    private TrackVectorArray(): void {
        const average = Average(this.points);
        average.multiply(-1);
        AddToArray(this.points, average);
    }

    Render(progress_inc: number) {
        this.TrackVectorArray();
        this.illo.updateRenderGraph();
    }

    AddDot(translation: Vector): number {
        return this.AddShape(new Shape({
            translate: translation,
            color: RandomHueColorString(),
            stroke: 25
        }))
    }

    AddShape(shape: Shape): number {
        this.illo.addChild(shape);
        return this.points.push(shape.translate) - 1;
    }

}