import { AbstractRunner } from "../runners/abstract.runner";
import { Collection } from "./collection";
import { SchematicOption } from "./options/schematic.option";
import { NestSchematic } from "./nest.schematic";
import { CustomSchematic } from "./custom.schematic";
import { Runner } from "../runners/runner";

export abstract class AbstractSchematic {
  constructor(private collection: string, private runner: AbstractRunner) {}

  public async execute(name: string, options: SchematicOption[]): Promise<void> {
    const command = this.buildCommandLine(name, options);
    await this.runner.run(command);
  }

  private buildCommandLine(name: string, options: SchematicOption[]): string {
    return `${ this.collection }:${ name }${ this.buildOptions(options) }`;
  }

  private buildOptions(options: SchematicOption[]): string {
    return options.reduce((line, option) => line.concat(` ${ option.toCommandString() }`), '');
  }

  static create(collection: Collection, logger: any): AbstractSchematic {
    switch (collection) {
      case Collection.NESTJS:
        return new NestSchematic(AbstractRunner.create(Runner.SCHEMATIC, logger));
      default:
        return new CustomSchematic(collection, AbstractRunner.create(Runner.SCHEMATIC, logger)); 
    }
  }
}