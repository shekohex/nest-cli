import { action, GenerateAction } from '../actions/generate.action';

export const command = (program) => {
  program
    .command('generate')
    .alias('g')
    .argument('<schematic>', 'Nestjs framework asset type', validate)
    .argument('<name>', 'Asset name or path')
    .argument('[path]', 'Path to generate the asset')
    .option('--dry-run', 'allow to test changes before execute command')
    .action(action);
};

const SCHEMATICS = [
  { value: 'class', alias: 'cl' },
  { value: 'controller', alias: 'co' },
  { value: 'decorator', alias: 'd' },
  { value: 'exception', alias: 'e' },
  { value: 'filter', alias: 'f' },
  { value: 'gateway', alias: 'ga' },
  { value: 'guard', alias: 'gu' },
  { value: 'interceptor', alias: 'i' },
  { value: 'middleware', alias: 'mi' },
  { value: 'module', alias: 'mo' },
  { value: 'pipe', alias: 'p' },
  { value: 'service', alias: 's' }
];

function validate(arg) {
  const schematic = SCHEMATICS.find((schematic) => schematic.value === arg || schematic.alias === arg);
  if (schematic === undefined || schematic === null) {
    throw new Error();
  }
  return schematic.value;
}

export class GenerateCommand {
  constructor(private action = new GenerateAction()) {}

  public addTo(program) {
    program
      .command('generate')
      .alias('g')
      .argument('<schematic>', 'Nestjs framework asset type', validate)
      .argument('<name>', 'Asset name or path')
      .argument('[path]', 'Path to generate the asset')
      .option('--dry-run', 'allow to test changes before execute command')
      .action(this.action.handle);
  }
}