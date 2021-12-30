import { Illustration, Shape, Vector } from 'zdog';
import { AddToArray, Average, Snap } from './vector_utils';

function RandomHueColorString(): string {

    const hue = Math.random() * 360;
    return `hsla(${hue}, 60%, 50%, 1)`;
}

class Stick {
    distance: number;

    constructor(readonly begin: number,
        readonly end: number,
        distance: number,
        readonly shape: Shape) {
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

    private Constrain() {
        const callback = (element: Stick) => {
            this.Snap(element.begin, element.end, element.distance);
        }
        this.sticks.forEach(callback);
    }

    Render(progress_inc: number) {
        this.Constrain();
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

    AddStick(begin: number, end: number, distance: number, color: string) {
        const path = new Shape(
            {
                color : color,
                addTo: this.illo,
                stroke: 10,
                path:
                [
                    this.points[begin],
                    this.points[end]
                ]
            }
        );
        const stick = new Stick(begin, end, distance, path);
        this.sticks.push(stick);
    }

    private Snap(first: number, second: number, distance: number) {
        Snap(this.points[first], this.points[second], distance);
    }

}