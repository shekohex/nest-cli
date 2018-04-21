import { AbstractSchematic } from "../lib/schematics/abstract.schematic";
import { Collection } from "../lib/schematics/collection";
import { SchematicOption } from "../lib/schematics/options/schematic.option";


export const action = async (args: {[key: string]: string}, options: {[key: string]: string}, logger) => {
  await executeSchematic(args, options, logger);
};

const executeSchematic = async (args: {[key: string]: string}, options: {[key: string]: string}, logger) => {
  const schematic = AbstractSchematic.create(Collection.NESTJS, logger);
  const schematicOptions = parse(args, options);
  await schematic.execute(args.schematic, schematicOptions);
}

const parse = (args: {[key: string]: string}, options: {[key: string]: string}): SchematicOption[] => {
  const schematicOptions: SchematicOption[] = [];
  for (const key in args) {
    if (key !== 'schematic') {
      schematicOptions.push(new SchematicOption(key, args[ key ]));
    }
  }
  for (const key in options) {
    schematicOptions.push(new SchematicOption(key, options[ key ] !== undefined));
  }
  return schematicOptions;
}

export class GenerateAction {
  constructor() {}
  
  public async handle(args: {[key: string]: string}, options: {[key: string]: string}, logger) {
    await this.executeSchematic(args, options, logger);
  }

  private async executeSchematic(args: {[key: string]: string}, options: {[key: string]: string}, logger) {
    const schematic: AbstractSchematic = AbstractSchematic.create(Collection.NESTJS, logger);
    const schematicOptions: SchematicOption[] = this.parse(args, options);
    await schematic.execute(args.schematic, schematicOptions);
  }

  private parse(args: {[key: string]: string}, options: {[key: string]: string}): SchematicOption[] {
    const schematicOptions: SchematicOption[] = [];
    for (const key in args) {
      if (key !== 'schematic') {
        schematicOptions.push(new SchematicOption(key, args[ key ]));
      }
    }
    for (const key in options) {
      schematicOptions.push(new SchematicOption(key, options[ key ] !== undefined));
    }
    return schematicOptions;
  }
}