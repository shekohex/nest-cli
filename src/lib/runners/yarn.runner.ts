import { AbstractRunner } from "./abstract.runner";

export class YarnRunner extends AbstractRunner {
  constructor(logger: any) {
    super(logger, 'yarn');
  }
}
