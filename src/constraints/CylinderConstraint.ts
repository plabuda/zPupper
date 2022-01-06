import { Average } from "../VectorUtils";
import { Constraint } from "./Constraint";

export class CylinderConstraint extends Constraint {
    public Enforce(): boolean {
        if (this.items.length < 3) return false;
        const center = Average(this.items);
        center.y = 0;

        const offsets = this.items.map((v) => v.copy().subtract(center));
        offsets.forEach((v) => v.y = 0);

        const distances = offsets.map((v) => v.magnitude());

        const average = distances.reduce(
            (acc: number, operand: number) => acc += operand,
            0
        ) / distances.length;

        const satisfied = distances.findIndex((d) => Math.abs(d - average) > 1) == -1;
        offsets.forEach((v, i) => v.multiply(average / distances[i]).add(center));
        this.items.forEach((v, i) => {
            v.x = offsets[i].x;
            v.z = offsets[i].z;
        });

        return !satisfied;
    }
}