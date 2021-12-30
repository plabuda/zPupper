import { Vector, Illustration, Anchor, Shape } from 'zdog';
import { AddToArray, Average, Ease } from './vector_utils';

function RandomHueColorString(): string {

    return `hsla(100, 60%, 50%, 1)`;
}

export class Universe {
    private readonly points: Vector[] = [];
    private readonly start: Vector = new Vector();
    private readonly current: Vector = new Vector();
    private progress: number = 0;
    readonly illo: Illustration;

    constructor(canvas: string) {
        this.illo = new Illustration(
            {
                element: canvas
            }
        );
    }

    private TrackVectorArray(): void {
        const newCenter = Ease(this.start, new Vector(), this.progress);
        const diff = newCenter.copy();
        diff.subtract(this.current);
        this.current.set(newCenter);
        AddToArray(this.points, diff);
    }

    Render(progress_inc: number) {
        this.progress += progress_inc;
        if (this.progress > 1) {
            this.progress = 1;
        }
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
        const average = Average(this.points);
        this.start.set(average);
        this.current.set(average)
        this.progress = 0;
    }
}