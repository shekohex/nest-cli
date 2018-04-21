import { AbstractRunner } from "./abstract.runner";
import { join } from "path";

export class SchematicRunner extends AbstractRunner {
  constructor(logger: any) {
    super(logger, join(__dirname, '../..', 'node_modules/.bin/schematics'));
  }
}
