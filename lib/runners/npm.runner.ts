import { AbstractRunner } from "./abstract.runner";

export class NpmRunner extends AbstractRunner {
  constructor(logger: any) {
    super(logger, 'npm');
  }
}
