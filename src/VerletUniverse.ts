import { Illustration, Shape, TAU, Vector } from 'zdog';
import { CylinderConstraint } from './constraints/CylinderConstraint';
import { AddToArray, Average, Snap } from './VectorUtils';

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
    private readonly test: CylinderConstraint = new CylinderConstraint;

    constructor(canvas: string) {
        this.illo = new Illustration(
            {
                element: canvas,
                rotate: {
                    x: -TAU / 8,
                    y: -TAU / 8
                },
                dragRotate: true
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
        this.test.Enforce();
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
        const transform = shape.translate.copy();
        this.illo.addChild(shape);
        shape.translate.set(transform);
        this.test.Add(shape.translate);
        return this.points.push(shape.translate) - 1;
    }

    AddStick(begin: number, end: number, distance: number, color: string) {
        return;
        const path = new Shape(
            {
                color: color,
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