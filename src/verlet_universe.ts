import { Illustration, Shape, Vector } from 'zdog';
import { AddToArray, Average, Ease } from './vector_utils';

function RandomHueColorString(): string {

    const hue = Math.random() * 360;    
    return `hsla(${hue}, 60%, 50%, 1)`;
}

export class Universe {
    private readonly points: Vector[] = [];
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

    AddDot(translation: Vector): void {
        this.AddShape(new Shape({
            translate: translation,
            color: RandomHueColorString(),
            stroke: 25
        }))
    }

    AddShape(shape: Shape): void {
        this.illo.addChild(shape);
        this.points.push(shape.translate);
    }
}