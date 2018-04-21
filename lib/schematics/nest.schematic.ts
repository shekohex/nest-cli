import { AbstractSchematic } from "./abstract.schematic";
import { AbstractRunner } from "../runners/abstract.runner";

export class NestSchematic extends AbstractSchematic {
  constructor(runner: AbstractRunner) {
    super("@nestjs/schematics", runner);
  }
}
